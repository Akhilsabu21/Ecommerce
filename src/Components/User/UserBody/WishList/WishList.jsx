import React, { useEffect, useState } from 'react'
import UserNav from '../../UserNav/UserNav'
import axios from 'axios';
import { Link, useParams } from 'react-router-dom';

const WishList = () => {
    const { userid } = useParams()
    const [data, setData] = useState([])
    const [load, setLoad] = useState(true)
    console.log('userid', userid);
    const getFav = async () => {
        try {
            console.log(userid);
            const response = await axios.get(`http://localhost:3003/api/getfav/${userid}`);
            console.log('data',response.data.favorite)
            setData(response.data.favorite)
        } catch (error) {
            console.log(error);
        }
    }
    const removeItem = async (pid) => {
        try {
            console.log('clicked');
            const res = await axios.patch(`http://localhost:3003/api/favitemremove/${userid}`, { pid })
            console.log(res.data);
            setLoad(!load)
        } catch (error) {
            console.log(error);
        }
    }
    console.log('data', data);
    useEffect(() => {
        getFav()
    }, [load])
    return (
        <>
            <UserNav />
            <section className="text-gray-600 body-font">
                <div className="container  px-5 py-24 mx-auto">
                    <h1 className='text-center text-gray-950 text-[36px] font-bold'>Wishlist</h1>
                    {
                        data.length==0?<h1 className='text-center text-gray-950 mt-3 text-[20px]'>0 products added to wishlist</h1>:<div className="flex my-10 mx-auto w-[85%] flex-wrap -m-4">
                        {
                            data.map((dt) => {
                                return <div key={dt._id} className=" relative lg:w-1/4 md:w-1/2 p-1 w-full">
                                    <div className='absolute right-0 top-0 p-4'>
                                        <svg onClick={() => removeItem(dt.productid)} className="w-2 h-2 text-gray-800 dark:text-gray" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                                        </svg>
                                    </div>
                                    <div className="block h-[310px] border-[1px] p-2 rounded overflow-hidden">
                                    <Link to={`/userproduct/${dt.productid}`} className='hover:text-black'>
                                        <div className='h-[62%]'>
                                            <img alt="ecommerce" className="object-contain w-full h-full block" src={`../Products/${dt.image}`} />
                                        </div>
                                    <div className="mt-4">
                                        <h3 className="text-gray-500 text-xs tracking-widest title-font mb-1">{dt.categoryName}</h3>
                                        <h2 className="text-gray-900 title-font h-8 overflow-hidden text-lg font-medium">{dt.productName}</h2>
                                        <p className="mt-1">${dt.price}.00</p>
                                    </div>
                                    </Link>
                                    </div>
                                </div>
                            })

                        }
                    </div>
                    }
                </div>
            </section>
        </>
    )
}

export default WishList
