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

const CustomQueryClientProvider = ({ children }: ProviderProp) => {
  // TanStank Query (React Query).
  // QueryClient.queryCache => captura el error global de las query GET.
  // QueryClient.mutationCache => captura el error global de las mutation POST, PUT, DELETE.
  const [queryClient] = useState(
    () =>
      new QueryClient({
        queryCache: new QueryCache({
          onSuccess: (resp, query) => {},
          onError: (error, query) => {
            if (query.options.meta?.ignoreGlobalError) return;

            const errObj = error.message ?? error.error.message;

            MapErrorResponse({ title: "Operacion Cancelada", error: errObj });
          },
        }),
        mutationCache: new MutationCache({
          onSuccess: (resp, variable, ctx, mutation) => {
            console.log("UPDATE: ", resp);

            if (mutation.options.meta?.ignoreGlobalError) return;

            // const data = resp;
            // ToastAbstract({
            //   title: "Operacion Exitosa!",
            //   description: `${data?.message}`,
            //   icon: <ExclamationCircleIcon className={stringClass} />,
            //   button: {
            //     label: "Aceptar",
            //     onClick: (toastId) => sonnerToast.dismiss(toastId),
            //   },
            // });
            // const resp = r as {
            //   title: string;
            //   status: number;
            //   errors: Record<string, string[]>;
            // };

            // if (r && resp && resp.status !== 200) {
            //   let txtMsg = "";
            //   if (resp.errors) {
            //     const keyList = Object.keys(resp.errors);

            //     keyList.map((el: string) => {
            //       resp.errors[el].map((el2: string) => {
            //         console.log(el2);
            //         txtMsg += `${el2} `;
            //       });
            //     });

            //     ToastAbstract({
            //       title: `${resp.title}.`,
            //       description: `${txtMsg}`,
            //       // icon: { error },
            //       // <ExclamationCircleIcon className={stringClass} />,
            //       button: {
            //         label: "Aceptar",
            //         onClick: (toastId) => sonnerToast.dismiss(toastId),
            //       },
            //     });
            //   }
            // }
          },
          onError: (e, variable, ctx, mutation) => {
            // === metadata enviada desde el mutation local.
            // cuando se envíe ignoreGlobalError en true, no se muestra
            // el ToastAbstract global, sino el local en useMutation()
            if (mutation.options.meta?.ignoreGlobalError) return;

            // const errorObj = error.message ?? error.error.message;

            if (e && e?.error && e?.error?.errors) {
              const errors = e?.error?.errors ?? ([] as object);
              const title = (e?.error?.title ?? e?.error?.message) as string;

              MapErrorResponse({ title, errors: errors });
            }
          },
        }),
      }),
  );
  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};

export default CustomQueryClientProvider;
