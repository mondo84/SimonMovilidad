type MethodHttp = "POST" | "PUT" | "GET" | "DELETE";

const FetchUtil = async (
  url: string,
  method: MethodHttp,
  accessToken: string,
  body: any,
) => {
  const options: RequestInit = {
    method,
    headers: {
      "Content-Type": "application/json",
      ...(accessToken && { Authorization: `Bearer ${accessToken}` }),
    },
  };

  if ((method === "POST" || method === "PUT") && body) {
    options.body = JSON.stringify(body);
  }

  return await fetch(url, options);
};

export default FetchUtil;
