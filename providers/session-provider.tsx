"use client";
import { SessionProvider } from "next-auth/react";
import { ProviderProp } from "./react-node.type";

export default function AuthSessionProvider({ children }: ProviderProp) {
  return <SessionProvider>{children}</SessionProvider>;
}
