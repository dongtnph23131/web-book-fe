import React from 'react'
import Header from '../../ui/Header'
import { Outlet } from 'react-router-dom'
import Footer from '../../ui/Footer'

const LayoutWebsite = () => {
  return (
    <div className='relative flex min-h-screen flex-col px-10'>
         <Header/>
         <Outlet/>
         <Footer/>
    </div>
  )
}

export default LayoutWebsite