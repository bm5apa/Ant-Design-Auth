import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  const url = request?.url || "";
  const urlObj = new URL(url);
  const pathname = urlObj.pathname;

  if (pathname === "/login" || pathname.startsWith("/api/")) {
    return NextResponse.next();
  }

  const token = request.cookies.get("token")?.value;

  if (!token && !["/", "/homepage"].includes(pathname)) {
    const loginUrl = new URL("/login", urlObj.origin);
    loginUrl.searchParams.set("redirect", "login-first");
    return NextResponse.redirect(loginUrl);
  }

  const rewrite = (path: string) => {
    const response = NextResponse.rewrite(new URL(path + urlObj.search, url));
    response.headers.delete("X-Envoy-Upstream-Service-Time");
    response.headers.delete("X-Url");
    return response;
  };

  if (pathname !== "/" && pathname.endsWith("/")) {
    const newPathname = pathname.replace(/\/+$/, "");
    const redirectUrl = new URL(newPathname + urlObj.search, urlObj.origin);
    return NextResponse.redirect(redirectUrl, 301);
  }

  const segments = pathname
    .split("/")
    .filter(Boolean)
    .map((segment) => decodeURIComponent(segment));

  if (
    segments.length > 2 &&
    segments[1] === "article" &&
    !isNaN(Number(segments[2]))
  ) {
    const [slug, , articleId, titleSlug, ...extraSegments] = segments;
    if (extraSegments.length > 0) {
      const canonicalPath = `/${slug}/article/${articleId}/${titleSlug}`;
      const redirectUrl = new URL(canonicalPath + urlObj.search, urlObj.origin);
      return NextResponse.redirect(redirectUrl, 301);
    }
  }

  const normalizedPathname = pathname.startsWith("/")
    ? pathname.replace("/", "")
    : pathname;

  const [pathSegment1] = normalizedPathname.split("/");

  if (!pathSegment1) {
    return rewrite("/homepage");
  }

  if (pathSegment1) {
    return rewrite(`/${pathSegment1}`);
  }

  return rewrite(`/`);
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico|ts/assets).*)"],
};
