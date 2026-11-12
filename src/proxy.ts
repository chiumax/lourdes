import { NextRequest, NextResponse } from "next/server";

const retired: Record<string, string> = {
  postmarked: "tinta", "bedroom-floor": "amplificador", "blue-book": "recortes",
  "tinta-editorial": "tinta", "tinta-estudio": "tinta",
};

export function proxy(request: NextRequest) {
  const target = request.nextUrl.clone();
  const parts = target.pathname.split("/").filter(Boolean);
  const localized = parts[0] === "es" || parts[0] === "en";
  const last = parts[localized ? 1 : 0];
  const replacement = retired[last];
  // Public entry points are Spanish. Explicit English URLs remain for copy review.
  target.pathname = replacement
    ? `/${localized ? parts[0] : "es"}/${replacement}`
    : `/es${target.pathname === "/" ? "" : target.pathname}`;
  const permanent = replacement || request.nextUrl.pathname === "/" || request.nextUrl.pathname === "/tinta";
  return NextResponse.redirect(target, permanent ? 308 : 307);
}

export const config = {
  matcher: ["/", "/tinta", "/tinta-editorial", "/tinta-estudio", "/amplificador", "/recortes", "/postmarked", "/bedroom-floor", "/blue-book", "/:lang(es|en)/:old(postmarked|bedroom-floor|blue-book|tinta-editorial|tinta-estudio)"],
};
