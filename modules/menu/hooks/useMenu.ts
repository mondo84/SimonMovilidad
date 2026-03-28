import { useQuery } from "@tanstack/react-query";
import { menuService } from "../services/menu.service";

export const useGetMenu = (showInactive = false) => {
  return useQuery({
    queryKey: ["menuKey"],
    queryFn: () => menuService.getAll(showInactive),
  });
};
