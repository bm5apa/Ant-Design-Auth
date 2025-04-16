import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  const url = request?.url || "";
  const urlObj = new URL(url);
  const rewrite = (path: string) => {
    const response = NextResponse.rewrite(new URL(path + urlObj.search, url));
    response.headers.delete("X-Envoy-Upstream-Service-Time");
    response.headers.delete("X-Url");
    return response;
  };

  let pathname = urlObj.pathname;

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

  const [pathSegment1, pathSegment2, pathSegment3, pathSegment4] =
    normalizedPathname.split("/");

  if (!pathSegment1) {
    return rewrite("/homepage");
  }

  if (pathSegment1) {
    return rewrite(`/${pathSegment1}`);
  }

  // if (
  //   process.env.NODE_ENV === "development" &&
  //   request.nextUrl.pathname === "/robots.txt"
  // ) {
  //   const robots = `
  //     User-agent: *
  //     Disallow: /
  //   `;
  //   return new NextResponse(robots, {
  //     headers: { "Content-Type": "text/plain" },
  //   });
  // }

  // if (["sitemap.xml"].includes(pathSegment1)) {
  //   // Redirect to the sitemap API route
  //   return NextResponse.rewrite(new URL("/api/sitemap", request.url));
  // }

  // if (["horse-racing-sitemap.xml", "robots.txt"].includes(pathSegment1)) {
  //   return NextResponse.rewrite(new URL(`/sitemap/${pathSegment1}`, url));
  // }

  return rewrite(`/`);
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico|ts/assets).*)"],
};
