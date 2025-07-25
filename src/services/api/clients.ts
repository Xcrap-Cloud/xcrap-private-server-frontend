import { CreateClientDto } from "../../dto/clients/create-client"
import { api } from "."

interface Owner {
    id: string
    name: string
    username: string
}

interface CreateClientResponse {
    id: string
    createdAt: string
    updatedAt: string
    name: string
    type: string
    description: string | null
    ownerId: string
    owner: Owner
}

export async function createClient(data: CreateClientDto, accessToken: string) {
    const response = await api.post<CreateClientResponse>("/clients", data, {
        headers: {
            Authorization: `Bearer ${accessToken}`,
        },
    })

    return response.data
}

export interface FindOneClientResponse {
    id: string
    createdAt: string
    updatedAt: string
    name: string
    type: string
    description: string
    ownerId: string
    owner: Owner
}

export async function findOneClient(id: string, accessToken: string) {
    const response = await api.get<FindOneClientResponse>(`/clients/${id}`, {
        headers: {
            Authorization: `Bearer ${accessToken}`,
        },
    })

    return response.data
}

export interface FindManyClientsResponse {
    data: FindManyClientItem[]
    meta: Meta
}

export interface FindManyClientItem {
    id: string
    createdAt: string
    updatedAt: string
    name: string
    type: string
    description: string | null
    ownerId: string
    owner: Owner
}

interface Meta {
    total: number
    lastPage: number
    currentPage: number
    perPage: number
    prev: number | null
    next: number | null
}

interface PaginateOptions {
    page?: number
    perPage?: number
}

export async function findManyClients({ page, perPage }: PaginateOptions = {}, accessToken: string) {
    const response = await api.get<FindManyClientsResponse>("/clients", {
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

interface UpdateClientResponse {
    id: string
    createdAt: string
    updatedAt: string
    name: string
    type: string
    description: string | null
    ownerId: string
    owner: Owner
}

export async function updateClient(id: string, data: CreateClientDto, accessToken: string) {
    const response = await api.put<UpdateClientResponse>(`/clients/${id}`, data, {
        headers: {
            Authorization: `Bearer ${accessToken}`,
        },
    })

    return response.data
}

export async function deleteClient(id: string, accessToken: string) {
    await api.delete(`/clients/${id}`, {
        headers: {
            Authorization: `Bearer ${accessToken}`,
        },
    })
}
