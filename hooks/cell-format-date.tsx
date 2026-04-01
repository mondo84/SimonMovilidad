import { ICellProps } from "@svar-ui/react-grid";

const CellFormatDate = (row: ICellProps) => {
  const value = row.row.createdAt;

  if (!value) return "-";
  const date = new Date(value);
  return (
    <span>
      {date.toLocaleString("es-CO", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
      })}
    </span>
  );
};

export default CellFormatDate;
