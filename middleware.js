import { withAuth } from "next-auth/middleware"
import { NextResponse } from 'next/server'

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
    function middleware(req) {
        const jwt = req.nextauth.token
        console.log(req.url)
        // `/admin` requires admin role
        
        if (req.nextUrl.pathname === "/admin" && jwt.userRole != "admin") {
            return new NextResponse(
                JSON.stringify({ success: false, message: 'Permission dened' ,token: jwt}),
                { status: 401, headers: { 'content-type': 'application/json' } }
              )
            // return (
            //     <h1>Permission dened</h1>
            // )
        }
        return NextResponse.next()
        
    },
    {
        callbacks:{
            authorized({ token }){
                return !!token
            },
        },
    }
)
export const config = { matcher: ["/admin","/","/apis/:path*"] }