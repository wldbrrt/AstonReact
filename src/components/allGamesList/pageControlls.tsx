import React from 'react'
import './pageControlls.css'

interface PageControllsProps {
    page: number
    onClickHandler: (page: number) => void
    isLastPage: boolean | undefined
}

function PageControlls({
    page,
    onClickHandler,
    isLastPage,
}: PageControllsProps) {
    const scrollToTop = () => {
        window.scrollTo({ top: 0 })
    }

    return (
        <div className='pageControlls'>
            <button
                disabled={page <= 1}
                onClick={() => {
                    onClickHandler(page - 1)
                    scrollToTop()
                }}
                className='pageControlls_button'
            >
                previous
            </button>
            <button
                disabled={page <= 1}
                onClick={() => {
                    onClickHandler(1)
                    scrollToTop()
                }}
                className='pageControlls_button'
            >
                back to 1
            </button>
            <button
                disabled={isLastPage}
                onClick={() => {
                    onClickHandler(page + 1)
                    scrollToTop()
                }}
                className='pageControlls_button'
            >
                next
            </button>
        </div>
    )
}

export { PageControlls }
