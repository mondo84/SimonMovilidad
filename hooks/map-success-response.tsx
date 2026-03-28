import ToastAbstract from "@/app/components/ToastCustom/ToastAbstract";
import { CheckCircleIcon } from "@heroicons/react/24/outline";
import { toast as sonnerToast } from "sonner";

type MapSuccessRespType = {
  title: string;
  message?: string;
  username?: string;
};

const MapSuccessResponse = (args: MapSuccessRespType) => {
  const { title, message, username } = args;
  const stringClass = "text-green-500 size-15";

  ToastAbstract({
    title: `${title} (${username})`,
    description: message ?? "",
    icon: <CheckCircleIcon className={stringClass} />,
    button: {
      label: "Aceptar",
      onClick: (toastId) => sonnerToast.dismiss(toastId),
    },
  });
};

export default MapSuccessResponse;
