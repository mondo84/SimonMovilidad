import { env } from "@/lib/env";
import { GLOBAL_CONST } from "@/lib/global-const/global-const";
import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

const {
  CONTENT_TYPE: { APPLICATION_JSON },
  HTTP: {
    STATUS: { INTERNAL_SERVER_ERROR },
  },
  MESSAGES: { INTERNAL_ERROR },
} = GLOBAL_CONST;
const URL_API = env.swaggerApi;

export const PUT = async (req: NextRequest) => {
  try {
    const token = await getToken({
      req,
      secret: process.env.NEXTAUTH_SECRET,
    });

    const body = await req.json();
    const response = await fetch(`${URL_API}/api/sensor/update/alert`, {
      method: req.method,
      headers: {
        "Content-Type": APPLICATION_JSON,
        Authorization: `Bearer ${token?.accessToken}`,
      },
      body: JSON.stringify(body),
    });

    const data = await response.json();

    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json(
      { message: `${INTERNAL_ERROR}: ${error}` },
      { status: INTERNAL_SERVER_ERROR },
    );
  }
};
