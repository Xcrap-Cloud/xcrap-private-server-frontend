import { withAuth } from "next-auth/middleware"

export default withAuth(function middleware(req) {}, {
    callbacks: {
        authorized: ({ token }) => !!token,
    },
    pages: {
        signIn: "/auth/sign-in",
    },
})

export const config = {
    matcher: ["/", "/scrapers/:path*", "/clients/:path*", "/admin/:path*"],
}
