import { FC } from "react"

import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { FindOneClientResponse } from "@/services/api/clients"
import { TabsContent } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import configHelper from "@/helpers/config"

type Props = {
    data: FindOneClientResponse
}

const routes = [
    {
        method: "GET",
        description: "Obter Informações - Retorna informações detalhadas sobre o cliente especificado.",
    },
    {
        method: "PATCH",
        description: "Atualizar Informações - Atualiza as informações do cliente especificado.",
    },
    {
        method: "DELETE",
        description: "Excluir Cliente - Remove o client especificado do sistema.",
    },
]

const ClientApiTab: FC<Props> = ({ data }) => {
    return (
        <TabsContent value="api">
            <Table>
                <TableCaption>
                    Rotas da API relacionadas ao Cliente <b>{data.name}</b>.
                </TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead className="w-[100px]">Método</TableHead>
                        <TableHead>Endpoint</TableHead>
                        <TableHead>Descrição</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {routes.map((route) => (
                        <TableRow key={route.description}>
                            <TableCell className="font-medium">
                                <Badge>{route.method}</Badge>
                            </TableCell>
                            <TableCell>
                                {configHelper.apiUrl}/clients/{data.id}
                            </TableCell>
                            <TableCell>{route.description}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TabsContent>
    )
}

export default ClientApiTab
