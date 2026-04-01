"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";
import * as signalR from "@microsoft/signalr";
import {
  AlarmRespType,
  SensorType,
} from "@/modules/dashboard/types/SensorType";
import LineCharJs from "@/app/components/LineCharJs/LineCharJs";
import { sensorListMap } from "@/modules/dashboard/hooks/map-sensor-list";
import { useSensorDataList } from "@/modules/dashboard/hooks/useDashboard";
import { getPositions, saveAlerts, savePosition } from "@/lib/db";
import useIsAuthHook from "@/modules/auth/hooks/useAuth";
import { GLOBAL_CONST } from "@/lib/global-const/global-const";
import { useOfflineSync } from "@/hooks/use-offline-sync";

const Map = dynamic(() => import("../../components/LeafletMap/LeafletMap"), {
  ssr: false,
});

const {
  SOCKET_EVENTS_NAME: { LOCATION_UPDATE, LOW_FUEL_ALERT },
} = GLOBAL_CONST;

const DashboardPage = () => {
  const { session } = useIsAuthHook();
  const connectionRef = useRef<signalR.HubConnection | null>(null);
  const isStartingRef = useRef(false); // controla el start().
  const isMountedRef = useRef(true);
  const { data, isSuccess } = useSensorDataList(false);
  const [sensorList, setSensorList] = useState<SensorType[]>([]);
  const [position, setPosition] = useState<[number, number] | null>(null);
  const DATA_SOURCE = sensorList; // data && data.data ? data.data : [];
  useOfflineSync(setPosition, setSensorList);

  useEffect(() => {
    if (isSuccess && data?.data) {
      setSensorList(data.data); // inicializa desde backend.
    }
  }, [isSuccess, data]);

  useEffect(() => {
    isMountedRef.current = true;

    // ===================== Actual Position ========================
    if (!navigator.geolocation) {
      console.warn("Geolocation no soportado");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setPosition([pos.coords.latitude, pos.coords.longitude]);
      },
      (err) => {
        setPosition([10.924, -74.797]);
      },
    );
    // ==============================================================

    // ====================== Socket =================================
    if (!connectionRef.current) {
      const connection = new signalR.HubConnectionBuilder()
        .withUrl("http://localhost:5010/ws/alerts")
        .withAutomaticReconnect()
        .build();

      // Si no hay conexion, asigna la conexion a la referencia
      connectionRef.current = connection;
    }

    const connection = connectionRef.current;

    const start = async () => {
      if (
        !connection ||
        isStartingRef.current ||
        connection.state !== signalR.HubConnectionState.Disconnected
      )
        return;

      isStartingRef.current = true;

      try {
        await connection.start();

        if (!isMountedRef.current) return;

        console.log("SignalR conectado con Dashboard");
      } catch (err) {
        console.error("Error start:", err);
      } finally {
        isStartingRef.current = false;
      }
    };

    start();

    // Evita error de desconexion por rerender de React al cambiar de pestaña.
    const handleVisibility = async () => {
      const connection = connectionRef.current;
      if (!connection) return;

      if (document.visibilityState === "visible") {
        console.log("Volviste a la pestaña");

        if (connection.state === signalR.HubConnectionState.Disconnected) {
          try {
            await connection.start();
            console.log("reconectado manual");
          } catch (err) {
            console.error("error reconectando:", err);
          }
        }
      }
    };

    document.addEventListener("visibilitychange", handleVisibility);

    // ================  Eventos ==========================================
    connection.on(LOCATION_UPDATE, async (sensorList: SensorType[]) => {
      if (sensorList && sensorList.length) {
        const actualPosition = sensorList[sensorList.length - 1];
        console.log("actualPosition ", actualPosition);
        await savePosition(actualPosition); // Guarda en cache.
        setPosition([actualPosition.Lat, actualPosition.Long]); // Actualiza Mapa.
        setSensorList(sensorList); // Actualiza Line.

        const all = await getPositions();
        console.log("DATOS EN CACHÉ: ", all);
      }
    });

    if (session && session?.user.role === "Admin") {
      connection.on(LOW_FUEL_ALERT, async (alarm: AlarmRespType) => {
        await saveAlerts(alarm);
        alert("Combustible bajo");
      });
    }

    // ==================================================================

    return () => {
      isMountedRef.current = false;

      document.removeEventListener("visibilitychange", handleVisibility);

      if (
        connectionRef.current &&
        connectionRef.current.state === signalR.HubConnectionState.Connected
      ) {
        connectionRef.current.stop();
      }
    };
  }, []);

  const fuelData = sensorListMap(sensorList, "FuelLevel");
  const speedData = sensorListMap(sensorList, "Speed");

  return (
    <div className="grid grid-cols-2 grid-rows-2 h-[calc(100vh-75px)] gap-1">
      <div className="border">
        {/* <div className="text-sm p-1">Localizacion del Vehiculo</div> */}
        <Map position={position} />
      </div>
      <div className="border p-2 flex flex-col min-h-0">
        <div className="text-sm p-1">Historial de Velocidad</div>
        <div className="flex-1 min-h-0">
          <LineCharJs
            speedData={speedData}
            lineColor="rgb(27, 200, 30)"
            label="Velocidad"
          />
        </div>
      </div>

      <div className="border p-2 flex flex-col min-h-0">
        <div className="text-sm p-1">Registro Historico</div>
        <div className="flex-1 min-h-0">
          <div className="w-full h-full flex flex-col">
            <div className="grid grid-cols-7 bg-gray-800 text-white text-sm font-semibold p-2 text-xs">
              <div>ID Dispositivo</div>
              <div>Lat</div>
              <div>Long</div>
              <div>Velocidad</div>
              <div>Combustible</div>
              <div>Fecha / Hora</div>
            </div>

            <div className="flex-1 overflow-y-auto">
              {DATA_SOURCE.map((item, index) => {
                const timesTamp = new Date(item.Timestamp)
                  .toISOString()
                  .slice(0, 16)
                  .replace("T", " / ");
                return (
                  <div
                    key={index}
                    className="grid grid-cols-7 border-b text-sm p-2 hover:bg-sky-500/30 transition cursor-pointer text-xs"
                  >
                    <div>{item.Vehicle_id}</div>
                    <div>{item.Lat}</div>
                    <div>{item.Long}</div>
                    <div>{item.Speed}</div>
                    <div>
                      {item.FuelLevel < 0 ? 0 : item.FuelLevel}
                      {item.FuelLevel >= 0 ? " lts." : ""}
                    </div>
                    <div>{timesTamp}</div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      <div className="border p-2 flex flex-col min-h-0">
        <div className="text-sm p-1">Historial de Combustible</div>
        <div className="flex-1 min-h-0">
          <LineCharJs
            speedData={fuelData}
            lineColor="red"
            label="Combustible"
          />
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
