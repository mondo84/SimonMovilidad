import * as z from "zod";

export const loginSchema = z.object({
  username: z.string().trim().nonempty({ error: "El usuario es requerido." }),
  password: z
    .string()
    .trim()
    .nonempty({ error: "La contraseña es requerida." })
    .min(4, { error: "La contraseña debe tener al menos 4 digitos." }),
});

export type LoginFormValues = z.infer<typeof loginSchema>;
