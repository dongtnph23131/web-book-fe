import React, { useState } from 'react'
import { useGetAllPublishingCompanyQuery } from '../../../api/publishingCompany'
import { Button, Table } from 'antd'
import { Spinner } from '@chakra-ui/react'
import { NavLink } from 'react-router-dom'
import { useGetAllBooksNoPageQuery } from '../../../api/book'
import { AiFillCloseCircle, AiFillEye } from 'react-icons/ai'
import BooksListModal from '../../../components/Modal/BooksListModal'
import { useGetAllAuthorQuery } from '../../../api/author'
import AuthorListModal from '../../../components/Modal/AuthorListModal'

const PublishingCompanyListAdmin = () => {
    const { data, isLoading } = useGetAllPublishingCompanyQuery()
    const { data: authors } = useGetAllAuthorQuery()
    const [isBook, setIsBook] = useState(false)
    const { data: books } = useGetAllBooksNoPageQuery({ sort: 'createAt' })
    const [dataProps, setDataProps] = useState([])
    const [dataPropsAuthors, setDataPropsAuthors] = useState([])
    const [isAuthor, setIsAuthor] = useState(false)
    const dataSource = data?.map((item) => (
        {
            key: item._id,
            name: item.name,
            image: item.image,
            description: item.description,
            length: item.books.length,
            lengthAuthor: item.authors.length
        }
    ))
    const columns = [
        {
            title: 'Tên nhà xuất bản',
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
            title: 'Mô tả',
            dataIndex: 'description',
            key: 'description'
        },
        {
            title: 'Số lượng sách',
            dataIndex: 'length',
            key: 'length',
            render: (item, dataItem) => {
                return <div className='flex'>{item} <AiFillEye onClick={() => {
                    setDataProps(books.filter(book => book.publishingCompanyId
                        ._id === dataItem.key))
                    setIsBook(true)
                }} className='ml-2 mt-1 text-xl' /></div>
            }

        },
        {
            title: 'Số lượng tác giả',
            dataIndex: 'lengthAuthor',
            key: 'lengthAuthor',
            render: (item, dataItem) => {
                return <div className='flex'>{item} <AiFillEye onClick={() => {
                    setDataPropsAuthors(authors.filter(author =>author.publishingCompanyId._id=== dataItem.key))
                    setIsAuthor(true)
                }} className='ml-2 mt-1 text-xl' /></div>
            }

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
                <h2 className='text-2xl font-bold tracking-tight'>Quản lí nhà xuất bản sách</h2>
                <a href='/admin/publishingCompanys/add'><Button>Thêm mới nhà xuất bản sách</Button></a>
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
                    <BooksListModal data={dataProps} />
                </div>
            </> : <></>}
            {isAuthor ? <>
                <div className='px-10 py-10 bg-gray-50 fixed inset-0 z-50 bg-background/80 backdrop-blur-sm data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0'>
                    <button type="button" className=" absolute right-20 top-5 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground">
                        <AiFillCloseCircle onClick={() => setIsAuthor(false)} className='text-5xl' />
                    </button>
                    <AuthorListModal data={dataPropsAuthors} />
                </div>
            </> : <></>}
        </>
    )
}

export default PublishingCompanyListAdmin