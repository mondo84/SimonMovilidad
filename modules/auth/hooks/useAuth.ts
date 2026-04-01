"use client";
import { SessionStatusType } from "@/modules/auth/types/session-status";
import { Session } from "next-auth";
import { useSession } from "next-auth/react";

const useAuthHook = (): {
  session: Session | null;
  isLoged: boolean;
  status?: SessionStatusType;
} => {
  const { data: session, status } = useSession();

  return {
    isLoged: status && status === "authenticated",
    session: session,
    status: status,
  };
};

export default useAuthHook;
