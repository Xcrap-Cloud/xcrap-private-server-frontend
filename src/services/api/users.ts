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

type FindManyUsersOptions = {
    page?: number
    perPage?: number
}

type FindManyUsersResponse = {}

export async function findManyUsers({ page, perPage }: FindManyUsersOptions = {}, accessToken: string) {
    const response = await api.get<FindManyUsersResponse>("/scrapers", {
        headers: {
            Authorization: `Bearer ${accessToken}`,
        },
        params: {
            page,
            perPage,
        },
    })

    return response.data
}
