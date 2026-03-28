import { GLOBAL_CONST } from "@/lib/global-const/global-const";
import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

const {
  HTTP: {
    STATUS: { UNAUTHORIZED },
  },
  MESSAGES: { NO_AUTH },
} = GLOBAL_CONST;

export const ValidateToken = async (req: NextRequest) => {
  const token = await getToken({
    req,
    secret: process.env.NEXTAUTH_SECRET,
  });

  if (!token || !token.accessToken) {
    return NextResponse.json({ message: NO_AUTH }, { status: UNAUTHORIZED });
  }

  return token.accessToken;
};
