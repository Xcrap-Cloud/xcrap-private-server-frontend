import { SiHtml5, SiJson, SiMarkdown } from "react-icons/si"
import { LuCode } from "react-icons/lu"

import { ParsingModelFieldType } from "@/enums/scrapers/parsing-model-field-type"

export function getParsingModelTypeIcon(type: string) {
    switch (type) {
        case ParsingModelFieldType.HTML:
            return <SiHtml5 className="w-4 h-4 text-orange-600" />
        case ParsingModelFieldType.JSON:
            return <SiJson className="w-4 h-4 text-neutral-600" />
        case ParsingModelFieldType.MARKDOWN:
            return <SiMarkdown className="w-4 h-4 text-[#1A9FE6]" />
        default:
            return <LuCode className="w-4 h-4 text-neutral-600" />
    }
}
