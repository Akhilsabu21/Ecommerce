import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import AdminNav from '../../AdminNav/AdminNav'
import axios from 'axios';

const SingleProduct = () => {
    const { id } = useParams();
    const [data, setData] = useState({})
    const [file, setFile] = useState('')

    const getProduct = async () => {
        const res = await axios.get(`http://localhost:3003/api/singlepeoduct/${id}`)
        console.log(res.data);
        setData(res.data)
        setFile(res.data.thumbnile[0].filename)
        // console.log(res.data.thumbnile[0].filename);
        // console.log(data.thumbnile[0].filename);
    }
    useEffect(() => {
        getProduct()
    }, [file])
    return (
        <>

            <div className='flex me-5'>

                <AdminNav />

                <div className="container mx-auto mt-6">
                    <section className="text-gray-600 body-font overflow-hidden">
                        <div className="container lg:mt-12 px-10 py-10 mx-auto">
                            <div className="lg:w-4/5 border-solid border-2 rounded-lg p-5 mx-auto flex flex-wrap">
                                <img alt="ecommerce" className="lg:w-1/2 w-full lg:h-auto h-auto object-cover object-center rounded" src={`../Products/${file}`} />
                                <div className="lg:w-1/2 w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0">
                                    <h2 className="text-sm title-font text-gray-500 tracking-widest">{data.categoryName}</h2>
                                    <h1 className="text-gray-900 text-3xl title-font font-medium mb-1">{data.name}</h1>
                                    <div className="flex mb-4">
                                        <span className="flex items-center">
                                            <svg fill="currentColor" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-4 h-4 text-indigo-500" viewBox="0 0 24 24">
                                                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                                            </svg>
                                            <svg fill="currentColor" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-4 h-4 text-indigo-500" viewBox="0 0 24 24">
                                                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                                            </svg>
                                            <svg fill="currentColor" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-4 h-4 text-indigo-500" viewBox="0 0 24 24">
                                                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                                            </svg>
                                            <svg fill="currentColor" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-4 h-4 text-indigo-500" viewBox="0 0 24 24">
                                                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                                            </svg>
                                            <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-4 h-4 text-indigo-500" viewBox="0 0 24 24">
                                                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                                            </svg>
                                            <span className="text-gray-600 ml-3">{data.rating}/5 Rating</span>
                                        </span>
                                        
                                    </div>
                                    <p className="leading-relaxed">{data.description},Lorem ipsum dolor sit, amet consectetur adipisicing elit. Veniam dolore debitis quibusdam tenetur aliquam illo dolor delectus obcaecati beatae. Cupiditate asperiores soluta molestiae dolore distinctio dolores magnam saepe! Magni, id.
                                    </p>
                                    <div className="flex mt-6 items-center pb-5 border-b-2 border-gray-100 mb-5">

                                        <div className="flex ml-6 items-center">
                                            <span className="mr-3">Stock :</span>
                                            <div className="relative">
                                                {data.stock}
                                                <span className="absolute right-0 top-0 h-full w-10 text-center text-gray-600 pointer-events-none flex items-center justify-center">
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex">
                                        <span className="title-font font-medium text-2xl text-gray-900">Price ${data.sellingPrice}</span>

                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                </div>


            </div>
        </>
    )
}

export default SingleProduct
