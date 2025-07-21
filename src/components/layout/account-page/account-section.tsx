"use client"

import { FC, useEffect, useState } from "react"
import { useSession } from "next-auth/react"
import * as jwt from "jsonwebtoken"

import { findOneUser, FindOneUserResponse } from "@/services/api/users"
import ApiKeyManager from "@/components/features/api-key-manager"
import { Typography } from "@/components/ui/typography"

const AccountSection: FC = () => {
    const { data: session, status } = useSession()
    const data = session && session.accessToken ? jwt.decode(session.accessToken) : null
    const [user, setUser] = useState<FindOneUserResponse | null>(null)

    useEffect(() => {
        if (!data || !session || !session.accessToken) return

        const findUser = async () => {
            const user = await findOneUser(data.sub as string, session.accessToken!)
            setUser(user)
        }

        findUser()
    }, [data])

    return (
        <section>
            {session && status === "authenticated" ? (
                <>
                    <Typography.H1>Conta</Typography.H1>
                    <Typography.Muted className="mt-4">
                        Logado como <Typography.Code>{session.user.name}</Typography.Code> ({session.user.email}).
                    </Typography.Muted>
                    {user && (
                        <div className="grid grid-cols-2">
                            <ApiKeyManager
                                className="mt-4"
                                apiKey={user.apiKey}
                                onRegenerate={async () => window.location.reload()}
                            />
                        </div>
                    )}
                </>
            ) : (
                <Typography.P>Deslogado</Typography.P>
            )}
        </section>
    )
}

export default AccountSection
