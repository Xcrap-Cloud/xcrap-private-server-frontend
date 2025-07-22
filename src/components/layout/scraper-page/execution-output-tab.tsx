import { FC } from "react"

import { ExecuteOneScraperResponse, FindOneScraperResponse } from "@/services/api/scrapers"
import { TabsContent } from "@/components/ui/tabs"
import { Typography } from "@/components/ui/typography"
import { Label } from "@/components/ui/label"
import formatDateTime from "@/components/../utils/format-date-time"
import { Separator } from "@/components/ui/separator"
import { LuDatabase, LuInfo } from "react-icons/lu"
import JsonViewer from "@/components/features/json-viwer"

type Props = {
    scraper: FindOneScraperResponse
    response: ExecuteOneScraperResponse<any> | null
}

const ExecutionOutputTab: FC<Props> = ({ response, scraper }) => {
    return (
        <TabsContent value="execution-output">
            {response ? (
                <>
                    <Typography.H2>Resultados da Execução</Typography.H2>
                    <Typography.H3 className="my-4 bg-neutral-300 text-neutral-600 dark:bg-neutral-800 dark:text-neutral-400 px-6 py-2 mx-[-1.5rem] flex gap-2 items-center font-mono"><LuInfo/> Metadados</Typography.H3>
                    <div className="space-y-6">
                        <Typography.H4>Requisição</Typography.H4>
                        <div className="grid grid-cols-2 gap-x-2 gap-y-6">
                            <div className="space-y-4">
                                <Label>URL</Label>
                                <Typography.Muted className="text-sm">{response.metadata.request.url}</Typography.Muted>
                            </div>
                            <div className="space-y-4">
                                <Label>Início</Label>
                                <Typography.Muted className="text-sm">{formatDateTime(response.metadata.request.startTime)}</Typography.Muted>
                            </div>
                            <div className="space-y-4">
                                <Label>Fim</Label>
                                <Typography.Muted className="text-sm">{formatDateTime(response.metadata.request.endTime)}</Typography.Muted>
                            </div>
                            <div className="space-y-4">
                                <Label>Duração</Label>
                                <Typography.Muted className="text-sm">{response.metadata.request.duration}ms</Typography.Muted>
                            </div>
                            <div className="space-y-4">
                                <Label>Tentativas</Label>
                                <Typography.Muted className="text-sm">{response.metadata.request.attempts}</Typography.Muted>
                            </div>
                            <div className="space-y-4">
                                <Label>Houve retentativas?</Label>
                                <Typography.Muted className="text-sm">
                                    {response.metadata.request.hadRetries ? "Sim" : "Não"}
                                </Typography.Muted>
                            </div>
                            <div className="space-y-4">
                                <Label>Agente de usuário</Label>
                                <Typography.Muted className="text-sm">{response.metadata.request.userAgent}</Typography.Muted>
                            </div>
                        </div>
                        <Separator className="my-4" />
                        <Typography.H4>Resposta</Typography.H4>
                        <div className="grid grid-cols-2 gap-x-2 gap-y-6">
                            <div className="space-y-4">
                                <Label>Status</Label>
                                <Typography.Muted className="text-sm">
                                    {response.metadata.response.status} {response.metadata.response.statusText}
                                </Typography.Muted>
                            </div>
                            <div className="space-y-4">
                                <Label>Tipo de Conteúdo</Label>
                                <Typography.Muted className="text-sm">{response.metadata.response.contentType}</Typography.Muted>
                            </div>
                        </div>
                        <Separator className="my-4" />
                        <Typography.H4>Parsing</Typography.H4>
                        <div className="grid grid-cols-2 gap-x-2 gap-y-6">
                            <div className="space-y-4">
                                <Label>Início</Label>
                                <Typography.Muted className="text-sm">{formatDateTime(response.metadata.parsing.startTime)}</Typography.Muted>
                            </div>
                            <div className="space-y-4">
                                <Label>Fim</Label>
                                <Typography.Muted className="text-sm">{formatDateTime(response.metadata.parsing.endTime)}</Typography.Muted>
                            </div>
                            <div className="space-y-4">
                                <Label>Duração</Label>
                                <Typography.Muted className="text-sm">{response.metadata.parsing.duration}ms</Typography.Muted>
                            </div>
                        </div>
                    </div>
                    <Typography.H3 className="my-4 bg-neutral-300 text-neutral-600 dark:bg-neutral-800 dark:text-neutral-400 px-6 py-2 mx-[-1.5rem] flex gap-2 items-center font-mono"><LuDatabase/> Dados</Typography.H3>
                    <JsonViewer
                        data={response.data}
                        fileName={`scraper-${scraper.id}-execution-output.json`}
                    />
                </>
            ) : (
                <Typography.Muted className="mt-4">Nenhuma execução realizada.</Typography.Muted>
            )}
        </TabsContent>
    )
}

export default ExecutionOutputTab
