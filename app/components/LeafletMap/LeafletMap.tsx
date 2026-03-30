"use client";
import { MapContainer, TileLayer, Marker, useMap } from "react-leaflet";
import L from "leaflet";
import * as signalR from "@microsoft/signalr";
import "leaflet/dist/leaflet.css";
import { useEffect, useState } from "react";
import { env } from "@/lib/env";

const URL_API = env.swaggerApi;
// const URL_API = env.swaggerApiDev;

import {
  clearPositions,
  getPositions,
  saveAlerts,
  savePosition,
} from "@/lib/db";
import { useSession } from "next-auth/react";
import FetchUtil from "@/hooks/fetch-util";
import { SensorType } from "@/modules/dashboard/types/SensorType";

const ChangeView = ({ center }: { center: [number, number] }) => {
  const map = useMap();
  map.setView(center);
  return null;
};

const carIcon = new L.Icon({
  iconUrl: "/puntero.png",
  iconSize: [35, 35],
  iconAnchor: [16, 32],
});

export type NewPosition = {
  Lat: number;
  Long: number;
  FuelLevel: number;
  Temperature: number;
  VehicleId: string;
  Timestamp: string;
};

// const syncPositions = async (accessToken?: string) => {
//   if (!accessToken) return;
//   const URL = `${URL_API}/api/sensor/data`;

//   const data = await getPositions();
//   if (!data.length) return;

//   for (const pos of data) {
//     await FetchUtil(URL, "POST", accessToken, pos);
//   }

//   await clearPositions();
// };

type LeafletMapProps = {
  position: [number, number] | null;
};

const LeafletMap = ({ position }: LeafletMapProps) => {
  // const session = useSession();
  // const [position, setPosition] = useState<[number, number]>([
  //   10.9243697, -74.797705,
  // ]);

  // useEffect(() => {
  //   const handleOffline = async () => {
  //     const cached = await getPositions();

  //     cached.forEach(({ Lat, Long }: SensorType) => {
  //       setPosition([Lat, Long]); // Pintar mapa con estado
  //     });
  //   };

  //   const handleOnline = async () => {
  //     const token = session.data?.accessToken ?? undefined;
  //     await syncPositions(token); // Sincronizar DB.
  //   };

  //   window.addEventListener("offline", handleOffline);
  //   window.addEventListener("online", handleOnline);

  //   return () => {
  //     window.removeEventListener("offline", handleOffline);
  //     window.removeEventListener("online", handleOnline);
  //   };
  // }, []);

  // useEffect(() => {
  //   const connection = new signalR.HubConnectionBuilder()
  //     //   .withUrl("http://localhost:5010/ws/alerts")
  //     .withUrl("http://localhost:5010/ws/alerts")
  //     .withAutomaticReconnect()
  //     .build();

  //   connection.start().then(() => {
  //     console.log("Conectado a SignalR...");
  //   });

  //   connection.on("LOCATION_UPDATE", async (position: SensorType[]) => {
  //     console.log("LOCALI: ", position);

  //     // await savePosition(position); // Save in chache.
  //     // setPosition([position.Lat, position.Long]);
  //     //  animateMove(position, [lat, lng], 1000);
  //   });

  //   return () => {
  //     connection.stop();
  //   };
  // }, [position]);

  return position ? (
    <MapContainer center={position} zoom={16} style={{ height: "100%" }}>
      <ChangeView center={position} />
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      <Marker position={position} icon={carIcon} />
    </MapContainer>
  ) : (
    <>
      <span>Error inicializando el mapa. No se hallaron coordenadas</span>
    </>
  );
};

export default LeafletMap;
