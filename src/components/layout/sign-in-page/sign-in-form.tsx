"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useRouter } from "next/navigation"
import { useForm } from "react-hook-form"
import { signIn } from "next-auth/react"
import { FC, useState } from "react"
import * as z from "zod"

import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"

type Props = React.ComponentProps<"div">

// 1. Defina o schema de validação com Zod
const formSchema = z.object({
    username: z.string().email("Por favor, insira um email válido."),
    password: z.string().min(6, "A senha deve ter no mínimo 6 caracteres."),
})

type FormData = z.infer<typeof formSchema>

const SignInForm: FC<Props> = ({ className, ...props }) => {
    const [isLoading, setIsLoading] = useState(false)
    const [loginError, setLoginError] = useState<string | null>(null)
    const router = useRouter()

    // 2. Inicialize o formulário usando useForm
    const form = useForm<FormData>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            username: "",
            password: "",
        },
    })

    // 3. Defina a função de envio
    const onSubmit = async (values: FormData) => {
        setIsLoading(true)
        setLoginError(null)

        const result = await signIn("credentials", {
            ...values,
            redirect: false,
        })

        setIsLoading(false)

        if (result?.error) {
            console.error(result.error)
            setLoginError("Credenciais inválidas. Verifique seu email e senha.")
        } else {
            router.push("/scrapers")
        }
    }

    return (
        <div className={cn("flex flex-col gap-6", className)} {...props}>
            <Card>
                <CardHeader>
                    <CardTitle>Entre na sua conta</CardTitle>
                    <CardDescription>Insira seu email e senha para acessar a plataforma</CardDescription>
                </CardHeader>
                <CardContent>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)}>
                            <div className="flex flex-col gap-6">
                                <FormField
                                    control={form.control}
                                    name="username"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Email</FormLabel>
                                            <FormControl>
                                                <Input placeholder="m@example.com" type="email" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="password"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Senha</FormLabel>
                                            <FormControl>
                                                <Input placeholder="********" type="password" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                {loginError && <p className="text-red-500 text-sm">{loginError}</p>}
                                <div className="flex flex-col gap-3">
                                    <Button type="submit" className="w-full" disabled={isLoading}>
                                        {isLoading ? "Entrando..." : "Entrar"}
                                    </Button>
                                </div>
                            </div>
                        </form>
                    </Form>
                </CardContent>
            </Card>
        </div>
    )
}

export default SignInForm
