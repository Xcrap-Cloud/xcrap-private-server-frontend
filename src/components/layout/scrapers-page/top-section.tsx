import { LuCirclePlus } from "react-icons/lu"
import NextLink from "next/link"
import { FC } from "react"

import { Typography } from "@/components/ui/typography"
import { Button } from "@/components/ui/button"

const ScrapersPageTopSection: FC = () => {
    return (
        <section className="pb-4">
            <div className="flex items-center justify-between">
                <Typography.H1>Scrapers</Typography.H1>
                <Button asChild size="sm">
                    <NextLink href="/scrapers/create">
                        <LuCirclePlus />
                        Criar scraper
                    </NextLink>
                </Button>
            </div>
            <Typography.Muted className="mt-4 text-sm">
                Esta é a listagem dos Scrapers criados, você também pode navegar para a página de cada Scraper ou criar
                um Scraper novo.
            </Typography.Muted>
        </section>
    )
}

export default ScrapersPageTopSection
