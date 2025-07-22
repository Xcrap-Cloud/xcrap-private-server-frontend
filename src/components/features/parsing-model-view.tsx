"use client"

import { ChevronDown, ChevronRight, Code, Layers, Brackets } from "lucide-react"
import { SiJson, SiHtml5, SiMarkdown } from "react-icons/si"
import { useState } from "react"

import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { ParsingModelFieldType } from "@/enums/scrapers/parsing-model-field-type"
import { ParsingModel } from "@/services/api/scrapers"
import { Badge } from "@/components/ui/badge"

interface ParsingModelViewerProps {
    parsingModel: ParsingModel
}

export function ParsingModelViewer({ parsingModel }: ParsingModelViewerProps) {
    const [expandedNodes, setExpandedNodes] = useState<Set<string>>(new Set(["root"]))

    const toggleNode = (nodeId: string) => {
        const newExpanded = new Set(expandedNodes)

        if (newExpanded.has(nodeId)) {
            newExpanded.delete(nodeId)
        } else {
            newExpanded.add(nodeId)
        }

        setExpandedNodes(newExpanded)
    }

    const getTypeIcon = (type: string) => {
        switch (type) {
            case ParsingModelFieldType.HTML:
                return <SiHtml5 className="w-4 h-4 text-orange-600" />
            case ParsingModelFieldType.JSON:
                return <SiJson className="w-4 h-4 text-neutral-600" />
            case ParsingModelFieldType.MARKDOWN:
                return <SiMarkdown className="w-4 h-4 text-[#1A9FE6]" />
            default:
                return <Code className="w-4 h-4 text-neutral-600" />
        }
    }

    return (
        <div className="font-mono text-sm">
            <ModelNode
                model={parsingModel}
                nodeId="root"
                expandedNodes={expandedNodes}
                onToggle={toggleNode}
                getTypeIcon={getTypeIcon}
                level={0}
            />
        </div>
    )
}

interface ModelNodeProps {
    model: ParsingModel
    nodeId: string
    expandedNodes: Set<string>
    onToggle: (nodeId: string) => void
    getTypeIcon: (type: string) => React.ReactNode
    level: number
    fieldName?: string
}

function ModelNode({ model, nodeId, expandedNodes, onToggle, getTypeIcon, level, fieldName }: ModelNodeProps) {
    const isExpanded = expandedNodes.has(nodeId)
    const hasFields = Object.keys(model.model).length > 0

    return (
        <div className="select-none">
            <Collapsible open={isExpanded} onOpenChange={() => onToggle(nodeId)}>
                <CollapsibleTrigger asChild>
                    <div className="flex items-center gap-2 py-1 px-2 hover:bg-neutral-50 dark:hover:bg-neutral-800 rounded cursor-pointer group">
                        <div className="flex items-center gap-1">
                            {hasFields ? (
                                isExpanded ? (
                                    <ChevronDown className="w-4 h-4 text-neutral-500" />
                                ) : (
                                    <ChevronRight className="w-4 h-4 text-neutral-500" />
                                )
                            ) : (
                                <div className="w-4 h-4" />
                            )}
                            {getTypeIcon(model.type)}
                        </div>
                        <div className="flex items-center gap-2">
                            {fieldName ? (
                                <span className="text-neutral-700 dark:text-neutral-50 font-medium">{fieldName}</span>
                            ) : (
                                <span className="text-neutral-500 dark:text-neutral-400 text-xs uppercase tracking-wide">
                                    Modelo Raiz
                                </span>
                            )}
                            <Badge variant="outline" className="text-xs px-1.5 py-0.5">
                                {model.type}
                            </Badge>
                        </div>
                    </div>
                </CollapsibleTrigger>
                <CollapsibleContent>
                    <div className="ml-6 border-l border-neutral-200 dark:border-neutral-800 pl-4 space-y-1">
                        {Object.entries(model.model).map(([fieldName, field]) => (
                            <FieldNode
                                key={fieldName}
                                fieldName={fieldName}
                                field={field}
                                nodeId={`${nodeId}.${fieldName}`}
                                expandedNodes={expandedNodes}
                                onToggle={onToggle}
                                getTypeIcon={getTypeIcon}
                                level={level + 1}
                            />
                        ))}

                        {!hasFields && (
                            <div className="text-neutral-400 dark:text-neutral-600 text-xs py-2 italic">
                                Sem campos definidos
                            </div>
                        )}
                    </div>
                </CollapsibleContent>
            </Collapsible>
        </div>
    )
}

