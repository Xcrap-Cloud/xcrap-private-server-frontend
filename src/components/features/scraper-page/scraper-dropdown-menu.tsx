"use client"

import { LuBraces, LuPencil, LuTrash } from "react-icons/lu"
import { FC } from "react"

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

type Props = {
    children: React.ReactNode
}

const ScraperDropdownMenu: FC<Props> = ({ children }) => {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>{children}</DropdownMenuTrigger>
            <DropdownMenuContent>
                <DropdownMenuLabel>Ações</DropdownMenuLabel>
                <DropdownMenuSeparator />
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
