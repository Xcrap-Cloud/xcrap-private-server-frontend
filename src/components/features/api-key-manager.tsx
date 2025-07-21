import { LuCheck, LuCopy, LuEye, LuEyeOff, LuRefreshCw } from "react-icons/lu"
import { FC, useState } from "react"
import { toast } from "sonner"

import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"

type Props = {
    className?: string
    apiKey: string
    onRegenerate: () => Promise<void>
}

const ApiKeyManager: FC<Props> = ({ className, apiKey, onRegenerate }) => {
    const [isVisible, setIsVisible] = useState(false)
    const [isCopied, setIsCopied] = useState(false)
    const [isRegenerating, setIsRegenerating] = useState(false)

    const toggleVisibility = () => {
        setIsVisible(!isVisible)
    }

    const copyToClipboard = async () => {
        try {
            await navigator.clipboard.writeText(apiKey)

            setIsCopied(true)

            toast.success("Chave API copiada para a área de transferência.")
        } catch (err) {
            toast.error(apiKey)
        }
    }

    const handleRegenerate = async () => {
        setIsRegenerating(true)

        try {
            await onRegenerate()

            toast.success("Uma nova chave API foi gerada com sucesso.")
        } catch {
            toast.error("Ocorreu um erro ao gerar uma nova chave API.")
        } finally {
            setIsRegenerating(false)
        }
    }

    const displayValue = isVisible ? apiKey : "•".repeat(apiKey.length)

    return (
        <div className={cn("space-y-2", className)}>
            <Label htmlFor="api-key">Sua Chave API</Label>
            <div className="flex gap-2">
                <div className="relative flex-1">
                    <Input id="api-key" type="text" value={displayValue} readOnly className="font-mono text-sm pr-10" />
                    <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        className="absolute right-1 top-1/2 -translate-y-1/2 h-8 w-8"
                        onClick={toggleVisibility}
                    >
                        {isVisible ? <LuEyeOff className="h-4 w-4" /> : <LuEye className="h-4 w-4" />}
                        <span className="sr-only">{isVisible ? "Esconder chave" : "Mostrar chave"}</span>
                    </Button>
                </div>
                <Button
                    type="button"
                    variant="outline"
                    size="icon"
                    onClick={copyToClipboard}
                    className="shrink-0 bg-transparent cursor-pointer"
                >
                    {isCopied ? <LuCheck className="h-4 w-4 text-green-600" /> : <LuCopy className="h-4 w-4" />}
                    <span className="sr-only">Copiar chave</span>
                </Button>
                <Button
                    type="button"
                    variant="outline"
                    size="icon"
                    onClick={handleRegenerate}
                    disabled={isRegenerating}
                    className="shrink-0 bg-transparent cursor-pointer"
                >
                    <LuRefreshCw className={`h-4 w-4 ${isRegenerating ? "animate-spin" : ""}`} />
                    <span className="sr-only">Regenerar chave</span>
                </Button>
            </div>
        </div>
    )
}

export default ApiKeyManager
