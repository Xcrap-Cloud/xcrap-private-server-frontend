"use client"

import { LuDownload } from "react-icons/lu"
import download from "downloadjs"
import { FC } from "react"

import { ParsingModelViewer } from "@/components/features/parsing-model-view"
import { FindOneScraperResponse } from "@/services/api/scrapers"
import { Separator } from "@/components/ui/separator"
import { TabsContent } from "@/components/ui/tabs"
import { Typography } from "../../ui/typography"
import { Button } from "@/components/ui/button"

type Props = {
    data: FindOneScraperResponse
}

const ParsingModelTab: FC<Props> = ({ data }) => {
    const handleClickOnDownloadButton = () => {
        const content = JSON.stringify(data.parsingModel, null, 4)
        const fileName = `scraper-${data.id}-parsing-model.json`
        download(content, fileName, "application/json")
    }

    return (
        <TabsContent value="parsing-model">
            <ParsingModelViewer parsingModel={data.parsingModel} />
            <Separator className="my-6" />
            <div>
                <Typography.H2 className="mb-6">Exportação</Typography.H2>
                <Button onClick={handleClickOnDownloadButton} size="sm">
                    <LuDownload />
                    Baixar JSON
                </Button>
            </div>
        </TabsContent>
    )
}

export default ParsingModelTab
