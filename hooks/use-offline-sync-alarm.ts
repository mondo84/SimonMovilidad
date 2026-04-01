"use client";
import { useEffect } from "react";
import { getAlerts, saveAlerts } from "@/lib/db";
import { useSession } from "next-auth/react";
import {
  AlarmReqType,
  AlarmRespType,
} from "../modules/dashboard/types/SensorType";
import { useAlarmList } from "@/modules/dashboard/hooks/useAlarm";

export type AlarmResponse = {
  success: boolean;
  data: AlarmRespType[];
};

export const useOfflineSyncAlarm = (
  mutateAsync: ReturnType<typeof useAlarmList>["mutateAsync"],
  filters: AlarmReqType,
  setOfflineData: (data: AlarmRespType[]) => void,
) => {
  const { data: sessionData } = useSession();

  useEffect(() => {
    const loadOfflineData = async () => {
      const cached: AlarmRespType[] = await getAlerts();
      if (cached.length > 0) {
        setOfflineData(cached);
      }
    };

    // ====== Sincronizar app con datos del server.
    const handleOffline = async () => {
      alert("Estas desconectado");
      await loadOfflineData();
    };

    const handleOnline = async () => {
      const resp = await mutateAsync(filters);
      // const resp = await syncApp();

      if (resp?.data) {
        console.log(resp?.data);
        for (const row of resp.data) {
          await saveAlerts({
            Id: row.Id,
            Vehicle_id: row.Vehicle_id,
            Message: row.Message,
            Lat: row.Lat,
            Long: row.Long,
            Active: row.Active,
            updatedAt: row.updatedAt,
            createdAt: row.createdAt,
          });
        }
      }

      alert("En linea nuevamente");
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
  }, [
    sessionData?.accessToken,
    filters.date,
    filters.showInactive,
    filters.vehicleId,
    mutateAsync,
    setOfflineData,
  ]);
};
