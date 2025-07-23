"use client"

import { LuPlus } from "react-icons/lu"
import { FC } from "react"

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import useCreateClientForm from "@/hooks/forms/use-create-client-form"
import { CreateClientDto } from "@/dto/clients/create-client"
import { renderClientType } from "@/utils/render-client-type"
import { ClientType } from "@/enums/clients/client-type"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

type Props = {
    accessToken: string
}

const CreateClientForm: FC<Props> = ({ accessToken }) => {
    const form = useCreateClientForm()

    const onSubmit = (data: CreateClientDto) => {
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
                                <Input placeholder="Cliente Axios Especial..." {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="type"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Tipo *</FormLabel>
                            <FormControl>
                                <Select {...field} onValueChange={field.onChange}>
                                    <SelectTrigger className="w-full">
                                        <SelectValue placeholder="Tipos de Cliente" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {Object.values(ClientType).map((clientType) => (
                                            <SelectItem value={clientType} key={clientType}>
                                                {renderClientType(clientType)}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
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
                                <Textarea placeholder="Este Cliente Axios Especial faz..." {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <div className="col-span-2">
                    <Button>
                        <LuPlus /> Criar Cliente
                    </Button>
                </div>
            </form>
        </Form>
    )
}

export default CreateClientForm
