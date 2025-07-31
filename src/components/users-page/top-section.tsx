import { LuCirclePlus } from "react-icons/lu"
import { FC } from "react"

import { Typography } from "@/components/ui/typography"
import CreateUserDialog from "./create-user-dialog"
import { Button } from "@/components/ui/button"

const UsersPageTopSection: FC = () => {
    return (
        <section className="pb-4">
            <div className="flex items-center justify-between">
                <Typography.H1>Usuários</Typography.H1>
                <CreateUserDialog>
                    <Button size="sm">
                        <LuCirclePlus />
                        Criar usuário
                    </Button>
                </CreateUserDialog>
            </div>
            <Typography.Muted className="mt-4 text-sm">
                Esta é a listagem dos Usuários criados, você também pode navegar para a página de cada User ou criar um
                Usuário novo.
            </Typography.Muted>
        </section>
    )
}

export default UsersPageTopSection
