import React from 'react';
import { WrappedFieldInputProps } from 'redux-form'

interface InputProps {
    input: WrappedFieldInputProps,
    placeholder: string,
    type: string,
    meta: {
        touched: boolean,
        error: string,
        warning: string | undefined
    }

}

function Input({ input, placeholder, type, meta: { touched, error, warning } }: InputProps) {
    return (
        <div>
            <label>{placeholder}</label>
            <div>
                <input {...input} placeholder={placeholder} type={type} />
                {touched &&
                    ((error && <span>{error}</span>) ||
                        (warning && <span>{warning}</span>))}
            </div>
        </div>
    )
}

export { Input }