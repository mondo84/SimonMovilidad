import { apiClient } from "@/lib/api-client";
import { GLOBAL_CONST } from "@/lib/global-const/global-const";
import { User } from "next-auth";
import { UserDto } from "../types/UserDto";
import { env } from "@/lib/env";
import { ApiResponseTypeG } from "@/lib/responses/api-response.type";
import { UpdateUserDto } from "../schemas/user.schema";

const {
  API: { USER_ROUTE },
} = env;
const {
  HTTP: {
    METHOD: { GET, POST, PUT, DELETE },
  },
} = GLOBAL_CONST;

export const userService = {
  getAll: (showInactive: boolean) => {
    const resp = apiClient<ApiResponseTypeG<UserDto[]>>(
      `${USER_ROUTE}?showInactive=${showInactive}`,
      {
        method: GET,
      },
    );
    return resp;
  },
  createUser: (data: UserDto) =>
    apiClient<ApiResponseTypeG<UserDto>>(USER_ROUTE, {
      method: POST,
      body: data,
    }),
  updateUser: ({ User_id, ...data }: UpdateUserDto) => {
    return apiClient<ApiResponseTypeG<UserDto>>(`${USER_ROUTE}/${User_id}`, {
      method: PUT,
      body: data,
    });
  },
  deleteUser: (obj: { id: string }) => {
    return apiClient<User>(`${USER_ROUTE}/${obj.id}`, {
      method: DELETE,
    });
  },
};
