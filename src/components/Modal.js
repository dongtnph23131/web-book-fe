import React from 'react'
import { useGetDetailOrderQuery } from '../api/order'

const Modal = ({ hiddenModal, orderDetailId }) => {
    
    const { data, isLoading } = useGetDetailOrderQuery(orderDetailId)
    console.log(data);
    return (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-700 bg-opacity-75">
            <div className="w-6/12">
                <div className="px-6 py-3 h-10 bg-gray-600 text-left text-xs font-medium text-black uppercase tracking-wider rounded-tr-[20px] rounded-tl-[20px]">
                    <button onClick={hiddenModal} className="float-right">
                        Thoát
                    </button>
                </div>
                <div className="py-10 h-900 bg-gray-100 rounded-br-[20px] rounded-bl-[20px] px-10 ">
                    {isLoading ? <p>Loading</p> : <>
                        {data?.data?.orderItems.map((item) => {
                            return <li key={item._id} className="flex py-6">
                                <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                                    <img src={item.productId.coverImage} />
                                </div>

                                <div className="ml-4 flex flex-1 flex-col">
                                    <div>
                                        <div className="flex justify-between text-base font-medium text-gray-900">
                                            <h3>
                                                <p>{item.name}</p>
                                            </h3>
                                            <p className="ml-4">$ {item.productId.price}</p>
                                        </div>
                                    </div>
                                    <div className="flex flex-1 items-end justify-between text-sm">
                                        <p className="text-gray-500">Qty {item.quantity}</p>
                                    </div>
                                </div>
                            </li>
                        })}
                        <h2 className='mt-2'>Ngày đặt hàng : {data?.data?.paidAt}</h2>
                        <h2 className='mt-2'>Đia chỉ nhận hàng : {data?.data?.address}</h2>
                        <h2 className='mt-2'>Số điện thoại nhận hàng : {data?.data?.phone}</h2>
                        <h2 className='mt-2'>Tên người nhận : {data?.data?.userNameReceive
                        }</h2>
                        <h2 className='mt-2'>Ghi chú: {data?.data?.node}</h2>
                    </>}
                </div>
            </div>
        </div>
    )
}

export default Modal