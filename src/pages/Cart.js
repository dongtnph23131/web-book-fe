import { Button, InputNumber } from 'antd'
import React from 'react'
import { FaTrash } from 'react-icons/fa';
import { useAddItemCartMutation, useGetCartOfUserQuery, useRemoveItemMutation, useRemoveItemProductCartMutation } from '../api/cart';
import { Spinner } from '@chakra-ui/react';
import { AppState } from '../context/AppProvider';
import { useDispatch, useSelector } from 'react-redux';
import { addItem, remove, removeItemNoLogin } from '../slices/cart';
import { NavLink } from 'react-router-dom';

const Cart = () => {
    const { token } = AppState()
    const { data, isLoading } = useGetCartOfUserQuery(token)
    const [addItemCart, { isLoadingAdd }] = useAddItemCartMutation()
    const [removeProductItem, { isLoadingRemoveProductItem }] = useRemoveItemProductCartMutation()
    const [removeItem, { isLoadingRemoveItem }] = useRemoveItemMutation()
    const { userLogger } = AppState()
    const { items } = useSelector(state => state.cartNoLogin)
    const dispatch = useDispatch()
    const totalCart = items.reduce((accumulator, currentValue) => accumulator + currentValue.productPrice * currentValue.quantity, 0);
    return (
        <>
            {isLoading | isLoadingAdd | isLoadingRemoveItem | isLoadingRemoveProductItem ? <div className='flex justify-center items-center mt-10'>
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
                                <p className="mr-2 text-sm font-medium text-gray-900">Giỏ hàng</p>
                            </div>
                        </li>
                    </ol>
                </div>
                <div>
                    <h2 className='font-bold tracking-tighter lg:leading-[1.1] text-2xl md:text-3xl mt-5'>Giỏ hàng</h2>
                </div>
                {userLogger ? <>
                    {data?.cart?.items.length === 0 ? <div className='px-10 py-3 mt-5 w-full h-[3rem] font-bold bg-gray-100 flex justify-center items-center'>
                        {data.message}
                    </div> : <>
                        <div className='lg:grid lg:grid-cols-2 lg:gap-x-6'>
                            <div className='w-full px-10 py-5 border border-gray-300 mt-5'>
                                <h4 className='text-xl font-bold ml-5 mb-5'>Sản phẩm</h4>
                                {data?.cart?.items.map((item) => {
                                    return <div key={item._id} className='flex mt-10 w-full flex-col gap-5 pr-6 max-h-[280px]'>
                                        <div className='space-y-3'>
                                            <div className='flex items-start justify-between gap-4'>
                                                <div className='flex items-center space-x-4 w-full'>
                                                    <img src={item.productImage} className='flex w-24  mr-5 h-24 items-center justify-center bg-secondary' />
                                                </div>
                                                <div>
                                                    <div className='flex'>
                                                        <div className='flex items-center'>
                                                            <Button className='bg-gray-200' onClick={() => {
                                                                const itemNew = { productId: item.productId }
                                                                removeProductItem({ itemNew, token })
                                                            }}>-</Button>
                                                            <InputNumber disabled value={item.quantity} className='w-20 pl-2 ml-2 bg-gray-200' />
                                                            <Button className='ml-2 bg-gray-200' onClick={() => {
                                                                const itemNew = { productId: item.productId }
                                                                addItemCart({ itemNew, token })
                                                            }}>+</Button>
                                                        </div>
                                                        <Button onClick={() => {
                                                            const itemNew = { productId: item.productId }
                                                            removeItem({ itemNew, token })
                                                        }} className='ml-5'><FaTrash /></Button>
                                                    </div>
                                                    <p className='text-red-500 mt-5'>{item.quantity} x {item.productPrice}.000 đ</p>
                                                </div>
                                            </div>

                                        </div>
                                    </div>
                                })}
                            </div>
                            <div className='mt-5 w-full'>
                                <div className='flex h-[3rem] bg-green-600 text-white rounded-tr-[10px] rounded-tl-[10px] text-xl justify-center items-center py-2'>Tóm tắt đơn hàng</div>
                                <div className='border border-gray-300 px-5 py-5'>
                                    <div className='flex justify-between'>
                                        <p>Sản phẩm</p>
                                        <p>{data?.cart.items.reduce((accumulator, currentValue) => accumulator + currentValue.quantity, 0)}</p>
                                    </div>
                                    <div className='flex justify-between mt-3'>
                                        <span className='font-bold'>Tạm tính</span>
                                        <p className='text-green-700'>{data.cart.total}.000 đ</p>
                                    </div>
                                    <div className='flex justify-between mt-7'>
                                        <p className='font-bold'>Tổng cộng</p>
                                        <p className='text-red-500'>{data.cart.total}.000 đ</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className='flex justify-center items-center mt-10 mb-[10rem]'>
                            <NavLink to={'/'}><button className='w-[7rem] px-5 py-5 font-bold text-white bg-gray-400 rounded-lg'>Quay lại</button></NavLink>
                            <NavLink to={'/checkout/address'}> <button className='w-[8rem] px-5 py-5 font-bold text-black bg-yellow-400 rounded-lg ml-5'>Tiếp tục</button></NavLink>
                        </div>
                    </>}
                </> : <>
                    {items.length > 0 ? <>
                        <div className='mt-5 lg:grid lg:grid-cols-2 lg:gap-x-6'>
                            <div className='w-full px-10 py-5 border border-gray-300'>
                                <h4 className='text-xl text-green-400 ml-5 mb-5'>Sản phẩm</h4>
                                {items.map((item) => {
                                    return <div key={item.productId} className='flex mt-10 w-full flex-col gap-5 pr-6 max-h-[280px]'>
                                        <div className='space-y-3'>
                                            <div className='flex items-start justify-between gap-4'>
                                                <div className='flex items-center space-x-4'>
                                                    <img src={item.productImage} className='flex w-24 h-24 items-center justify-center bg-secondary' />
                                                </div>
                                                <div>
                                                    <div className='flex'>
                                                        <div className='flex items-center'>
                                                            <Button className='bg-gray-200' onClick={() => {
                                                                dispatch(removeItemNoLogin({ productId: item.productId }))
                                                            }}>-</Button>
                                                            <InputNumber disabled value={item.quantity} className='w-20 pl-2 ml-2 bg-gray-200' />
                                                            <Button className='ml-2 bg-gray-200' onClick={() => {
                                                                dispatch(addItem({ productId: item.productId }))
                                                            }}>+</Button>
                                                        </div>
                                                        <Button onClick={() => {
                                                            dispatch(remove({ productId: item.productId }))
                                                        }} className='ml-5'><FaTrash /></Button>
                                                    </div>
                                                    <p className='text-red-500 mt-5'>{item.quantity} x {item.productPrice}.000 đ</p>
                                                </div>
                                            </div>

                                        </div>
                                    </div>
                                })}
                            </div>
                            <div>
                                <div className='flex w-[30rem] h-[3rem] bg-green-600 text-white rounded-tr-[10px] rounded-tl-[10px] text-xl justify-center items-center py-2'>Tóm tắt đơn hàng</div>
                                <div className='w-[30rem] border border-gray-300 px-5 py-5'>
                                    <div className='flex justify-between'>
                                        <p>Sản phẩm</p>
                                        <p>{items.reduce((accumulator, currentValue) => accumulator + currentValue.quantity, 0)}</p>
                                    </div>
                                    <div className='flex justify-between mt-3'>
                                        <span className='font-bold'>Tạm tính</span>
                                        <p className='text-green-700'>{totalCart}.000 đ</p>
                                    </div>
                                    <div className='flex justify-between mt-7'>
                                        <p className='font-bold'>Tổng cộng</p>
                                        <p className='text-red-500'>{totalCart}.000 đ</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className='flex justify-center items-center mt-10'>
                            <NavLink to={'/'}><button className='w-[7rem] px-5 py-5 font-bold text-white bg-gray-400 rounded-lg'>Quay lại</button></NavLink>
                            <NavLink to={'/checkout/address'}> <button className='w-[8rem] px-5 py-5 font-bold text-black bg-yellow-400 rounded-lg ml-5'>Tiếp tục</button></NavLink>
                        </div>
                    </> : <div className='px-10 py-3 mt-5 w-full h-[3rem] font-bold bg-gray-100 flex justify-center items-center'>
                       Giỏ hàng trống
                    </div>}
                </>}
            </>}
        </>
    )
}

export default Cart