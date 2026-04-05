"use client";

import DatePicker from "@/app/components/DatePicker/DatePicker";
import ListComponent from "@/app/components/ListComponents/ListComponent";
import { useAlarmList } from "@/modules/dashboard/hooks/useAlarm";
import { useUpdateAlarm } from "@/modules/alarms/hooks/useAlarm";
import { IApi, IColumnConfig } from "@svar-ui/react-grid";
import { useEffect, useState } from "react";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import StatusCell from "@/app/components/ReactDataGrid/StatusCell";
import CellFormatDate from "@/hooks/cell-format-date";
import dynamic from "next/dynamic";
import { MapPin } from "lucide-react";
import { AlarmType } from "../../../modules/dashboard/types/AlarmType";
import { useOfflineSyncAlarm } from "@/hooks/use-offline-sync-alarm";
import { AlarmRespType } from "@/modules/dashboard/types/SensorType";
import ToastAbstract from "@/app/components/ToastCustom/ToastAbstract";
import {
  InformationCircleIcon,
  CheckCircleIcon,
} from "@heroicons/react/24/outline";
import { toast as sonnerToast } from "sonner";
import MessageModal from "@/app/components/MessageModal/MessageModal";
import { typeReqAlarm } from "@/modules/alarms/types/all-types";

const Map = dynamic(() => import("../../components/LeafletMap/LeafletMap"), {
  ssr: false,
});

export type SelectedRow = {
  Id: number;
  message: string;
  Note: string;
  position: [number, number];
  vehicle_id?: string;
  status: string | number;
};

const resetSelected: SelectedRow = {
  Id: 0,
  message: "",
  Note: "",
  position: [0, 0],
  vehicle_id: "",
  status: 1,
};

const columns: IColumnConfig[] = [
  {
    id: "Id",
    width: 100,
    header: "ID",
    hidden: true,
  },
  {
    id: "Vehicle_id",
    width: 120,
    header: "ID Dispositivo",
  },
  { id: "Message", width: 100, flexgrow: 1, header: "Alarma" },
  {
    id: "Lat",
    width: 90,
    header: "Latitud",
    cell: (row) => {
      return (
        <div className="text-sky-500/90 !text-right pe-1">{row.row.Lat}</div>
      );
    },
  },
  {
    id: "Long",
    width: 90,
    header: "Longitud",
    cell: (row) => {
      return (
        <div className="text-sky-500/90 !text-right pe-1">{row.row.Long}</div>
      );
    },
  },
  {
    id: "createdAt",
    width: 150,
    header: "Fecha",
    cell: (row) => CellFormatDate(row),
  },
  { id: "Note", width: 160, flexgrow: 1, header: "Nota" },
  {
    id: "Status",
    width: 100,
    header: "Caso",
    cell: (row) => {
      let statusResp = <div className="text-red-400">Pendiente</div>;

      if (row && row.row) {
        switch (row.row.Status) {
          case 2:
            statusResp = <div className="text-yellow-400">En proceso</div>;
            break;
          case 3:
            statusResp = <div className="text-green-400">Atendido</div>;
            break;
          default:
            break;
        }
      }

      return statusResp;
    },
  },
  {
    id: "Active",
    width: 80,
    header: "Activo",
    cell: (row) => StatusCell(row),
  },
];

