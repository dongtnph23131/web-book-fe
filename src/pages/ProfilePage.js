import React, { useEffect, useState } from 'react'
import { AppState } from '../context/AppProvider'
import { useGetProfileQuery, useUpdateProfileMutation } from '../api/auth'
import { Spinner } from '@chakra-ui/react'
import { Button, Form, Input } from 'antd'
import axios from 'axios'
import { GoSync } from "react-icons/go"
import Swal from 'sweetalert2'

const ProfilePage = () => {
    const { token, setUserLogger, setToken } = AppState()
    const { data: user, isLoading } = useGetProfileQuery(token)
    const [updateProfile, { isLoadingUpdateProfile }] = useUpdateProfileMutation()
    const [form] = Form.useForm()
    const [image, setImage] = useState()
    const [isLoadingImg, setIsLoadingImg] = useState(false)
    const onFinish = async (value) => {
        const newUser = { ...value, avatar: image }
        const data = await updateProfile(newUser)
        if (data?.data.user) {
            localStorage.setItem('user', JSON.stringify(data.data.user))
            setUserLogger(data.data.user)
            setToken(data.data.token)
            localStorage.setItem('token', JSON.stringify(data.data.token))
            Swal.fire(
                'Good job!',
                `${data.data.message}`,
                'success'
            )
        }
        else {
            Swal.fire({
                icon: 'error',
                title: data.data.message
            })
        }
    }
    useEffect(() => {
        form.setFieldsValue(user?.user)
        if (user?.user) {
            setImage(user.user.avatar)
        }
    }, [user])
    const onChangeImg = async (event) => {
        setIsLoadingImg(true)
        const formData = new FormData();
        formData.append("image", event.target.files[0]);
        const apiResponse = await axios.post(
            `https://api.imgbb.com/1/upload?key=283182a99cb41ed4065016b64933524f`,
            formData
        );
        setImage(apiResponse.data.data.url);
        setIsLoadingImg(false)
    }
    return (
        <>
            {isLoading ? <>
                <div className='flex justify-center items-center mt-10'>
                    <Spinner thickness='4px'
                        speed='0.65s'
                        emptyColor='gray.200'
                        color='blue.500'
                        size='xl' />
                </div>
            </> : <>
                {user.user ? <div className='mb-[10rem]'>
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
                                    <p className="mr-2 text-sm font-medium text-gray-900">Thông tin cán nhân</p>
                                </div>
                            </li>
                        </ol>
                    </div>
                    <div className='flex mt-5 justify-between'>
                        <h2 className='text-2xl font-bold ml-10'>Thông tin cá nhân</h2>
                    </div>
                    <h3 className='text-xl ml-10 mt-5'>Xin chào bạn <span className='text-red-500'>{user.user.name}</span></h3>
                    <div className='grid-cols-2 grid mt-5'>
                        <Form
                            onFinish={onFinish}
                            form={form}
                            name="basic"
                            labelCol={{
                                span: 8,
                            }}
                            wrapperCol={{
                                span: 16,
                            }}
                            style={{
                                maxWidth: 600,
                            }}
                            initialValues={{
                                remember: true,
                            }}
                            autoComplete="off"
                        >
                            <Form.Item
                                label="Email"
                                name="email"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Email không được để trống',
                                    },
                                    {
                                        type: 'email',
                                        message: 'Sai địng dạng email'
                                    }
                                ]}
                            >
                                <Input />
                            </Form.Item>
                            <Form.Item
                                label="Tên tài khoản"
                                name="name"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Tên tài khoản không được để trống',
                                    },
                                    {
                                        min: 6,
                                        message: 'Tên tài khoản ít nhất 6 kí tự'
                                    }
                                ]}
                            >
                                <Input />
                            </Form.Item>
                            <Form.Item
                                wrapperCol={{
                                    offset: 8,
                                    span: 16,
                                }}
                            >
                                <Button className='w-[10rem] mt-[5rem]' htmlType="submit">
                                    {isLoadingUpdateProfile ? <GoSync className='animate-spin ml-[50%]' /> : 'Lưu'}
                                </Button>
                            </Form.Item>
                        </Form>
                        <div>
                            {isLoadingImg ? <Spinner thickness='4px'
                                speed='0.65s'
                                emptyColor='gray.200'
                                color='blue.500'
                                size='xl' /> : <img src={image} className='w-[10rem] h-[10rem] rounded-full' />}

                            <div className="inline-block relative">
                                <label htmlFor="file-input">
                                    <img
                                        className='ml-[5rem] mt-10'
                                        src="https://cdn-icons-png.flaticon.com/512/685/685655.png"
                                        width="20px"
                                        height="20px"
                                        alt=""
                                    />
                                    <input
                                        onChange={onChangeImg}
                                        type="file"
                                        accept=".jpg"
                                        className="absolute left-0 top-0 opacity-0 w-[100%] h-[100%]"
                                    />
                                </label>
                            </div>
                        </div>
                    </div>
                </div> : <div className='font-bold px-10 py-3 mt-5 w-full h-[3rem] bg-gray-100'>
                    {user.message}
                </div>}
            </>}
        </>
    )
}

export default ProfilePage