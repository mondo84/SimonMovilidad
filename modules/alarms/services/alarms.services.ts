import { apiClient } from "@/lib/api-client";
import { GLOBAL_CONST } from "@/lib/global-const/global-const";
import { env } from "@/lib/env";
import { ApiResponseTypeG } from "@/lib/responses/api-response.type";
import { AlarmRespType } from "@/modules/dashboard/types/SensorType";
import { typeReqAlarm } from "../types/all-types";

const {
  API: { ALARM_ROUTE },
} = env;
const {
  HTTP: {
    METHOD: { PUT },
  },
} = GLOBAL_CONST;

export const alarmService = {
  updateAlarm: (dto: typeReqAlarm) =>
    apiClient<ApiResponseTypeG<AlarmRespType>>(`${ALARM_ROUTE}`, {
      method: PUT,
      body: dto,
    }),
};
