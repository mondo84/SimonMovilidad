"use client";
import React, { createContext, useContext, useState } from "react";

type SpinnerContextType = {
  open: boolean;
  show: (text?: string) => void;
  hide: () => void;
};

const SpinnerContext = createContext<SpinnerContextType | null>(null);

// ====== Este es el provider para acceder al state desde los hijos y activar el spinner.
export const SpinnerProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [open, setOpen] = useState(false);

  const show = () => setOpen(true);
  const hide = () => setOpen(false);

  return (
    <SpinnerContext.Provider value={{ open, show, hide }}>
      {children}
    </SpinnerContext.Provider>
  );
};

// ==== Llamado manual al contexto de tipo spinner. que controla el spinner.
export const useSpinner = () => {
  const ctx = useContext(SpinnerContext);
  if (!ctx) throw new Error("useSpinner debe ser usado dentro de un provider.");
  return ctx;
};
