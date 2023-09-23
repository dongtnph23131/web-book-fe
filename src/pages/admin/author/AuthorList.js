import { Spinner } from '@chakra-ui/react';
import { Button, Table } from 'antd';
import React, { useState } from 'react'
import { useGetAllAuthorQuery } from '../../../api/author';
import { NavLink} from 'react-router-dom';
import { AiFillCloseCircle } from "react-icons/ai"
import { AiFillEye } from "react-icons/ai"
import { useGetAllBooksNoPageQuery, useGetAllBooksQuery } from '../../../api/book';
import BooksListModal from '../../../components/Modal/BooksListModal';
const AuthorListAdmin = () => {
    const { data, isLoading } = useGetAllAuthorQuery()
    const [isBook, setIsBook] = useState(false)
    const {data:books}=useGetAllBooksNoPageQuery({sort:'createAt'})
    const [dataProps,setDataProps]=useState([])
    const dataSource = data?.map((item) => (
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
            render: (item,dataItem) => {
                return <div className='flex'>{item} <AiFillEye onClick={() => {
                     setDataProps(books.filter(book=>book.authorId._id===dataItem.key))
                    setIsBook( true)
                }} className='ml-2 mt-1 text-xl' /></div>
            }
        },
        {
            title: 'Tiểu sử tác giả',
            dataIndex: 'story',
            key: 'story'
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
                <h2 className='text-2xl font-bold tracking-tight'>Quản lí tác giả</h2>
                <a href='/admin/books/add'><Button>Thêm mới tác giả</Button></a>
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
            {isBook ? <>
                <div className='px-10 py-10 bg-gray-50 fixed inset-0 z-50 bg-background/80 backdrop-blur-sm data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0'>
                    <button type="button" className=" absolute right-20 top-5 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground">
                        <AiFillCloseCircle onClick={() => setIsBook(false)} className='text-5xl' />
                    </button>
                    <BooksListModal data={dataProps}/>
                </div>
            </> : <></>}
        </>
    )
}

export default AuthorListAdmin