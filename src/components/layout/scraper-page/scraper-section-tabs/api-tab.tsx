import { FC } from "react"

import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { FindOneScraperResponse } from "@/services/api/scrapers"
import { TabsContent } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import configHelper from "@/helpers/config"

type Props = {
    data: FindOneScraperResponse
}

const routes = [
    {
        method: "GET",
        description: "Obter Informações - Retorna informações detalhadas sobre o scraper especificado.",
    },
    {
        method: "PATCH",
        description: "Atualizar Informações - Atualiza as informações do scraper especificado.",
    },
    {
        method: "DELETE",
        description: "Excluir Scraper - Remove o scraper especificado do sistema.",
    },
    {
        method: "POST",
        path: "execute",
        description: "Executar Scraper - Inicia a execução do scraper especificado e retorna o resultado.",
    },
]

const ApiTab: FC<Props> = ({ data }) => {
    return (
        <TabsContent value="api">
            <Table>
                <TableCaption>
                    Rotas da API relacionadas ao Scraper <b>{data.name}</b>.
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
                                {configHelper.apiUrl}/scrapers/{data.id}/{route.path && route.path}
                            </TableCell>
                            <TableCell>{route.description}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TabsContent>
    )
}

export default ApiTab
