import React, { useState } from 'react'
import { useGetAllUserQuery } from '../../../api/user'
import { Spinner } from '@chakra-ui/react'
import { Button, Form, Input, Modal, Radio, Table } from 'antd'
import { useAddCouponsToUserMutation } from '../../../api/coupons'
import { GoSync } from 'react-icons/go'
import { AppState } from '../../../context/AppProvider'
const ListUserAdmin = () => {
    const {token} = AppState()
    const [value, setValue] = useState('');
    const [search, setSearch] = useState('')
    const { data, isLoading } = useGetAllUserQuery({ role: value, search })
    const [userId,setUserId]=useState('')
    const [addToCoupons,{isLoadingAdd}]=useAddCouponsToUserMutation()
    const [coupons, setCoupons] = useState('')
    const [errorSearch, setErrorSearch] = useState('')
    const [isModalOpen, setIsModalOpen] = useState(false);
    const showModal = () => {
        setIsModalOpen(true);
    };
    const handleCancel = () => {
        setErrorSearch('')
        setCoupons('')
        setIsModalOpen(false);
    };
    
    const [form]=Form.useForm()
    const dataSource = data?.map((item) => (
        {
            key: item._id,
            name: item.name,
            avatar: item.avatar,
            email: item.email,
            createdAt: item.createdAt,
            role: item.role
        }
    ))
    const columns = [
        {
            title: 'Tên tài khoản',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Avatar',
            dataIndex: 'avatar',
            key: 'avatar',
            render: (item) => {
                return <img className='w-20' src={item} />
            }
        },
        {
            title: 'Email',
            dataIndex: 'email',
            key: 'email',
        },
        {
            title: 'Ngày đăng ký',
            dataIndex: 'createdAt',
            key: 'createdAt',
        },
        {
            title: 'Role',
            dataIndex: 'role',
            key: 'role',
        },
        {
            render: (item) => {
                return <>
                    <Button className='flex' onClick={()=>{
                        showModal()
                        setUserId(item.key)
                    }}>Tặng phiếu mua hàng</Button>
                </>
            }
        }
    ];
    const onSearchCouponsAdmin = ({ search }) => {
        form.setFieldsValue({search:''})
        fetch(`https://bookstore-zjae.onrender.com/api/coupons/search/admin?search=${search}`).then(response => response.json()).then(data => {
            if (!data?.message) {
                setCoupons(data)
            }
            else {
                setErrorSearch('Phiếu phảm giá không tồn tại')
            }
        })
    }
    const onChange = (e) => {
        setValue(e.target.value);
    };
    return (
        <>
            <h2 className='text-2xl font-bold tracking-tight'>Quản lí tài khoản</h2>
            <div className='flex mt-10 justify-between'>
                <Radio.Group onChange={onChange} value={value}>
                    <Radio value={''}>All</Radio>
                    <Radio value={'member'}>Member</Radio>
                    <Radio value={'admin'}>Admin</Radio>
                </Radio.Group>
                <input className='flex rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 h-8 w-[150px] lg:w-[250px]' placeholder='Filter name or email' value={search} onChange={(event) => setSearch(event.target.value)} />
            </div>
            {isLoading ? <>
                <div className='flex justify-center items-center mt-10'>
                    <Spinner thickness='4px'
                        speed='0.65s'
                        emptyColor='gray.200'
                        color='blue.500'
                        size='xl' />
                </div>
            </> : <Table className='w-full mt-10' dataSource={dataSource} columns={columns} pagination={{ pageSize: 5 }} />
            }
            <Modal title="Tặng phiếu giảm giá cho tài khoản" open={isModalOpen} onCancel={handleCancel}>
                <Form form={form} onFinish={onSearchCouponsAdmin} className='mt-10 flex'>
                    <Form.Item rules={[{ required: true, message: 'Nhập mã giảm giá' }]} name={'search'}>
                        <Input onChange={(e) => {
                            setErrorSearch('')
                            setCoupons('')    
                        }}  placeholder='Nhập mã giảm giá' className='w-full' />
                    </Form.Item>
                    <Button className='ml-5' htmlType='submit'  >Tìm</Button>
                </Form>
                {coupons ? <>
                    Code giảm giá : <p className='text-red-500'>{coupons.name}</p>
                    Giá trị : <p className='text-red-500'>{coupons.value}.000 đ</p>
                    Điều kiện : <p className='text-red-500'>Đơn hàng có giá trị hơn {coupons.min_purchase_amount}.000 đ</p>
                    Ngày hết hạn : <p className='text-red-500'>{coupons.expiration_date}</p>
                    <Button className='mt-5' onClick={()=>{
                         addToCoupons({code:coupons.name,userId,token})
                    }}>{isLoadingAdd ? <GoSync className='animate-spin' /> : 'Tặng phiếu giảm giá'}</Button>
                </> : <></>}
                <>{errorSearch ? <p className='text-red-500'>{errorSearch}</p> : ""}</>
            </Modal>
        </>
    )
}

export default ListUserAdmin