"use client";
import { useQuery } from "@tanstack/react-query";
import { dashboardService } from "../service/dashboardService";

export const useSensorDataList = (showInactive = false) => {
  return useQuery({
    queryKey: ["sensordata", showInactive], // se puede usar un array para pasar parámetros a la función de consulta, lo que permite que React Query maneje el almacenamiento en caché y la invalidación de manera más eficiente.
    queryFn: () => dashboardService.getAll(showInactive),
  });
};
