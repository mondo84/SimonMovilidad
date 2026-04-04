import { env } from "@/lib/env";
import { GLOBAL_CONST } from "@/lib/global-const/global-const";
import { NextRequest, NextResponse } from "next/server";
import { ValidateToken } from "@/hooks/validate-token";

const {
  CONTENT_TYPE: { APPLICATION_JSON },
  HTTP: {
    STATUS: { INTERNAL_SERVER_ERROR, UNAUTHORIZED },
  },
  MESSAGES: { INTERNAL_ERROR, NO_AUTH },
} = GLOBAL_CONST;
const URL_API = env.swaggerApi;
// const URL_API = env.swaggerApiDev;

export const GET = async (req: NextRequest) => {
  try {
    const accessToken = await ValidateToken(req);
    const date = req.nextUrl.searchParams.get("date");
    const showInactive = req.nextUrl.searchParams.get("showInactive");

    const res = await fetch(
      `${URL_API}/api/sensor?date=${date}&showInactive=${showInactive}`,
      {
        method: req.method,
        headers: {
          "Content-Type": APPLICATION_JSON,
          Authorization: `Bearer ${accessToken}`,
        },
      },
    );

    if (!res.ok) {
      switch (res.status) {
        case UNAUTHORIZED:
          return NextResponse.json(
            { message: NO_AUTH },
            { status: UNAUTHORIZED },
          );
        default:
          return NextResponse.json(
            { message: INTERNAL_ERROR },
            { status: res.status },
          );
      }
    }

    const data = await res.json();

    return NextResponse.json(data, { status: res.status });
  } catch (error) {
    return NextResponse.json(
      { message: `${INTERNAL_ERROR}: ${error}` },
      { status: INTERNAL_SERVER_ERROR },
    );
  }
};

export const POST = async (req: NextRequest) => {
  const accessToken = await ValidateToken(req);
  try {
    const body = await req.json();
    const response = await fetch(`${URL_API}/api/sensor/list/alerts`, {
      method: req.method,
      headers: {
        "Content-Type": APPLICATION_JSON,
        Authorization: `Bearer ${accessToken}`,
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
