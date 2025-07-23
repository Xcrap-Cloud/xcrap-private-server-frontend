import { FC } from "react"

import { FindOneClientResponse } from "@/services/api/clients"
import { renderClientType } from "@/utils/render-client-type"
import { Typography } from "@/components/ui/typography"
import formatDateTime from "@/utils/format-date-time"
import { TabsContent } from "@/components/ui/tabs"
import { Label } from "@/components/ui/label"

type Props = {
    data: FindOneClientResponse
}

const ClientBasicInfoTab: FC<Props> = ({ data }) => {
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
                <Label>Tipo</Label>
                {renderClientType(data.type)}
            </div>
            <div className="space-y-4">
                <Label>ID</Label>
                <Typography.Muted className="text-sm">{data.id}</Typography.Muted>
            </div>
        </TabsContent>
    )
}

export default ClientBasicInfoTab
