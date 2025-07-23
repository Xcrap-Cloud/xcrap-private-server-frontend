import { FC } from "react"

import { Typography } from "../../ui/typography"

type Props = {}

const ClientsPageTopSection: FC<Props> = ({}) => {
    return (
        <section className="pb-4">
            <Typography.H1>Clientes</Typography.H1>
            <Typography.Muted className="mt-4 text-sm">
                Esta é a listagem dos Clientes criados, você também pode navegar para a página de cada Cliente ou criar
                um Cliente novo.
            </Typography.Muted>
        </section>
    )
}

export default ClientsPageTopSection
