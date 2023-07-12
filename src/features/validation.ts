export const validateEmail = (value: string) => {
    return value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)
        ? 'Invalid email address'
        : undefined
}

export const validateRequired = (value: string) => (value || typeof value === 'number' ? undefined : 'Required')

export const validateMinLength = (min: number) => (value: string) => {
    return value && value.length < min ? `Must be ${min} characters or more` : undefined
}