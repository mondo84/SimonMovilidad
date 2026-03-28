export const GLOBAL_CONST = {
  HTTP: {
    METHOD: {
      GET: "GET",
      POST: "POST",
      PUT: "PUT",
      DELETE: "DELETE",
    },
    STATUS: {
      SUCCESS: 200,
      UNAUTHORIZED: 401,
      INTERNAL_SERVER_ERROR: 500,
    },
  },
  CONTENT_TYPE: {
    APPLICATION_JSON: "application/json",
  },
  MESSAGES: {
    NO_AUTH: "No autorizado",
    INTERNAL_ERROR: "Internal error",
    ERROR_AUTH: "Error en autenticación",
  },
  ROLES: {
    VIEWER: "Viewer",
    ADMIN: "Admin",
    USER: "User",
  },
};
