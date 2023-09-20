import React, { useState } from 'react'
import { Button, Form, Input } from 'antd'
import axios from 'axios'
import { useSignupMutation } from '../api/auth'
import { Spinner } from '@chakra-ui/react'
import Swal from 'sweetalert2'
import { useNavigate } from 'react-router-dom'
const Signup = () => {
    const [image, setImage] = useState()
    const navagate = useNavigate()
    const [isLoadingImg, setIsLoadingImg] = useState(false)
    const [imageError, setImageError] = useState(false)
    const [signup, { isLoading }] = useSignupMutation()
    const onChangeImg = async (event) => {
        setIsLoadingImg(true)
        event.preventDefault()
        const formData = new FormData();
        formData.append("image", event.target.files[0]);
        const apiResponse = await axios.post(
            `https://api.imgbb.com/1/upload?key=283182a99cb41ed4065016b64933524f`,
            formData
        );
        setIsLoadingImg(false)
        setImageError(false)
        setImage(apiResponse.data.data.url);
    }
    const onFinish = async (value) => {
        if (!image) {
            setImageError(true)
            return
        }
        else {
            const acount = await signup({ ...value, avatar: image })
            if (!acount.error) {
                Swal.fire(
                    'Good job!',
                    'Đăng ký thành công',
                    'success'
                )
                navagate('/signin')
            }
            else {
                Swal.fire({
                    icon: 'error',
                    title: acount.error.data.message
                })
            }
        }
    }
    return (
        <>
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
                            <p className="mr-2 text-sm font-medium text-gray-900">Đăng ký tài khoản</p>
                        </div>
                    </li>
                </ol>
            </div>
            {isLoading ? <div className='flex justify-center items-center mt-10'>
                <Spinner thickness='4px'
                    speed='0.65s'
                    emptyColor='gray.200'
                    color='blue.500'
                    size='xl' />
            </div> : <div className='mt-10 ml-20'>
                <h1 className='mt-5 text-2xl ml-5'>Đăng ký tài khoản</h1>
                <Form
                    onFinish={onFinish}
                    className='ml-[-5rem] mt-5'
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
                        label="Mật khẩu"
                        name="password"
                        rules={[
                            {
                                required: true,
                                message: 'Mật khẩu không được để trống',
                            },
                            {
                                min: 6,
                                message: 'Mật khẩu ít nhất 6 kí tự'
                            }
                        ]}
                    >
                        <Input.Password />
                    </Form.Item>
                    <Form.Item
                        label="Nhập lại mật khẩu"
                        name="confirmPassword"
                        rules={[
                            { required: true, message: "Hãy nhập lại mật khẩu" },
                            ({ getFieldValue }) => ({
                                validator(_, value) {
                                    if (!value || getFieldValue("password") === value) {
                                        return Promise.resolve();
                                    } else {
                                        return Promise.reject(
                                            new Error("Nhập lại mật khẩu không khớp")
                                        );
                                    }
                                },
                            }),
                        ]}
                    >
                        <Input.Password />
                    </Form.Item>
                    <div className='mb-10 ml-[7rem] flex'>
                        Hình ảnh : <input onChange={onChangeImg} accept=".png, .jpg" className=" ml-2 block text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400" type="file" multiple />
                        {imageError ? <p className='ml-5 text-red-500'>Hãy tải avatar</p> : ''}
                        {isLoadingImg ? <Spinner className='ml-3' thickness='4px'
                            speed='0.65s'
                            emptyColor='gray.200'
                            color='blue.500'
                            size='lg' /> : <></>}
                    </div>

                    <Form.Item
                        wrapperCol={{
                            offset: 8,
                            span: 16,
                        }}
                    >
                        <Button className='w-[10rem]' htmlType="submit">
                            Đăng ký
                        </Button>
                    </Form.Item>
                </Form>
            </div>}
        </>
    )
}

export default Signup