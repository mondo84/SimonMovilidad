import * as z from "zod";

export const userSchema = z
  .object({
    User_id: z.number().optional(),
    First_name: z
      .string()
      .trim()
      .nonempty({ error: "El nombre es requerido" })
      .min(3, { error: "El nombre debe tener al menos 3 digitos" }),
    Last_name: z
      .string()
      .trim()
      .nonempty({ error: "El apellido es requerido" })
      .min(3, { error: "El apellido debe tener al menos 3 digitos" }),
    Username: z
      .string()
      .trim()
      .nonempty({ error: "El usuario es requerido" })
      .min(3, { error: "El usuario debe tener al menos 3 digitos" }),
    Password: z.string().optional(),
    NewPassword: z.string().optional(),
    ConfirmPassword: z.string().optional(),
    Active: z.boolean(),
    ChangePass: z.boolean().optional(),
    Role_Id: z.string(),
  })
  .refine(
    (input) =>
      !input.NewPassword || input.NewPassword === input.ConfirmPassword,
    {
      message: "Las contraseñas no coinciden",
      path: ["ConfirmPassword"],
    },
  );

export type UpdateUserDto = z.infer<typeof userSchema>;

export const emptyUser: UpdateUserDto = {
  User_id: undefined,
  First_name: "",
  Last_name: "",
  Username: "",
  Password: "",
  NewPassword: "",
  ConfirmPassword: "",
  Active: false,
  ChangePass: false,
  Role_Id: "",
};

export const formConfig = {
  mode: "onChange" as const,
  criteriaMode: "all" as const,
};
