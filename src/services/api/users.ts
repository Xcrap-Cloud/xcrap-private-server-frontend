import { api } from "."

export interface FindOneUserResponse {
    apiKey: string
    id: string
    role: string
    name: string
    createdAt: string
    updatedAt: string
    email: string
    username: string
}

export async function findOneUser(id: string, accessToken: string) {
    const response = await api.get<FindOneUserResponse>(`/users/${id}`, {
        headers: {
            Authorization: `Bearer ${accessToken}`,
        },
    })

    return response.data
}
