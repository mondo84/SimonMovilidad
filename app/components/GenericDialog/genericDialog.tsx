import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface GenerictModalPropsI {
  open: boolean;
  onOpenChange?: (open: boolean) => void;
  isConfirmed?: (isConfirm: boolean) => void;
}

const GenericDialog = ({
  open,
  onOpenChange,
  isConfirmed,
}: GenerictModalPropsI) => {
  const openConfirmModal = (isOpen: boolean) => {
    isConfirmed?.(isOpen);
  };

  return (
    <>
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="sm:max-w-sm rounded-none">
          <DialogHeader>
            <DialogTitle>Confirmacion</DialogTitle>
            <DialogDescription>
              ¿Estás seguro de que deseas realizar esta acción?
            </DialogDescription>
          </DialogHeader>

          <DialogFooter className="mt-4">
            <DialogClose asChild>
              <Button
                variant="outline"
                className="cursor-pointer rounded-none "
                onClick={() => openConfirmModal(false)}
              >
                No, cancelar
              </Button>
            </DialogClose>
            <Button
              type="button"
              className="cursor-pointer rounded-none !bg-red-800 hover:!bg-red-700 text-white"
              onClick={() => openConfirmModal(true)}
            >
              Si, cerrar
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default GenericDialog;
