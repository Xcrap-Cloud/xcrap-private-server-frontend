import axios from "axios"

import configHelper from "../../helpers/config"

export const api = axios.create({
    baseURL: configHelper.apiUrl,
})
