import { getToken } from "next-auth/jwt";
import { GLOBAL_CONST } from "./lib/global-const/global-const";
import { NextResponse, type NextRequest } from "next/server"; // Es el tipado de la request.
import {
  NextResponseRedirect,
  NextReqMapList,
} from "./hooks/use-next-response";

const {
  ROLES: { ADMIN },
} = GLOBAL_CONST;

// Simulación de rutas por rol (mover a backend/cache real)
const roleRoutes: Record<string, string[]> = {
  Admin: ["/home", "/user", "/configuracion"],
  User: ["/home", "/ganancia"],
  Viewer: ["/home"],
};

export async function proxy(req: NextRequest) {
  // decodifica el JWT. Null si no está logueado
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
  // console.log("token: ", token);
  const { pathname } = req.nextUrl; // Obtiene la ruta actual
  const isAuth = !!token; // Convierte a boolean si viene o no.
  const role = token?.user?.role ?? ""; // Obtengo el Rol de usuario.
  const pubRoutes = ["/login", "/register", "/unauthorized"];
  const authRoutes = ["/login", "/register"];
  const isAuthRoute = NextReqMapList(authRoutes, pathname);
  const isPubRoute = NextReqMapList(pubRoutes, pathname);

  if (!isAuth && !isPubRoute) {
    return NextResponseRedirect("/login", req);
  }

  if (!role && !isAuthRoute) {
    return NextResponseRedirect("/login", req);
  }

  if (isAuth && isAuthRoute) {
    return NextResponseRedirect("/home", req);
  }

  if (isAuth && pathname === "/unauthorized") {
    return NextResponse.next();
  }

  if (role === ADMIN) {
    return NextResponse.next();
  }

  // ============== Validacion de rutas por Rol ========
  if (token && token?.user && role) {
    const listRoutesByRol = roleRoutes[role] ?? [];
    const isAllowed = NextReqMapList(listRoutesByRol, pathname);
    if (!isAllowed) {
      return NextResponseRedirect("/unauthorized", req);
    }
  }
  // ===================================================
  return NextResponse.next();
}

// Rutas protegidas. Guardian de rutas.
// Proteje todas las rutas. Excepcion de /api, _next, favicon.co
export const config = {
  // matcher: ["/home/:path*", "/user/:path*"],
  matcher: ["/((?!api|_next|favicon.ico).*)"],
};
