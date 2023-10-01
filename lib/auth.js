
import CredentialsProvider from "next-auth/providers/credentials"
import { compare } from 'bcryptjs';
import { auth } from "./db";

export const authOptions = {
    //Configure JWT
    session: {
        maxAge: 24 * 60 * 60, // 有效时间
    },
    //Specify Provider
    providers: [
        CredentialsProvider({
            name: 'Credentials',
            credentials: {
                username: { label: "Username", type: "text", placeholder: "jsmith" },
                password: { label: "Password", type: "password" }
            },
            async authorize({ username, password }) {

                // console.log([username,password])


                // 检测是否为管理员登陆
                if (username == "admin" && password == process.env.ADMIN_PASS) {
                    return { name: "admin", success: true }
                }
                // if(username=="user" && password=="12"){
                if (await auth(username, password)) {
                    return { name: username, success: true }
                }
                return { name: username, success: false }
            },
        }),
    ],
    pages: {
        signIn: '/sign-in',
        // signOut: '/auth/signout',
        // error: '/api/auth/error', // Error code passed in query string as ?error=
        // verifyRequest: '/auth/verify-request', // (used for check email message)
        // newUser: '/auth/new-user' // New users will be directed here on first sign in (leave the property out if not of interest)
    },
    callbacks: {

        async signIn({ user, account, profile, email, credentials }) {
            // console.log({ user, account, profile, email, credentials })
            return user.success

        },

        async jwt({ token, account, profile }) {
            // 检查是否是管理员权限
            // TODO: check the user permssion

            token.userRole = token.name == "admin" ? "admin" : "user"
            // console.log(token, account, profile)
            return token
        },
        async session({ session, token, user }) {
            // console.log(session,token)
            token.userRole = token.name == "admin" ? "admin" : "user"
            return session
        }
    }
}