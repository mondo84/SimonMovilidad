"use client";

import DatePicker from "@/app/components/DatePicker/DatePicker";
import ListComponent from "@/app/components/ListComponents/ListComponent";
import { useAlarmList } from "@/modules/dashboard/hooks/useAlarm";
import { IColumnConfig } from "@svar-ui/react-grid";
import { useEffect, useState } from "react";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import StatusCell from "@/app/components/ReactDataGrid/StatusCell";
import CellFormatDate from "@/hooks/cell-format-date";

const columns: IColumnConfig[] = [
  {
    id: "Vehicle_id",
    width: 150,
    header: "ID Dispositivo",
  },
  { id: "Message", width: 150, flexgrow: 1, header: "Mensaje" },
  {
    id: "Active",
    width: 150,
    header: "Estado",
    cell: (row) => StatusCell(row),
  },
  {
    id: "CreatedAt",
    width: 150,
    header: "Fecha",
    cell: (row) => CellFormatDate(row),
  },
];

const AlertsPage = () => {
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

  return (
    <>
      <div className="h-[calc(100vh-74px)] overflow-auto">
        <div className="px-4 dark:bg-black/10 flex">
          <div>
            <DatePicker
              onLoadData={(ev) => {
                setFilters((prev) => ({ ...prev, date: ev }));
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
                onCheckedChange={(ev) =>
                  setFilters((prev) => ({ ...prev, showActive: ev }))
                }
              />
              {filters.showActive ? (
                <span className="ps-2">Activos</span>
              ) : (
                <span className="ps-2">Inactivos</span>
              )}
            </Label>
          </div>
        </div>
        <div className="p-4 dark:bg-black/40">
          <ListComponent
            data={data?.data ?? []}
            columns={columns}
            styleWrapperTable="!h-[calc(100vh-150px)] border border-white/20 border-dotted w-full bg-black/50"
            cellStyle={(row, column) => {
              const styleAdded =
                column.id === "User_id" ? "!bg-neutral-500/15 text-right" : "";

              return `!outline-1 outline-dotted text-[11px] ${styleAdded}`;
            }}
            rowStyle={() => {
              return `!h-[28px] cursor-pointer hover:!bg-gray-900`;
            }}
          />
        </div>
      </div>
    </>
  );
};

export default AlertsPage;
