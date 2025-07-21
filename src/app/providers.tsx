import { ThemeProvider } from "next-themes"
import { FC, ReactNode } from "react"

type Props = {
    children: ReactNode
}

const Providers: FC<Props> = ({ children }) => {
    return (
        <ThemeProvider attribute="class" enableSystem={true} defaultTheme="system" themes={["light", "dark"]}>
            {children}
        </ThemeProvider>
    )
}

export default Providers
