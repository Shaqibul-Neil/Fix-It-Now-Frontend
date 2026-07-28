import { NextRequest, NextResponse } from "next/server";
import { IProxySession } from "./proxy.session";
import { TProxyAction } from "./proxy.action";

export const buildResponse = (
  request: NextRequest,
  session: IProxySession,
  action: TProxyAction,
): NextResponse => {
  if (action?.type === "redirect") return NextResponse.redirect(action.url);
  if (action?.type === "rewrite") return NextResponse.rewrite(action.url);

  return NextResponse.next(session?.refreshedTokens ? { request } : undefined);
};
