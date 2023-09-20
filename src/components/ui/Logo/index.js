import React from 'react'

const Logo = () => {
    return (
        <div className='hidden gap-6 lg:flex'>
            <a className='hidden items-center space-x-2 lg:flex' href='/'>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6" aria-hidden="true"><path stroke="none" d="M0 0h24v24H0z" fill="none"></path><circle cx="7" cy="15" r="2"></circle><circle cx="17" cy="15" r="2"></circle><path d="M3 9a2 1 0 0 0 2 1h14a2 1 0 0 0 2 -1"></path></svg>
                <span className="hidden font-bold lg:inline-block">Skateshop</span>
            </a>
        </div>
    )
}

export default Logo