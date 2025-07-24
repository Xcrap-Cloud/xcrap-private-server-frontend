import { Extractor } from "@/enums/scrapers/extractor"

export function getExtractorName(key: string): string {
    const labels: Record<string, string> = {
        [Extractor.InnerText]: "Extract Inner Text",
        [Extractor.TextContent]: "Extract Text Content",
        [Extractor.Href]: "Extract Href",
        [Extractor.ClassList]: "Extract Class List",
        [Extractor.ClassNames]: "Extract Class Names",
        [Extractor.Src]: "Extract Src",
        [Extractor.AriaLabel]: "Extract ARIA Label",
        [Extractor.AriaHidden]: "Extract ARIA Hidden",
        [Extractor.AriaChecked]: "Extract ARIA Checked",
        [Extractor.AriaExpanded]: "Extract ARIA Expanded",
        [Extractor.AriaDisabled]: "Extract ARIA Disabled",
        [Extractor.Attrs]: "Extract Attributes",
        [Extractor.Attributes]: "Extract All Attributes",
        [Extractor.RawAttrs]: "Extract Raw Attributes",
        [Extractor.RawAttributes]: "Extract Raw Attributes (Deterministic)",
        [Extractor.RawText]: "Extract Raw Text",
        [Extractor.OuterHtml]: "Extract Outer HTML",
        [Extractor.InnerHtml]: "Extract Inner HTML",
        [Extractor.TagName]: "Extract Tag Name",
        [Extractor.RawTagName]: "Extract Raw Tag Name",
        [Extractor.Id]: "Extract ID",
        [Extractor.Type]: "Extract Type",
        [Extractor.Role]: "Extract Role",
        [Extractor.Name]: "Extract Name",
        [Extractor.Placeholder]: "Extract Placeholder",
        [Extractor.Title]: "Extract Title",
        [Extractor.Value]: "Extract Value",
        [Extractor.Checked]: "Extract Checked State",
        [Extractor.Disabled]: "Extract Disabled State",
        [Extractor.Readonly]: "Extract Readonly State",
        [Extractor.Required]: "Extract Required State",
        [Extractor.Selected]: "Extract Selected State",
        [Extractor.NodeType]: "Extract Node Type",
        [Extractor.LocalName]: "Extract Local Name",
        [Extractor.Autocomplete]: "Extract Autocomplete",
        [Extractor.MaxLength]: "Extract Max Length",
        [Extractor.MinLength]: "Extract Min Length",
        [Extractor.ChildElementCount]: "Extract Child Element Count",
        [Extractor.Pattern]: "Extract Pattern",
        [Extractor.Style]: "Extract Style",
        [Extractor.Text]: "Extract Text",
        [Extractor.Structure]: "Extract Element Structure",
        [Extractor.StructuredText]: "Extract Structured Text",
        [Extractor.Data]: "Extract All Data",
        [Extractor.Attribute]: "Extract Specific Attribute",
        [Extractor.Range]: "Extract Range",
        [Extractor.Content]: "Extract Content",
    }

    if (!(key in labels)) {
        throw new Error(`Extractor label not found for key: ${key}`)
    }

    return labels[key]
}
