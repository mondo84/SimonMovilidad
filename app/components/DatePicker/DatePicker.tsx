import { useState } from "react";
import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { es } from "date-fns/locale";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

type DatePickerProps = {
  title?: string;
  onLoadData: (fecha: string) => void;
};

const DatePicker = ({
  title = "Selecciona la fecha",
  onLoadData,
}: DatePickerProps) => {
  const [open, setOpen] = useState(false);
  const [date, setDate] = useState<Date>(new Date());

  return (
    <div>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild className="rounded-none">
          <Button
            variant="outline"
            data-empty={!date}
            className="w-[210px] justify-start text-left font-normal data-[empty=true]:text-muted-foreground"
          >
            <CalendarIcon />
            {date ? format(date, "yyyy-MM-dd") : <span>{title}</span>}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0">
          <div className="p-2 border-b flex justify-end">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => {
                const today = new Date();
                const formatted = format(today, "yyyy-MM-dd");

                setDate(today);
                setOpen(false);
                onLoadData(formatted);
              }}
            >
              Hoy
            </Button>
          </div>
          <Calendar
            mode="single"
            selected={date}
            onSelect={(sel) => {
              if (!sel) return;

              const formatted = format(sel, "yyyy-MM-dd");
              setDate(sel);
              setOpen(false);
              onLoadData(formatted);
            }}
            locale={es}
          />
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default DatePicker;
