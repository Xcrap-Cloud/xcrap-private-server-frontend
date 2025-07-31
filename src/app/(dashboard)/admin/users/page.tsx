import { FC } from "react"

import UsersPageTopSection from "@/components/users-page/top-section"
import { getAuthenticatedSession } from "@/utils/get-access-token"
import { findManyUsers } from "@/services/api/users"

const UsersPage: FC = async () => {
    const { accessToken } = await getAuthenticatedSession()

    const initialData = await findManyUsers(undefined, accessToken)

    return (
        <div className="max-w-7xl mx-auto py-6">
            <UsersPageTopSection />
        </div>
    )
}

export default UsersPage
