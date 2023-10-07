export const formatDate = (date: string) => {
    const formatDate = new Date(date)
    const result = `${formatDate.getFullYear()}-${formatDate.getMonth()}-${formatDate.getDay()}`
    return Date.parse(result)
}
