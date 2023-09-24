import React from 'react'
import { Button, Form, Input } from 'antd'
import { useUpdatePasswordMutation } from '../api/user'
import { Spinner } from '@chakra-ui/react'
import Swal from 'sweetalert2'
import { useNavigate } from 'react-router-dom'
import { AppState } from '../context/AppProvider'

const UpdatePassword = () => {
    const navigate = useNavigate()
    const [updatePassword, { isLoading }] = useUpdatePasswordMutation()
    const {token, setToken, setUserLogger } = AppState()
    const onFinish = async (value) => {
        const data = await updatePassword({value,token})
        if (data?.data) {
            Swal.fire(
                'Good job!',
                'Đổi mật khẩu thành công',
                'success'
            )
            localStorage.setItem('user', JSON.stringify(data.data.newUser))
            setUserLogger(data.data.newUser)
            setToken(data.data.token)
            localStorage.setItem('token', JSON.stringify(data.data.token))
            navigate('/')
        }
        else {
            Swal.fire({
                icon: 'error',
                title: data.error.data.message
            })
        }
    }
    return (
        <>
            <div className='mb-[13rem]'>
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
                                <p className="mr-2 text-sm font-medium text-gray-900">Thay đổi mật khẩu</p>
                            </div>
                        </li>
                    </ol>
                </div>
                <div className='flex mt-5 justify-between'>
                    <h2 className='text-2xl font-bold ml-10'>Thay đổi mật khẩu</h2>
                </div>
                <Form
                    className='mt-10'
                    onFinish={onFinish}
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
                        label="Mật khẩu cũ"
                        name="currentPassword"
                        rules={[
                            {
                                required: true,
                                message: 'Mật khẩu cũ không được để trống',
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
                        label="Mật khẩu mới"
                        name="newPassword"
                        rules={[
                            {
                                required: true,
                                message: 'Mật khẩu mới không được để trống',
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
                        label="Nhập lại mật khẩu mới"
                        name="confirmNewPassword"
                        rules={[
                            {
                                required: true,
                                message: 'Nhập lại mật khẩu mới',
                            },
                            {
                                min: 6,
                                message: 'Mật khẩu ít nhất 6 kí tự'
                            }, ({ getFieldValue }) => ({
                                validator(_, value) {
                                    if (!value || getFieldValue("newPassword") === value) {
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
                    <Form.Item
                        wrapperCol={{
                            offset: 8,
                            span: 16,
                        }}
                    >
                        <Button className='w-[10rem]' htmlType="submit">
                            {isLoading ? <Spinner thickness='4px'
                                speed='0.65s'
                                emptyColor='gray.200'
                                color='blue.500'
                                size='sm' /> : 'Đổi mật khẩu'}
                        </Button>
                    </Form.Item>
                </Form>
            </div>
        </>
    )
}

export default UpdatePassword