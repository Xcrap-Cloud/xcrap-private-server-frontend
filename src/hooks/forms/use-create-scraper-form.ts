import { classValidatorResolver } from "@hookform/resolvers/class-validator"
import { useForm } from "react-hook-form"

import { ParsingModelFieldType } from "@/enums/scrapers/parsing-model-field-type"
import { CreateScraperDto } from "@/dto/scrapers/create-scraper"
import configHelper from "@/helpers/config"

const useCreateScraperForm = () => {
    const form = useForm({
        resolver: classValidatorResolver(CreateScraperDto),
        defaultValues: {
            name: "",
            description: "",
            clientId: configHelper.clients.defaultId,
            defaultUrl: "",
            parsingModel: {
                type: ParsingModelFieldType.HTML,
                model: {},
            },
            requestConfig: {},
        },
    })

    return form
}

export default useCreateScraperForm
