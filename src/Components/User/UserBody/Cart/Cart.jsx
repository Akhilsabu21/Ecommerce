import React, { useEffect, useState } from 'react'
import UserNav from '../../UserNav/UserNav'
import { Link, useParams } from 'react-router-dom'
import axios from 'axios'

const Cart = () => {
    const { id } = useParams()
    const [cartItems, setCartItems] = useState([])
    const [val, setVal] = useState(false)
    const [load, setLoad] = useState(0)
    const [count, setCount] = useState(0)
    const getcartItems = async () => {
        try {
            const response = await axios.get(`http://localhost:3003/api/getcart/${id}`);
            console.log(response.data);
            if (response.data) {
                setCartItems(response.data.orderItems)
                setVal(true)
            }
        } catch (error) {
            console.log(error);
        }
    }
    var totalPrice = 0;
    const quantitydecrement = async (pid,qty) => {
        console.log('qty',qty);
       if(qty>1){
        try {
            console.log(cartItems);
            const res = await axios.patch(`http://localhost:3003/api/cartdecrement/${id}`,{pid})
            console.log(res);
            setCount(count + 1)
            console.log(count,'pid',pid);
        } catch (error) {
            console.log(error);
        }
       }
    }
    const quantityincrement = async (pid) => {
        console.log(pid);
        try {
            const res = await axios.patch(`http://localhost:3003/api/cartincrement/${id}`,{pid})
            console.log(res);
            setCount(count + 1)
            console.log(count,'pid',pid);

        } catch (error) {
            console.log(error);
        }
    }
    const removeItem =async (pid) => {
        try {
            const res =await axios.patch(`http://localhost:3003/api/cartitemremove/${id}`, { pid })
            console.log(res.data);
            // setLoad(Load + 1)
            setCount(count + 1)
            getcartItems()
        } catch (error) {
            console.log(error);
        }
    }
    useEffect(() => {
        getcartItems()
    }, [count,load])
    return (
        <>
            <UserNav  cartcount={count}/>
                {
                    val ? 
                    <>
                    <div className="h-auto pb-14 bg-gray-100 pt-20">
                    <h1 className="mb-10 text-center text-2xl font-bold">Cart Items</h1>
                    <div className="mx-5 sm:mx-auto max-w-11/12 justify-center px-6 md:flex md:space-x-6 xl:px-0">
                        <div className="rounded-lg md:w-2/3">
                            {
                                cartItems.map((dt) => {
                                    totalPrice+=dt.price * dt.qty;
                                    const pid = dt.productid;
                                    const objid = dt._id;
                                    const qty=dt.qty;
                                    return <div key={dt._id} className="justify-between mb-6 rounded-lg bg-white p-6 shadow-md sm:flex sm:justify-start">
                                        <img src={`../Products/${dt.image}`} alt="product-image" className="w-full rounded-lg sm:w-40" />
                                        <div className="sm:ml-4 sm:flex sm:w-full sm:justify-between">
                                            <div className="mt-5 sm:mt-0">
                                                <h2 className="text-lg font-bold text-gray-900">{dt.productName}</h2>
                                                <p className="mt-1 text-xs text-gray-700">{dt.categoryName}</p>
                                            </div>
                                            <div className="mt-4 flex justify-between sm:space-y-6 sm:mt-0 sm:block sm:space-x-6">
                                                <div className="flex items-center border-gray-100">
                                                    <span className="cursor-pointer rounded-l bg-gray-100 py-1 px-3.5 duration-100 hover:bg-blue-500 hover:text-blue-50" onClick={() => quantitydecrement(pid,qty)}> - </span>
                                                    <span className='p-2' >{dt.qty}</span>
                                                    <span className="cursor-pointer rounded-r bg-gray-100 py-1 px-3 duration-100 hover:bg-blue-500 hover:text-blue-50" onClick={() => quantityincrement(pid)}> + </span>
                                                </div>
                                                <div className="flex items-center space-x-4">
                                                    <p className="text-sm" >${(dt.qty) * (dt.price)}</p>
                                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor"
                                                        onClick={() => removeItem(objid)} className="h-5 w-5 cursor-pointer duration-150 hover:text-red-500">
                                                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                                                    </svg>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                })
                            }
                        </div>


                        <div className="mt-6 h-full rounded-lg border bg-white p-6 shadow-md md:mt-0 md:w-1/3">
                            <div className="mb-2 flex justify-between">
                                <p className="text-gray-700">Subtotal</p>
                                <p className="text-gray-700">${totalPrice}</p>
                            </div>
                            <div className="flex justify-between">
                                <p className="text-gray-700">Shipping</p>
                                <p className="text-gray-700">$4.99</p>
                            </div>
                            <hr className="my-4" />
                            <div className="flex justify-between">
                                <p className="text-lg font-bold">Total</p>
                                <div className="">
                                    <p className="mb-1 text-lg font-bold"></p>
                                    <p className="text-sm text-gray-700">{totalPrice + 4.9}</p>
                                </div>
                            </div>
                            <Link to={`/checkout`}>
                            <button className="mt-6 w-full rounded-md bg-blue-500 py-1.5 font-medium text-blue-50 hover:bg-blue-600">Check out</button>
                            </Link>
                        </div>
                    </div>
                </div>
                    </>
                    :
                <>
                <h1 className='mt-24'>
                    Cart is empty
                </h1> 
                </>
                }
        </>  
                )
}

export default Cart
