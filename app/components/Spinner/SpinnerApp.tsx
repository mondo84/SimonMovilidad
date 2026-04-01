"use client";
import { Spinner } from "@/components/ui/spinner";
import useAuthHook from "@/modules/auth/hooks/useAuth";
import { useSpinner } from "@/providers/spinner-provider";
import { useIsFetching, useIsMutating } from "@tanstack/react-query";
import { useEffect } from "react";

const SpinnerApp = () => {
  const { open } = useSpinner();
  const { status } = useAuthHook();
  const isFetching = useIsFetching();
  const isMutating = useIsMutating();
  const isLoading =
    isFetching > 0 || isMutating > 0 || status === "loading" || open;

  const spinnerStII =
    "fixed inset-0 z-[9999] flex items-center justify-center flex-col bg-black/40  transition-opacity duration-300";

  useEffect(() => {
    if (!isLoading) return;

    if (document.activeElement instanceof HTMLElement) {
      document.activeElement.blur();
    }

    document.body.style.overflow = "hidden";

    const blockKeys = (e: KeyboardEvent) => {
      e.preventDefault();
      e.stopPropagation();
    };

    window.addEventListener("keydown", blockKeys, true);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", blockKeys, true);
    };
  }, [isLoading]);

  if (!isLoading) return null;

  return (
    <>
      <div className={spinnerStII}>
        <Spinner className="size-20 text-gray-300" data-icon="inline-start" />
        <span className="text-xl text-gray-300">Cargando ...</span>
      </div>
    </>
  );
};

export default SpinnerApp;
