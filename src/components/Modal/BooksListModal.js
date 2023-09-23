import { Table } from 'antd';
import React from 'react'

const BooksListModal = ({data}) => {
    const dataSource = data?.map((item) => {
        return {
            key: item._id,
            _id: item._id,
            name: item.name,
            price: item.price,
            priceOnCover: item.priceOnCover,
            description: `${item.description.slice(0, 50)}...`,
            stock: item.stock,
            coverImage: item.coverImage,
            publishingCompany: item.publishingCompanyId.name,
            publicationData: item.publicationData,
            numberPage: item.numberPage,
            weight: item.weight,
            nameAuthor: item.authorId.name,
            nameCategory: item.categoryId.name
        }
    })
    const columns = [
        {
            title: 'Id',
            dataIndex: '_id',
            key: '_id'
        }
        ,
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Price on cover',
            dataIndex: 'priceOnCover',
            key: 'priceOnCover',
        },
        {
            title: 'Price',
            dataIndex: 'price',
            key: 'price',
        },
        {
            title: 'Description',
            dataIndex: 'description',
            key: 'description',
        },
        {
            title: 'Stock',
            dataIndex: 'stock',
            key: 'stock',
        },
        {
            title: 'Image',
            dataIndex: 'coverImage',
            key: 'coverImage',
            render: (item) => {
                return <img className='w-20' src={item} />
            }
        },
        {
            title: 'Nhà xuất bản',
            dataIndex: 'publishingCompany',
            key: 'publishingCompany'
        },
        {
            title: 'Ngày xuất bản',
            dataIndex: 'publicationData',
            key: 'publicationData'
        },
        {
            title: 'Số trang',
            dataIndex: 'numberPage',
            key: 'numberPage'
        },
        {
            title: 'Khối lượng',
            dataIndex: 'weight',
            key: 'weight'
        },
        {
            title: 'Author',
            dataIndex: 'nameAuthor',
            key: 'nameAuthor'
        },
        {
            title: 'Category',
            dataIndex: 'nameCategory',
            key: 'nameCategory'
        },
    ];
    return (
        <Table className='w-full mt-10' dataSource={dataSource} columns={columns} pagination={{ pageSize: 5 }} />
    )
}

export default BooksListModal