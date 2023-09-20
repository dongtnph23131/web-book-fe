import React from 'react'
import { NavLink } from 'react-router-dom'

const BookItem = ({ book }) => {
    return (
        <NavLink to={`/books/${book._id}`}>
            <div className="group relative border border-gray-200 px-5 py-5" >
                <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-80">
                    <img src={book.coverImage} className="h-full w-full object-cover object-center lg:h-full lg:w-full" />
                </div>
                <div className="mt-4 justify-between">
                    <div>
                        <h3 className="text-sm text-gray-700">
                            <p>
                                <span aria-hidden="true" className="absolute inset-0"></span>
                                {book.name}
                            </p>
                        </h3>
                        <div className='flex justify-between mt-2'>
                            {book.discount > 0 ? <div className='flex justify-center items-center text-white font-bold w-20 rounded-sm h-[25px] bg-red-500'>-{book.discount} %</div> : <></>}
                            <div className='flex'>
                                {book.discount > 0 ? <p class="text-sm font-medium line-through mr-2">{book.price}.000 đ</p> : <></>}
                                <p className="text-sm font-medium text-red-400">{book.price}.000 đ</p>
                            </div>
                        </div>
                        <p className="mt-2 text-sm text-gray-800">Tác giả : {book.authorId.name}</p>
                    </div>
                </div>
            </div>

        </NavLink>
    )
}

export default BookItem