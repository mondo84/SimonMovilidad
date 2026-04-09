import { useMutation } from "@tanstack/react-query";
import { alarmService } from "../services/alarms.services";
import { typeReqAlarm } from "../types/all-types";

export const useUpdateAlarm = () => {
  return useMutation({
    mutationFn: (dto: typeReqAlarm) => alarmService.updateAlarm(dto),
  });
};
