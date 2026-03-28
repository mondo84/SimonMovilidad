export interface MenuListI {
  menuId: number;
  pathUrl: string;
  title: string;
  iconName?: string;
  active: boolean;
  role: {
    roleId: number;
    description: string;
  };
}
