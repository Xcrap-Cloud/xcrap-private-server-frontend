import { getServerSession } from "next-auth"
import { redirect } from "next/navigation"

import { authOptions } from "@/app/api/auth/[...nextauth]/route"

export async function getAuthenticatedSession() {
    const session = await getServerSession(authOptions)

    if (!session || !session.accessToken || session.error) {
        redirect("/auth/sign-in")
    }

    const data = {
        ...session,
        accessToken: session.accessToken as string,
    }

    return data
}
