type ErrorResponse = {
  message: string;
  errors?: Record<string, string[]>;
};

export const getError = (error: unknown): ErrorResponse => {
  // Error nativo.
  if (error instanceof Error) {
    return { message: error.message };
  }

  // Error es objeto..
  if (typeof error === "object" && error !== null) {
    const obj = error as Record<string, unknown>;

    if ("error" in obj && typeof obj.error === "object" && obj.error !== null) {
      const nested = obj.error as Record<string, unknown>;

      const message =
        (typeof nested.title === "string" && nested.title) ||
        (typeof nested.message === "string" && nested.message) ||
        "Unknown error";

      const errors =
        "errors" in nested &&
        typeof nested.errors === "object" &&
        nested.errors !== null
          ? normalizeErrors(nested.errors)
          : undefined;

      return { message, errors };
    }

    if ("message" in obj && typeof obj.message === "string") {
      return { message: obj.message };
    }
  }

  return { message: "Unknown error" };
};

// Normaliza cualquier objeto a Record<string, string[]>
const normalizeErrors = (errors: unknown): Record<string, string[]> => {
  const result: Record<string, string[]> = {};

  if (typeof errors === "object" && errors !== null) {
    for (const key in errors) {
      const val = (errors as Record<string, unknown>)[key];

      if (Array.isArray(val)) {
        // Aseguramos que todos los elementos sean string
        result[key] = val.map((v) => String(v));
      } else if (val != null) {
        result[key] = [String(val)];
      } else {
        result[key] = [];
      }
    }
  }

  return result;
};
