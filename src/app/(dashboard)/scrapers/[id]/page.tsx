import { FC } from "react"

import ScraperPageSection from "@/components/layout/scraper-page/scraper-section"
import { getAuthenticatedSession } from "@/utils/get-access-token"
import { findOneScraper } from "@/services/api/scrapers"

type Props = {
    params: Promise<{
        id: string
    }>
}

const ScraperPage = async ({ params: paramsPromise }: Props) => {
    const params = await paramsPromise
    const { accessToken } = await getAuthenticatedSession()
    const scraper = await findOneScraper(params.id, accessToken)

    return (
        <div className="max-w-7xl mx-auto">
            <ScraperPageSection data={scraper} accessToken={accessToken} />
        </div>
    )
}

export default ScraperPage
