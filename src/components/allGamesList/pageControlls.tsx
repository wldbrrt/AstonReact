import React from 'react'
import './pageControlls.css'

interface PageControllsProps {
    page: number
    onClickHandler: (page: number) => void
    isLastPage: boolean
    isLoading: boolean
    isFetching: boolean
}

function PageControlls({
    page,
    onClickHandler,
    isLastPage,
    isLoading,
    isFetching,
}: PageControllsProps) {
    const scrollToTop = () => {
        window.scrollTo({ top: 0 })
    }

    return (
        <div className='pageControlls'>
            <button
                disabled={page <= 1 || isLoading || isFetching}
                onClick={() => {
                    onClickHandler(1)
                    scrollToTop()
                }}
                className='pageControlls_button button pageControlls__button_toFirst'
            >
                <svg
                    xmlns='http://www.w3.org/2000/svg'
                    width='26'
                    height='32'
                    viewBox='0 0 26 32'
                    fill='none'
                >
                    <path
                        className='pageControlls_icon'
                        d='M0.292893 23.2929C-0.0976311 23.6834 -0.0976311 24.3166 0.292893 24.7071L6.65685 31.0711C7.04738 31.4616 7.68054 31.4616 8.07107 31.0711C8.46159 30.6805 8.46159 30.0474 8.07107 29.6569L2.41421 24L8.07107 18.3431C8.46159 17.9526 8.46159 17.3195 8.07107 16.9289C7.68054 16.5384 7.04738 16.5384 6.65685 16.9289L0.292893 23.2929ZM26 23L1 23L1 25L26 25V23ZM26 25V0H24V25H26Z'
                    />
                </svg>
                to №1
            </button>
            <button
                disabled={page <= 1 || isLoading || isFetching}
                onClick={() => {
                    onClickHandler(page - 1)
                    scrollToTop()
                }}
                className='pageControlls_button button'
            >
                <svg
                    xmlns='http://www.w3.org/2000/svg'
                    width='26'
                    height='16'
                    viewBox='0 0 26 16'
                    fill='none'
                >
                    <path
                        className='pageControlls_icon'
                        d='M0.292892 7.2929C-0.0976315 7.68342 -0.0976314 8.31658 0.292893 8.70711L6.65686 15.0711C7.04738 15.4616 7.68054 15.4616 8.07107 15.0711C8.46159 14.6805 8.46159 14.0474 8.07107 13.6569L2.41421 8L8.07107 2.34315C8.46159 1.95262 8.46159 1.31946 8.07107 0.928934C7.68054 0.538409 7.04738 0.538409 6.65685 0.928934L0.292892 7.2929ZM26 7L1 7L1 9L26 9L26 7Z'
                    />
                </svg>
                prev
            </button>
            <button
                disabled={isLastPage || isLoading || isFetching}
                onClick={() => {
                    onClickHandler(page + 1)
                    scrollToTop()
                }}
                className='pageControlls_button button'
            >
                next
                <svg
                    xmlns='http://www.w3.org/2000/svg'
                    width='26'
                    height='16'
                    viewBox='0 0 26 16'
                    fill='none'
                >
                    <path
                        className='pageControlls_icon'
                        d='M25.7071 8.70711C26.0976 8.31658 26.0976 7.68342 25.7071 7.29289L19.3431 0.928932C18.9526 0.538408 18.3195 0.538408 17.9289 0.928932C17.5384 1.31946 17.5384 1.95262 17.9289 2.34315L23.5858 8L17.9289 13.6569C17.5384 14.0474 17.5384 14.6805 17.9289 15.0711C18.3195 15.4616 18.9526 15.4616 19.3431 15.0711L25.7071 8.70711ZM0 9L25 9V7L0 7L0 9Z'
                    />
                </svg>
            </button>
        </div>
    )
}

export { PageControlls }
