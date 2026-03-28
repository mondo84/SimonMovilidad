import { MenuListI } from "@/app/interfaces/menu/MenuList";
import { apiClient } from "@/lib/api-client";
import { env } from "@/lib/env";
import { GLOBAL_CONST } from "@/lib/global-const/global-const";

const {
  API: { MENU_ROUTE },
} = env;
const {
  HTTP: {
    METHOD: { GET },
  },
} = GLOBAL_CONST;

export const menuService = {
  getAll: (showInactive: boolean) =>
    apiClient<MenuListI[]>(`${MENU_ROUTE}?showInactive=${showInactive}`, {
      method: GET,
    }),
  getById: (id: number) =>
    apiClient<MenuListI>(`${MENU_ROUTE}/${id}`, {
      method: GET,
    }),
};
