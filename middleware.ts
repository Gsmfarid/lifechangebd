// Ref: https://next-auth.js.org/configuration/nextjs#advanced-usage
import { NextRequestWithAuth, withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";
import { UserRole } from "./lib";

export default withAuth(
  // `withAuth` augments your `Request` with the user's token.
  function middleware(request: NextRequestWithAuth) {
    // console.log(request.nextUrl.pathname);
    // console.log(request.nextauth.token)

    if (
      request.nextUrl.pathname.includes("/user") &&
      request.nextauth.token?.role === UserRole.inactive
    ) {
      return NextResponse.redirect(`${process.env.BASE_URL}/inactive`);
    } else if (
      request.nextUrl.pathname.includes("/inactive") &&
      request.nextauth.token?.role === UserRole.active
    ) {
      return NextResponse.redirect(`${process.env.BASE_URL}/user/active`);
    }
  },
  {
    callbacks: {
      authorized: ({ token }) => {
        return !!token;
      },
    },
  }
);

// Applies next-auth only to matching routes - can be regex
// Ref: https://nextjs.org/docs/app/building-your-application/routing/middleware#matcher
export const config = {
  matcher: [
    "/inactive",
    "/user/active",
    "/user/active/profile",
    "/user/change-password",
    "/user/active/withdrawal",
    "/user/messages",
    "/user/notification",
    "/user/notification/memo",
    "/user/passbook",
    "/user/payment-method",
    "/user/redeem-list",
    "/user/ref-list",
    "/user/ref-list/my-ref",
    "/user/ref-list/send-wish",
    "/user/transfer-points",
    "/user/photo-zone",
  ],
};
