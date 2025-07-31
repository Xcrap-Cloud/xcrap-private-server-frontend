import { FC } from "react"

import { getAuthenticatedSession } from "../../../../utils/get-access-token"
import { findManyUsers } from "../../../../services/api/users"

const UsersPage: FC = async () => {
    const { accessToken } = await getAuthenticatedSession()

    const initialData = await findManyUsers(undefined, accessToken)

    return <div className="max-w-7xl mx-auto py-6"></div>
}

export default UsersPage
