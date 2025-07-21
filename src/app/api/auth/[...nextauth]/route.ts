import CredentialsProvider from "next-auth/providers/credentials"
import NextAuth, { NextAuthOptions } from "next-auth"
import * as jwt from "jsonwebtoken"

import { signIn as apiSignIn } from "@/services/api/auth"
import configHelper from "@/helpers/config"

export const authOptions: NextAuthOptions = {
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                username: { label: "Username", type: "text" },
                password: { label: "Password", type: "password" },
            },
            async authorize(credentials, req) {
                if (!credentials) {
                    return null
                }

                try {
                    const response = await apiSignIn(credentials.username, credentials.password)
                    const data = jwt.decode(response.accessToken) as Record<string, any>
                    const sub = data?.sub
                    const id = typeof sub === "function" ? sub() : sub

                    if (!id) {
                        return null
                    }

                    console.log(data)

                    if (response) {
                        return {
                            id: id,
                            accessToken: response.accessToken,
                            refreshToken: response.refreshToken,
                            name: data.name,
                            email: data.email,
                            role: data.role,
                        }
                    }
                } catch (error) {
                    console.error("Erro na autenticação da API:", error)
                }

                return null
            },
        }),
    ],
    session: {
        strategy: "jwt",
    },
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token.accessToken = (user as any).accessToken
                token.refreshToken = (user as any).refreshToken
                token.tokenExpiresIn = (user as any).tokenExpiresIn
                token.exp = Date.now() + (user as any).tokenExpiresIn * 1000
            }

            const now = Date.now()
            const expiresAt = (token.exp as number | undefined) ?? 0

            if (now > expiresAt) {
                try {
                    const response = await fetch(`${configHelper.apiUrl}/auth/refresh-token`, {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({ refreshToken: token.refreshToken }),
                    })

                    const refreshedTokens: { accessToken: string; tokenExpiresIn: number } = await response.json()

                    if (response.ok) {
                        token.accessToken = refreshedTokens.accessToken
                        token.exp = Date.now() + refreshedTokens.tokenExpiresIn * 1000
                        return token
                    }
                } catch (error) {
                    console.error("Erro ao renovar o token", error)
                    return { ...token, error: "RefreshAccessTokenError" }
                }
            }

            return token
        },
        async session({ session, token, user }) {
            session.accessToken = token.accessToken
            session.error = token.error
            return session
        },
    },
}

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }
