// truncate decimals to not round when using Intl.NumberFormat
function truncate(number: number, digits: number) {
    return Math.trunc(number * Math.pow(10, digits)) / Math.pow(10, digits)
}

function setDecimalLength(value: number, minLength: number, maxLength: number) {
    return new Intl.NumberFormat('en-US', {
        minimumFractionDigits: minLength,
        maximumFractionDigits: maxLength
    }).format(truncate(value, maxLength))
}

export function zeroDecimals(value: number) {
    return setDecimalLength(value, 0, 0)
}

export function isNotAvailable(value: number) {
    return value === -1 || value === null
}

export function percent(number = 0) {
    if (isNotAvailable(number)) {
        return number
    }

    return (
        new Intl.NumberFormat('en-US', {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
        }).format(Math.round(number * 10000) / 100) + `%`
    )
}