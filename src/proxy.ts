import { NextRequest, NextResponse } from "next/server";

// Everything that used to exist now lives on the one Spanish page: the bare root, the
// English reference pages and the earlier design studies. Query strings are kept.
export function proxy(request: NextRequest) {
  const target = request.nextUrl.clone();
  target.pathname = "/es";
  return NextResponse.redirect(target, 308);
}

// Next.js needs these as literal strings.
export const config = {
  matcher: [
    "/", "/en", "/en/:path*",
    "/:old(tinta|amplificador|recortes|postmarked|bedroom-floor|blue-book|tinta-editorial|tinta-estudio)",
    "/es/:old(tinta|amplificador|recortes|postmarked|bedroom-floor|blue-book|tinta-editorial|tinta-estudio)",
  ],
};
