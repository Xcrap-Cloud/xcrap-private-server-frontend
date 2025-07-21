import { FC } from "react"

import { Typography } from "../../ui/typography"

type Props = {}

const ScrapersPageTopSection: FC<Props> = ({}) => {
    return (
        <section>
            <Typography.H1>Scrapers</Typography.H1>
            <Typography.Muted className="mt-4 text-sm">
                Esta é a listagem dos Scrapers criados, você também pode navegar para a página de cada Scraper ou criar
                um Scraper novo.
            </Typography.Muted>
        </section>
    )
}

export default ScrapersPageTopSection
