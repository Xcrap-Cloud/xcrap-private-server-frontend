import { FC } from "react"

import ClientsPageTopSection from "@/components/layout/clients-page/top-section"
import ClientsListSection from "@/components/layout/clients-page/clients-list"
import { getAuthenticatedSession } from "@/utils/get-access-token"
import { findManyClients } from "@/services/api/clients"

const ClientsPage: FC = async () => {
    const { accessToken } = await getAuthenticatedSession()

    const initialData = await findManyClients(undefined, accessToken)

    return (
        <div className="max-w-7xl mx-auto py-6">
            <ClientsPageTopSection />
            <ClientsListSection initialData={initialData} accessToken={accessToken} />
        </div>
    )
}

export default ClientsPage
