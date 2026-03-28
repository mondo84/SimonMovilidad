"use client";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { userService } from "../services/user.service";
import MapSuccessResponse from "@/hooks/map-success-response";

export const useUsers = (showInactive = false) => {
  return useQuery({
    queryKey: ["users", showInactive], // se puede usar un array para pasar parámetros a la función de consulta, lo que permite que React Query maneje el almacenamiento en caché y la invalidación de manera más eficiente.
    queryFn: () => userService.getAll(showInactive),
  });
};

export const useCreateUsers = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: userService.createUser,
    onSuccess: (res) => {
      if (res) {
      }

      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
  });
};

export const useUpdateUsers = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: userService.updateUser,
    onSuccess: ({ data, message }) => {
      MapSuccessResponse({
        title: "Operacion Exitosa",
        message,
        username: data?.Username,
      });
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
    meta: {
      ignoreGlobalError: false,
    },
    onError: (e) => {
      // console.log("CAPTURE: ", e);
      // if (e && e?.error && e?.error?.errors) {
      //   const errors = e?.error?.errors as object;
      //   const title = (e?.error?.title ?? e?.error?.message) as string;
      //   MapErrorResponse({ title, errors });
      // }
    },
  });
};

export const useDeleteUser = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: userService.deleteUser,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
  });
};
