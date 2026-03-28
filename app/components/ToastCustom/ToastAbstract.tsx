import { toast as sonnerToast } from "sonner";
import React from "react";
import { Button } from "@/components/ui/button";
import { XMarkIcon } from "@heroicons/react/24/outline";

export interface ToastProps {
  id: string | number;
  title: string;
  description: React.ReactNode;
  icon?: React.ReactElement;
  position?:
    | "top-left"
    | "top-right"
    | "bottom-left"
    | "bottom-right"
    | "top-center"
    | "bottom-center";
  button?: {
    label: string;
    onClick: (id: string | number) => void;
  };
}
// Omit<ToastProps, "id"> Excluye el "id" de la interface.
// para que no se pueda setear desde la implementacion,
// ya que este lo genera automatico el .custom(), solo se necesita para leer.
const ToastAbstract = ({
  title,
  description,
  icon,
  position = "bottom-center",
  button,
}: Omit<ToastProps, "id">) => {
  return sonnerToast.custom(
    (id) => (
      <div className="dark:bg-neutral-900 border-1 border-gray-800 shadow-lg">
        <div className="flex justify-between items-center px-2 py-1 w-full bg-neutral-950">
          <div className="text-sm">{title}</div>
          <div className="flex items-center justify-center">
            <Button
              className="rounded-full cursor-pointer"
              variant="ghost"
              size="icon-sm"
              onClick={() => button?.onClick(id)}
            >
              <XMarkIcon className="text-red-500 size-5" />
            </Button>
          </div>
        </div>

        <div className="flex items-center justify-left text-sm">
          <div className="flex items-center justify-center p-3">{icon}</div>
          <div className="text-sm p-3 !whitespace-pre-wrap !break-normal">
            {description ?? ""}
          </div>
        </div>
      </div>
    ),
    { position: position },
  );
};

export default ToastAbstract;
