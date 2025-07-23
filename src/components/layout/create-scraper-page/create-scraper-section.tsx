import { FC } from "react"

import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card"
import CreateScraperForm from "./create-scraper-form"

type Props = {
    accessToken: string
}

const CreateScraperSection: FC<Props> = ({ accessToken }) => {
    return (
        <section>
            <Card>
                <CardHeader>
                    <CardTitle>Criação de Scraper HTTP</CardTitle>
                    <CardDescription>Preencha os dados abaixo para criar um novo scraper.</CardDescription>
                </CardHeader>
                <CardContent>
                    <CreateScraperForm accessToken={accessToken} />
                </CardContent>
            </Card>
        </section>
    )
}

export default CreateScraperSection
