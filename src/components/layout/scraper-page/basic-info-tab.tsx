import { FC } from "react"

import { FindOneScraperResponse } from "@/services/api/scrapers"
import { Typography } from "@/components/ui/typography"
import formatDateTime from "@/utils/format-date-time"
import { TabsContent } from "@/components/ui/tabs"
import { Label } from "@/components/ui/label"
import { Link } from "@/components/ui/link"

type Props = {
    data: FindOneScraperResponse
}

const ScraperBasicInfoTab: FC<Props> = ({ data }) => {
    return (
        <TabsContent value="basic-info" className="grid grid-cols-2 gap-x-2 gap-y-6">
            <div className="space-y-4">
                <Label>Criado em</Label>
                <Typography.Muted className="text-sm">{formatDateTime(data.createdAt)}</Typography.Muted>
            </div>
            <div className="space-y-4">
                <Label>Atualizado em</Label>
                <Typography.Muted className="text-sm">{formatDateTime(data.updatedAt)}</Typography.Muted>
            </div>
            <div className="space-y-4">
                <Label>URL Padrão</Label>
                {data.defaultUrl ? (
                    <Link href={data.defaultUrl} className="text-sm">
                        {data.defaultUrl}
                    </Link>
                ) : (
                    <Typography.Muted className="text-sm">Não definida.</Typography.Muted>
                )}
            </div>
            <div className="space-y-4">
                <Label>Cliente</Label>
                <Link href={`/clients/${data.clientId}`} className="text-sm">
                    {data.client.name}
                </Link>
            </div>
        </TabsContent>
    )
}

export default ScraperBasicInfoTab
