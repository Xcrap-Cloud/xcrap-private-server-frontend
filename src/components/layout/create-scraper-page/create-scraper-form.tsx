"use client"

import { LuPlus } from "react-icons/lu"
import { FC } from "react"

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import useCreateScraperForm from "@/hooks/forms/use-create-scraper-form"
import { CreateScraperDto } from "@/dto/scrapers/create-scraper"
import ClientSelectorDialog from "./client-selector-dialog"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

type Props = {
    accessToken: string
}

const CreateScraperForm: FC<Props> = ({ accessToken }) => {
    const form = useCreateScraperForm()

    const onSubmit = (data: CreateScraperDto) => {
        console.log(data)
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="grid grid-cols-2 gap-x-2 gap-y-6">
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
                                    <Button variant="outline">
                                        {field.value ? `Cliente #${field.value}` : "Selecionar Cliente"}
                                    </Button>
                                </ClientSelectorDialog>
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
