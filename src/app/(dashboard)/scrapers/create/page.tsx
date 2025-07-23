import { FC } from "react"

import CreateScraperSection from "@/components/layout/create-scraper-page/create-scraper-section"
import { getAuthenticatedSession } from "@/utils/get-access-token"

const CreateScraperPage: FC = async () => {
    const { accessToken } = await getAuthenticatedSession()

    return (
        <div className="max-w-7xl mx-auto py-6">
            <CreateScraperSection accessToken={accessToken} />
        </div>
    )
}

export default CreateScraperPage
