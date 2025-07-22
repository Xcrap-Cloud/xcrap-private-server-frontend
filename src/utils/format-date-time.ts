import * as dateFns from "date-fns"

const formatDateTime = (date: Date | string | number) => dateFns.format(date, "dd/MM/yyyy 'às' HH:mm:ss")

export default formatDateTime
