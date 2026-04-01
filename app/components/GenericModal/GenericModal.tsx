import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { XMarkIcon } from "@heroicons/react/24/outline";

interface GenericModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  message: string;
  title?: string;
  icon?: React.ReactElement;
}

const GenericModal = ({
  open,
  onOpenChange,
  message,
  title = "Operacion Cancelada",
  icon,
}: GenericModalProps) => {
  return (
    <>
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent
          className="sm:max-w-sm dark:bg-neutral-900 border-1 border-gray-800 rounded-none p-0 
        [&>button]:hidden"
        >
          <DialogHeader className="w-full relative">
            <DialogTitle className="p-3 text-center bg-neutral-950">
              {title}
            </DialogTitle>
            <DialogDescription className="p-3 pb-0">
              <span className="flex">
                <span className="pe-4">{icon}</span>
                <span>{message ?? ""}</span>
              </span>
            </DialogDescription>

            <Button
              className="rounded-full cursor-pointer absolute right-1 top-[6px] 
              text-red-500 hover:text-red-700"
              variant="ghost"
              size="icon-sm"
              onClick={() => onOpenChange(false)}
            >
              <XMarkIcon className="text-red-500 size-5" />
            </Button>
          </DialogHeader>

          <DialogFooter className="p-2 pt-0">
            <DialogClose asChild>
              <Button
                variant="outline"
                className="cursor-pointer w-full rounded-none"
              >
                Aceptar
              </Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default GenericModal;
