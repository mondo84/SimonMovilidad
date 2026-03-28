export const env = {
  swaggerApi: process.env.SWAGGER_API,
  swaggerApiDev: process.env.SWAGGER_API_DEV,
  backendJsonApi: process.env.JSON_PLACE_API,
  secret_auth: process.env.NEXTAUTH_SECRET,
  API: {
    USER_ROUTE: "/api/users",
    MENU_ROUTE: "/api/menu",
    AUTH_LOGIN: "/api/auth/login",
  },
};
