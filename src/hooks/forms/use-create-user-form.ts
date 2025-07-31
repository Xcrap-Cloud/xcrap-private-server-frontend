import { classValidatorResolver } from "@hookform/resolvers/class-validator"
import { useForm } from "react-hook-form"

import { CreateUserDto } from "@/dto/users/create-user"
import { UserRole } from "@/enums/users/role"

export const useCreateUserForm = () => {
    const form = useForm({
        resolver: classValidatorResolver(CreateUserDto),
        defaultValues: {
            email: "",
            name: "",
            password: "",
            username: "",
            role: UserRole.USER,
        },
    })

    return form
}
