import { Theme } from '../../App'
import React, { useContext } from 'react'
import './switchButton.css'

function SwitchButton() {
    const { lightTheme, setLightTheme } = useContext(Theme)
    return (
        <div className='switch__container'>
            <label className='switch'>
                <input
                    checked={!lightTheme}
                    name='theme'
                    type='radio'
                    onChange={() => {
                        setLightTheme(false)
                    }}
                />
                <span className='slider round'></span>
                <span>Dark</span>
            </label>
            <label className='switch'>
                <input
                    checked={lightTheme}
                    name='theme'
                    type='radio'
                    onChange={() => {
                        setLightTheme(true)
                    }}
                />
                <span className='slider round'></span>
                <span>Light</span>
            </label>
        </div>
    )
}

export { SwitchButton }
