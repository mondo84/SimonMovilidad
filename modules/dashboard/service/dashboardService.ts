import { apiClient } from "@/lib/api-client";
import { env } from "@/lib/env";
import { GLOBAL_CONST } from "@/lib/global-const/global-const";
import { ApiResponseTypeG } from "@/lib/responses/api-response.type";
import { AlarmReqType, SensorType } from "../types/SensorType";

const {
  API: { DASHBOARD_ROUTE },
} = env;
const {
  HTTP: {
    METHOD: { GET, POST },
  },
} = GLOBAL_CONST;

export const dashboardService = {
  getAll: (showInactive: boolean) => {
    const resp = apiClient<ApiResponseTypeG<SensorType[]>>(
      `${DASHBOARD_ROUTE}?showInactive=${showInactive}`,
      {
        method: GET,
      },
    );
    return resp;
  },
  getAlarmList: (dto: AlarmReqType) => {
    const resp = apiClient<ApiResponseTypeG<AlarmReqType[]>>(
      `${DASHBOARD_ROUTE}`,
      {
        method: POST,
        body: dto,
      },
    );
    return resp;
  },
};
