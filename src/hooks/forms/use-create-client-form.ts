import { classValidatorResolver } from "@hookform/resolvers/class-validator"
import { useForm } from "react-hook-form"

import { CreateClientDto } from "@/dto/clients/create-client"
import { ClientType } from "@/enums/clients/client-type"

const useCreateClientForm = () => {
    const form = useForm({
        resolver: classValidatorResolver(CreateClientDto),
        defaultValues: {
            name: "",
            description: "",
            type: ClientType.axios,
        },
    })

    return form
}

export default useCreateClientForm
