import { apiClient } from "@/lib/api-client";
import { env } from "@/lib/env";
import { GLOBAL_CONST } from "@/lib/global-const/global-const";
import { ApiResponseTypeG } from "@/lib/responses/api-response.type";
import { SensorType } from "../types/SensorType";

const {
  API: { DASHBOARD_ROUTE },
} = env;
const {
  HTTP: {
    METHOD: { GET },
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
    console.log("Response: ", resp);
    return resp;
  },
};
