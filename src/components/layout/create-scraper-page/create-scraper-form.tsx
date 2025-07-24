"use client"

import { LuBraces, LuGlobe, LuInfo, LuPlus } from "react-icons/lu"
import { useRouter, useSearchParams } from "next/navigation"
import { FC } from "react"

import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { getParsingModelTypeIcon } from "@/utils/get-parsing-model-type-icon"
import useCreateScraperForm from "@/hooks/forms/use-create-scraper-form"
import { CreateScraperDto } from "@/dto/scrapers/create-scraper"
import ClientSelectorDialog from "./client-selector-dialog"
import ParsingModelBuilder from "./parsing-model-builder"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"

type Props = {
    accessToken: string
}

const CreateScraperForm: FC<Props> = ({ accessToken }) => {
    const router = useRouter()
    const searchParams = useSearchParams()
    const tab = searchParams.get("tab") || "basic-info"
    const form = useCreateScraperForm()
    const rootParsingModelType = form.watch("parsingModel.type")

    const handleTabChange = (newTab: string) => {
        const params = new URLSearchParams(Array.from(searchParams.entries()))

        params.set("tab", newTab)

        router.replace(`?${params.toString()}`, { scroll: false })
    }

    const onSubmit = (data: CreateScraperDto) => {
        console.log(data)
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <Tabs defaultValue="basic-info" value={tab} onValueChange={handleTabChange}>
                    <TabsList>
                        <TabsTrigger value="basic-info">
                            <LuInfo /> Informações Básicas
                        </TabsTrigger>
                        <TabsTrigger value="parsing-model">
                            <LuBraces /> Modelo de Parsing
                        </TabsTrigger>
                    </TabsList>
                    <TabsContent value="basic-info" className="grid grid-cols-2 gap-x-2 gap-y-6">
                        <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Nome *</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Scraper Axios Especial..." {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="clientId"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Cliente *</FormLabel>
                                    <FormControl>
                                        <ClientSelectorDialog accessToken={accessToken} {...field}>
                                            <Button variant="outline" className="overflow-hidden">
                                                {field.value ? (
                                                    <>
                                                        <LuGlobe /> Cliente #{field.value}
                                                    </>
                                                ) : (
                                                    "Selecionar Cliente"
                                                )}
                                            </Button>
                                        </ClientSelectorDialog>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="defaultUrl"
                            render={({ field }) => (
                                <FormItem className="col-span-2">
                                    <FormLabel>URL padrão (opcional)</FormLabel>
                                    <FormControl>
                                        <Input placeholder="https://example.com" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="description"
                            render={({ field }) => (
                                <FormItem className="col-span-2">
                                    <FormLabel>Descrição (opcional)</FormLabel>
                                    <FormControl>
                                        <Textarea placeholder="Este Scraper Axios Especial faz..." {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </TabsContent>
                    <TabsContent value="parsing-model">
                        <FormField
                            control={form.control}
                            name="parsingModel"
                            render={() => (
                                <FormItem className="col-span-2">
                                    <FormLabel>
                                        Modelo de parsing raiz *{" "}
                                        <Badge variant="outline">
                                            {getParsingModelTypeIcon(rootParsingModelType)} {rootParsingModelType}
                                        </Badge>
                                    </FormLabel>
                                    <FormControl>
                                        <ParsingModelBuilder />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </TabsContent>
                </Tabs>
                <div className="col-span-2">
                    <Button>
                        <LuPlus /> Criar Scraper
                    </Button>
                </div>
            </form>
        </Form>
    )
}

export default CreateScraperForm
