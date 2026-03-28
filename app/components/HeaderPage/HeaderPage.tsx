"use client";
import { useRouter } from "next/navigation";
import { CSSProperties } from "react";
import { signOut } from "next-auth/react";
import useAuthHook from "@/modules/auth/hooks/useAuth";
// import { useGetMenu } from "@/modules/menu/hooks/useMenu";
import { GLOBAL_CONST } from "@/lib/global-const/global-const";
import { MenuListI } from "@/app/interfaces/Menu/MenuList";
import BackButton from "../BackButton/BackButton";

const data: MenuListI[] = [
  {
    title: "Atras",
    active: true,
    pathUrl: "/",
    menuId: 1,
    iconName: "ArrawLeftIcon",
    role: {
      roleId: 1,
      description: "Admin",
    },
  },
  {
    title: "Home",
    active: true,
    pathUrl: "/home",
    menuId: 2,
    iconName: "HomeIcon",
    role: {
      roleId: 1,
      description: "Admin",
    },
  },
  {
    title: "Usuarios",
    active: true,
    pathUrl: "/user",
    menuId: 2,
    iconName: "UserGroupIcon",
    role: {
      roleId: 1,
      description: "Admin",
    },
  },
  {
    title: "Dashboard",
    active: true,
    pathUrl: "/dashboard",
    menuId: 2,
    iconName: "Cog8ToothIcon",
    role: {
      roleId: 1,
      description: "Admin",
    },
  },
];

const HeaderPage = () => {
  const { isLoged, session } = useAuthHook();
  const router = useRouter();
  // const { data } = useGetMenu(false);

  const objStyle: CSSProperties = { cursor: "pointer", color: "gray" };

  const onClickEvn = (path: string) => {
    if (path === "/") {
      router.back(); // Retrocede en el historial.
    } else {
      router.push(path); // Inserta en el historial.
    }
    // router.replace("/user"); // Reemplaza el ultimo del historial.
  };

  const cerrarSession = () => {
    signOut({
      callbackUrl: "/login",
    });
  };

  const roleDescription = session?.user?.role;
  const filterMenuByRole = (listMenu: MenuListI[] = []) => {
    if (roleDescription !== GLOBAL_CONST.ROLES.ADMIN) {
      return listMenu.filter((row) => row.role.description === roleDescription);
    }

    return listMenu;
  };

  const getMenuList = () => {
    return filterMenuByRole(data).map(({ pathUrl, title, iconName }) => {
      return (
        <BackButton
          key={pathUrl}
          Title={title}
          styleConfig={objStyle}
          onClickEvn={() => onClickEvn(pathUrl)}
          IconName={iconName}
        />
      );
    });
  };

  return (
    <>
      <div className="flex items-center bg-black/80 sticky top-0 z-50">
        <div className="flex-1 text-left">{isLoged && getMenuList()}</div>
        <div className="ps-4 me-4 flex items-center">
          {isLoged && (
            <div className="me-2">
              Bienvenido {session?.user?.username} ({roleDescription})
            </div>
          )}
          <BackButton
            styleConfig={objStyle}
            Title="Salir"
            onClickEvn={() => cerrarSession()}
            IconName="ArrowLeftStartOnRectangleIcon"
          />
        </div>
      </div>
    </>
  );
};

export default HeaderPage;
