"use client";
import {
  MutationCache,
  QueryCache,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import { ProviderProp } from "./react-node.type";
import { useState } from "react";
import MapErrorResponse from "@/hooks/map-error-response";
import { getError } from "@/hooks/get-errors";

const CustomQueryClientProvider = ({ children }: ProviderProp) => {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        queryCache: new QueryCache({
          onError: (error, query) => {
            if (query.options.meta?.ignoreGlobalError) return;
            const { message } = getError(error);
            MapErrorResponse({ title: "Operacion Cancelada", error: message });
          },
        }),
        mutationCache: new MutationCache({
          onError: (e, variable, ctx, mutation) => {
            if (mutation.options.meta?.ignoreGlobalError) return;
            const { message, errors } = getError(e);
            MapErrorResponse({ title: message, errors: errors });
          },
        }),
      }),
  );
  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};

export default CustomQueryClientProvider;
