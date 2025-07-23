"use client"

import { useQuery } from "@tanstack/react-query"
import { FC, ReactNode, useState } from "react"

import {
    Pagination,
    PaginationContent,
    PaginationItem,
    PaginationPrevious,
    PaginationNext,
    PaginationLink,
} from "@/components/ui/pagination"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { findManyClients, FindManyClientsResponse } from "@/services/api/clients"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../ui/card"
import { Button } from "../../ui/button"
import { getClientTypeIcon, getClientTypeName, renderClientType } from "../../../utils/render-client-type"
import { Badge } from "../../ui/badge"
import { LuArrowRight, LuGlobe } from "react-icons/lu"
import configHelper from "../../../helpers/config"

type Props = {
    children: ReactNode
    value: string
    onChange: (value: string) => void
    accessToken: string
}

const ClientSelectorDialog: FC<Props> = ({
    children,
    value: currentClientId,
    onChange: onChangeClientId,
    accessToken,
}) => {
    const [open, setOpen] = useState(false)
    const [page, setPage] = useState(1)

    const { data, isLoading, isError } = useQuery<FindManyClientsResponse>({
        queryKey: ["clients", page, accessToken, configHelper.clients.perPageInSelector],
        queryFn: () => findManyClients({ page, perPage: configHelper.clients.perPageInSelector }, accessToken),
        enabled: open && !!accessToken,
        staleTime: 1000 * 60 * 5,
    })

    const clients = data?.data || []
    const lastPage = data?.meta.lastPage || 1

    const renderPagination = () => {
        const pages = Array.from({ length: lastPage }, (_, i) => i + 1)

        return (
            <Pagination>
                <PaginationContent>
                    <PaginationItem>
                        <PaginationPrevious
                            onClick={() => setPage((p) => Math.max(p - 1, 1))}
                            className={page === 1 ? "pointer-events-none opacity-50" : ""}
                        />
                    </PaginationItem>

                    {pages.map((p) => (
                        <PaginationItem key={p}>
                            <PaginationLink isActive={p === page} onClick={() => setPage(p)}>
                                {p}
                            </PaginationLink>
                        </PaginationItem>
                    ))}

                    <PaginationItem>
                        <PaginationNext
                            onClick={() => setPage((p) => Math.min(p + 1, lastPage))}
                            className={page === lastPage ? "pointer-events-none opacity-50" : ""}
                        />
                    </PaginationItem>
                </PaginationContent>
            </Pagination>
        )
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>{children}</DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Selecione um Cliente</DialogTitle>
                </DialogHeader>

                {isLoading ? (
                    <div>Carregando...</div>
                ) : isError ? (
                    <div>Erro ao buscar clientes</div>
                ) : (
                    <div>
                        <div className="space-y-2 mt-4">
                            {clients.map((client) => (
                                <Card key={client.id}>
                                    <CardHeader>
                                        <CardTitle className="flex gap-2 items-center"><LuGlobe/> {client.name} <Badge variant="outline">{getClientTypeIcon(client.type)} {getClientTypeName(client.type)}</Badge></CardTitle>
                                        {client.description && <CardDescription>{client.description}</CardDescription>}
                                    </CardHeader>
                                    <CardContent>
                                        <div className="flex justify-end">
                                            <Button
                                                disabled={currentClientId === client.id}
                                                onClick={() => {
                                                    onChangeClientId(client.id)
                                                    setOpen(false)
                                                }}
                                                size="xs"
                                            >
                                                {currentClientId === client.id ? "Selecionado" : (
                                                    <>
                                                        Selecionar
                                                        <LuArrowRight/>
                                                    </>
                                                )}
                                                
                                            </Button>
                                        </div>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                        <div className="mt-6">{renderPagination()}</div>
                    </div>
                )}
            </DialogContent>
        </Dialog>
    )
}

export default ClientSelectorDialog
