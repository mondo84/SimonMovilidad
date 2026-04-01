import ToastAbstract from "@/app/components/ToastCustom/ToastAbstract";
import { ExclamationCircleIcon } from "@heroicons/react/24/outline";
import { toast as sonnerToast } from "sonner";

type MapErrorRespType = {
  title: string;
  error?: string;
  errors?: Record<string, string[]>;
};

const MapErrorResponse = (args: MapErrorRespType) => {
  const { title, error, errors } = args;
  const stringClass = "text-red-500 size-15";

  ToastAbstract({
    title: `${title}`,
    description: error ?? (
      <ul className="list-disc pl-4 space-y-1 text-sm">
        {Object.values(errors ?? {})
          .flat()
          .map((el, index) => {
            return <li key={index}>{el}</li>;
          })}
      </ul>
    ),
    icon: <ExclamationCircleIcon className={stringClass} />,
    button: {
      label: "Aceptar",
      onClick: (toastId) => sonnerToast.dismiss(toastId),
    },
  });
};

export default MapErrorResponse;
