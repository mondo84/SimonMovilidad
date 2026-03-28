import { env } from "@/lib/env";
import { LoginRequest } from "../types/auth.types";
import { GLOBAL_CONST } from "@/lib/global-const/global-const";
import { ApiResponseTypeG } from "../../../lib/responses/api-response.type";
import { AuthType } from "../types/auth.type";

const {
  API: { AUTH_LOGIN },
} = env;
const {
  HTTP: {
    METHOD: { POST },
  },
  CONTENT_TYPE: { APPLICATION_JSON },
  MESSAGES: { ERROR_AUTH },
} = GLOBAL_CONST;

const URL_API = env.swaggerApi;
// const URL_API = env.swaggerApiDev;

// === Capa servicio (cliente)
const authService = {
  async login(credentials: LoginRequest) {
    const response = await fetch(`${URL_API}${AUTH_LOGIN}`, {
      method: POST,
      headers: {
        "Content-Type": APPLICATION_JSON,
      },
      body: JSON.stringify(credentials),
    });

    const data = (await response.json()) as ApiResponseTypeG<AuthType>;

    if (!data.success) throw new Error(JSON.stringify(data) || ERROR_AUTH);

    return data;
  },
};

export default authService;
