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
        <div className='form__input'>
            <label className='form__name'>{placeholder}</label>
            <div className='form__item'>
                <input
                    {...input}
                    placeholder={placeholder}
                    type={type}
                    className='form__field'
                />
                {touched &&
                    ((error && <span>{error}</span>) ||
                        (warning && <span>{warning}</span>))}
            </div>
        </div>
    )
}

export { Input }
