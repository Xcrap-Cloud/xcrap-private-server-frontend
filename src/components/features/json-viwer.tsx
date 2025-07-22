"use client"

import { LuChevronRight, LuChevronDown } from "react-icons/lu"
import { BsCopy, BsDownload } from "react-icons/bs"
import { useState } from "react"
import { toast } from "sonner"

import download from "downloadjs"

import { Separator } from "@/components/ui/separator"
import { Button } from "@/components/ui/button"

type Props = {
    data: any
    initialExpanded?: boolean
    fileName?: string
}

type ExpandedState = {
    [key: string]: boolean
}

export default function JsonViewer({ data, initialExpanded = false, fileName }: Props) {
    const [expanded, setExpanded] = useState<ExpandedState>({})
    const keysLength = Object.keys(data).length

    const toggleExpand = (key: string) => {
        setExpanded((prev) => ({ ...prev, [key]: !prev[key] }))
    }

    const generateRandomFilename = () => {
        const timestamp = new Date().getTime()
        const randomSuffix = Math.floor(Math.random() * 1000000)
            .toString()
            .padStart(6, "0")
        return `xcrap-export-${timestamp}-${randomSuffix}.json`
    }

    const handleDownloadButtonClick = async () => {
        const content = JSON.stringify(data, null, 4)
        const finalFileName = fileName ?? generateRandomFilename()

        download(content, finalFileName, "application/json")
    }

    const handleCopyButtonClick = async () => {
        const jsonString = JSON.stringify(data, null, 2)
        navigator.clipboard.writeText(jsonString)

        toast.info("Objeto JSON copiado apra a Área de Transferência!")
    }

    const renderValue = (value: any, key: string, path: string) => {
        const currentPath = `${path}.${key}`
        const isExpanded = expanded[currentPath] ?? initialExpanded

        if (Array.isArray(value)) {
            return (
                <div>
                    <Button
                        variant="ghost"
                        size="sm"
                        className="p-0 h-auto font-mono px-2 py-1"
                        onClick={() => toggleExpand(currentPath)}
                    >
                        {isExpanded ? (
                            <LuChevronDown className="h-4 w-4 mr-1" />
                        ) : (
                            <LuChevronRight className="h-4 w-4 mr-1" />
                        )}
                        Array[{value.length}]
                    </Button>
                    {isExpanded && (
                        <div className="ml-4 border-l-2 border-neutral-300 dark:border-neutral-600 pl-2">
                            {value.map((item: any, index: number) => (
                                <div key={index} className="my-1">
                                    {renderValue(item, index.toString(), currentPath)}
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            )
        } else if (typeof value === "object" && value !== null) {
            return (
                <div>
                    <Button
                        variant="ghost"
                        size="sm"
                        className="p-0 h-auto font-mono px-2 py-1"
                        onClick={() => toggleExpand(currentPath)}
                    >
                        {isExpanded ? (
                            <LuChevronDown className="h-4 w-4 mr-1" />
                        ) : (
                            <LuChevronRight className="h-4 w-4 mr-1" />
                        )}
                        Object
                    </Button>
                    {isExpanded && (
                        <div className="ml-4 border-l-2 border-neutral-300 dark:border-neutral-600 pl-2">
                            {Object.entries(value).map(([k, v]) => (
                                <div key={k} className="my-1 flex gap-1">
                                    <span className="font-mono text-blue-600">{k}: </span>
                                    {renderValue(v, k, currentPath)}
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            )
        } else {
            return <span className="font-mono">{JSON.stringify(value)}</span>
        }
    }

    return (
        <div className="p-4 rounded-lg shadow border-neutral-300 dark:border-neutral-700 border-[1px] font-mono">
            <div className="flex items-center gap-2 pb-2">
                <Button
                    onClick={handleDownloadButtonClick}
                    className="flex gap-2 items-center"
                    variant="secondary"
                    size="xs"
                >
                    <BsDownload />
                    <span>Baixar JSON</span>
                </Button>
                <Button
                    className="flex gap-2 items-center"
                    onClick={handleCopyButtonClick}
                    variant="secondary"
                    size="xs"
                >
                    <BsCopy />
                    <span>Copiar JSON</span>
                </Button>
                <span className="text-neutral-400 ml-2 text-sm">
                    ({keysLength} {keysLength === 1 ? "key" : "keys"})
                </span>
            </div>
            <Separator className="my-2" />
            {renderValue(data, "root", "")}
        </div>
    )
}
