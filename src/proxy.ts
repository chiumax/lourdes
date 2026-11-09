import { NextRequest, NextResponse } from "next/server";

export function proxy(request: NextRequest) {
  const saved = request.cookies.get("lm-language")?.value;
  const locale = saved === "en" ? "en" : "es";
  const target = request.nextUrl.clone();
  target.pathname = `/${locale}${target.pathname === "/" ? "" : target.pathname}`;
  return NextResponse.redirect(target);
}
// Only legacy entry points. Never intercept assets, localized pages or 404s.
export const config = { matcher: ["/", "/postmarked", "/bedroom-floor", "/blue-book"] };
