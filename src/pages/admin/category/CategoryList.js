import React from 'react'
import { useGetAllCategoryQuery } from '../../../api/category'
import { Button, Table } from 'antd'
import { Spinner } from '@chakra-ui/react'
import { NavLink } from 'react-router-dom'

const CategoryListAdmin = () => {
    const { data, isLoading } = useGetAllCategoryQuery()
    const dataSource = data?.map((item) => (
        {
            key: item._id,
            name: item.name,
            length:item.books.length
        }
    ))
    const columns = [
        {
            title: 'Tên danh mục sản phẩm',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Số lượng sản phẩm thuộc danh mục',
            dataIndex: 'length',
            key: 'length',
        },
        {
            title: 'Actions',
            key: 'actions',
            render: (item) => {
                return <>
                    <Button>Delete</Button>
                    <NavLink to={`/admin/categories/edit/${item.key}`}>
                        <Button className='ml-3'>Edit</Button>
                    </NavLink>
                </>
            }
        },
    ];
    return (
        <>
            <div className='flex justify-between'>
                <h2 className='text-2xl font-bold tracking-tight'>Quản lí danh mục sách</h2>
                <a href='/admin/books/add'><Button>Thêm mới danh mục sách</Button></a>
            </div>
            {isLoading ? <div className='flex justify-center items-center mt-10'>
                <Spinner thickness='4px'
                    speed='0.65s'
                    emptyColor='gray.200'
                    color='blue.500'
                    size='xl' />
            </div> : <>
                <Table className='w-full' dataSource={dataSource} columns={columns} pagination={{ pageSize: 5 }} />
            </>}
        </>
    )
}

export default CategoryListAdmin