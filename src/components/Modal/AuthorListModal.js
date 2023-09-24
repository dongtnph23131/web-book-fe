import { Table } from 'antd';
import React from 'react'

const AuthorListModal = ({ data }) => {
    console.log(data);
    const dataSource = data.map((item) => (
        {
            key: item._id,
            name: item.name,
            image: item.image,
            story: `${item.story.slice(0, 500)} .......`,
            publishingCompanyName: item.publishingCompanyId.name,
            length: item.books.length
        }
    ))
    const columns = [
        {
            title: 'Tên tác giả',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Image',
            dataIndex: 'image',
            key: 'image',
            render: (item) => {
                return <img className='w-20' src={item} />
            }
        },
        {
            title: 'Nhà xuất bản làm việc',
            dataIndex: 'publishingCompanyName',
            key: 'publishingCompanyName'
        },
        {
            title: 'Số lượng sách',
            dataIndex: 'length',
            key: 'length',
        },
        {
            title: 'Tiểu sử tác giả',
            dataIndex: 'story',
            key: 'story'
        },
    ];
    return (
        <Table className='w-full mt-10' dataSource={dataSource} columns={columns} pagination={{ pageSize: 5 }} />
    )
}

export default AuthorListModal