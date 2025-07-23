import { SiPuppeteer, SiNodedotjs } from "react-icons/si"
import { SiAxios } from "react-icons/si"
import { ReactNode } from "react"

import { Typography } from "@/components/ui/typography"

export async function renderClientType(type: string) {
    const clientTypeMap: Record<string, ReactNode> = {
        puppeteer: (
            <div className="flex gap-2 items-center">
                <SiPuppeteer className="text-[#01D8A2]" />
                <Typography.Muted className="text-sm">Puppeteer</Typography.Muted>
            </div>
        ),
        puppeteer_extra: (
            <div className="flex gap-2 items-center">
                <SiPuppeteer className="text-[#E6141F]" />
                <Typography.Muted className="text-sm">Puppeteer Extra</Typography.Muted>
            </div>
        ),
        puppeteer_real_browser: (
            <div className="flex gap-2 items-center">
                <SiPuppeteer className="text-[#303030] dark:text-neutral-100" />
                <Typography.Muted className="text-sm">Puppeteer Real Browser</Typography.Muted>
            </div>
        ),
        axios: (
            <div className="flex gap-2 items-center">
                <SiAxios className="text-[#5A29E4]" />
                <Typography.Muted className="text-sm">Axios</Typography.Muted>
            </div>
        ),
        got_scraping: (
            <div className="flex gap-2 items-center">
                <SiAxios className="text-[#5A29E4]" />
                <Typography.Muted className="text-sm">Axios</Typography.Muted>
            </div>
        ),
        http_core: (
            <div className="flex gap-2 items-center">
                <SiNodedotjs className="text-[#73AA63]" />
                <Typography.Muted className="text-sm">HTTP Core</Typography.Muted>
            </div>
        ),
    }

    if (!(type in clientTypeMap)) {
        throw new Error(`Unknown client type: ${type}`)
    }

    return clientTypeMap[type]
}
