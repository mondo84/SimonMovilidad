export interface MenuListI {
  menuId: number;
  pathUrl: string;
  title: string;
  iconName?: string;
  active: boolean;
  roles: RoleType[];
}

type RoleType = {
  roleId: number;
  description: string;
};
