import { Theme } from '../../App'
import React, { createContext, useContext, useState } from 'react'
import './switchButton.css'

interface IProps {
    setTheme: (value: string) => void
}

function SwitchButton({ setTheme }: IProps) {
    const theme = useContext(Theme)
    return (
        <div className='switch__container'>
            <label className='switch'>
                <input
                    type='checkbox'
                    onChange={() => {
                        if (theme === 'light') {
                            setTheme('dark')
                        } else {
                            setTheme('light')
                        }
                    }}
                />
                <span className='slider round'></span>
            </label>
            <span>Dark theme</span>
        </div>
    )
}

export { SwitchButton }
