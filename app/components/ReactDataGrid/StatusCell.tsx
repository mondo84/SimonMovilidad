import { CheckCircle, XCircle } from "lucide-react";
import { FC } from "react";
import { ICellProps } from "@svar-ui/react-grid";
import { UserDto } from "@/modules/users/types/UserDto";

const StatusCell: FC<ICellProps> = ({ row }) => {
  const user = row as UserDto;
  return (
    <>
      <div className="flex justify-center items-center h-full">
        {user?.Active ? (
          <CheckCircle className="text-green-500 p-0.5" />
        ) : (
          <XCircle className="text-red-500 p-0.5" />
        )}
      </div>
    </>
  );
};

export default StatusCell;
