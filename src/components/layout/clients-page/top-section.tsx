import NextLink from "next/link"
import { FC } from "react"

import { LuCirclePlus } from "react-icons/lu"

import { Typography } from "@/components/ui/typography"
import { Button } from "@/components/ui/button"

const ClientsPageTopSection: FC = () => {
    return (
        <section className="pb-4">
            <div className="flex items-center justify-between">
                <Typography.H1>Clientes</Typography.H1>
                <Button asChild size="sm">
                    <NextLink href="/clients/create">
                        <LuCirclePlus />
                        Criar cliente
                    </NextLink>
                </Button>
            </div>
            <Typography.Muted className="mt-4 text-sm">
                Esta é a listagem dos Clientes criados, você também pode navegar para a página de cada Cliente ou criar
                um Cliente novo.
            </Typography.Muted>
        </section>
    )
}

export default ClientsPageTopSection