const AlertsPage = () => {
  const [selectedRow, setSelectedRow] = useState(resetSelected);
  const { data, mutate, mutateAsync } = useAlarmList();
  const objUpdate = useUpdateAlarm();
  const [offlineData, setOfflineData] = useState<AlarmRespType[]>([]);
  const [open, setOpen] = useState(false);

  const today = new Date();
  const [filters, setFilters] = useState({
    date: `${today.getFullYear()}-${(today.getMonth() + 1)
      .toString()
      .padStart(2, "0")}-${today.getDate().toString().padStart(2, "0")}`,
    showActive: true,
    vehicleId: "",
  });

  const toastMsg = (
    title: string,
    description: string,
    icon: React.ReactElement,
  ) => {
    ToastAbstract({
      title,
      description,
      icon,
      button: {
        label: "Aceptar",
        onClick: (toastId) => sonnerToast.dismiss(toastId),
      },
    });
  };

  useOfflineSyncAlarm(
    mutateAsync,
    {
      date: filters.date,
      showInactive: !filters.showActive,
      vehicleId: filters.vehicleId,
    },
    setOfflineData,
    (status) => {
      if (status === "offline") {
        toastMsg(
          "Mensaje del sistema",
          "Se perdio la conexion",
          <InformationCircleIcon className="text-sky-500 size-15" />,
        );
      } else {
        toastMsg(
          "Mensaje del sistema",
          "En linea",
          <InformationCircleIcon className="text-sky-500 size-15" />,
        );
      }
    },
  );

  useEffect(() => {
    mutate({
      date: filters.date,
      showInactive: !filters.showActive,
      vehicleId: filters.vehicleId,
    });
  }, [filters, mutate]);

  const init = (api: IApi): void => {
    api.on("select-row", (ev) => {
      const { Id, Lat, Long, Message, Note, Vehicle_id, Status } = api
        .getStores()
        .data.getRow(ev.id) as AlarmType;
      setSelectedRow({
        Id,
        position: [Lat, Long],
        message: Message,
        Note,
        vehicle_id: Vehicle_id,
        status: Status,
      });
    });
    api.on("open-editor", () => {
      setOpen(true);
    });
  };

  const handleSaveAlarm = (dto: typeReqAlarm) => {
    if (dto && dto.Id) {
      objUpdate.mutate(dto, {
        onSuccess: (res) => {
          if (res && res.success) {
            toastMsg(
              "Operacion exitosa",
              `${res.message}. El usuario será notificado de la novedad.`,
              <CheckCircleIcon className="text-green-500 size-15" />,
            );
            mutate({
              date: filters.date,
              showInactive: !filters.showActive,
              vehicleId: filters.vehicleId,
            });
          }
        },
      });
    }
  };

  return (
    <>
      <div className="h-[calc(100vh-74px)] flex flex-col">
        <div className="py-1 dark:bg-black/10 flex">
          <div>
            <DatePicker
              onLoadData={(ev) => {
                setFilters((prev) => ({ ...prev, date: ev }));
                setSelectedRow(resetSelected);
              }}
            />
          </div>
          <div className="ps-4 pt-2">
            <Label
              htmlFor="statusUser"
              className="text-sm me-2 cursor-pointer !gap-0"
            >
              <Switch
                id="statusUser"
                checked={filters.showActive}
                onCheckedChange={(ev) => {
                  setFilters((prev) => ({ ...prev, showActive: ev }));
                  setSelectedRow(resetSelected);
                }}
              />
              {filters.showActive ? (
                <span className="ps-2">Activos</span>
              ) : (
                <span className="ps-2">Inactivos</span>
              )}
            </Label>
          </div>
        </div>
        <div className="flex h-full !w-full dark:bg-black/50">
          <div className="w-[70%] min-w-0">
            <ListComponent
              data={navigator.onLine ? (data?.data ?? []) : offlineData}
              columns={columns}
              init={init}
              styleWrapperTable="!h-[calc(100vh-115px)] border border-white/20 border-dotted w-full bg-black/50"
              cellStyle={(row, column) => {
                const styleAdded =
                  column.id === "User_id"
                    ? "!bg-neutral-500/15 text-right"
                    : "";

                return `!outline-1 outline-dotted text-[11px] ${styleAdded}`;
              }}
              rowStyle={() => {
                return `!h-[28px] cursor-pointer hover:!bg-gray-900`;
              }}
            />
          </div>
          <div className="w-[30%]">
            {selectedRow.message ? (
              <Map
                position={selectedRow.position}
                message={selectedRow.message}
              />
            ) : (
              <>
                <div className="flex items-center justify-center flex-col h-full w-full">
                  <MapPin className="text-sky-500/50 size-50" />
                  <div className="text-neutral-500 select-none">
                    Localizacion de la alarma
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
      <MessageModal
        title="Alarma"
        open={open}
        onClose={() => setOpen(false)}
        onSave={(saveSelected) => handleSaveAlarm(saveSelected)}
        selectedRow={selectedRow}
      />
    </>
  );
};

export default AlertsPage;
