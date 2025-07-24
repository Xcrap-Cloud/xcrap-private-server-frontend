import {
    FiType,
    FiTag,
    FiHash,
    FiList,
    FiEyeOff,
    FiCheck,
    FiX,
    FiEdit2,
    FiLayout,
    FiFileText,
    FiClipboard,
    FiCode,
    FiTerminal,
    FiDatabase,
    FiBox,
    FiLayers,
    FiChevronDown,
    FiArrowDownCircle,
    FiAperture,
    FiAlertCircle,
} from "react-icons/fi"
import { MdTitle, MdOutlineTextFields, MdOutlineContentPaste } from "react-icons/md"
import { HiOutlineDocumentText, HiOutlineVariable } from "react-icons/hi"
import { BiFont, BiCodeAlt, BiGridAlt } from "react-icons/bi"
import { LuLink, LuRegex } from "react-icons/lu"
import { ReactNode } from "react"

import { Extractor } from "@/enums/scrapers/extractor"

export function getExtractorIcon(key: string) {
    const icons: Record<string, ReactNode> = {
        [Extractor.InnerText]: <MdOutlineTextFields />,
        [Extractor.TextContent]: <FiFileText />,
        [Extractor.Href]: <LuLink />,
        [Extractor.ClassList]: <FiList />,
        [Extractor.ClassNames]: <FiList />,
        [Extractor.Src]: <LuLink />,
        [Extractor.AriaLabel]: <FiTag />,
        [Extractor.AriaHidden]: <FiEyeOff />,
        [Extractor.AriaChecked]: <FiCheck />,
        [Extractor.AriaExpanded]: <FiChevronDown />,
        [Extractor.AriaDisabled]: <FiX />,
        [Extractor.Attrs]: <FiDatabase />,
        [Extractor.Attributes]: <FiDatabase />,
        [Extractor.RawAttrs]: <FiTerminal />,
        [Extractor.RawAttributes]: <FiTerminal />,
        [Extractor.RawText]: <BiCodeAlt />,
        [Extractor.OuterHtml]: <FiCode />,
        [Extractor.InnerHtml]: <FiCode />,
        [Extractor.TagName]: <FiTag />,
        [Extractor.RawTagName]: <FiTag />,
        [Extractor.Id]: <FiHash />,
        [Extractor.Type]: <FiType />,
        [Extractor.Role]: <FiBox />,
        [Extractor.Name]: <FiEdit2 />,
        [Extractor.Placeholder]: <MdTitle />,
        [Extractor.Title]: <MdTitle />,
        [Extractor.Value]: <FiClipboard />,
        [Extractor.Checked]: <FiCheck />,
        [Extractor.Disabled]: <FiX />,
        [Extractor.Readonly]: <FiEyeOff />,
        [Extractor.Required]: <FiAlertCircle />,
        [Extractor.Selected]: <FiCheck />,
        [Extractor.NodeType]: <FiLayers />,
        [Extractor.LocalName]: <FiTag />,
        [Extractor.Autocomplete]: <FiChevronDown />,
        [Extractor.MaxLength]: <FiArrowDownCircle />,
        [Extractor.MinLength]: <FiArrowDownCircle />,
        [Extractor.ChildElementCount]: <FiList />,
        [Extractor.Pattern]: <LuRegex />,
        [Extractor.Style]: <FiLayout />,
        [Extractor.Text]: <BiFont />,
        [Extractor.Structure]: <BiGridAlt />,
        [Extractor.StructuredText]: <HiOutlineDocumentText />,
        [Extractor.Data]: <FiDatabase />,
        [Extractor.Attribute]: <HiOutlineVariable />,
        [Extractor.Range]: <FiArrowDownCircle />,
        [Extractor.Content]: <MdOutlineContentPaste />,
    }

    return icons[key] ?? <FiAlertCircle />
}
