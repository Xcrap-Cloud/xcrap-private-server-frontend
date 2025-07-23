"use client"

import { LuCopy, LuDownload } from "react-icons/lu"
import download from "downloadjs"
import { toast } from "sonner"
import { FC } from "react"

import { ParsingModelViewer } from "@/components/features/scraper-page/parsing-model-view"
import { FindOneScraperResponse } from "@/services/api/scrapers"
import { Typography } from "@/components/ui/typography"
import { Separator } from "@/components/ui/separator"
import { TabsContent } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"

type Props = {
    data: FindOneScraperResponse
}

const ScraperParsingModelTab: FC<Props> = ({ data }) => {
    const handleClickOnDownloadButton = () => {
        const content = JSON.stringify(data.parsingModel, null, 4)
        const fileName = `scraper-${data.id}-parsing-model.json`
        download(content, fileName, "application/json")
    }

    const handleClickOnCopyButton = async () => {
        const content = JSON.stringify(data.parsingModel, null, 4)
        await navigator.clipboard.writeText(content)
        toast.success("Modelo de parsing copiado para a Área de Transferência.")
    }

    return (
        <TabsContent value="parsing-model">
            <ParsingModelViewer parsingModel={data.parsingModel} />
            <Separator className="my-6" />
            <Typography.H2 className="mb-6">Exportação</Typography.H2>
            <div className="flex gap-2">
                <Button onClick={handleClickOnDownloadButton} size="sm">
                    <LuDownload />
                    Baixar JSON
                </Button>
                <Button onClick={handleClickOnCopyButton} variant="secondary" size="sm">
                    <LuCopy />
                    Copiar JSON
                </Button>
            </div>
        </TabsContent>
    )
}

export default ScraperParsingModelTab
