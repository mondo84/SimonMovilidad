// Opcionales los campos de UserDtos con partial
export interface UserDtoOptionals {
  // Id?: string;
  User_id?: number;
  Password?: string;
  NewPassword?: string;
  ConfirmPassword?: string;
  ChangePass?: boolean;
}

export interface UserDto extends Partial<UserDtoOptionals> {
  First_name: string;
  Last_name: string;
  Username: string;
  Role_Id: string;
  Active: boolean;
}
