import { Button, Form, Input } from 'antd'
import React, { useState } from 'react'
import { FaCheck } from 'react-icons/fa'
import { NavLink } from 'react-router-dom'
import { AppState } from '../context/AppProvider'
import { config } from '../config/index'
const url = config()
const CheckoutPayments = () => {
    const { payment, setPayment, notes, token } = AppState()
    const [form] = Form.useForm()
    const [coupons, setCoupons] = useState('')
    const [errorSearch, setErrorSearch] = useState('')
    const onFinish = ({ search }) => {
        form.setFieldsValue({ search: '' })
        fetch(`${url}/coupons/search/client?search=${search}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            }
        }).then(response => response.json()).then(data => {
            if (!data?.message) {
                setCoupons(data)
            }
            else {
                setErrorSearch(data.message)
            }
        })
    }
    return (
        <>
            <div className='flex justify-center items-center mt-10'>
                <div className='justify-center items-center'>
                    <div className='w-10 h-10 rounded-full bg-black text-white font-bold flex justify-center items-center'>1</div>
                </div>
                <div className='w-40 h-1 bg-gray-400'></div>
                <div className='justify-center items-center'>
                    <div className='w-10 h-10 rounded-full bg-black text-white font-bold flex justify-center items-center'>2</div>
                </div>
                <div className='w-40 h-1 bg-gray-400'></div>
                <div className='justify-center items-center'>
                    <div className='w-10 h-10 rounded-full bg-gray-300 text-black font-bold flex justify-center items-center'>3</div>
                </div>
            </div>
            <div className='flex justify-center items-center grid-cols-3 mt-5'>
                <div>
                    <p className='font-bold text-xl'>Địa chỉ giao hàng</p>
                </div>
                <div className='px-8'>
                    <p className='font-bold text-xl'>Hình thức thanh toán</p>
                </div>
                <p className='font-bold text-xl'>Xác nhận & Đặt hàng</p>
            </div>
            <div className='mt-6 space-y-12 lg:grid lg:grid-cols-2 lg:gap-x-6 lg:space-y-0 px-2'>
                <div className='mt-10 ml-20'>
                    <p className='text-2xl font-mono'>Hình thức thanh toán</p>
                    <div className='flex'>
                        <button onClick={() => setPayment(1)} className={`mt-5 w-8 h-8 ${payment === 1 ? 'bg-black text-white' : 'bg-gray-400'} rounded-full  flex justify-center items-center`}>
                            <FaCheck />
                        </button>
                        <p className='mt-5 text-xl ml-5'>Giao hàng thu tiền tận nơi</p>
                    </div>
                    <div className='flex'>
                        <button onClick={() => setPayment(2)} className={`mt-5 w-8 h-8 ${payment === 2 ? 'bg-black text-white' : 'bg-gray-400'} rounded-full  flex justify-center items-center`}>
                            <FaCheck />
                        </button>
                        <p className='mt-5 text-xl ml-5'>Thanh toán Online</p>
                    </div>
                </div>
            </div>
            <div className='flex justify-center items-center mt-10'>
                <NavLink to={'/checkout/address'}><button className='w-[7rem] px-5 py-5 font-bold text-white bg-gray-400 rounded-lg'>Quay lại</button></NavLink>
                <NavLink to={'/checkout/final'}> <button className='w-[8rem] px-5 py-5 font-bold text-black bg-yellow-400 rounded-lg ml-5'>Tiếp tục</button></NavLink>
            </div>
        </>
    )
}
export default CheckoutPayments