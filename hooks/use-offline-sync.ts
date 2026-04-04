"use client";
import { useEffect } from "react";
import { getPositions, savePosition } from "@/lib/db";
import { SensorType } from "@/modules/dashboard/types/SensorType";
import { useSession } from "next-auth/react";
import { syncApp } from "./fetch-util";

export const useOfflineSync = (
  setPosition: (pos: [number, number]) => void,
  setSensorData: (data: SensorType[]) => void,
  onConnectionChange?: (status: "online" | "offline") => void,
) => {
  const { data: sessionData } = useSession();

  useEffect(() => {
    const loadOfflineData = async () => {
      const cached: SensorType[] = await getPositions();
      if (cached.length > 0) {
        const last = cached[cached.length - 1];
        setPosition([last.Lat, last.Long]);
        setSensorData(cached);
      }
    };

    // ====== Sincronizar app con datos del server.

    const handleOffline = async () => {
      onConnectionChange?.("offline");
      await loadOfflineData();
    };

    const handleOnline = async () => {
      onConnectionChange?.("online");
      const resp = await syncApp();
      if (resp && resp.success) {
        setSensorData(resp.data);
        const newRow = resp.data as SensorType[];

        for (const row of newRow) {
          await savePosition({
            Vehicle_id: row.Vehicle_id,
            Lat: row.Lat,
            Long: row.Long,
            FuelLevel: row.FuelLevel,
            Temperature: row.Temperature,
            Speed: row.Speed,
            Timestamp: row.Timestamp,
            Active: row.Active,
            id: row.id,
            createdAt: row.createdAt,
            updatedAt: row.updatedAt,
          });
        }

        // alert("App sincronizada");
      }
    };

    if (!navigator.onLine) {
      loadOfflineData();
    }

    window.addEventListener("offline", handleOffline);
    window.addEventListener("online", handleOnline);

    return () => {
      window.removeEventListener("offline", handleOffline);
      window.removeEventListener("online", handleOnline);
    };
  }, [sessionData?.accessToken, setPosition, setSensorData]);
};
