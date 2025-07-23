"use client"

import { LuCopy, LuPencil, LuTrash } from "react-icons/lu"
import { toast } from "sonner"
import { FC } from "react"

import { useRouter } from "next/navigation"

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { deleteClient, FindOneClientResponse } from "@/services/api/clients"

type Props = {
    children: React.ReactNode
    data: FindOneClientResponse
    accessToken: string
}

const ClientDropdownMenu: FC<Props> = ({ children, data, accessToken }) => {
    const router = useRouter()

    const handleClickOnCopyIdButton = async () => {
        await navigator.clipboard.writeText(data.id)
        toast.success("ID copiado para a Área de Transferência.")
    }

    const handleClickOnDeleteButton = async () => {
        try {
            await deleteClient(data.id, accessToken)
            toast.success(`O cliente "${data.name}" foi excluido com sucesso!`)

            router.push("/clients")
        } catch (error) {
            console.error("Error when deleting client:", error)
            toast.error("Não foi possível excluir o cliente!")
        }
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
                <DropdownMenuItem variant="destructive" onClick={handleClickOnDeleteButton}>
                    <LuTrash /> Excluir Cliente
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}

export default ClientDropdownMenu
