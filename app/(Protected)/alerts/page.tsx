"use client";

import DatePicker from "@/app/components/DatePicker/DatePicker";
import ListComponent from "@/app/components/ListComponents/ListComponent";
import { useAlarmList } from "@/modules/dashboard/hooks/useAlarm";
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
import { InformationCircleIcon } from "@heroicons/react/24/outline";
import { toast as sonnerToast } from "sonner";
import MessageModal, {
  typeReqAlarm,
} from "@/app/components/MessageModal/MessageModal";

const Map = dynamic(() => import("../../components/LeafletMap/LeafletMap"), {
  ssr: false,
});

export type SelectedRow = {
  message: string;
  position: [number, number];
  vehicle_id?: string;
};

const resetSelected: SelectedRow = {
  message: "",
  position: [0, 0],
  vehicle_id: "",
};

const columns: IColumnConfig[] = [
  {
    id: "Vehicle_id",
    width: 150,
    header: "ID Dispositivo",
  },
  { id: "Message", width: 150, flexgrow: 1, header: "Mensaje" },
  {
    id: "Lat",
    width: 100,
    header: "Latitud",
    cell: (row) => {
      return (
        <div className="text-sky-500/90 !text-right pe-1">{row.row.Lat}</div>
      );
    },
  },
  {
    id: "Long",
    width: 100,
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
  {
    id: "Active",
    width: 150,
    header: "Estado",
    cell: (row) => StatusCell(row),
  },
];

const AlertsPage = () => {
  const [selectedRow, setSelectedRow] = useState(resetSelected);
  const { data, mutate, mutateAsync } = useAlarmList();
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

  const toastMsg = (title: string, description: string) => {
    ToastAbstract({
      title,
      description,
      icon: <InformationCircleIcon className="text-sky-500 size-15" />,
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
        toastMsg("Mensaje del sistema", "Se perdio la conexion");
      } else {
        toastMsg("Mensaje del sistema", "En linea");
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
      const { Lat, Long, Message, Vehicle_id } = api
        .getStores()
        .data.getRow(ev.id) as AlarmType;
      setSelectedRow({
        position: [Lat, Long],
        message: Message,
        vehicle_id: Vehicle_id,
      });
    });
    api.on("open-editor", () => {
      setOpen(true);
    });
  };

  const handleSaveAlarm = (dto: typeReqAlarm) => {};

  return (
    <>
      <div className="h-[calc(100vh-74px)] overflow-auto">
        <div className="px-4 dark:bg-black/10 flex">
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
        <div className="p-4 dark:bg-black/40 flex">
          <div className="flex-[0.6] min-w-0">
            <ListComponent
              data={navigator.onLine ? (data?.data ?? []) : offlineData}
              columns={columns}
              init={init}
              styleWrapperTable="!h-[calc(100vh-150px)] border border-white/20 border-dotted w-full bg-black/50"
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
          <div className="flex-[0.4] min-w-0">
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
        open={open}
        onClose={() => setOpen(false)}
        onSave={(saveSelected) => handleSaveAlarm(saveSelected)}
        selectedRow={selectedRow}
      />
    </>
  );
};

export default AlertsPage;
