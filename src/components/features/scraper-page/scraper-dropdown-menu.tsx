"use client"

import { LuBraces, LuCopy, LuPencil, LuTrash } from "react-icons/lu"
import { toast } from "sonner"
import { FC } from "react"

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { FindOneScraperResponse } from "@/services/api/scrapers"

type Props = {
    children: React.ReactNode
    data: FindOneScraperResponse
}

const ScraperDropdownMenu: FC<Props> = ({ children, data }) => {
    const handleClickOnCopyIdButton = async () => {
        await navigator.clipboard.writeText(data.id)
        toast.success("ID copiado para a Área de Transferência.")
    }

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>{children}</DropdownMenuTrigger>
            <DropdownMenuContent>
                <DropdownMenuLabel>Ações</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleClickOnCopyIdButton}>
                    <LuCopy /> Copiar ID
                </DropdownMenuItem>
                <DropdownMenuItem>
                    <LuPencil /> Editar Informações Básicas
                </DropdownMenuItem>
                <DropdownMenuItem>
                    <LuBraces /> Editar Modelo de Parsing
                </DropdownMenuItem>
                <DropdownMenuItem variant="destructive">
                    <LuTrash /> Excluir Scraper
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}

export default ScraperDropdownMenu
