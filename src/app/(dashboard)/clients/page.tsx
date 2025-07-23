import { FC } from "react"

import ClientsPageTopSection from "@/components/layout/clients-page/top-section"
import ClientsListSection from "@/components/layout/clients-page/clients-list"
import { getAuthenticatedSession } from "@/utils/get-access-token"
import { findManyClients } from "@/services/api/clients"

const ClientsPage: FC = async () => {
    const { accessToken } = await getAuthenticatedSession()

    const initialData = await findManyClients(undefined, accessToken)

    return (
        <div>
            <ClientsPageTopSection />
            <ClientsListSection initialData={initialData} accessToken={accessToken} />
        </div>
    )
}

export default ClientsPage
