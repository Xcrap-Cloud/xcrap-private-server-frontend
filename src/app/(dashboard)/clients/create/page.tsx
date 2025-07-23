import { FC } from "react"

import CreateClientSection from "@/components/layout/create-client-page/create-client-section"
import { getAuthenticatedSession } from "@/utils/get-access-token"

const CreateClientPage: FC = async () => {
    const { accessToken } = await getAuthenticatedSession()

    return (
        <div className="max-w-7xl mx-auto py-6">
            <CreateClientSection accessToken={accessToken} />
        </div>
    )
}

export default CreateClientPage
