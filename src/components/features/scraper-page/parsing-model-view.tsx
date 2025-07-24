"use client"

import { ChevronDown, ChevronRight, Code, Layers, Brackets } from "lucide-react"
import { useState } from "react"

import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { getParsingModelTypeIcon } from "@/utils/get-parsing-model-type-icon"
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

    return (
        <div className="font-mono text-sm">
            <ModelNode
                model={parsingModel}
                nodeId="root"
                expandedNodes={expandedNodes}
                onToggle={toggleNode}
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
    level: number
    fieldName?: string
}

function ModelNode({ model, nodeId, expandedNodes, onToggle, level, fieldName }: ModelNodeProps) {
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
                            {getParsingModelTypeIcon(model.type)}
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
    level: number
}

function FieldNode({ fieldName, field, nodeId, expandedNodes, onToggle, level }: FieldNodeProps) {
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
