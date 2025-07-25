import { FC } from "react"

import ScrapersPageTopSection from "@/components/layout/scrapers-page/top-section"
import ScrapersListSection from "@/components/layout/scrapers-page/scrapers-list"
import { getAuthenticatedSession } from "@/utils/get-access-token"
import { findManyScrapers } from "@/services/api/scrapers"

const ScrapersPage: FC = async () => {
    const { accessToken } = await getAuthenticatedSession()

    const initialData = await findManyScrapers(undefined, accessToken)

    return (
        <div className="max-w-7xl mx-auto py-6">
            <ScrapersPageTopSection />
            <ScrapersListSection initialData={initialData} accessToken={accessToken} />
        </div>
    )
}

export default ScrapersPage
