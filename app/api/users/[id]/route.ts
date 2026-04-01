import { env } from "@/lib/env";
import { GLOBAL_CONST } from "@/lib/global-const/global-const";
import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

const {
  CONTENT_TYPE: { APPLICATION_JSON },
  MESSAGES: { INTERNAL_ERROR, NO_AUTH },
  HTTP: {
    STATUS: { INTERNAL_SERVER_ERROR, UNAUTHORIZED },
  },
} = GLOBAL_CONST;
const URL_API = env.swaggerApi;
// const URL_API = env.swaggerApiDev;

export async function PUT(
  req: NextRequest,
  context: { params: Promise<{ id: string }> },
) {
  try {
    const token = await getToken({
      req,
      secret: process.env.NEXTAUTH_SECRET,
    });

    if (!token || !token.accessToken) {
      return NextResponse.json({ message: NO_AUTH }, { status: UNAUTHORIZED });
    }

    const body = await req.json();
    const { id } = await context.params;
    body.User_id = id;

    const response = await fetch(`${URL_API}/api/Users`, {
      method: req.method,
      headers: {
        "Content-Type": APPLICATION_JSON,
        Authorization: `Bearer ${token?.accessToken}`,
      },
      body: JSON.stringify(body),
    });

    const data = await response.json().catch(() => null);
    // console.log("RESPUESTA CATCH API REAL: ", data);

    if (!response.ok) {
      return NextResponse.json(data ?? { message: "Respuesta sin Body" }, {
        status: response.status,
      });
    }

    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json(
      { message: `${INTERNAL_ERROR}: ${error}` },
      { status: INTERNAL_SERVER_ERROR },
    );
  }
}

export const DELETE = async (
  req: Request,
  context: { params: Promise<{ id: string }> },
) => {
  try {
    const { id } = await context.params;

    const response = await fetch(`${URL_API}/${id}`, {
      method: req.method,
      headers: {
        "Content-Type": APPLICATION_JSON,
      },
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
