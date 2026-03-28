import { NextResponse, type NextRequest } from "next/server";

export const NextResponseRedirect = (urlPath: string, req: NextRequest) => {
  return NextResponse.redirect(new URL(urlPath, req.url));
};

export const NextReqMapList = (
  stringList: string[],
  pathname: string,
): boolean => {
  return stringList?.some((route) => {
    return pathname.startsWith(route);
  });
};
