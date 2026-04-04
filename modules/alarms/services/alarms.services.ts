import { apiClient } from "@/lib/api-client";
import { GLOBAL_CONST } from "@/lib/global-const/global-const";
import { env } from "@/lib/env";
import { ApiResponseTypeG } from "@/lib/responses/api-response.type";
import { typeReqAlarm } from "@/app/components/MessageModal/MessageModal";

const {
  API: { ALARM_ROUTE },
} = env;
const {
  HTTP: {
    METHOD: { POST },
  },
} = GLOBAL_CONST;

export const alarmService = {
  createAlarm: (data: typeReqAlarm) =>
    apiClient<ApiResponseTypeG<typeReqAlarm>>(ALARM_ROUTE, {
      method: POST,
      body: data,
    }),
};
