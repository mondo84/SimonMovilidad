"use client";

import { useUsers } from "@/modules/users/hooks/useUsers";
import { UserDto } from "@/modules/users/types/UserDto";
import { useState } from "react";
import UserForm from "@/app/components/User/UserForm";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { IApi, IColumnConfig } from "@svar-ui/react-grid";
import StatusCell from "@/app/components/ReactDataGrid/StatusCell";
import { CheckCircle, User, XCircle, TableIcon } from "lucide-react";
import GenericTooltip from "@/app/components/GenericTooltip/GenericTooltip";
import GenericControls from "@/app/components/GenericControls/GenericControls";
import { GLOBAL_CONST } from "@/lib/global-const/global-const";
import ListComponent from "@/app/components/ListComponents/ListComponent";

const {
  HTTP: {
    STATUS: { SUCCESS },
  },
} = GLOBAL_CONST;

const UserPage = () => {
  const styleInput = "rounded-none h-[28px] !text-[12px]";

  const [getStatusBtn, setStatusBtn] = useState<{
    isDisable: boolean;
  }>({ isDisable: false });
  const [getIsOpenForm, setIsOpenForm] = useState<{ open: boolean } | null>(
    null,
  );
  const [getSelectedUser, setSelectedUser] = useState<UserDto | null>(null);
  const [getUserInactive, setInUserInactive] = useState(false); // para el switch de mostrar usuarios inactivos, se puede usar un estado local o manejarlo con react-query dependiendo de la complejidad de la aplicación.
  const { data } = useUsers(getUserInactive);
  let userList = data?.data;

  if (data?.status !== SUCCESS) {
    userList = [];
  }

  console.log("LISTADO DE USUARIOS: ", userList);
  // const createObj = useCreateUsers();
  // const deleteObj = useDeleteUser();
  // useEffect(() => {
  //   if (isError) {
  //     const err = error; // as ErrorType;

  //     if (err?.status === UNAUTHORIZED) {
  //       signOut({ callbackUrl: "/login" });
  //     }
  //   }
  //   console.log("ERROR: ", error);
  // }, [isError, error]);

  const closeModal = () => {
    setSelectedUser(null); //  Limpia fila seleccionada.
    setIsOpenForm({ open: false }); // Cierra modal form User.
    setStatusBtn({ isDisable: false }); // Deshabilita boton new user.
  };

  const onCheckedChange = (checked: boolean) => {
    closeModal();
    setInUserInactive(checked);
  };

  const init = (api: IApi): void => {
    // Si se necesita acceder al API fuera de este ámbito, se puede usar useRef para almacenarlo.
    // gridApi.current = api;
    api.on("select-row", (ev) => {
      const rowSelected = api.getStores().data.getRow(ev.id) as UserDto;
      setSelectedUser(rowSelected);
      setIsOpenForm({ open: true });
      setStatusBtn({ isDisable: false });
    });
  };

  const onSaveClickFn = () => {
    setIsOpenForm({ open: true });
    setSelectedUser(null);
    setStatusBtn({ isDisable: true });

    // Quitar los estilos a la fila seleccionada.
  };

  const onPrintClickFn = () => {
    alert("Print");
  };

  const columns: IColumnConfig[] = [
    {
      id: "User_id",
      width: 80,
      header: "Id User",
      css: "text-custom",
      // cell: (row) => {
      //   return (
      //     <div className="bg-red-600 m-0 p-0 w-full text-right">
      //       {row.row.User_id}
      //     </div>
      //   );
      // },
    },
    { id: "First_name", width: 150, flexgrow: 1, header: "First Name" },
    { id: "Last_name", width: 150, flexgrow: 1, header: "Last Name" },
    { id: "Username", width: 150, flexgrow: 1, header: "Username" },
    { id: "Role_Id", width: 100, flexgrow: 1, header: "Role", hidden: true },
    {
      id: "Role",
      width: 100,
      flexgrow: 1,
      header: "Role",
      cell: (row) => {
        return row.row.Role.Description ?? "";
      },
    },
    {
      id: "Active",
      width: 80,
      header: "Estado",
      cell: (row) => StatusCell(row),
    },
  ];

  return (
    <>
      <div
        className="grid grid-cols-1 lg:grid-cols-[65%_35%] w-full
      h-[calc(100vh-74px)] overflow-auto"
      >
        <div className="p-4 dark:bg-black/40">
          <div className="flex items-center mb-1 gap-1 justify-between">
            {!userList?.length ? (
              <div className="p-0">
                <Label
                  htmlFor="inactive-users"
                  className="text-sm me-2 cursor-pointer !gap-0"
                >
                  <Switch
                    onCheckedChange={onCheckedChange}
                    id="inactive-users"
                    className="cursor-pointer"
                  />
                  <span className="ps-2">
                    {getUserInactive ? "Activos/Inactivos" : "Solo activos"}
                  </span>

                  {getUserInactive ? (
                    <>
                      <GenericTooltip text="Activo">
                        <CheckCircle className="text-green-500 p-0.5 ms-2" />
                      </GenericTooltip>

                      <GenericTooltip text="Inactivo" side="bottom">
                        <XCircle className="text-red-500 p-0.5" />
                      </GenericTooltip>
                    </>
                  ) : (
                    <>
                      <GenericTooltip text="Activo" side="right">
                        <CheckCircle className="text-green-500 p-0.5 ms-2" />
                      </GenericTooltip>
                    </>
                  )}
                </Label>
              </div>
            ) : (
              <div></div>
            )}

            <div className="p-0">
              <GenericControls
                tooltipTxtSave=""
                tooltipTxtPrint=""
                isDisabled={getStatusBtn.isDisable}
                styleSaveBtn={
                  getStatusBtn.isDisable
                    ? "text-gray-500 size-6"
                    : "text-blue-500 size-6"
                }
                saveOnClick={onSaveClickFn}
                printOnClick={onPrintClickFn}
              />
            </div>
          </div>
          <div>
            {!userList?.length ? (
              <div>
                <ListComponent
                  data={userList}
                  columns={columns}
                  init={init}
                  styleWrapperTable="!h-[calc(100vh-150px)] border border-white/20 border-dotted w-full bg-black/50"
                  cellStyle={(row, column) => {
                    const styleAdded =
                      column.id === "User_id"
                        ? "!bg-neutral-500/15 text-right"
                        : "";

                    return `!outline-1 outline-dotted text-[11px] ${styleAdded}`;
                  }}
                  rowStyle={() => {
                    const styleAdded =
                      getSelectedUser && getSelectedUser?.User_id
                        ? ""
                        : " !bg-transparent";

                    return `!h-[28px] cursor-pointer hover:!bg-gray-900 ${styleAdded}`;
                  }}
                />
              </div>
            ) : (
              <div className="h-[calc(100vh-147px)] flex justify-center items-center flex-col">
                <TableIcon className="size-30 text-gray-600" />
                <Label className="mb-10 text-gray-500">
                  Listado de Usuarios
                </Label>
              </div>
            )}
          </div>
        </div>

        <div className="ps-1 dark:bg-black/80 ">
          {getIsOpenForm?.open ? (
            <div>
              <UserForm
                props={{
                  styleInput,
                  getSelectedUser,
                  onClose: closeModal,
                }}
              />
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center h-full column">
              <User className="size-40 text-gray-600" />
              <Label className="mb-10 text-gray-500">
                Formulario de Usuario
              </Label>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default UserPage;
