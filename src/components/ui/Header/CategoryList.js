import React, { useState } from 'react'
import { BiChevronDown } from "react-icons/bi"
import { MdOutlineKeyboardArrowUp } from "react-icons/md"
import { useGetAllCategoryQuery } from '../../../api/category'
import { NavLink } from 'react-router-dom'

const CategoryList = () => {
    const { data } = useGetAllCategoryQuery()
    const [isMenu,setIsMenu]=useState(false)
    return (
        <nav className='relative z-10 flex max-w-max flex-1 items-center justify-center px-10'>
            <ul className='group flex flex-1 list-none items-center justify-center space-x-1'>
                <li>
                    <button onClick={()=>setIsMenu(!isMenu)} className='group inline-flex w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-accent/50 data-[state=open]:bg-accent/50 group h-auto'>Categories
                       {!isMenu?<BiChevronDown onClick={()=>setIsMenu(!isMenu)} className='text-lg'/>:<MdOutlineKeyboardArrowUp  className='text-lg'/>}
                    </button>
                    {isMenu?<div className="absolute right-0 z-10 mt-2 w-56 h-[10rem] origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none overflow-y-scroll">
                        <div className="py-1">
                           {data?.map(item=>{
                             return <NavLink onClick={()=>setIsMenu(false)} key={item._id} to={`/categories/${item._id}`}>
                                <button className="text-gray-700 block px-4 py-2 text-sm">{item.name}</button>
                             </NavLink>
                           })}
                        </div>
                    </div>:<></>}
                </li>
            </ul>
        </nav>
    )
}

export default CategoryList