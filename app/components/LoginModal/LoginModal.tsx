import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { Field, FieldGroup } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

interface LoginModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const LoginModal = ({ open, onOpenChange }: LoginModalProps) => {
  const handlerLogin = () => {
    console.log("Login form");
  };

  return (
    <>
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent
          className="sm:max-w-sm"
          onEscapeKeyDown={(event) => event.preventDefault()}
          onInteractOutside={(event) => event.preventDefault()}
        >
          <DialogHeader>
            <DialogTitle>Edit profile</DialogTitle>
            <DialogDescription>
              Make changes to your profile here. Click save when you&apos;re
              done.
            </DialogDescription>
          </DialogHeader>

          <form>
            <FieldGroup>
              <Field>
                <Label htmlFor="name-1">Correo</Label>
                <Input
                  id="name-1"
                  name="correo"
                  type="text"
                  placeholder="Ingresa el correo"
                />
              </Field>
              <Field>
                <Label htmlFor="username-1">Contraseña</Label>
                <Input
                  id="username-1"
                  name="password"
                  type="password"
                  placeholder="Ingresa el password"
                />
                {/* defaultValue="@peduarte" */}
              </Field>
            </FieldGroup>
            <DialogFooter className="mt-4">
              <DialogClose asChild>
                <Button variant="outline" className="cursor-pointer">
                  Cancelar
                </Button>
              </DialogClose>
              <Button
                type="button"
                className="cursor-pointer"
                onClick={handlerLogin}
              >
                Iniciar Sesion
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default LoginModal;
