import ClientPageSection from "@/components/layout/client-page/client-section"
import { getAuthenticatedSession } from "@/utils/get-access-token"
import { findOneClient } from "@/services/api/clients"

type Props = {
    params: Promise<{
        id: string
    }>
}

const ClientPage = async ({ params: paramsPromise }: Props) => {
    const params = await paramsPromise
    const { accessToken } = await getAuthenticatedSession()
    const client = await findOneClient(params.id, accessToken)

    return (
        <div className="max-w-7xl mx-auto py-6">
            <ClientPageSection data={client} accessToken={accessToken} />
        </div>
    )
}

export default ClientPage
