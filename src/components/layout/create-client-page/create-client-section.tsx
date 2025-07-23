import { FC } from "react"

import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card"
import CreateClientForm from "./create-client-form"

type Props = {
    accessToken: string
}

const CreateClientSection: FC<Props> = ({ accessToken }) => {
    return (
        <section>
            <Card>
                <CardHeader>
                    <CardTitle>Criação de Cliente HTTP</CardTitle>
                    <CardDescription>Preencha os dados abaixo para criar um novo cliente HTTP.</CardDescription>
                </CardHeader>
                <CardContent>
                    <CreateClientForm accessToken={accessToken} />
                </CardContent>
            </Card>
        </section>
    )
}

export default CreateClientSection
