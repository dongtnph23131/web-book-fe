import React, { useEffect, useState } from 'react'
import { useGetAllBooksNoPageQuery, useGetAllBooksQuery } from '../api/book'
import BookItem from '../components/Books/BookItem'
import { Spinner } from '@chakra-ui/react'
import { Pagination } from 'antd'
import { useGetAllCategoryQuery } from '../api/category'
import { NavLink } from 'react-router-dom'

const BooksPage = () => {
    const [isMenu, setIsMenu] = useState(false)
    const [dataCategories, setDataCategories] = useState([])
    const [listCategories, setListCategories] = useState([])
    const [isCategories, setIsCategories] = useState(false)
    const [sort, setSort] = useState()
    const [order, setOrder] = useState()
    const [page, setPage] = useState(1)
    const { data, isLoading } = useGetAllBooksQuery({ sort, order, page, limit: 4, dataCategories })
    const { data:dataNopage } = useGetAllBooksNoPageQuery({ sort, order, dataCategories })
    const [isFilter, setIsFilter] = useState(false)
    const { data: categories } = useGetAllCategoryQuery()
    useEffect(() => {
        setListCategories(categories)
    }, [categories])
    return (
        <>
            <section className='space-y-6 mt-5 ml-[5rem]'>
                <h2 className='flex-1 text-2xl font-medium sm:text-3xl'>Books</h2>
                <p className='text-muted-foreground max-w-[750px] text-sm sm:text-base'>All our books <span className='font-bold'>{sort ? `- ${sort}` : ``} {order ? `- ${order}` : ``}</span></p>
            </section>
            {isLoading ? <>
                <div className='flex justify-center items-center mt-10'>
                    <Spinner thickness='4px'
                        speed='0.65s'
                        emptyColor='gray.200'
                        color='blue.500'
                        size='xl' />
                </div>
            </> : <>
                <div className='flex items-center space-x-2 mt-5 ml-[5rem]'>
                    <button onClick={() => setIsFilter(true)} className="bg-black text-white inline-flex items-center justify-center font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground shadow hover:bg-primary/90 h-8 rounded-md px-3 text-xs" aria-label="Filter products" type="button" aria-haspopup="dialog" aria-expanded="false" aria-controls="radix-:r6m:" data-state="closed">Filter</button>
                    <button onClick={() => setIsMenu(!isMenu)} className='bg-black text-white inline-flex items-center justify-center font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground shadow hover:bg-primary/90 h-8 rounded-md px-3 text-xs'>Sort
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="ml-2 h-4 w-4" aria-hidden="true"><path d="m6 9 6 6 6-6"></path></svg>
                    </button>
                    {isMenu ? <div className='z-50 min-w-[8rem] overflow-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-md data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 w-48'>
                        <div className='px-2 py-1.5 text-sm font-semibold'>Sort by</div>
                        <div className='-mx-1 my-1 h-px bg-muted'></div>
                        <button onClick={() => {
                            setIsMenu(false)
                            setSort('createdAt')
                            setOrder('desc')
                            setPage(1)
                        }} className='relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50 w-full'>Mới nhất</button>
                        <button onClick={() => {
                            setIsMenu(false)
                            setSort('price')
                            setOrder('asc')
                            setPage(1)
                        }} className='relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50 w-full'>Giá thấp đến cao</button>
                        <button onClick={() => {
                            setIsMenu(false)
                            setSort('price')
                            setOrder('desc')
                            setPage(1)
                        }} className='relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50 w-full'>Giá cao đến thấp</button>
                        <button onClick={() => {
                            setIsMenu(false)
                            setSort('name')
                            setOrder('asc')
                            setPage(1)
                        }} className='relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50 w-full'>A đến Z</button>
                        <button onClick={() => {
                            setIsMenu(false)
                            setSort('name')
                            setOrder('desc')
                            setPage(1)
                        }} className='relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50 w-full'>Z đến A</button>
                    </div> : <></>}
                </div>
                <div className="bg-white">
                    <div className="max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
                        <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
                            {data.map(book => {
                                return <BookItem key={book._id} book={book} />
                            })}
                        </div>
                    </div>
                </div>
                <div className='flex justify-center items-center mt-[-3rem]'>
                    <Pagination onChange={(value) => setPage(value)} defaultCurrent={page} total={dataNopage?.length} pageSize={4} className='mb-10' />
                </div>
            </>}
            {isFilter ? <div className='bg-gray-50 fixed inset-0 z-50 bg-background/80 backdrop-blur-sm'>
                <div className='fixed z-50 gap-4 bg-background p-6 shadow-lg transition ease-in-out inset-y-0 right-0 h-full w-3/4 border-l sm:max-w-sm flex flex-col'>
                    <div className='flex flex-col space-y-2 text-center sm:text-left px-1'>
                        <div className='flex justify-between'>
                            <h2 className='text-lg font-semibold text-foreground'>Filters</h2>
                            <button onClick={() => {
                                setIsFilter(false)
                                setIsCategories(false)
                            }}><svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="10" strokeLinecap="round" strokeLinejoin="round" className="ml-2 h-6 w-6" aria-hidden="true"><path d="M 7.71875 6.28125 L 6.28125 7.71875 L 23.5625 25 L 6.28125 42.28125 L 7.71875 43.71875 L 25 26.4375 L 42.28125 43.71875 L 43.71875 42.28125 L 26.4375 25 L 43.71875 7.71875 L 42.28125 6.28125 L 25 23.5625 Z"></path></svg></button>
                        </div>
                    </div>
                    <div className='flex h-full w-full flex-col rounded-md text-popover-foreground overflow-visible bg-transparent'>
                        <div className='group rounded-md border border-input px-3 py-2 text-sm ring-offset-background focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2'>
                            <div className='group rounded-md border border-input px-3 py-2 text-sm ring-offset-background focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2'>
                                {dataCategories?.map((item) => {
                                    return <div key={item._id} className='inline-flex items-center border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent bg-secondary text-secondary-foreground rounded hover:bg-secondary'>{item.name}
                                        <button onClick={() => {
                                            setDataCategories(dataCategories.filter(category => category._id !== item._id))
                                            setListCategories([item, ...listCategories])
                                        }} className="inline-flex items-center justify-center font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 shadow rounded-md text-xs ml-2 h-auto bg-transparent p-0 text-primary hover:bg-transparent hover:text-destructive" aria-label="Remove option"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-3 w-3" aria-hidden="true"><path d="M18 6 6 18"></path><path d="m6 6 12 12"></path></svg></button>
                                    </div>
                                })}
                                <input onClick={() => setIsCategories(true)} placeholder='Select categories' className='flex-1 bg-transparent px-1 py-0.5 outline-none placeholder:text-muted-foreground' />
                            </div>
                        </div>
                        {isCategories ? <div className='relative z-50 mt-2'>
                            <div className="absolute right-0 z-10 mt-2 w-56 h-[10rem] origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none overflow-y-scroll">
                                <div className="py-1">
                                    {listCategories?.map(item => {
                                        return <button onClick={() => {
                                            setDataCategories([...dataCategories, { _id: item._id, name: item.name }])
                                            setListCategories(listCategories.filter(category => category._id !== item._id))
                                        }} key={item._id} className="text-gray-700 block px-4 py-2 text-sm">{item.name}</button>
                                    })}
                                </div>
                            </div>
                        </div> : <></>}
                    </div>
                    <div>
                        <div className="shrink-0 bg-border h-[1px] w-full my-4">
                        </div>
                        <div className='flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2'>
                            <button onClick={()=>{
                                setListCategories([])
                                setDataCategories([])
                                setIsFilter(false)
                            }} className='bg-black text-white inline-flex items-center justify-center font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground shadow hover:bg-primary/90 h-8 rounded-md px-3 text-xs w-full'>Clear Filters</button>
                        </div>
                    </div>
                </div>
            </div> : <></>}
        </>
    )
}

export default BooksPage