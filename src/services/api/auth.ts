import { api } from "."

interface SignInResponse {
    accessToken: string
    refreshToken: string
}

export async function signIn(email: string, password: string) {
    const response = await api.post<SignInResponse>("/auth/sign-in", { email, password })
    return response.data
}
