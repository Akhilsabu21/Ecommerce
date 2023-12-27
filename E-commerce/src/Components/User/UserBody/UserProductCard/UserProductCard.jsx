import React, { useEffect, useState } from 'react'
import './UserProductCard.css'
import axios from 'axios'
import { Link } from 'react-router-dom'

const UserProductCard = () => {
    const [products, setProducts] = useState([])
    const [count, setCount] = useState(0);
    const getProducts = () => {
        axios.get('http://localhost:3003/api/getProducts')
            .then((res) => {
                setProducts(res.data)
            })
            .catch((error) => {
                console.log(error);
            })
    }
    console.log(products);
    useEffect(() => {
        getProducts()
    }, [])
    return (
        <>
            <section className="text-gray-600 body-font">
                <div className="container px-5 py-20 mx-auto">
                    <div className="flex flex-wrap -m-4">
                        {
                            products.map((dt) => {
                                if(count<=4){
                                    return <div id="RouterNavLink" key={dt._id} className="lg:w-1/4 md:w-1/2 p-4 w-full">
                                    <Link to={`/userproduct/${dt._id}`} className='text-gray-600 hover:text-gray-800'>
                                    <a className="block relative h-80 rounded ">
                                        <img alt="ecommerce" className="product-img object-cover object-center w-full h-full block" src={`../Products/${dt.thumbnile[0].filename}`}/>
                                    </a>
                                    <div className="mt-5 text-center">
                                        <h3 className="text-gray-500 text-xs tracking-widest title-font mb-1">{dt.categoryName}</h3>
                                        <h2 className="text-gray-900 title-font text-lg font-medium">{dt.name}</h2>
                                        <p className="mt-1">${dt.sellingPrice}.00</p>
                                        
                                    </div>
                                    </Link>
                                </div>
                                }
                            })
                        }
                        {/* <div class="lg:w-1/4 md:w-1/2 p-4 w-full">
                            <a class="block relative h-48 rounded overflow-hidden">
                                <img alt="ecommerce" class="object-cover object-center w-full h-full block" src="https://dummyimage.com/420x260"/>
                            </a>
                            <div class="mt-4">
                                <h3 class="text-gray-500 text-xs tracking-widest title-font mb-1">CATEGORY</h3>
                                <h2 class="text-gray-900 title-font text-lg font-medium">The Catalyzer</h2>
                                <div className='flex items-center justify-between py-2 px-2'>
                                <p class="mt-1">$16.00</p>
                                
                                </div>
                            </div>
                        </div> */}
                        {/* <div class="lg:w-1/4 md:w-1/2 p-4 w-full">
                            <a class="block relative h-48 rounded overflow-hidden">
                                <img alt="ecommerce" class="object-cover object-center w-full h-full block" src="https://dummyimage.com/421x261"/>
                            </a>
                            <div class="mt-4">
                                <h3 class="text-gray-500 text-xs tracking-widest title-font mb-1">CATEGORY</h3>
                                <h2 class="text-gray-900 title-font text-lg font-medium">Shooting Stars</h2>
                                <p class="mt-1">$21.15</p>
                            </div>
                        </div>
                        <div class="lg:w-1/4 md:w-1/2 p-4 w-full">
                            <a class="block relative h-48 rounded overflow-hidden">
                                <img alt="ecommerce" class="object-cover object-center w-full h-full block" src="https://dummyimage.com/422x262"/>
                            </a>
                            <div class="mt-4">
                                <h3 class="text-gray-500 text-xs tracking-widest title-font mb-1">CATEGORY</h3>
                                <h2 class="text-gray-900 title-font text-lg font-medium">Neptune</h2>
                                <p class="mt-1">$12.00</p>
                            </div>
                        </div>
                        <div class="lg:w-1/4 md:w-1/2 p-4 w-full">
                            <a class="block relative h-48 rounded overflow-hidden">
                                <img alt="ecommerce" class="object-cover object-center w-full h-full block" src="https://dummyimage.com/423x263"/>
                            </a>
                            <div class="mt-4">
                                <h3 class="text-gray-500 text-xs tracking-widest title-font mb-1">CATEGORY</h3>
                                <h2 class="text-gray-900 title-font text-lg font-medium">The 400 Blows</h2>
                                <p class="mt-1">$18.40</p>
                            </div>
                        </div> */}
                        <div className='w-full flex justify-center'>
                            <button className='border-solid border-2 border-black px-4 py-2 cart-btn text-[#000000] transition duration-700 font-bold tracking-widest'>SHOP MORE</button>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default UserProductCard
