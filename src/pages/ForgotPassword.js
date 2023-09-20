import React from 'react'
import { Button, Form, Input } from 'antd'
import { useForgotPasswordMutation } from '../api/user'
import { Spinner } from '@chakra-ui/react'
import Swal from 'sweetalert2'
import { useNavigate } from 'react-router-dom'

const ForgotPassword = () => {
    const [forgotPassword, { isLoading }] = useForgotPasswordMutation()
    const navagate = useNavigate()
    const onFinish = async (value) => {
        const data = await forgotPassword(value)
        if (data?.data) {
            Swal.fire(
                'Good job!',
                data.data.message,
                'success'
            )
            navagate('/resetPassword')
        }
        else {
            Swal.fire({
                icon: 'error',
                title: data.error.data.message
            })
        }
    }
    return (
        <div className='mb-[10rem]'>
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
                                <p className="mr-2 text-sm font-medium text-gray-900">Khôi phục mật khẩu</p>
                            </div>
                        </li>
                    </ol>
                </div>
            <div className='flex mt-5 justify-between'>
                <h2 className='text-2xl font-bold ml-10'>Khôi phục mật khẩu</h2>
            </div>
            <p className='ml-10 w-[50rem] mt-5'>Nếu bạn quên mật khẩu, nhập địa chỉ email của bạn vào khung này và nhấp Khôi phục mật khẩu.Bạn sẽ nhận được mã đổi mật khẩu mới. Bạn có thể thay đổi mật khẩu sau đó.</p>
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
                            size='sm' /> : 'Khôi phục mật khẩu'}
                    </Button>
                </Form.Item>
            </Form >
        </div>
    )
}

export default ForgotPassword