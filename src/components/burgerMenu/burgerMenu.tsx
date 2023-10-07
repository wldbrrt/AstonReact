import { Navigation } from '../header/navigation'
import React, { useState } from 'react'
import './burgerMenu.css'

export const BurgerMenu = () => {
    const [isMenuActive, setIsMenuActive] = useState<boolean>(false)
    const toggleBurgerMenu = () => {
        setIsMenuActive(value => !value)
    }
    return (
        <div className='burgerMenu__wrapper'>
            <button
                onClick={() => toggleBurgerMenu()}
                className='burgerMenu__button'
            >
                <span
                    className={
                        isMenuActive
                            ? 'burgerMenu__lines burgerMenu__lines_active'
                            : 'burgerMenu__lines'
                    }
                ></span>
            </button>
            <div
                className={
                    isMenuActive ? 'burgerMenu burgerMenu_active' : 'burgerMenu'
                }
            >
                <Navigation setIsMenuActive={setIsMenuActive} />
            </div>
        </div>
    )
}
