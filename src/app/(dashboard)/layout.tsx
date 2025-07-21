"use client"

import { SessionProvider } from "next-auth/react"
import { useEffect, useState } from "react"

import { SidebarProvider, SidebarTrigger } from "../../components/ui/sidebar"
import AppSidebar from "../../components/layout/application/app-sidebar"
import { ThemeSwitcher } from "../../components/features/theme-switcher"

export default function DashboardLayout({
    children,
}: Readonly<{
    children: React.ReactNode
}>) {
    const [defaultOpen, setDefaultOpen] = useState(false)

    useEffect(() => {
        const cookieValue = document.cookie
            .split("; ")
            .find((row) => row.startsWith("sidebar_state="))
            ?.split("=")[1]

        setDefaultOpen(cookieValue === "true")
    }, [])

    return (
        <SessionProvider>
            <SidebarProvider defaultOpen={defaultOpen}>
                <AppSidebar />
                <main className="w-full">
                    <div className="h-16 flex items-center justify-between px-4">
                        <div className="flex items-center space-x-2">
                            <SidebarTrigger />
                            <span className="text-xs">Menu</span>
                        </div>
                        <ThemeSwitcher />
                    </div>
                    <div className="px-4">{children}</div>
                </main>
            </SidebarProvider>
        </SessionProvider>
    )
}
