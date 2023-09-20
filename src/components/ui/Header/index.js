import React, { useState } from 'react'
import Logo from '../Logo'
import CategoryList from './CategoryList'
import { NavLink, useNavigate } from 'react-router-dom'
import { AppState } from '../../../context/AppProvider'
import { useSelector } from 'react-redux'
import { useGetCartOfUserQuery } from '../../../api/cart'

const Header = () => {
    const { data } = useGetCartOfUserQuery()
    const [isMenu, setIsMenu] = useState(false)
    const [isSearch, setIsSearch] = useState(false)
    const [value, setValue] = useState('')
    const navigate = useNavigate()
    const { userLogger, setUserLogger, setToken } = AppState()
    const { items } = useSelector(state => state.cartNoLogin)
    console.log(items);
    const totalLength = items.reduce((accumulator, currentValue) => accumulator + currentValue.quantity, 0)
    const logOut = () => {
        setUserLogger()
        setToken()
        localStorage.removeItem('user')
        localStorage.removeItem('token')
        navigate('/')
    }
    const onSubmit = (event) => {
        event.preventDefault()
        setValue("")
        setIsSearch(false)
        navigate(`/search/${value}`)
    }
    return (
        <>
            <header className='sticky w-full border-b bg-background'>
                <div className='container flex h-16 items-center'>
                    <Logo />
                    <CategoryList />
                    <div className='flex flex-1 items-center justify-end space-x-4'>
                        <nav className='flex items-center space-x-2'>
                            <button onClick={() => setIsSearch(true)} className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 border border-input bg-transparent shadow-sm hover:bg-accent hover:text-accent-foreground relative h-9 w-9 p-0 xl:h-10 xl:w-60 xl:justify-start xl:px-3 xl:py-2"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4 xl:mr-2" aria-hidden="true"><circle cx="11" cy="11" r="8"></circle><path d="m21 21-4.3-4.3"></path></svg><span className="hidden xl:inline-flex">Search name book</span><span className="sr-only">Search name book</span></button>
                            <NavLink to={'/cart'}><button className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 border border-input bg-transparent shadow-sm hover:bg-accent hover:text-accent-foreground h-9 w-9 relative" aria-label="Open cart" type="button" aria-haspopup="dialog" aria-expanded="false" aria-controls="radix-:Rbdcpla:" data-state="closed"><div className="inline-flex items-center border text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80 absolute -right-2 -top-2 h-6 w-6 justify-center rounded-full p-2.5">{userLogger ? <>{data?.cart.items.reduce((accumulator, currentValue) => accumulator + currentValue.quantity, 0)}</> : <>{!userLogger && totalLength}</>}</div><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4" aria-hidden="true"><circle cx="8" cy="21" r="1"></circle><circle cx="19" cy="21" r="1"></circle><path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12"></path></svg></button></NavLink>
                            {userLogger ? <button onClick={() => setIsMenu(!isMenu)} className=" inline-flex items-center justify-center text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/80 px-4 py-2 relative h-8 w-8 rounded-full" type="button" id="radix-:Rfdcpla:" aria-haspopup="menu" aria-expanded="false" data-state="closed"><span className="relative flex shrink-0 overflow-hidden rounded-full h-8 w-8"><img className="aspect-square h-full w-full" alt="" src={userLogger.avatar} />
                            </span>
                            </button> : <NavLink to={'/signin'}><button className='inline-flex items-center justify-center font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 border border-input bg-transparent shadow-sm hover:bg-accent hover:text-accent-foreground h-8 rounded-md px-3 text-xs w-20'>Signin</button></NavLink>}
                        </nav>
                    </div>
                </div>
                {userLogger ? <>{isMenu ? <div className="absolute right-0 z-10 mt-2 w-50 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                    <div className="py-1">
                        <div className='px-2 py-1.5 text-sm font-normal'>
                            <div className='flex flex-col space-y-1'>
                                <p className='text-sm font-medium leading-none'>{userLogger.name}</p>
                                <p className='text-xs leading-none text-muted-foreground'>{userLogger.email}</p>
                            </div>
                        </div>
                        <NavLink to={'/profile'} onClick={()=>setIsMenu(false)}><button className="text-gray-700 block px-4 py-2 text-sm">Thông tin cá nhân</button></NavLink>
                        <NavLink to={'/updatepassword'} onClick={()=>setIsMenu(false)}><button className="text-gray-700 block px-4 py-2 text-sm">Thay đổi mật khẩu</button></NavLink>
                        <NavLink to={'/profile'} onClick={()=>setIsMenu(false)}><button className="text-gray-700 block px-4 py-2 text-sm">Đơn hàng</button></NavLink>
                        <button onClick={()=>{
                            setIsMenu(false)
                            logOut()
                        }} className="text-gray-700 block px-4 py-2 text-sm">Đăng xuất</button>
                    </div>
                </div> : <></>}</> : <></>}
                {isSearch ? <div className='fixed inset-0 z-50 bg-background/80 backdrop-blur-sm data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0'>
                    <div className=' px-5 py-5 fixed left-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] gap-4 border bg-background shadow-lg duration-200 data-[state=open]:animate-in data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] sm:rounded-lg md:w-full top-44 translate-y-0 overflow-hidden p-0'>
                        <div className='flex h-full w-full flex-col overflow-hidden rounded-md bg-popover text-popover-foreground [&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:font-medium [&_[cmdk-group-heading]]:text-muted-foreground [&_[cmdk-group]:not([hidden])_~[cmdk-group]]:pt-0 [&_[cmdk-group]]:px-2 [&_[cmdk-input-wrapper]_svg]:h-5 [&_[cmdk-input-wrapper]_svg]:w-5 [&_[cmdk-input]]:h-12 [&_[cmdk-item]]:p-2 [&_[cmdk-item]_svg]:h-5 [&_[cmdk-item]_svg]:w-5'>
                            <div className='flex items-center border-b px-3'>
                                <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg" className="mr-2 h-4 w-4 shrink-0 opacity-50"><path d="M10 6.5C10 8.433 8.433 10 6.5 10C4.567 10 3 8.433 3 6.5C3 4.567 4.567 3 6.5 3C8.433 3 10 4.567 10 6.5ZM9.30884 10.0159C8.53901 10.6318 7.56251 11 6.5 11C4.01472 11 2 8.98528 2 6.5C2 4.01472 4.01472 2 6.5 2C8.98528 2 11 4.01472 11 6.5C11 7.56251 10.6318 8.53901 10.0159 9.30884L12.8536 12.1464C13.0488 12.3417 13.0488 12.6583 12.8536 12.8536C12.6583 13.0488 12.3417 13.0488 12.1464 12.8536L9.30884 10.0159Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd"></path></svg>
                                <form onSubmit={onSubmit}>
                                    <input value={value} onChange={(event) => setValue(event.target.value)} className="flex h-10 w-full rounded-md bg-transparent py-3 text-sm outline-none placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50" placeholder="Search products..." type="text"></input>
                                </form>
                                <button onClick={() => setIsSearch(false)} type="button" className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground"><svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg" className="h-4 w-4"><path d="M11.7816 4.03157C12.0062 3.80702 12.0062 3.44295 11.7816 3.2184C11.5571 2.99385 11.193 2.99385 10.9685 3.2184L7.50005 6.68682L4.03164 3.2184C3.80708 2.99385 3.44301 2.99385 3.21846 3.2184C2.99391 3.44295 2.99391 3.80702 3.21846 4.03157L6.68688 7.49999L3.21846 10.9684C2.99391 11.193 2.99391 11.557 3.21846 11.7816C3.44301 12.0061 3.80708 12.0061 4.03164 11.7816L7.50005 8.31316L10.9685 11.7816C11.193 12.0061 11.5571 12.0061 11.7816 11.7816C12.0062 11.557 12.0062 11.193 11.7816 10.9684L8.31322 7.49999L11.7816 4.03157Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd"></path></svg><span className="sr-only">Close</span></button>
                            </div>
                        </div>
                    </div>
                </div> : <></>}
            </header>
        </>
    )
}

export default Header