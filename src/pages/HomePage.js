import React from 'react'
import { useGetAllBooksQuery } from '../api/book'
import { Spinner } from '@chakra-ui/react'
import BookItem from '../components/Books/BookItem'

const HomePage = () => {
  const { data, isLoading } = useGetAllBooksQuery({ sort: 'numberSearch', order: 'desc' })
  const { data: dataView } = useGetAllBooksQuery({ sort: 'view', order: 'desc' })
  return (
    <>
      <section className='grid items-center pb-8 pt-6 md:py-8 container gap-12'>
        <section className='mx-auto flex w-full max-w-[64rem] flex-col items-center justify-center gap-4 pb-8 pt-6 text-center md:pb-12 md:pt-10 lg:py-10'>
          <h1 className='text-3xl font-bold leading-tight tracking-tighter md:text-5xl lg:text-6xl lg:leading-[1.1]'>
            Welcome to Shopbee, an e-commerce built from FPT Polytechnic
          </h1>
          <p className='max-w-[46rem] text-sm text-muted-foreground sm:text-xl'>
            Discover a world of endless shopping possibilities with our diverse selection of products, unbeatable deals,
            and seamless shopping experience
          </p>
          <a className="bg-black text-white inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground shadow hover:bg-primary/90 h-9 px-4 py-2" href="/books">View all book<span className="sr-only">Buy now</span></a>
        </section>
      </section>
      {isLoading ? <>
        <div className='flex justify-center items-center mt-10'>
          <Spinner thickness='4px'
            speed='0.65s'
            emptyColor='gray.200'
            color='blue.500'
            size='xl' />
        </div></> : <>
        <h2 className='font-bold tracking-tighter lg:leading-[1.1] text-2xl md:text-3xl flex justify-center items-center'>Top product searches</h2>
        <div className="bg-white">
          <div className="max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
            <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
              {data.map(book => {
                return <BookItem key={book._id} book={book} />
              })}
            </div>
          </div>
        </div>
        <h2 className='font-bold tracking-tighter lg:leading-[1.1] text-2xl md:text-3xl flex justify-center items-center'>Top most views</h2>
        <div className="bg-white">
          <div className="max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
            <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
              {dataView?.map(book => {
                return <BookItem key={book._id} book={book} />
              })}
            </div>
          </div>
        </div>
      </>}
    </>
  )
}

export default HomePage