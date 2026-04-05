"use client";

import { useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogDescription,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { SelectedRow } from "@/app/(Protected)/alerts/page";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useForm, Controller } from "react-hook-form";
import { typeReqAlarm } from "@/modules/alarms/types/all-types";

type FormValues = {
  Status: string;
  Note: string;
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
  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors },
  } = useForm<FormValues>({
    defaultValues: {
      Status: "1",
      Note: "",
    },
  });

  useEffect(() => {
    if (!selectedRow || !open || !selectedRow.Id) return;
    reset({
      Status: selectedRow.status?.toString(),
      Note: selectedRow.Note,
    });
  }, [selectedRow, open, reset]);

  const onSubmit = (data: FormValues) => {
    if (!selectedRow?.vehicle_id) return;

    const bodyReq: typeReqAlarm = {
      Id: selectedRow.Id,
      Note: data.Note,
      Status: Number(data.Status),
    };

    onSave(bodyReq);
    reset();
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="z-[1200] rounded-none">
        <DialogHeader>
          <DialogTitle className="text-sky-500/90">{title}</DialogTitle>
          <DialogDescription className="text-sky-500/70">
            {selectedRow?.message}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div>
            <div className="text-gray-100">Dispositivo:</div>
            <div className="text-gray-400 ps-2">{selectedRow?.vehicle_id}</div>
            <div className="text-gray-100">Localización:</div>
            <div className="text-gray-400 ps-2">
              Lat: ({selectedRow?.position[0]}) / Long: (
              {selectedRow?.position[1]})
            </div>

            <div className="pt-2">
              <Label className="text-gray-100 mb-2 block">Estado</Label>

              <Controller
                control={control}
                name="Status"
                render={({ field }) => (
                  <Select value={field.value} onValueChange={field.onChange}>
                    <SelectTrigger className="w-full max-w-40 text-xs !h-7">
                      <SelectValue placeholder="Selecciona estado" />
                    </SelectTrigger>

                    <SelectContent className="z-[1200]" position="popper">
                      <SelectGroup>
                        <SelectLabel>Estado</SelectLabel>
                        <SelectItem value="1">Pendiente</SelectItem>
                        <SelectItem value="2">En proceso</SelectItem>
                        <SelectItem value="3">Atendido</SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                )}
              />
            </div>
          </div>

          <div className="space-y-2 mt-3">
            <Textarea
              placeholder="Escribe aquí..."
              className="rounded-none"
              {...register("Note", {
                required: "El mensaje es obligatorio",
              })}
            />

            {errors.Note && (
              <p className="text-sm text-red-500">{errors.Note?.message}</p>
            )}
          </div>

          <DialogFooter className="mt-4">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              className="rounded-none"
            >
              Cancelar
            </Button>

            <Button type="submit" className="rounded-none">
              Guardar
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default MessageModal;
