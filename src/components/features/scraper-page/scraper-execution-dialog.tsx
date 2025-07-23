"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { LuPlay } from "react-icons/lu"
import { FC, useState } from "react"
import z from "zod"

import { DialogClose } from "@radix-ui/react-dialog"

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

type BaseProps = {
    children: React.ReactNode
}

type WithUrl = BaseProps & {
    sholdProvideUrl: true
    disabled?: boolean
    onExecute: (url: string) => void
}

type WithoutUrl = BaseProps & {
    sholdProvideUrl?: false | undefined
    disabled?: boolean
    onExecute: (url?: string | undefined) => void
}

type Props = WithUrl | WithoutUrl

const formSchema = z.object({
    url: z
        .string()
        .transform((val) => (val.trim() === "" ? undefined : val))
        .optional()
        .pipe(z.string().url().optional()),
})

type FormValues = z.infer<typeof formSchema>

const ScraperExecutionDialog: FC<Props> = ({ children, onExecute, sholdProvideUrl, disabled }) => {
    const [open, setOpen] = useState(false)

    const form = useForm<FormValues>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            url: "",
        },
    })

    const handleSubmit = (data: FormValues) => {
        form.reset()

        if (sholdProvideUrl) {
            if (!data.url) {
                form.setError("url", { message: "A URL é obrigatória." })
                return
            }

            onExecute(data.url)
        } else {
            onExecute(data.url)
        }

        setOpen(false)
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger disabled={disabled} asChild>
                {children}
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Execução de Scraper</DialogTitle>
                    <DialogDescription>
                        {sholdProvideUrl
                            ? "Informe a URL que será utilizada na execução."
                            : "Tem certeza que deseja executar o scraper?"}
                    </DialogDescription>
                </DialogHeader>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4 py-4">
                        <FormField
                            control={form.control}
                            name="url"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>URL Alvo {sholdProvideUrl && "*"}</FormLabel>
                                    <FormControl>
                                        <Input placeholder="https://example.com" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <DialogFooter>
                            <DialogClose asChild>
                                <Button variant="secondary">Cancelar</Button>
                            </DialogClose>
                            <Button type="submit">
                                <LuPlay />
                                Executar
                            </Button>
                        </DialogFooter>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    )
}

export default ScraperExecutionDialog
