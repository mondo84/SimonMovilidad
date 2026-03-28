import { DefaultSession, DefaultUser } from "next-auth";

// Extendiendo de  DefaultSession y DefaultUser
// interfaces para incluir las nuevas propiedades
// en el tipado que espera next-auth
declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      username: string;
      role: string;
    };
    accessToken?: string;
  }

  interface User {
    id: string;
    username: string;
    role: string;
    accessToken: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    accessToken: string;
    user: {
      id: string;
      username: string;
      role: string;
    };
  }
}
