import { NextRequest, NextResponse } from "next/server";

// The site is one Spanish page; the bare domain sends visitors to it and keeps the query string.
export function proxy(request: NextRequest) {
  const target = request.nextUrl.clone();
  target.pathname = "/es";
  return NextResponse.redirect(target, 308);
}

export const config = { matcher: ["/"] };
