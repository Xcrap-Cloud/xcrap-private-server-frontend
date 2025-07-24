"use client"

import { useFormContext } from "react-hook-form"
import { LuPlus } from "react-icons/lu"
import { FC } from "react"

import { CreateScraperDto } from "@/dto/scrapers/create-scraper"
import { Extractor } from "@/enums/scrapers/extractor"
import { Separator } from "@/components/ui/separator"
import ParsingModelField from "./parsing-model-field"
import { Button } from "@/components/ui/button"

type Props = {
    basePath: string
}

const ParsingModelFields: FC<Props> = ({ basePath }) => {
    const form = useFormContext<CreateScraperDto>()
    const values = form.getValues(basePath as any)
    const fieldsCount = Object.keys(values).length
    const hasFields = fieldsCount > 0

    const addField = (field: string) => {
        form.setValue(`${basePath}.${field}` as any, {
            query: "",
            extractor: Extractor.InnerText,
            multiple: false,
        })
    }

    const removeField = (field: string) => {
        const newModel = { ...values }
        delete newModel[field]
        form.setValue(basePath as any, newModel)
    }

    const renameField = (oldName: string, newName: string) => {
        if (!values[oldName] || oldName === newName || values[newName]) return

        const orderedEntries = Object.entries(values).map(([key, value]) =>
            key === oldName ? [newName, value] : [key, value],
        )

        const reorderedObject = Object.fromEntries(orderedEntries)

        form.setValue(basePath as any, reorderedObject)
        form.clearErrors(`${basePath}.${oldName}` as any)
    }

    const handleClickOnAddFieldButton = () => {
        addField(`field_${fieldsCount}`)
    }

    return (
        <div>
            {hasFields && (
                <>
                    <div className="space-y-2">
                        {Object.keys(values).map((key) => (
                            <ParsingModelField
                                name={key}
                                path={`${basePath}.${key}`}
                                onRemove={() => removeField(key)}
                                onRename={(newName) => renameField(key, newName)}
                            />
                        ))}
                    </div>
                    <Separator className="my-6" />
                </>
            )}
            <Button type="button" variant="outline" size="xs" onClick={handleClickOnAddFieldButton} className="mt-4">
                <LuPlus /> Adicionar um campo
            </Button>
        </div>
    )
}

export default ParsingModelFields
