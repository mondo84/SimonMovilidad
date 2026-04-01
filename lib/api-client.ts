export async function apiClient<T>(
  url: string,
  options?: Omit<RequestInit, "body"> & { body?: any },
): Promise<T> {
  const isFormData = options?.body instanceof FormData;

  const res = await fetch(url, {
    credentials: "include",
    headers: {
      ...(isFormData ? {} : { "Content-Type": "application/json" }),
      ...options?.headers,
    },
    ...options,
    body:
      options?.body && !isFormData
        ? JSON.stringify(options.body)
        : options?.body,
  });

  if (!res.ok) {
    const error = await res.json().catch(() => null);
    // console.log("RESPUESTA API CLIENTE ERROR: ", error);
    // throw new Error(error?.message || "API Error");
    throw {
      status: res?.status,
      error: error,
      // message: error?.title ?? res?.statusText,
    };
  }

  return res.json();
}
