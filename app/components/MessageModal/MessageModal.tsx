"use client";

import { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { SelectedRow } from "@/app/(Protected)/alerts/page";

export type typeReqAlarm = {
  Vehicle_id: string;
  Message: string;
  Lat: number;
  Long: number;
};

type Props = {
  open: boolean;
  onClose: () => void;
  onSave: (rowSaved: typeReqAlarm) => void;
  title?: string;
  selectedRow?: SelectedRow;
};

const MessageModal = ({
  open,
  onClose,
  onSave,
  title = "Enviar mensaje",
  selectedRow,
}: Props) => {
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleSave = () => {
    if (!message.trim()) {
      setError("El mensaje es obligatorio");
      return;
    }

    if (selectedRow && selectedRow?.vehicle_id) {
      const bodyReq: typeReqAlarm = {
        Vehicle_id: selectedRow?.vehicle_id,
        Message: message,
        Lat: selectedRow?.position[0],
        Long: selectedRow?.position[1],
      };

      onSave(bodyReq);
      setMessage("");
      setError("");
    }
    onClose();
  };

  const handleClose = () => {
    setMessage("");
    setError("");
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="z-1200 rounded-none">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
        </DialogHeader>
        <div>
          <div>
            <div className="text-gray-400">Dispositivo:</div>
            <div className="text-gray-420 ps-2">{selectedRow?.vehicle_id}</div>
          </div>
          <div className="text-gray-400">Detalle:</div>
          <div className="text-gray-420 ps-2">{selectedRow?.message}</div>
          <div className="text-gray-400">Localizacion:</div>
          <div className="text-gray-420 ps-2">
            Lat: ({selectedRow?.position[0]}) / Long: (
            {selectedRow?.position[1]})
          </div>
        </div>
        <div className="space-y-2">
          <Textarea
            placeholder="Escribe aquí ..."
            value={message}
            className="rounded-none"
            onChange={(e) => {
              setMessage(e.target.value);
              if (error) setError("");
            }}
          />
          {error && <p className="text-sm text-red-500">{error}</p>}
        </div>

        <DialogFooter>
          <Button
            variant="outline"
            onClick={handleClose}
            className="rounded-none cursor-pointer"
          >
            Cancelar
          </Button>
          <Button onClick={handleSave} className="rounded-none cursor-pointer ">
            Guardar
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default MessageModal;
