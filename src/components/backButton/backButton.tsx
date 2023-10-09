import React from 'react'
import { useNavigate } from 'react-router-dom'
import './backButton.css'

export const BackButton = () => {
    const navigate = useNavigate()
    return (
        <div className='backButton__wrapper'>
            <button
                className='button backButton'
                onClick={() => navigate(-1)}
            >
                GO BACK
            </button>
        </div>
    )
}
