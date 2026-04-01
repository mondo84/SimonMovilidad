import CredentialsProvider from "next-auth/providers/credentials";
import authService from "@/modules/auth/services/auth.service";
import { UserNextAuth } from "./responses/api-response.type";
import { type NextAuthOptions } from "next-auth";
import { env } from "./env";

export const nextAuthOptions: NextAuthOptions = {
  secret: env.secret_auth,
  providers: [
    CredentialsProvider({
      id: "userCredentials",
      name: "credentials",
      credentials: {
        username: { label: "Usuario", type: "username" },
        password: { label: "Password", type: "password" },
      },

      async authorize(credentials) {
        if (!credentials || !credentials?.username || !credentials?.password) {
          throw new Error("Missing credentials");
        }

        // =========== Service ===============
        const res = await authService.login({
          username: credentials.username,
          password: credentials.password,
        });

        if (!res.success && !res.data) {
          return null;
        }

        const { data } = res;

        return {
          id: data?.userId,
          username: data?.userName,
          role: data?.role,
          accessToken: res?.token,
        } as UserNextAuth;
      },
    }),
  ],
  pages: {
    signIn: "/login",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.accessToken = user.accessToken;
        token.user = {
          id: user.id,
          username: user.username,
          role: user.role,
        };
      }
      return token;
    },

    async session({ session, token }) {
      if (session.user) {
        session.user = token.user;
        session.accessToken = token.accessToken;
      }
      return session;
    },
  },
  session: {
    strategy: "jwt",
  },
};
