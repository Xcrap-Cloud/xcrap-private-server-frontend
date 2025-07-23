"use client"

import { QueryClientProvider } from "@tanstack/react-query"
import { FC, ReactNode } from "react"

import { queryClient } from "@/helpers/react-query"

type Props = {
    children: ReactNode
}

const ClientsLayout: FC<Props> = ({ children }) => {
    return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
}

export default ClientsLayout
