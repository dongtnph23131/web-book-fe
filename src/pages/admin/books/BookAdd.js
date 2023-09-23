import { Button, DatePicker, Form, Input, InputNumber, Select, message } from 'antd'
import React, { useState } from 'react'
import { useGetAllCategoryQuery } from '../../../api/category';
import axios from 'axios';
import { useGetAllAuthorQuery } from '../../../api/author';
import { useAddBookMutation } from '../../../api/book';
import { useNavigate } from 'react-router-dom';
import {GoSync} from "react-icons/go"
const { TextArea } = Input;
const BookAdd = () => {
    const { data: categories } = useGetAllCategoryQuery()
    const [image, setImage] = useState("")
    const [categoryId, setCategoryId] = useState("")
    const [authorId, setAuthorId] = useState("")
    const [publicationData, setPublicationData] = useState("")
    const [description, setDescription] = useState("")
    const [publishingCompanyId, setPublishingCompanyId] = useState()
    const { data: authories } = useGetAllAuthorQuery()
    const [addBook, { isLoading }] = useAddBookMutation()
    const navigate = useNavigate()
    const options = categories?.map((item) => {
        return {
            label: item.name,
            value: item._id
        }
    })
    const optionsAuthor = authories?.map((item) => {
        return {
            label: item.name,
            value: item._id
        }
    })
    const onChangeImg = async (event) => {
        event.preventDefault()
        const formData = new FormData();
        formData.append("image", event.target.files[0]);
        const apiResponse = await axios.post(
            `https://api.imgbb.com/1/upload?key=283182a99cb41ed4065016b64933524f`,
            formData
        );
        setImage(apiResponse.data.data.url);
    }
    const onChangeDate = (dateString) => {
        setPublicationData(dateString);
    };
    const onFinish = async (value) => {
        if(!categoryId | !publishingCompanyId | !authorId | !description | !image | !publicationData){
            return
        }
        const data = await addBook({ ...value,coverImage: image, categoryId, authorId, publicationData, description, publishingCompanyId  })
        if (data.data.data) {
            message.success('Thêm sản phẩm thành công');
            setTimeout(() => {
                navigate("/admin/books")
            }, 1000)
        }
        else {
            message.error(data.data.message);
        }
    }
    const onChangeCategory = (value) => {
        setCategoryId(value)
    }
    const onChangeAuthor = (value) => {
        fetch(`http://localhost:8080/api/authors/${value}`).then(response => response.json()).then(data => {
            setPublishingCompanyId(data.publishingCompanyId._id)
        })
        setAuthorId(value)
    }
    return (
        <>
            <h2 className='text-2xl font-bold tracking-tight'>Thêm sách</h2>
            <Form onFinish={onFinish} className='mt-10'>
                <Form.Item label="Tên sách" name="name" rules={[{ required: true, message: 'Tên sách không được để trống' }, { min: 6, message: 'Tên sách ít nhất 6 kí tự' }, { max: 255, message: 'Tên sách nhiều nhất 255 kí tự' }]}>
                    <Input className='w-2/3 ml-3' />
                </Form.Item>
                <Form.Item label="Giá sách tên bìa" name="priceOnCover" rules={[{ required: true, message: 'Giá sách không được để trống' }]}>
                    <InputNumber className='w-2/3 ml-3' />
                </Form.Item>
                <Form.Item label="% Giảm giá" name="discount" rules={[{ required: true, message: '% giảm giá không được để trống' }]}>
                    <InputNumber className='w-2/3 ml-3' />
                </Form.Item>
                Mô tả  <TextArea rows={4} onChange={(e) => setDescription(e.target.value)} className='mb-5' />
                <Form.Item label="Số lượng" name="stock" rules={[{ required: true, message: 'Số Lượng sách không được để trống' }]}>
                    <InputNumber className='w-2/3 ml-3' />
                </Form.Item>
                Hình ảnh  <input onChange={onChangeImg} accept=".png, .jpg" className="block text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400" type="file" multiple />
                Ngày xuất bản  <DatePicker onChange={onChangeDate} className='mt-5 mb-5' /> <br />
                <Form.Item label="Số trang" name="numberPage" rules={[{ required: true, message: 'Số trang không được để trống' }]}>
                    <InputNumber className='w-2/3 ml-3' />
                </Form.Item>
                <Form.Item label="Khối lượng (g)" name="weight" rules={[{ required: true, message: 'Khối lượng không được để trống' }]}>
                    <InputNumber className='w-2/3 ml-3' />
                </Form.Item>
                Danh mục sách <Select
                    onChange={onChangeCategory}
                    defaultValue={'Chọn danh mục sản phẩm'}
                    options={options}
                /> <br />
                <div className='mt-5'>
                    Tác giả <Select
                        onChange={onChangeAuthor}
                        defaultValue={'Chọn tác giả'}
                        options={optionsAuthor}
                    /> <br />
                </div>
                <Button htmlType='submit' className='mt-5'>{isLoading ? <GoSync className='animate-spin' /> : 'Thêm  sản phẩm'}</Button>
            </Form>
        </>
    )
}

export default BookAdd