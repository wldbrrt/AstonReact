export const getDateFromIsoString = (isoDate: string, isTimeShown = false) => {
    const date = new Date(isoDate)
    const resultDate =
        date.getDate() + '/' + (date.getMonth() + 1) + '/' + date.getFullYear()

    const resultDateWithTime =
        resultDate +
        ' ' +
        date.getHours() +
        ':' +
        date.getMinutes() +
        ':' +
        date.getSeconds()

    return isTimeShown ? resultDateWithTime : resultDate
}
