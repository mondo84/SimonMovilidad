"use client";
import { useMutation } from "@tanstack/react-query";
import { dashboardService } from "../service/dashboardService";
import { AlarmReqType } from "../types/SensorType";

export const useAlarmList = () => {
  return useMutation({
    mutationFn: (dto: AlarmReqType) => dashboardService.getAlarmList(dto),
  });
};
