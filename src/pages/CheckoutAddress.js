import { Button, Form, Input, InputNumber, Select } from 'antd'
import React, { useEffect, useState } from 'react'
import { useGetProfileQuery, useUpdateProfileMutation } from '../api/auth'
import { GoSync } from 'react-icons/go'
import { AppState } from '../context/AppProvider'
import { Spinner } from '@chakra-ui/react'
import Swal from 'sweetalert2'
import { AiOutlineEdit } from 'react-icons/ai'
import { NavLink } from 'react-router-dom'
const { TextArea } = Input;
const CheckoutAddress = () => {
    const [form] = Form.useForm()
    const [citys, setCitys] = useState([])
    const [districts, setDistricts] = useState([])
    const [wards, setWards] = useState([])
    const [city, setCity] = useState("");
    const [district, setDistrict] = useState("")
    const [ward, setWard] = useState('')
    const [updateProfile, { isLoadingUpdateProfile }] = useUpdateProfileMutation()
    const { token, setUserLogger, setToken } = AppState()
    const { data: user, isLoading } = useGetProfileQuery(token)
    console.log(user);
    const [isMatch, setIsMatch] = useState(false)
    useEffect(() => {
        fetch('https://vapi.vnappmob.com/api/province/').then(response => response.json()).then(data => {
            setCitys(data.results.map(item => {
                return {
                    label: item.province_name,
                    value: item.province_id
                }
            }))
        })
    }, [])
    useEffect(() => {
        form.setFieldsValue(user?.user)
    }, [user])
    const onChangeCity = (value) => {
        setCity(citys.find(item => item.value == value).label)
        fetch(`https://vapi.vnappmob.com/api/province/district/${value}`).then(response => response.json()).then(data => {
            setDistricts(data.results.map(item => {
                return {
                    label: item.district_name,
                    value: item.district_id
                }
            }))
        })
    }
    const onChangeDistrict = (value) => {
        setDistrict(districts.find(item => item.value == value).label)
        fetch(`https://vapi.vnappmob.com/api/province/ward/${value}`).then(response => response.json()).then(data => {
            setWards(data.results.map(item => {
                return {
                    label: item.ward_name,
                    value: item.ward_id
                }
            }))
        })
    }
    const onFinish = async (value) => {
        if (!user.user.city | !user.user.ward | !user.user.district) {
            if (!city | !ward | !district) {
                Swal.fire({
                    icon: 'error',
                    title: 'Hãy điền đầy đủ thông tin'
                })
                return
            }
        }
        const cityNew = city ? city : user.user.city
        const wardNew = ward ? ward : user.user.ward
        const districtNew = district ? district : user.user.district

        const data = await updateProfile({ ...value, city: cityNew, ward: wardNew, district: districtNew });
        localStorage.setItem('user', JSON.stringify(data.data.user))
        setUserLogger(data.data.user)
        setToken(data.data.token)
        localStorage.setItem('token', JSON.stringify(data.data.token))
        setIsMatch(true)
    }
    return (
        <>
            {isLoading ? <div className='flex justify-center items-center mt-10'>
                <Spinner thickness='4px'
                    speed='0.65s'
                    emptyColor='gray.200'
                    color='blue.500'
                    size='xl' />
            </div> : <>
                {isMatch ? <>
                    <div className='flex justify-center items-center'>
                        <div className='flex w-full justify-between mt-10 '>
                            <h2 className='font-bold tracking-tighter lg:leading-[1.1] text-3xl md:text-4xl'>Địa chỉ giao hàng</h2>
                            <button onClick={() => setIsMatch(false)} className='flex text-2xl mr-40'><AiOutlineEdit className='mt-1 mr-1' />Sửa</button>
                        </div>
                    </div>
                    <div className='justify-center items-center mt-10'>
                        <h3 className='font-mono text-2xl'>{user.user.name}</h3>
                        <br></br>
                        <p className='font-mono text-xl'>{user.user.numberHome} , Đường {user.user.road} ,{user.user.ward}</p>
                        <p className='font-mono text-xl mt-5'>{user.user.district} , {user.user.city} , Việt Nam</p>
                        <p className='font-mono text-xl mt-5'>0{user.user.phone}</p>
                        <p className='font-mono text-xl mt-5'>Gửi hàng qua bưu điện</p>
                        <div className='border-b-slate-100 border mb-5'></div>
                        Ghi chú giao hàng  <TextArea rows={4} className='mb-5 mt-5' />
                    </div>
                    <div className='flex justify-center items-center mt-10'>
                        <NavLink to={'/'}><button className='w-[7rem] px-5 py-5 font-bold text-white bg-gray-400 rounded-lg'>Quay lại</button></NavLink>
                        <NavLink to={'/checkout/address'}> <button className='w-[8rem] px-5 py-5 font-bold text-black bg-yellow-400 rounded-lg ml-5'>Tiếp tục</button></NavLink>
                    </div>
                </> : <>
                    <h2 className='font-bold tracking-tighter lg:leading-[1.1] text-2xl md:text-3xl mt-5'>Địa chỉ giao hàng</h2>
                    <Form
                        form={form}
                        onFinish={onFinish}
                        className='mt-5 w-2/3'>
                        <Form.Item label="Họ và tên" name={"name"} >
                            <Input value={user.user.name} disabled />
                        </Form.Item>
                        <Form.Item label="Số điện thoại" name={"phone"} rules={[{ required: true, message: 'Số điện thoại không để trống' }]}>
                            <InputNumber className='w-full' />
                        </Form.Item>
                        Tỉnh thành <Select
                            onChange={onChangeCity}
                            defaultValue={`${user?.user.city ? user?.user.city : 'Chọn Tỉnh thành'}`}
                            options={citys}
                        /> <br />
                        Quận (huyện) <Select
                            className='mt-5'
                            onChange={onChangeDistrict}
                            defaultValue={`${user?.user.district ? user?.user.district : 'Chọn Quận (huyệnn)'}`}
                            options={districts}
                        /> <br />
                        Phường <Select
                            onChange={(value) => {
                                setWard(wards.find(item => item.value == value).label)
                            }}
                            className='mt-5'
                            defaultValue={`${user?.user.ward ? user?.user.ward : 'Chọn Phường'}`}
                            options={wards}
                        /> <br />
                        <Form.Item label="Số nhà" name={"numberHome"} rules={[{ required: true, message: 'Số nhà không để trống' }]} className='mt-5'>
                            <InputNumber className='w-full' />
                        </Form.Item>
                        <Form.Item label="Đường" name={"road"} rules={[{ required: true, message: 'Đường không để trống' }]}>
                            <Input className='w-full' />
                        </Form.Item>
                        <Button htmlType="submit" className='mt-5'>
                            {isLoadingUpdateProfile ? <GoSync className='animate-spin ml-[50%]' /> : 'Lưu'}
                        </Button>
                    </Form>
                </>}
            </>
            }
        </>
    )
}

export default CheckoutAddress