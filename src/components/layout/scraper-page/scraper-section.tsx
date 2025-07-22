import { LuBraces, LuFileJson2, LuInfo, LuPlay, LuUnplug } from "react-icons/lu"
import { HiDotsVertical } from "react-icons/hi"
import { FaSpider } from "react-icons/fa"
import { FC } from "react"

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { FindOneScraperResponse } from "@/services/api/scrapers"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Typography } from "@/components/ui/typography"
import { Separator } from "@/components/ui/separator"
import formatDateTime from "@/utils/format-date-time"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Link } from "@/components/ui/link"

type Props = {
    data: FindOneScraperResponse
}

const ScraperPageSection: FC<Props> = ({ data }) => {
    return (
        <section>
            <Card className="max-w-5xl">
                <CardHeader>
                    <CardTitle className="flex justify-between">
                        <div className="flex gap-2 items-center">
                            <FaSpider /> {data.name}
                        </div>
                        <div className="space-x-1">
                            <Button variant="ghost" className="rounded-full" title="Executar">
                                <LuPlay />
                            </Button>
                            <Button variant="ghost" className="rounded-full" title="Abrir menu">
                                <HiDotsVertical />
                            </Button>
                        </div>
                    </CardTitle>
                    {data.description && <CardDescription>{data.description}</CardDescription>}
                </CardHeader>
                <CardContent>
                    <Tabs defaultValue="basic-info">
                        <TabsList className="mb-4">
                            <TabsTrigger value="basic-info">
                                <LuInfo /> Informações Básicas
                            </TabsTrigger>
                            <TabsTrigger value="parsing-model">
                                <LuBraces /> Modelo de Parsing
                            </TabsTrigger>
                            <TabsTrigger value="execution-output">
                                <LuFileJson2 /> Saída de Execução
                            </TabsTrigger>
                            <TabsTrigger value="api">
                                <LuUnplug /> API
                            </TabsTrigger>
                        </TabsList>
                        <TabsContent value="basic-info" className="grid grid-cols-2 gap-x-2 gap-y-6">
                            <div className="space-y-4">
                                <Label>Criado em</Label>
                                <Typography.Muted className="text-sm">
                                    {formatDateTime(data.createdAt)}
                                </Typography.Muted>
                            </div>
                            <div className="space-y-4">
                                <Label>Atualizado em</Label>
                                <Typography.Muted className="text-sm">
                                    {formatDateTime(data.updatedAt)}
                                </Typography.Muted>
                            </div>
                            <div className="space-y-4">
                                <Label>URL Padrão</Label>
                                <Typography.Muted className="text-sm">
                                    {data.defaultUrl ? data.defaultUrl : "Não definida."}
                                </Typography.Muted>
                            </div>
                            <div className="space-y-4">
                                <Label>Cliente</Label>
                                <Link href={`/clients/${data.clientId}`} className="text-sm">
                                    {data.clientId}
                                </Link>
                            </div>
                        </TabsContent>
                        <TabsContent value="parsing-model">Modelo de Parsing</TabsContent>
                        <TabsContent value="execution-output">Saída de execução</TabsContent>
                        <TabsContent value="api">API</TabsContent>
                    </Tabs>
                </CardContent>
                <Separator />
                <CardFooter className="block space-y-2">
                    <Typography.P>Criado por:</Typography.P>
                    <div className="flex gap-2 items-center">
                        <Avatar>
                            <AvatarFallback>{data.owner.name[0].toUpperCase()}</AvatarFallback>
                        </Avatar>
                        <Typography.Muted>
                            <Link href={`/users/${data.owner.id}`}>{data.owner.name}</Link>
                        </Typography.Muted>
                    </div>
                </CardFooter>
            </Card>
        </section>
    )
}

export default ScraperPageSection
