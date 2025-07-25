"use client"

import { useFormContext } from "react-hook-form"
import { ChangeEvent, FC } from "react"

import { LuBraces, LuBrackets, LuLayers, LuTrash } from "react-icons/lu"

import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { CreateScraperDto } from "@/dto/scrapers/create-scraper"
import { getExtractorName } from "@/utils/get-extractor-name"
import { getExtractorIcon } from "@/utils/get-extractor-icon"
import { Typography } from "@/components/ui/typography"
import { Extractor } from "@/enums/scrapers/extractor"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"

type Props = {
    path: string
    name: string
    onRemove: () => void
    onRename: (newName: string) => any
}

const ParsingModelField: FC<Props> = ({ path, name, onRemove, onRename }) => {
    const form = useFormContext<CreateScraperDto>()

    const handleChangeInputName = (event: ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value
        onRename(value)
    }

    return (
        <Card>
            <CardHeader>
                <div className="flex justify-between items-center">
                    <div className="flex gap-2">
                        <Label htmlFor={`field-${name}-name-input`} className="whitespace-nowrap text-xs">
                            Nome *:
                        </Label>
                        <Input
                            id={`field-${name}-name-input`}
                            size="xs"
                            placeholder="#element"
                            value={name}
                            onChange={handleChangeInputName}
                            className="max-w-48"
                        />
                    </div>
                    <div className="flex gap-2">
                        <FormField
                            control={form.control}
                            name={`${path}.multiple` as any}
                            render={({ field }) => (
                                <FormItem>
                                    <FormControl>
                                        <button
                                            type="button"
                                            onClick={() => field.onChange(!field.value)}
                                            className="cursor-pointer select-none"
                                        >
                                            <Badge
                                                title={field.value ? "Trocar para único" : "Trocar para múltiplo"}
                                                variant={field.value ? "default" : "outline"}
                                                className="flex items-center"
                                            >
                                                {field.value ? (
                                                    <>
                                                        <LuBrackets />
                                                        Múltiplo
                                                    </>
                                                ) : (
                                                    <>
                                                        <LuBraces />
                                                        Único
                                                    </>
                                                )}
                                            </Badge>
                                        </button>
                                    </FormControl>
                                </FormItem>
                            )}
                        />
                        <Button
                            variant="ghost"
                            type="button"
                            className="rounded-full text-red-400 hover:text-red-500 transition-colors duration-300"
                            size="xs"
                            onClick={onRemove}
                        >
                            <LuTrash />
                        </Button>
                    </div>
                </div>
            </CardHeader>
            <CardContent className="grid grid-cols-2 gap-x-2 gap-y-6">
                {/* <div className="space-y-2 col-span-2">
                    <Label>Nome *</Label>
                    <Input size="xs" placeholder="#element" value={name} onChange={handleChangeInputName} />
                </div> */}
                <FormField
                    control={form.control}
                    name={`${path}.query` as any}
                    render={() => (
                        <FormItem>
                            <FormLabel>Query (opcional)</FormLabel>
                            <FormControl>
                                <Input placeholder="#element" />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name={`${path}.extractor` as any}
                    render={() => (
                        <FormItem>
                            <FormLabel>Extrator (opcional)</FormLabel>
                            <FormControl>
                                <Select>
                                    <SelectTrigger className="w-full">
                                        <SelectValue placeholder="Selecione um Extrator" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectGroup>
                                            <SelectLabel>Extratores</SelectLabel>
                                            {Object.values(Extractor).map((extractor) => (
                                                <SelectItem value={extractor} key={extractor}>
                                                    {getExtractorIcon(extractor)} {getExtractorName(extractor)}
                                                </SelectItem>
                                            ))}
                                        </SelectGroup>
                                    </SelectContent>
                                </Select>
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name={`${path}.default` as any}
                    render={() => (
                        <FormItem className="col-span-2">
                            <FormLabel>Valor padrão (opcional)</FormLabel>
                            <FormControl>
                                <Textarea className="min-h-24" />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <div className="flex justify-end col-span-2">
                    <Button size="xs" variant="secondary">
                        <LuLayers /> Adicionar Alinhamento
                    </Button>
                </div>
            </CardContent>
        </Card>
    )
}

export default ParsingModelField
