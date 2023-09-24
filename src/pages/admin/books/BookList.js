import React, { useEffect, useState } from 'react'
import { useGetAllBooksQuery } from '../../../api/book'
import { Button, Table } from 'antd'
import { Spinner } from '@chakra-ui/react'
import { useGetAllCategoryQuery } from '../../../api/category'
import { NavLink } from 'react-router-dom'

const BookListAdmin = () => {
    const [isMenu, setIsMenu] = useState(false)
    const [isCategory, setIsCategory] = useState(false)
    const [sort, setSort] = useState()
    const [order, setOrder] = useState()
    const [page, setPage] = useState(1)
    const [value, setValue] = useState('')
    const [dataCategories, setDataCategories] = useState([])
    const [listCategories, setListCategories] = useState([])
    const { data, isLoading } = useGetAllBooksQuery({ sort, order, dataCategories, search: value })
    const { data: categories } = useGetAllCategoryQuery()
    useEffect(() => {
        setListCategories(categories)
    }, [categories])
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
        {
            title: 'Actions',
            key: 'actions',
            render: (item) => {
                return <div className='flex'>
                    <Button>Delete</Button>
                    <NavLink to={`/admin/products/edit/${item.key}`}>
                        <Button>Edit</Button>
                    </NavLink>
                </div>
            }
        },
    ];
    return (
        <>
            <div className='flex justify-between'>
                <h2 className='text-2xl font-bold tracking-tight'>Quản lí sách</h2>
                <a href='/admin/books/add'><Button>Thêm mới sách</Button></a>
            </div>
            <div className='w-full space-y-3 mt-5 relative'>
                <div className='flex w-full items-center justify-between space-x-2 overflow-auto p-1'>
                    <div className='flex flex-1 items-center space-x-2'>
                        <input className='flex rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 h-8 w-[150px] lg:w-[250px]' placeholder='Filter name' onChange={(event) => setValue(event.target.value)} />
                        <button onClick={() => setIsCategory(!isCategory)} className='relative inline-flex items-center justify-center font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 border border-input bg-transparent shadow-sm hover:bg-accent hover:text-accent-foreground rounded-md px-3 text-xs h-8 border-dashed'>
                            <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg" className="mr-2 h-4 w-4" aria-hidden="true"><path d="M7.49991 0.876892C3.84222 0.876892 0.877075 3.84204 0.877075 7.49972C0.877075 11.1574 3.84222 14.1226 7.49991 14.1226C11.1576 14.1226 14.1227 11.1574 14.1227 7.49972C14.1227 3.84204 11.1576 0.876892 7.49991 0.876892ZM1.82707 7.49972C1.82707 4.36671 4.36689 1.82689 7.49991 1.82689C10.6329 1.82689 13.1727 4.36671 13.1727 7.49972C13.1727 10.6327 10.6329 13.1726 7.49991 13.1726C4.36689 13.1726 1.82707 10.6327 1.82707 7.49972ZM7.50003 4C7.77617 4 8.00003 4.22386 8.00003 4.5V7H10.5C10.7762 7 11 7.22386 11 7.5C11 7.77614 10.7762 8 10.5 8H8.00003V10.5C8.00003 10.7761 7.77617 11 7.50003 11C7.22389 11 7.00003 10.7761 7.00003 10.5V8H4.50003C4.22389 8 4.00003 7.77614 4.00003 7.5C4.00003 7.22386 4.22389 7 4.50003 7H7.00003V4.5C7.00003 4.22386 7.22389 4 7.50003 4Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd"></path></svg> Category
                            <div className='shrink-0 bg-border w-[1px] mx-2 h-4'></div>
                            <div className='inline-flex items-center border py-0.5 text-xs transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80 rounded-sm px-1 font-normal lg:hidden'>1</div>
                            <div className='hidden space-x-1 lg:flex'>
                                {dataCategories?.map(item => {
                                    return <div key={item._id} className='inline-flex items-center border py-0.5 text-xs transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80 rounded-sm px-1 font-normal'>{item.name}</div>
                                })}
                            </div>
                        </button>
                        <button onClick={() => {
                            setDataCategories([])
                            setIsCategory(false)
                        }} className='inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:text-accent-foreground py-2 h-8 px-2 lg:px-3'>Reset <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg" className="ml-2 h-4 w-4" aria-hidden="true"><path d="M11.7816 4.03157C12.0062 3.80702 12.0062 3.44295 11.7816 3.2184C11.5571 2.99385 11.193 2.99385 10.9685 3.2184L7.50005 6.68682L4.03164 3.2184C3.80708 2.99385 3.44301 2.99385 3.21846 3.2184C2.99391 3.44295 2.99391 3.80702 3.21846 4.03157L6.68688 7.49999L3.21846 10.9684C2.99391 11.193 2.99391 11.557 3.21846 11.7816C3.44301 12.0061 3.80708 12.0061 4.03164 11.7816L7.50005 8.31316L10.9685 11.7816C11.193 12.0061 11.5571 12.0061 11.7816 11.7816C12.0062 11.557 12.0062 11.193 11.7816 10.9684L8.31322 7.49999L11.7816 4.03157Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd"></path></svg></button>
                    </div>
                    <div className='flex items-center space-x-2 mt-5 ml-[5rem]'>
                        <button onClick={() => setIsMenu(!isMenu)} className='bg-black text-white inline-flex items-center justify-center font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground shadow hover:bg-primary/90 h-8 rounded-md px-3 text-xs'>Sort
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="ml-2 h-4 w-4" aria-hidden="true"><path d="m6 9 6 6 6-6"></path></svg>
                        </button>
                        {isMenu ? <div className='z-50 min-w-[8rem] overflow-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-md data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 w-48'>
                            <div className='px-2 py-1.5 text-sm font-semibold'>Sort by</div>
                            <div className='-mx-1 my-1 h-px bg-muted'></div>
                            <button onClick={() => {
                                setIsMenu(false)
                                setSort('createdAt')
                                setOrder('desc')
                                setPage(1)
                            }} className='relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50 w-full'>Mới nhất</button>
                            <button onClick={() => {
                                setIsMenu(false)
                                setSort('price')
                                setOrder('asc')
                                setPage(1)
                            }} className='relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50 w-full'>Giá thấp đến cao</button>
                            <button onClick={() => {
                                setIsMenu(false)
                                setSort('price')
                                setOrder('desc')
                                setPage(1)
                            }} className='relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50 w-full'>Giá cao đến thấp</button>
                            <button onClick={() => {
                                setIsMenu(false)
                                setSort('name')
                                setOrder('asc')
                                setPage(1)
                            }} className='relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50 w-full'>A đến Z</button>
                            <button onClick={() => {
                                setIsMenu(false)
                                setSort('name')
                                setOrder('desc')
                                setPage(1)
                            }} className='relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50 w-full'>Z đến A</button>
                        </div> : <></>}
                    </div>
                </div>
                {isCategory ? <div className="absolute z-10 left-40 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none overflow-y-scroll h-40">
                    {listCategories?.map(item => {
                        const isMatch = dataCategories?.find(category => category._id === item._id)
                        return <div onClick={() => {
                            if (!isMatch) {
                                setDataCategories([...dataCategories, { _id: item._id, name: item.name }])
                            }
                            else {
                                setDataCategories(dataCategories.filter(itemData => itemData._id !== item._id))
                            }
                        }} key={item._id} className='relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none aria-selected:bg-accent aria-selected:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50'>
                            <div className={`${isMatch ? '0' : 'mr-2 flex h-4 w-4 items-center justify-center rounded-sm border border-primary opacity-50 [&_svg]:invisible'}`}>
                                <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" aria-hidden="false"><path d="M11.4669 3.72684C11.7558 3.91574 11.8369 4.30308 11.648 4.59198L7.39799 11.092C7.29783 11.2452 7.13556 11.3467 6.95402 11.3699C6.77247 11.3931 6.58989 11.3355 6.45446 11.2124L3.70446 8.71241C3.44905 8.48022 3.43023 8.08494 3.66242 7.82953C3.89461 7.57412 4.28989 7.55529 4.5453 7.78749L6.75292 9.79441L10.6018 3.90792C10.7907 3.61902 11.178 3.53795 11.4669 3.72684Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd"></path></svg>
                            </div>
                            <span>{item.name}</span>
                        </div>
                    })}
                </div> : <></>}
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

export default BookListAdmin