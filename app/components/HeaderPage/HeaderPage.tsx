"use client";
import { useRouter } from "next/navigation";
import { CSSProperties } from "react";
import { signOut } from "next-auth/react";
import useAuthHook from "@/modules/auth/hooks/useAuth";
import { MenuListI } from "@/app/interfaces/Menu/MenuList";
import BackButton from "../BackButton/BackButton";

const data: MenuListI[] = [
  {
    title: "Home",
    active: true,
    pathUrl: "/home",
    menuId: 2,
    iconName: "HomeIcon",
    roles: [
      {
        roleId: 1,
        description: "Admin",
      },
      {
        roleId: 2,
        description: "User",
      },
      {
        roleId: 3,
        description: "Viewer",
      },
    ],
  },
  {
    title: "Usuarios",
    active: true,
    pathUrl: "/user",
    menuId: 2,
    iconName: "UserGroupIcon",
    roles: [
      {
        roleId: 1,
        description: "Admin",
      },
    ],
  },
  {
    title: "Dashboard",
    active: true,
    pathUrl: "/dashboard",
    menuId: 2,
    iconName: "ChartPieIcon",
    roles: [
      {
        roleId: 1,
        description: "Admin",
      },
      {
        roleId: 2,
        description: "User",
      },
      {
        roleId: 3,
        description: "Viewer",
      },
    ],
  },
  {
    title: "Alerts",
    active: true,
    pathUrl: "/alerts",
    menuId: 2,
    iconName: "BellAlertIcon",
    roles: [
      {
        roleId: 1,
        description: "Admin",
      },
    ],
  },
];

const HeaderPage = () => {
  const router = useRouter();
  const { isLoged, session } = useAuthHook();

  const roleDescription = session?.user?.role;
  const objStyle: CSSProperties = { cursor: "pointer", color: "gray" };

  const onClickEvn = (path: string) => {
    if (path === "/") {
      router.back();
    } else {
      router.push(path);
    }
  };

  const cerrarSession = () => {
    signOut({
      callbackUrl: "/login",
    });
  };

  const filterMenuByRole = data
    .filter((menuItem) =>
      menuItem.roles.some((role) => role.description === roleDescription),
    )
    .map((menuItem) => ({
      pathUrl: menuItem.pathUrl,
      title: menuItem.title,
      iconName: menuItem.iconName,
    }));

  const getMenuList = () => {
    return filterMenuByRole.map(({ pathUrl, title, iconName }) => {
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
        <div className="h-full px-4 select-none">IOT APP</div>
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
