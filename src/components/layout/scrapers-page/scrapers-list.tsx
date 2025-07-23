"use client"

import { useRouter, useSearchParams } from "next/navigation"
import { FC, useState, useTransition } from "react"
import { FaSpider } from "react-icons/fa"
import NextLink from "next/link"

import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination"
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { findManyScrapers, type FindManyScrapersResponse } from "@/services/api/scrapers"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import formatDateTime from "@/utils/format-date-time"

type Props = {
    initialData: FindManyScrapersResponse
    accessToken: string
}

const ScrapersListSection: FC<Props> = ({ initialData, accessToken }) => {
    const router = useRouter()
    const searchParams = useSearchParams()
    const [isPending, startTransition] = useTransition()
    const [data, setData] = useState(initialData)

    const currentPage = data.meta.currentPage
    const lastPage = data.meta.lastPage
    const hasNextPage = currentPage < lastPage
    const hasPreviousPage = currentPage > 1

    const handlePageChange = async (page: number) => {
        if (page === currentPage || page < 1 || page > lastPage) return

        startTransition(async () => {
            try {
                const params = new URLSearchParams(searchParams.toString())

                params.set("page", page.toString())
                router.push(`?${params.toString()}`)

                const newData = await findManyScrapers({ page }, accessToken)

                setData(newData)
            } catch (error) {
                console.error("Erro ao carregar página:", error)
            }
        })
    }

    const renderPaginationItems = () => {
        const items = []
        const maxVisiblePages = data.meta.perPage

        if (lastPage <= maxVisiblePages) {
            for (let i = 1; i <= lastPage; i++) {
                items.push(
                    <PaginationItem key={i}>
                        <PaginationLink
                            href="#"
                            isActive={i === currentPage}
                            onClick={(e) => {
                                e.preventDefault()
                                handlePageChange(i)
                            }}
                        >
                            {i}
                        </PaginationLink>
                    </PaginationItem>,
                )
            }
        } else {
            const startPage = Math.max(1, currentPage - 2)
            const endPage = Math.min(lastPage, currentPage + 2)

            if (startPage > 1) {
                items.push(
                    <PaginationItem key={1}>
                        <PaginationLink
                            href="#"
                            onClick={(e) => {
                                e.preventDefault()
                                handlePageChange(1)
                            }}
                        >
                            1
                        </PaginationLink>
                    </PaginationItem>,
                )

                if (startPage > 2) {
                    items.push(
                        <PaginationItem key="ellipsis-start">
                            <PaginationEllipsis />
                        </PaginationItem>,
                    )
                }
            }

            for (let i = startPage; i <= endPage; i++) {
                items.push(
                    <PaginationItem key={i}>
                        <PaginationLink
                            href="#"
                            isActive={i === currentPage}
                            onClick={(e) => {
                                e.preventDefault()
                                handlePageChange(i)
                            }}
                        >
                            {i}
                        </PaginationLink>
                    </PaginationItem>,
                )
            }

            if (endPage < lastPage) {
                if (endPage < lastPage - 1) {
                    items.push(
                        <PaginationItem key="ellipsis-end">
                            <PaginationEllipsis />
                        </PaginationItem>,
                    )
                }

                items.push(
                    <PaginationItem key={lastPage}>
                        <PaginationLink
                            href="#"
                            onClick={(e) => {
                                e.preventDefault()
                                handlePageChange(lastPage)
                            }}
                        >
                            {lastPage}
                        </PaginationLink>
                    </PaginationItem>,
                )
            }
        }

        return items
    }

    return (
        <section className="pb-4">
            <Card>
                <CardHeader>
                    <CardTitle className="flex gap-1 items-center">
                        <FaSpider /> Lista de Scrapers
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <div className={isPending ? "opacity-50 pointer-events-none" : ""}>
                        <Table>
                            <TableCaption>
                                {lastPage > 1
                                    ? `Exibindo ${data.data.length} itens de ${data.meta.total}.`
                                    : "Exibindo todos os itens."}
                            </TableCaption>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Nome</TableHead>
                                    <TableHead>Criado em</TableHead>
                                    <TableHead>Atualizado em</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {data.data.map((scraper) => (
                                    <TableRow key={scraper.id}>
                                        <TableCell className="font-medium">
                                            <NextLink href={`/scrapers/${scraper.id}`}>{scraper.name}</NextLink>
                                        </TableCell>
                                        <TableCell>
                                            <NextLink href={`/scrapers/${scraper.id}`}>
                                                {formatDateTime(scraper.createdAt)}
                                            </NextLink>
                                        </TableCell>
                                        <TableCell>
                                            <NextLink href={`/scrapers/${scraper.id}`}>
                                                {formatDateTime(scraper.updatedAt)}
                                            </NextLink>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </div>
                    <div className="mt-4">
                        <Pagination>
                            <PaginationContent>
                                <PaginationItem>
                                    <PaginationPrevious
                                        href="#"
                                        onClick={(e) => {
                                            e.preventDefault()
                                            if (hasPreviousPage) {
                                                handlePageChange(currentPage - 1)
                                            }
                                        }}
                                        className={!hasPreviousPage ? "pointer-events-none opacity-50" : ""}
                                    />
                                </PaginationItem>
                                {renderPaginationItems()}
                                <PaginationItem>
                                    <PaginationNext
                                        href="#"
                                        onClick={(e) => {
                                            e.preventDefault()
                                            if (hasNextPage) {
                                                handlePageChange(currentPage + 1)
                                            }
                                        }}
                                        className={!hasNextPage ? "pointer-events-none opacity-50" : ""}
                                    />
                                </PaginationItem>
                            </PaginationContent>
                        </Pagination>
                    </div>
                </CardContent>
            </Card>
        </section>
    )
}

export default ScrapersListSection
