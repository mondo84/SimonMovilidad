import { Field, FieldGroup } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { UserDto } from "@/modules/users/types/UserDto";
import { useForm, Controller, useWatch } from "react-hook-form";
import { useEffect, useState } from "react";
import GenericDialog from "../GenericDialog/genericDialog";
import { useUpdateUsers } from "@/modules/users/hooks/useUsers";
import GenericTooltip from "../GenericTooltip/GenericTooltip";
import { CheckCircle, UserPlus, XCircle } from "lucide-react";
import {
  emptyUser,
  formConfig,
  UpdateUserDto,
  userSchema,
} from "../../../modules/users/schemas/user.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Switch } from "@/components/ui/switch";
import { KeyIcon } from "@heroicons/react/24/outline";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export type UserFormType = {
  styleInput: string;
  getSelectedUser: UserDto | null;
  isSaveMode: { open: boolean };
  onClose: () => void;
};

export interface PropsI {
  props: UserFormType;
}

const UserForm = ({
  props: { styleInput, getSelectedUser, onClose },
}: PropsI) => {
  const updateObj = useUpdateUsers();
  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors },
  } = useForm<UpdateUserDto>({
    ...formConfig,
    resolver: zodResolver(userSchema),
    defaultValues: {
      ...emptyUser,
      Role_Id: getSelectedUser?.Role_Id ? String(getSelectedUser?.Role_Id) : "",
    },
  });
  const [getIsOpenConfirmModal, setIsOpenConfirmModal] = useState(false);
  const changePassWatch = useWatch({ control, name: "ChangePass" });
  const clasnameErrorMessage = "text-red-400 text-sm p-0";

  useEffect(() => {
    if (getSelectedUser) {
      reset({
        User_id: getSelectedUser.User_id,
        First_name: getSelectedUser.First_name,
        Last_name: getSelectedUser.Last_name,
        Username: getSelectedUser.Username,
        Active: getSelectedUser.Active,
        Password: "",
        NewPassword: "",
        ConfirmPassword: "",
        Role_Id: getSelectedUser.Role_Id ? String(getSelectedUser.Role_Id) : "",
        ChangePass: false,
      });
    } else {
      reset(emptyUser);
    }
  }, [getSelectedUser, reset]);

  const openConfirmModal = (isOpen: boolean) => {
    setIsOpenConfirmModal(isOpen);
  };

  const isConfirmed = (confirmed: boolean) => {
    openConfirmModal(false);

    if (confirmed) {
      onClose();
    }
  };

  const onSubmit = async (data: UpdateUserDto) => {
    if (data && data.User_id) {
      console.log("UPDATE: ", data);
      updateObj.mutate(data);
      onClose();
    } else {
      console.log("SAVE: ", data);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <FieldGroup>
          <div className="gap-2 p-4">
            <div className="p-4 pt-1 rounded">
              <Label htmlFor="name-1" className="text-lg">
                {!getSelectedUser ? (
                  <UserPlus className="text-blue-500 size-8 me-2" />
                ) : getSelectedUser?.Active ? (
                  <GenericTooltip text="Activo" side="right">
                    <CheckCircle className="text-green-500 me-2 size-8" />
                  </GenericTooltip>
                ) : (
                  <GenericTooltip text="Inactivo" side="right">
                    <XCircle className="text-red-500 ms-2 size-8" />
                  </GenericTooltip>
                )}
                {getSelectedUser?.Username || "Nuevo Usuario"}
              </Label>
            </div>
            <div className="p-4 pb-2 pt-0">
              <Field className="gap-1">
                <Label htmlFor="name-1">
                  {errors.First_name?.message ? (
                    <span className={clasnameErrorMessage}>
                      {errors.First_name?.message}
                    </span>
                  ) : (
                    <span className="text-sm">Nombre</span>
                  )}
                </Label>
                <Input
                  id="name-1"
                  type="text"
                  placeholder="Ingresa el correo"
                  className={styleInput}
                  {...register("First_name")}
                />
              </Field>
            </div>
            <div className="p-4 pb-2 pt-0">
              <Field className="gap-1">
                <Label htmlFor="name-2">
                  {errors.Last_name?.message ? (
                    <span className={clasnameErrorMessage}>
                      {errors.Last_name?.message}
                    </span>
                  ) : (
                    <span className="text-sm">Apellido</span>
                  )}
                </Label>
                <Input
                  id="name-2"
                  type="text"
                  placeholder="Ingresa el apellido"
                  className={styleInput}
                  {...register("Last_name")}
                />
              </Field>
            </div>
            <div className="p-4 pb-2 pt-0">
              <Field className="gap-1">
                <Label htmlFor="name-3">
                  {errors.Username?.message ? (
                    <span className={clasnameErrorMessage}>
                      {errors.Username?.message}
                    </span>
                  ) : (
                    <span className="text-sm">Usuario</span>
                  )}
                </Label>
                <Input
                  id="name-3"
                  type="text"
                  placeholder="Ingresa el usuario"
                  className={styleInput}
                  {...register("Username")}
                />
              </Field>
            </div>
            <div className="p-4 pb-2 pt-0">
              <Controller
                name="Role_Id"
                control={control}
                render={({ field }) => (
                  <>
                    {/* <Label>Rol</Label> */}
                    <Select
                      value={field.value ?? ""}
                      onValueChange={field.onChange}
                    >
                      <SelectTrigger className="w-full max-w-40 text-xs !h-7">
                        <SelectValue placeholder="Selecciona el rol" />
                      </SelectTrigger>
                      <SelectContent position="popper">
                        <SelectGroup>
                          <SelectLabel>Roles</SelectLabel>
                          <SelectItem className="text-xs" value="1">
                            Admin
                          </SelectItem>
                          <SelectItem className="text-xs" value="2">
                            User
                          </SelectItem>
                          <SelectItem className="text-xs" value="3">
                            Viewer
                          </SelectItem>
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  </>
                )}
              />
            </div>

            <div className="ps-4 pb-2 pe-4 flex justify-between">
              <div>
                <Controller
                  name="Active"
                  control={control}
                  render={({ field }) => (
                    <Label
                      htmlFor="statusUser"
                      className="text-sm me-2 cursor-pointer !gap-0"
                    >
                      <Switch
                        id="statusUser"
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />

                      {field.value ? (
                        <span className="ps-2">Activo</span>
                      ) : (
                        <span className="ps-2">Inactivo</span>
                      )}
                    </Label>
                  )}
                />
              </div>
              <div>
                <Controller
                  name="ChangePass"
                  control={control}
                  render={({ field }) => (
                    <Label
                      htmlFor="changePass"
                      className="text-sm me-2 cursor-pointer !gap-0"
                    >
                      <Switch
                        id="changePass"
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                      {changePassWatch ? (
                        <span className="ps-2">Cancelar</span>
                      ) : (
                        <span className="ps-2">Cambiar contraseña</span>
                      )}
                    </Label>
                  )}
                />
              </div>
            </div>
            {changePassWatch ? (
              <>
                <div className="p-4 pb-2 pt-0">
                  <Field className="gap-1">
                    <Label htmlFor="name-4">
                      {errors.Password?.message ? (
                        <span className={clasnameErrorMessage}>
                          {errors.Password?.message}
                        </span>
                      ) : (
                        <span className="text-sm">Clave</span>
                      )}
                    </Label>
                    <Input
                      id="name-4"
                      type="text"
                      placeholder="Ingresa el password actual"
                      className={styleInput}
                      {...register("Password")}
                    />
                  </Field>
                </div>

                <div className="p-4 pb-2 pt-0">
                  <Field className="gap-1">
                    <Label htmlFor="name-5">
                      {errors.NewPassword?.message ? (
                        <span className={clasnameErrorMessage}>
                          {errors.NewPassword?.message}
                        </span>
                      ) : (
                        <span className="text-sm">Nueva clave</span>
                      )}
                    </Label>
                    <Input
                      id="name-5"
                      type="text"
                      placeholder="Ingresa nueva clave"
                      className={styleInput}
                      {...register("NewPassword")}
                    />
                  </Field>
                </div>
                <div className="p-4 pb-2 pt-0">
                  <Field className="gap-1">
                    <Label htmlFor="name-6">
                      {errors.ConfirmPassword?.message ? (
                        <span className={clasnameErrorMessage}>
                          {errors.ConfirmPassword?.message}
                        </span>
                      ) : (
                        <span className="text-sm">Repite la clave</span>
                      )}
                    </Label>
                    <Input
                      id="name-6"
                      type="text"
                      placeholder="Ingresa la clave confirmada"
                      className={styleInput}
                      {...register("ConfirmPassword")}
                    />
                  </Field>
                </div>
              </>
            ) : (
              <>
                <div className="px-4 pt-2 pb-3 flex justify-center items-center">
                  <KeyIcon className="size-30 text-gray-600" />
                </div>
              </>
            )}

            <div className="p-4 pb-0 text-right col-span-2">
              <Button
                variant="outline"
                size="lg"
                className="me-2 rounded-none !bg-red-800 hover:!bg-red-700 text-white cursor-pointer"
                type="button"
                onClick={() => openConfirmModal(true)}
              >
                Cerrar
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="rounded-none cursor-pointer"
                type="submit"
              >
                Guardar
              </Button>
            </div>
          </div>
        </FieldGroup>
      </form>
      <GenericDialog
        open={getIsOpenConfirmModal}
        isConfirmed={(e) => isConfirmed(e)}
      />
    </>
  );
};

export default UserForm;
