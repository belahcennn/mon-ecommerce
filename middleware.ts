import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";


export function middleware(request: NextRequest) {


  const userCookie =
    request.cookies.get("user");


  if (
    request.nextUrl.pathname.startsWith("/admin")
  ) {


    if (!userCookie) {

      return NextResponse.redirect(
        new URL("/login", request.url)
      );

    }



    const user =
      JSON.parse(userCookie.value);



    if (user.role !== "ADMIN") {

      return NextResponse.redirect(
        new URL("/", request.url)
      );

    }


  }


  return NextResponse.next();

}



export const config = {

  matcher: [
    "/admin/:path*"
  ],

};