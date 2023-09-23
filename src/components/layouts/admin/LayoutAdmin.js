import React, { useState } from 'react'
import { AppState } from '../../../context/AppProvider'
import { NavLink, Outlet, useNavigate } from 'react-router-dom'

const LayoutAdmin = () => {
  const { userLogger, setUserLogger, setToken } = AppState()
  const [isMenu, setIsMenu] = useState(false)
  const navigate = useNavigate()
  const logOut = () => {
    setUserLogger()
    setToken()
    localStorage.removeItem('user')
    localStorage.removeItem('token')
    navigate('/signin')
  }

  return (
    <>
      <div className="fixed left-0 top-0 w-64 h-full bg-gray-900 p-4 z-50 sidebar-menu transition-transform hidden md:block">
        <a href="#" className="flex items-center pb-4 border-b border-b-gray-800">
          <img src="https://placehold.co/32x32" alt="" className="w-8 h-8 rounded object-cover" />
          <span className="text-lg font-bold text-white ml-3">Logo</span>
        </a>
        <ul className="mt-4">
          <li className="mb-1 group active">
            <a href="/admin" className="flex items-center py-2 px-4 text-gray-300 hover:bg-gray-950 hover:text-gray-100 rounded-md group-[.active]:bg-gray-800 group-[.active]:text-white group-[.selected]:bg-gray-950 group-[.selected]:text-gray-100">
              <i className="ri-home-2-line mr-3 text-lg"></i>
              <span className="text-sm">Dashboard</span>
            </a>
          </li>
          <li className="mb-1 group active">
            <a href="/admin/books" className="flex items-center py-2 px-4 text-gray-300 hover:bg-gray-950 hover:text-gray-100 rounded-md group-[.active]:bg-gray-800 group-[.active]:text-white group-[.selected]:bg-gray-950 group-[.selected]:text-gray-100">
              <i className="ri-book-line mr-3 text-lg" />
              <span className="text-sm">Books</span>
            </a>
          </li>
          <li className="mb-1 group active">
            <a href="/admin/categories" className="flex items-center py-2 px-4 text-gray-300 hover:bg-gray-950 hover:text-gray-100 rounded-md group-[.active]:bg-gray-800 group-[.active]:text-white group-[.selected]:bg-gray-950 group-[.selected]:text-gray-100">
              <i className="ri-function-line mr-3 text-lg" />
              <span className="text-sm">Category</span>
            </a>
          </li>
          <li className="mb-1 group active">
            <a href="/admin/authors" className="flex items-center py-2 px-4 text-gray-300 hover:bg-gray-950 hover:text-gray-100 rounded-md group-[.active]:bg-gray-800 group-[.active]:text-white group-[.selected]:bg-gray-950 group-[.selected]:text-gray-100">
              <i className="ri-book-line mr-3 text-lg" />
              <span className="text-sm">Authors</span>
            </a>
          </li>
          <li className="mb-1 group active">
            <a href="/admin/publishingCompanys" className="flex items-center py-2 px-4 text-gray-300 hover:bg-gray-950 hover:text-gray-100 rounded-md group-[.active]:bg-gray-800 group-[.active]:text-white group-[.selected]:bg-gray-950 group-[.selected]:text-gray-100">
              <i className="ri-radio-button-line mr-3 text-lg" />
              <span className="text-sm">publishingCompany</span>
            </a>
          </li>
        </ul>
      </div>
      <main className='w-full md:w-[calc(100%-256px)] md:ml-64 bg-gray-50 min-h-screen transition-all main'>
        <div className="py-2 px-6 bg-white flex items-center shadow-md shadow-black/5 sticky top-0 left-0 z-30">
          <button type="button" className="text-lg text-gray-600 sidebar-toggle">
            <i className="ri-menu-line"></i>
          </button>
          <ul className="flex items-center text-sm ml-4">
            <li className="mr-2">
              <a href="#" className="text-gray-400 hover:text-gray-600 font-medium">Dashboard</a>
            </li>
            <li className="text-gray-600 mr-2 font-medium">/</li>
            <li className="text-gray-600 mr-2 font-medium">Analytics</li>
          </ul>
          <ul className='ml-auto flex items-center'>
            <button type="button" className="relative rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800 mr-5">
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0" />
              </svg>
            </button>
            <button onClick={() => setIsMenu(!isMenu)} className=" inline-flex items-center justify-center text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/80 px-4 py-2 relative h-8 w-8 rounded-full" type="button" id="radix-:Rfdcpla:" aria-haspopup="menu" aria-expanded="false" data-state="closed"><span className="relative flex shrink-0 overflow-hidden rounded-full h-8 w-8"><img className="aspect-square h-full w-full" alt="" src={userLogger.avatar} />
            </span>
            </button>
          </ul>
        </div>
        {isMenu ? <div className="absolute right-5 z-10 mt-2 w-50 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
          <div className="py-1">
            <div className='px-2 py-1.5 text-sm font-normal'>
              <div className='flex flex-col space-y-1'>
                <p className='text-sm font-medium leading-none'>{userLogger.name}</p>
                <p className='text-xs leading-none text-muted-foreground'>{userLogger.email}</p>
              </div>
            </div>
            <NavLink to={'/'} onClick={() => setIsMenu(false)}><button className="text-gray-700 block px-4 py-2 text-sm">Trang chủ</button></NavLink>
            <NavLink to={'/profile'} onClick={() => setIsMenu(false)}><button className="text-gray-700 block px-4 py-2 text-sm">Thông tin cá nhân</button></NavLink>
            <NavLink to={'/updatepassword'} onClick={() => setIsMenu(false)}><button className="text-gray-700 block px-4 py-2 text-sm">Thay đổi mật khẩu</button></NavLink>
            <NavLink to={'/profile'} onClick={() => setIsMenu(false)}><button className="text-gray-700 block px-4 py-2 text-sm">Đơn hàng</button></NavLink>
            <button onClick={() => {
              setIsMenu(false)
              logOut()
            }} className="text-gray-700 block px-4 py-2 text-sm">Đăng xuất</button>
          </div>
        </div> : <></>
        }
        {/* <div className='absolute right-5 z-10 mt-2 w-50 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none'>
          <div className='py-1'>
          </div>
        </div> */}
        <div className='px-10 py-10'>
          <Outlet />
        </div>
      </main>
    </>
  )
}

export default LayoutAdmin