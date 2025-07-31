import { SiPuppeteer, SiNodedotjs } from "react-icons/si"
import { SiAxios } from "react-icons/si"
import { MdHttp } from "react-icons/md"
import { ReactNode } from "react"

import { Typography } from "@/components/ui/typography"

export function getClientTypeIcon(type: string): ReactNode {
    const iconMap: Record<string, ReactNode> = {
        puppeteer: <SiPuppeteer className="text-[#01D8A2]" />,
        puppeteer_extra: <SiPuppeteer className="text-[#E6141F]" />,
        puppeteer_real_browser: <SiPuppeteer className="text-[#303030] dark:text-neutral-100" />,
        axios: <SiAxios className="text-[#5A29E4]" />,
        got_scraping: <MdHttp className="text-[#8085BB]" />,
        http_core: <SiNodedotjs className="text-[#73AA63]" />,
        impit: <MdHttp className="text-[#75492F]" />,
    }

    if (!(type in iconMap)) {
        throw new Error(`Unknown client type icon: ${type}`)
    }

    return iconMap[type]
}

export function getClientTypeName(type: string): string {
    const nameMap: Record<string, string> = {
        puppeteer: "Puppeteer",
        puppeteer_extra: "Puppeteer Extra",
        puppeteer_real_browser: "Puppeteer Real Browser",
        axios: "Axios",
        got_scraping: "Got Scraping",
        http_core: "HTTP Core",
        impit: "Impit",
    }

    if (!(type in nameMap)) {
        throw new Error(`Unknown client type name: ${type}`)
    }

    return nameMap[type]
}

export function renderClientType(type: string): ReactNode {
    return (
        <div className="flex gap-2 items-center">
            {getClientTypeIcon(type)}
            <Typography.Muted className="text-sm">{getClientTypeName(type)}</Typography.Muted>
        </div>
    )
}
