import React, { useState } from 'react'
import { useGetAllBooksNoPageQuery, useGetAllBooksQuery } from '../api/book'
import BookItem from '../components/Books/BookItem'
import { Spinner } from '@chakra-ui/react'
import { Pagination } from 'antd'

const BooksPage = () => {
    const [isMenu, setIsMenu] = useState(false)
    const [sort, setSort] = useState()
    const [order, setOrder] = useState()
    const [page, setPage] = useState(1)
    const { data, isLoading } = useGetAllBooksQuery({ sort, order, page, limit: 8 })
    const { dataNopage } = useGetAllBooksNoPageQuery({ sort, order, page })
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
                    <button onClick={() => setIsMenu(!isMenu)} className='relative inline-flex items-center justify-center font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground shadow hover:bg-primary/90 h-8 rounded-md px-3 text-xs bg-black text-white'>Sort
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
                    </div> : <></>}
                </div>
                <div className="bg-white">
                    <div className="max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
                        <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
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
        </>
    )
}

export default BooksPage