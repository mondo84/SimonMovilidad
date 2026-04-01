import { env } from "@/lib/env";
import { GLOBAL_CONST } from "@/lib/global-const/global-const";
import { NextRequest, NextResponse } from "next/server";
import { ValidateToken } from "@/hooks/validate-token";

const {
  CONTENT_TYPE: { APPLICATION_JSON },
  HTTP: {
    STATUS: { INTERNAL_SERVER_ERROR },
  },
  MESSAGES: { INTERNAL_ERROR },
} = GLOBAL_CONST;
const URL_API = env.swaggerApi;
// const URL_API = env.swaggerApiDev;

export const GET = async (req: NextRequest) => {
  try {
    const accessToken = await ValidateToken(req);
    const showInactive = req.nextUrl.searchParams.get("showInactive");

    const resp = await fetch(
      `${URL_API}/api/MenuList?showInactive=${showInactive}`,
      {
        method: req.method,
        headers: {
          "Content-Type": APPLICATION_JSON,
          Authorization: `Bearer ${accessToken}`,
        },
      },
    );

    const data = await resp.json();

    return NextResponse.json(data, { status: resp.status });
  } catch (error) {
    return NextResponse.json(
      { message: `${INTERNAL_ERROR}: ${error}` },
      { status: INTERNAL_SERVER_ERROR },
    );
  }
};

// export const POST = async (req: Request) => {
//   return [];
// };
