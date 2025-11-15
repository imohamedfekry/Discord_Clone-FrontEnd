import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { validateTokenOnServer } from "./components/lib/authApi";
import { isPublicPage, isAuthProtectedPage } from "./config/env";

export async function proxy(req: NextRequest) {
  const url = req.nextUrl.clone();
  const pathname = url.pathname;
  const token = req.cookies.get("Authorization")?.value;

  console.log("🔐 Middleware check:", { pathname, isPublic: isPublicPage(pathname), isAuthProtected: isAuthProtectedPage(pathname), hasToken: !!token });

  // 🔒 لو الصفحة محمية من المستخدمين المصادقين (زي login/register فقط)
  if (isAuthProtectedPage(pathname)) {
    // لو المستخدم عامل login (عنده token صحيح) → منععه من الدخول
    if (token) {
      const isValid = await validateTokenOnServer(token);
      if (isValid) {
        console.log("✅ Authenticated user trying to access auth-protected page, redirecting to channels");
        url.pathname = "/channels/@me";
        return NextResponse.redirect(url);
      }
    }
    
    // ✅ لو مفيش token أو token مش صحيح → اتركه يدخل الصفحة
    console.log("✅ Auth-protected page, allowing access for unauthenticated user");
    return NextResponse.next();
  }

  // ✅ لو الصفحة public بس مش محمية من المستخدمين المصادقين (زي /about, /privacy, /)
  if (isPublicPage(pathname) && !isAuthProtectedPage(pathname)) {
    // ✅ أي حد يقدر يدخلها حتى لو عامل login
    console.log("✅ Public page, allowing access for everyone");
    return NextResponse.next();
  }

  // 🔒 أي صفحة مش في PUBLIC_PAGES = Protected (تلقائياً)
  // نطلب authentication
  
  // لو مفيش token → redirect للوجن
  if (!token) {
    console.log("❌ Protected page without token, redirecting to login");
    url.pathname = "/login";
    return NextResponse.redirect(url);
  }

  // لو في token → تحقق من صحته
  const isValid = await validateTokenOnServer(token);
  if (!isValid) {
    console.log("❌ Invalid token, redirecting to login");
    url.pathname = "/login";
    return NextResponse.redirect(url);
  }

  // ✅ Token صحيح → اتركه يمر
  console.log("✅ Authenticated user, allowing access");
  return NextResponse.next();
}

export const config = {
  // ✅ نشمل كل الصفحات عشان نمنع المستخدمين المصادقين من الدخول للصفحات العامة
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public files (images, fonts, etc.)
     */
    "/((?!api|_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|woff|woff2|ttf|eot)).*)",
  ],
};