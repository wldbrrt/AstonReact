import React, { useEffect } from 'react'
import { WrappedFieldInputProps } from 'redux-form'

interface InputProps {
    input: WrappedFieldInputProps
    placeholder: string
    type: string
    meta: {
        touched: boolean
        error: string
        warning: string | undefined
        invalid: boolean
    }
    setValid: (value: boolean) => void
}

function Input({
    input,
    placeholder,
    type,
    meta: { touched, error, warning, invalid },
    setValid,
}: InputProps) {
    useEffect(() => {
        setValid(invalid)
    }, [invalid])

    return (
        <div>
            <label>{placeholder}</label>
            <div>
                <input
                    {...input}
                    placeholder={placeholder}
                    type={type}
                />
                {touched &&
                    ((error && <span>{error}</span>) ||
                        (warning && <span>{warning}</span>))}
            </div>
        </div>
    )
}

export { Input }
