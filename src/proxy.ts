import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { validateTokenOnServer } from "./components/lib/authApi";

const PUBLIC_PAGES = [
  "/login",
  "/register",
  "/about",
  "/privacy",
  "/",
  "/components",
];

export async function proxy(req: NextRequest) {
  const url = req.nextUrl.clone();
  const pathname = url.pathname;

  // استثناء الملفات الثابتة
  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api") ||
    pathname.startsWith("/fonts") ||
    pathname.startsWith("/images") ||
    pathname.startsWith("/favicon") ||
    pathname.startsWith("/.well-known")
  ) {
    return NextResponse.next();
  }

  const token = req.cookies.get("Authorization")?.value;
  console.log("🔐 Token check:", { pathname, hasToken: !!token });

  // الصفحات العامة
  if (PUBLIC_PAGES.includes(pathname)) {
    // مسجل دخول ويحاول دخول login/register => redirect
    if ((pathname === "/login" || pathname === "/register") && token) {
      url.pathname = "/channels/@me";
      return NextResponse.redirect(url);
    }
    return NextResponse.next();
  }

  // صفحات محمية - محتاجة token
  if (!token) {
    url.pathname = "/login";
    return NextResponse.redirect(url);
  }

  // تحقق من صحة التوكن
  const isValid = await validateTokenOnServer(token);

  if (!isValid) {
    url.pathname = "/login";
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next|favicon.ico).*)"],
};
