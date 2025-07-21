import NextAuth, { DefaultSession } from "next-auth"
import { DefaultJWT } from "next-auth/jwt"

// Adicione as propriedades personalizadas ao objeto Session
declare module "next-auth" {
    interface Session {
        accessToken?: string
        refreshToken?: string
        error?: string
        user: {
            id?: string | null
            name?: string | null
            email?: string | null
        } & DefaultSession["user"]
    }
}

// Adicione as propriedades personalizadas ao objeto JWT
declare module "next-auth/jwt" {
    interface JWT extends DefaultJWT {
        accessToken?: string
        refreshToken?: string
        tokenExpiresIn?: number
        error?: "RefreshAccessTokenError"
    }
}
