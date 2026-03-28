import React from "react";
import GenericTooltip from "../GenericTooltip/GenericTooltip";
import { Button } from "@/components/ui/button";
import { Printer, UserPlus } from "lucide-react";

type GenericControlsI = {
  showSaveBtn?: boolean;
  showPrintBtn?: boolean;
  tooltipTxtSave: string;
  tooltipTxtPrint: string;
  isDisabled?: boolean;
  styleSaveBtn?: string;
  saveOnClick: () => void;
  printOnClick: () => void;
};

const GenericControls = ({
  showSaveBtn = true,
  showPrintBtn = true,
  isDisabled,
  styleSaveBtn,
  saveOnClick,
  printOnClick,
}: GenericControlsI) => {
  return (
    <>
      {showPrintBtn && (
        <GenericTooltip text="Imprimir Reporte" side="bottom">
          <Button
            variant={"ghost"}
            size={"icon"}
            className="cursor-pointer"
            onClick={printOnClick}
          >
            <Printer className="text-blue-300 size-6" />
          </Button>
        </GenericTooltip>
      )}
      {showSaveBtn && (
        <GenericTooltip text="Crear usuario" side="right">
          <Button
            variant={"ghost"}
            size={"icon"}
            className="cursor-pointer"
            onClick={saveOnClick}
            disabled={isDisabled}
          >
            <UserPlus className={styleSaveBtn} />
          </Button>
        </GenericTooltip>
      )}
    </>
  );
};

export default GenericControls;
