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

const Map = dynamic(() => import("../../components/LeafletMap/LeafletMap"), {
  ssr: false,
});

const resetSelected = {
  message: "",
  position: [0, 0],
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
    id: "CreatedAt",
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

  const { data, mutate } = useAlarmList();

  const today = new Date();
  const [filters, setFilters] = useState({
    date: `${today.getFullYear()}-${(today.getMonth() + 1)
      .toString()
      .padStart(2, "0")}-${today.getDate().toString().padStart(2, "0")}`,
    showActive: true,
    vehicleId: "",
  });

  useEffect(() => {
    mutate({
      date: filters.date,
      showInactive: !filters.showActive,
      vehicleId: filters.vehicleId,
    });
  }, [filters, mutate]);

  const init = (api: IApi): void => {
    api.on("select-row", (ev) => {
      const { Lat, Long, Message } = api
        .getStores()
        .data.getRow(ev.id) as AlarmType;
      setSelectedRow({ position: [Lat, Long], message: Message });
    });
  };

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
              data={data?.data ?? []}
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
    </>
  );
};

export default AlertsPage;
