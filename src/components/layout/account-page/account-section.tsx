"use client"

import { LuPlug, LuUser } from "react-icons/lu"
import { FC, useEffect, useState } from "react"
import { useSession } from "next-auth/react"
import * as jwt from "jsonwebtoken"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { findOneUser, FindOneUserResponse } from "@/services/api/users"
import ApiKeyManager from "@/components/features/api-key-manager"
import { Typography } from "@/components/ui/typography"
import formatDateTime from "@/utils/format-date-time"
import { Label } from "@/components/ui/label"

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
                        <div className="mt-8 space-y-4">
                            <Card className="max-w-5xl">
                                <CardHeader>
                                    <CardTitle className="flex gap-1 items-center">
                                        <LuUser /> Informações do Usuário
                                    </CardTitle>
                                </CardHeader>
                                <CardContent className="grid grid-cols-2 gap-x-2 gap-y-6">
                                    <div className="space-y-4">
                                        <Label>Nome</Label>
                                        <Typography.Muted className="text-sm">{user.name}</Typography.Muted>
                                    </div>
                                    <div className="space-y-4">
                                        <Label asChild>
                                            <p>Cargo</p>
                                        </Label>
                                        <Typography.Muted className="text-sm">{user.role}</Typography.Muted>
                                    </div>
                                    <div className="space-y-4">
                                        <Label>Criado em</Label>
                                        <Typography.Muted className="text-sm">
                                            {formatDateTime(user.createdAt)}
                                        </Typography.Muted>
                                    </div>
                                    <div className="space-y-4">
                                        <Label>Atualizado em</Label>
                                        <Typography.Muted className="text-sm">
                                            {formatDateTime(user.updatedAt)}
                                        </Typography.Muted>
                                    </div>
                                    <div className="space-y-4">
                                        <Label>Email</Label>
                                        <Typography.Muted className="text-sm">{user.email}</Typography.Muted>
                                    </div>
                                    <div className="space-y-4">
                                        <Label>Username</Label>
                                        <Typography.Muted className="text-sm">@{user.username}</Typography.Muted>
                                    </div>
                                    <div className="space-y-4">
                                        <Label asChild>
                                            <p>ID</p>
                                        </Label>
                                        <Typography.Muted className="text-sm">{user.id}</Typography.Muted>
                                    </div>
                                </CardContent>
                            </Card>
                            <Card className="max-w-5xl">
                                <CardHeader>
                                    <CardTitle className="flex gap-1 items-center">
                                        <LuPlug /> Integração
                                    </CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <ApiKeyManager
                                        apiKey={user.apiKey}
                                        onRegenerate={async () => window.location.reload()}
                                    />
                                </CardContent>
                            </Card>
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
