import React, { useEffect, useState } from 'react'
import { useAddViewBookMutation, useGetOneBookQuery } from '../api/book'
import { useAddItemCartMutation } from '../api/cart'
import { AppState } from '../context/AppProvider'
import { useDispatch } from 'react-redux'
import { useParams } from 'react-router-dom'
import { Spinner } from '@chakra-ui/react'
import { Rate } from 'antd'
import { BiChevronDown } from 'react-icons/bi'
import { MdNavigateNext, MdOutlineKeyboardArrowUp } from 'react-icons/md'
import { message } from 'antd'
import { BsCart4 } from 'react-icons/bs'
import { addItem } from '../slices/cart'
const BookDetail = () => {
    const [isMenu, setIsMenu] = useState(false)
    const { id } = useParams()
    const { data, isLoading } = useGetOneBookQuery(id)
    const [addViewBook] = useAddViewBookMutation()
    const [addItemCart] = useAddItemCartMutation()
    const { userLogger } = AppState()
    const dispatch = useDispatch()
    useEffect(() => {
        addViewBook(id)
    }, [])
    return (
        <>
            {isLoading ? <div className='flex justify-center items-center mt-10'>
                <Spinner thickness='4px'
                    speed='0.65s'
                    emptyColor='gray.200'
                    color='blue.500'
                    size='xl' />
            </div> : <>
                <div aria-label="Breadcrumb" className='mt-5'>
                    <ol role="list" className="mx-auto flex max-w-2xl items-center space-x-2 px-4 sm:px-6 lg:max-w-7xl lg:px-8">
                        <li>
                            <div className="flex items-center">
                                <h1 className="mr-2 text-sm font-medium text-gray-900">Trang chủ</h1>
                                <svg width="16" height="20" viewBox="0 0 16 20" fill="currentColor" aria-hidden="true" className="h-5 w-4 text-gray-300">
                                    <path d="M5.697 4.34L8.98 16.532h1.327L7.025 4.341H5.697z" />
                                </svg>
                            </div>
                        </li>
                        <li>
                            <div className="flex items-center">
                                <p className="mr-2 text-sm font-medium text-gray-900">{data.categoryId.name}</p>
                                <svg width="16" height="20" viewBox="0 0 16 20" fill="currentColor" aria-hidden="true" className="h-5 w-4 text-gray-300">
                                    <path d="M5.697 4.34L8.98 16.532h1.327L7.025 4.341H5.697z" />
                                </svg>
                            </div>
                        </li>
                        <li>
                            <div className="flex items-center">
                                <p className="mr-2 text-sm font-medium text-gray-900">{data.name}</p>
                            </div>
                        </li>
                    </ol>
                </div>
                <h2 className='font-bold tracking-tighter lg:leading-[1.1] text-2xl md:text-3xl mt-5'>{data.name} </h2>
                <div className="mt-[3rem] lg:grid lg:grid-cols-3 lg:gap-x-6 ">
                    <div className="group relative">
                        <div className='w-full'>
                            <img className='w-2/3 h-[20rem]' src={data.coverImage} />
                        </div>
                    </div>
                    <div className="group relative">
                        <h2 className='text-2xl'>{data.name}</h2>
                        <p className='mt-3'>Tác giả : <span className='font-bold'>{data.authorId.name}</span></p>
                        <p className='mt-3'>Nhà xuất bản : <span className='font-bold'>{data.publishingCompanyId.name}</span></p>
                        <div className='flex mt-3'>
                            <Rate value={3} disabled />
                            <p className='ml-3'> (4 reviews - {data.view} view)</p>
                        </div>
                        <p className='mt-3'>Lượt tìm kiếm : <span className='font-bold'>{data.numberSearch}</span></p>
                        <div className='border-b'>
                            <button className='w-full flex flex-1 items-center justify-between py-4 text-sm font-medium transition-all hover:underline [&[data-state=open]>svg]:rotate-180'>Mô tả
                                {!isMenu ? <BiChevronDown onClick={() => setIsMenu(true)} className='text-lg' /> : <MdOutlineKeyboardArrowUp
                                    onClick={() => setIsMenu(false)}
                                    className='text-lg' />}
                            </button>
                            {isMenu ? <div className='overflow-hidden text-sm data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down'>{data.description.substring(0, 201)} ...<button className='text-green-400'>Xem thêm</button></div> : <></>}
                        </div>
                    </div>
                    <div className="group relative">
                        <div className='w-2/3 border-2 h-3/4 border-gray-500'>
                            <h2 className='flex justify-center items-center mt-2'>Thông tin thanh toán</h2>
                            <div className='px-3 py-3'>
                                <div className='flex justify-between mt-3'>
                                    <p className='font-bold'>Giá bìa</p>
                                    <p className='text-gray-500 line-through'>{data.priceOnCover}.000 đ</p>
                                </div>
                                <div className='flex justify-between mt-3'>
                                    <p className='font-bold'>Giá bán</p>
                                    <p className='text-red-500'>{data.price}.000 đ</p>
                                </div>
                                <div className='flex justify-between mt-3'>
                                    <p className='font-bold'>Tiết kiệm</p>
                                    <p className='text-green-500'>{Math.ceil(data.priceOnCover / 100 * data.discount)}.000 đ ({data.discount}%) </p>
                                </div>
                                {userLogger ? <div className='flex justify-center items-center'>
                                    <button onClick={async () => {
                                        addItemCart({ productId: data._id, productImage: data.coverImage, productPrice: data.price })
                                        message.success('Sản phẩm đã được thêm vào giỏ hàng')
                                    }} className='bg-yellow-400 w-[10rem] h-10 rounded-lg mt-5 flex justify-center items-center'>
                                        <BsCart4 className='text-2xl ml-2 mr-2' /> Add to cart
                                    </button>
                                </div> : <div className='flex justify-center items-center'>
                                    <button onClick={async () => {
                                        dispatch(addItem({ productId: data._id, productImage: data.coverImage, productPrice: data.price, quantity: 1 }))
                                        message.success('Sản phẩm đã được thêm vào giỏ hàng')
                                    }} className='bg-yellow-400 w-[10rem] h-10 rounded-lg mt-5 flex justify-center items-center'>
                                        <BsCart4 className='text-2xl ml-2 mr-2' /> Add to cart
                                    </button>
                                </div>}
                            </div>
                        </div>
                    </div>
                </div>
                <h2 className='mt-10 text-xl'>Giới thiệu sách</h2>
                <div className='mt-5 lg:grid lg:grid-cols-2 lg:gap-x-6'>
                    <div className='w-full'>
                        <h4 className='mt-3 font-bold'>{data.name}</h4>
                        <p id='detail' className='mt-5'>{data.description}</p>
                        <div className='mt-5'>
                            <h3 className='mt-3 font-bold'>Thông tin chi tiết</h3>
                            <div className='flex gap-20 mt-5'>
                                <ul >
                                    <li className='flex justify-between'><p>Tác giả : </p><p className='ml-5 font-bold'> {data.authorId.name}</p></li>
                                    <li className='flex justify-between pt-2'><p>Khối lượng : </p><p className='ml-5'> {data.weight}.00 gam</p></li>
                                    <li className='flex justify-between pt-2'><p>Ngày phát hành: </p><p className='ml-5'> {data.publicationData}</p></li>
                                </ul>
                                <ul>
                                    <li className='flex justify-between'><p>Nhà xuất bản : </p><p className='ml-5 font-bold'> {data.publishingCompanyId.name}</p></li>
                                    <li className='flex justify-between pt-2'><p>Số trang : </p><p className='ml-5'> {data.numberPage}</p></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div className='w-4/5 px-5 py-5 border border-gray-400'>
                        <h1 className='font-bold'>Thông tin tác giả</h1>
                        <div className='mt-5'>
                            <h1 className='font-bold text-xl'>{data.authorId.name}</h1>
                        </div>
                        <div className='flex m-3 gap-5'>
                            <img className='w-1/2' src={data.authorId.image} />
                            <p>{data.authorId.story.substring(0, 150)}...</p>
                        </div>
                        <div className='mt-3 flex'>
                            <MdNavigateNext className='text-2xl' />
                            <MdNavigateNext className='text-2xl' />
                            <button className='hover:underline'>Xem tất cả các sách của các giả</button>
                        </div>
                    </div>
                </div>
            </>
            }
        </>
    )
}

export default BookDetail