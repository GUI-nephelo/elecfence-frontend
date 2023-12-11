import { getToken } from "next-auth/jwt"
import { withAuth } from "next-auth/middleware"
import { NextResponse } from 'next/server'
import { protectedPath } from "./lib/config"


// More on how NextAuth.js middleware works: https://next-auth.js.org/configuration/nextjs#middleware
// export default withAuth({
//   callbacks: {
//     authorized({ req, token }) {
//       // `/admin` requires admin role
//       if (req.nextUrl.pathname === "/admin") {
//         return token?.userRole === "admin"
//       }
//       // `/me` only requires the user to be logged in
//       return !!token
//     },
//   },
// })
// export { default } from "next-auth/middleware"
export default withAuth(
    async function middleware(req) {
        const jwt = await getToken({ req })
        // console.log(req.url)
        // console.log(req)
        // console.log(req.nextUrl.pathname)
        const isAuthPage = req.nextUrl.pathname.startsWith("/sign-in")
        if (req.nextUrl.pathname === "/jwt")
            return NextResponse.json(req.nextauth)

        // if (req.nextUrl.pathname === "/api/notification") {
        //     const rewrite = NextResponse.rewrite("http://127.0.0.1:8000/realTimeData/sse", {
        //         headers: {
        //             asd: 1,
        //             connection: "keep-alive"
        //         }
        //     })
        //     console.log(rewrite)
        //     return rewrite
        // }
        if (!!jwt) {
            if (req.nextUrl.pathname === "/sign-in" || req.nextUrl.pathname === "/")
                return NextResponse.redirect(new URL("/dashboard", req.url))
        }
        if (!jwt) {
            if (isAuthPage) return null
            return NextResponse.redirect(new URL("/sign-in?callbacks=" + encodeURI(req.nextUrl.pathname), req.url))
        }


        // `/admin` requires admin role
        if (protectedPath.includes(req.nextUrl.pathname) && jwt.userRole != "A") {
            return new NextResponse(
                JSON.stringify({ success: false, message: 'Permission dened', token: jwt }),
                { status: 401, headers: { 'content-type': 'application/json' } }
            )
            // return (
            //     <h1>Permission dened</h1>
            // )
        }

        return NextResponse.next()
    },
    {
        callbacks: {
            authorized({ token }) {
                return true
            },
        },
    }
)
export const config = {
    matcher: ["/dashboard/:path*", "/", "/apis/:path*", "/sign-in(.*)", "/jwt", "/api/export", "/api/notification"]
}