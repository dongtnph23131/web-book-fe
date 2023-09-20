import React from 'react'
import { Button, Form, Input } from 'antd'
import { useSigninMutation } from '../api/auth'
import { AppState } from '../context/AppProvider'
import Swal from 'sweetalert2'
import { NavLink, useNavigate } from 'react-router-dom'
import { Spinner } from '@chakra-ui/react'
const Signin = () => {
    const [signin, { isLoading }] = useSigninMutation()
    const { setUserLogger, setToken } = AppState()
    const navagate = useNavigate()
    const onFinish = async (value) => {
        const acount = await signin(value)
        if (!acount.error) {
            Swal.fire(
                'Good job!',
                'Đăng nhập thành công',
                'success'
            )
            localStorage.setItem('user', JSON.stringify(acount.data.user))
            setUserLogger(acount.data.user)
            setToken(acount.data.token)
            localStorage.setItem('token', JSON.stringify(acount.data.token))
            navagate('/')
        }
        else {
            Swal.fire({
                icon: 'error',
                title: acount.error.data.message
            })
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
                            <p className="mr-2 text-sm font-medium text-gray-900">Đăng nhập tài khoản</p>
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
                <h1 className='mt-5 text-2xl ml-5'>Đăng nhập tài khoản</h1>
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
                                message: 'Eamil không được để trống',
                            },
                            {
                                type: 'email',
                                message: 'Sai định dạng email'
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
                    <div className="text-sm ml-[12rem] mb-5 flex">
                        <a href="/forgotPassword" className="font-semibo">Forgot password?</a>
                        <NavLink to={'/signup'}><button className=' ml-5 inline-flex items-center justify-center font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 border border-input bg-transparent shadow-sm hover:bg-accent hover:text-accent-foreground h-8 rounded-md px-3 text-xs w-20'>Signup</button></NavLink>
                    </div>
                    
                    <Form.Item
                        wrapperCol={{
                            offset: 8,
                            span: 16,
                        }}
                    >
                        <Button className='w-[10rem]' htmlType="submit">
                            Đăng nhập
                        </Button>
                    </Form.Item>
                </Form >
            </div>}
        </>
    )
}

export default Signin