interface FieldNodeProps {
    fieldName: string
    field: any
    nodeId: string
    expandedNodes: Set<string>
    onToggle: (nodeId: string) => void
    getTypeIcon: (type: string) => React.ReactNode
    level: number
}

function FieldNode({ fieldName, field, nodeId, expandedNodes, onToggle, getTypeIcon, level }: FieldNodeProps) {
    const isExpanded = expandedNodes.has(nodeId)
    const hasNested = !!field.nested
    const hasDetails = field.query || field.extractor || field.default !== undefined

    return (
        <div className="select-none">
            <Collapsible open={isExpanded} onOpenChange={() => onToggle(nodeId)}>
                <CollapsibleTrigger asChild>
                    <div className="flex items-center gap-2 py-1 px-2 hover:bg-neutral-50 dark:hover:bg-neutral-800 rounded cursor-pointer group">
                        <div className="flex items-center gap-1">
                            {hasNested || hasDetails ? (
                                isExpanded ? (
                                    <ChevronDown className="w-4 h-4 text-neutral-500" />
                                ) : (
                                    <ChevronRight className="w-4 h-4 text-neutral-500" />
                                )
                            ) : (
                                <div className="w-4 h-4" />
                            )}
                            <Code className="w-4 h-4 text-neutral-600" />
                        </div>
                        <div className="flex items-center gap-2 flex-1">
                            <span className="text-neutral-800 font-medium dark:text-white">{fieldName}</span>
                            <div className="flex items-center gap-1">
                                {field.multiple && (
                                    <Badge variant="secondary" className="text-xs px-1.5 py-0.5">
                                        <Brackets className="w-3 h-3 mr-1" />
                                        Array
                                    </Badge>
                                )}
                                {hasNested && (
                                    <Badge variant="outline" className="text-xs px-1.5 py-0.5">
                                        <Layers className="w-3 h-3 mr-1" />
                                        Alinhado
                                    </Badge>
                                )}
                            </div>
                        </div>
                    </div>
                </CollapsibleTrigger>
                <CollapsibleContent>
                    <div className="ml-6 border-l border-neutral-200 dark:border-neutral-800 pl-4 space-y-2">
                        {hasDetails && (
                            <div className="space-y-1 py-2">
                                {field.query && (
                                    <div className="flex items-start gap-2 text-xs">
                                        <span className="text-neutral-500 min-w-[60px]">query:</span>
                                        <code className="bg-neutral-100 dark:bg-neutral-800 px-2 py-1 rounded text-neutral-700 dark:text-neutral-50 flex-1">
                                            {field.query}
                                        </code>
                                    </div>
                                )}
                                {field.extractor && (
                                    <div className="flex items-start gap-2 text-xs">
                                        <span className="text-neutral-500 min-w-[60px]">extract:</span>
                                        <code className="bg-neutral-100 dark:bg-neutral-800 px-2 py-1 rounded text-neutral-700 dark:text-neutral-50 flex-1">
                                            {field.extractor}
                                        </code>
                                    </div>
                                )}
                                {field.default !== undefined && (
                                    <div className="flex items-start gap-2 text-xs">
                                        <span className="text-neutral-500 min-w-[60px]">default:</span>
                                        <code className="bg-neutral-100 dark:bg-neutral-800 px-2 py-1 rounded text-neutral-700 dark:text-neutral-50 flex-1">
                                            {typeof field.default === "string"
                                                ? `"${field.default}"`
                                                : JSON.stringify(field.default)}
                                        </code>
                                    </div>
                                )}
                            </div>
                        )}
                        {hasNested && (
                            <ModelNode
                                model={field.nested}
                                nodeId={`${nodeId}.nested`}
                                expandedNodes={expandedNodes}
                                onToggle={onToggle}
                                getTypeIcon={getTypeIcon}
                                level={level + 1}
                                fieldName="nested"
                            />
                        )}
                    </div>
                </CollapsibleContent>
            </Collapsible>
        </div>
    )
}
