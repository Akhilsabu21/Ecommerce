import React, { useEffect, useState } from 'react'
import UserNav from '../UserNav/UserNav'
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom'

const CheckOut = () => {
    const navigate=useNavigate()
    const [userid,setUserId]=useState('')
    const [check,setCheck]=useState({})
    const [togle,setTogle]=useState(true)
    const [cart,setCart]=useState({})
    const [load,setLoad]=useState(false)
    const [address,setAddress]=useState({
        "name":'',
        "phone":'',
        "email":'',
        "address":'',
        "city":'',
        "postalCode":''
    })
    const getUser = async () => {
        const key = JSON.parse(localStorage.getItem('usertoken'));
        // console.log(key);
        if(key){
            const res = await axios.get('http://localhost:3003/api/userhome', { headers: { 'Authorization': `Bearer ${key}` } })
        setUserId(res.data.userid);
        }
    }
    const handleChange=(e)=>{
        setAddress((pre)=>{
            return {...pre,[e.target.name]:e.target.value}
        })
    }
    const getcartItems = async () => {
        try {
            const response = await axios.get(`http://localhost:3003/api/getcart/${userid}`);
            console.log(response);
            setCart(response.data)
            setCheck(response.data.shippingAddress)
            // setAddress(response.data.shippingAddress)
            if(response.data.shippingAddress){
                setTogle(!togle)
            }
        } catch (error) {
            console.log(error);
        }
    }
    console.log(check);
    const addAddress=async(e)=>{
        e.preventDefault()
        try {
            const res = await axios.post(`http://localhost:3003/api/addAddress/${userid}`,address)
            console.log(res)
            setLoad(!load)
            // placeOrder()
        
        } catch (error) {
            console.log(error);
        }
    }
    const placeOrder = async () =>{
        // Drop the existing _id index (if needed)
        // cart.orderitems.dropIndex("_id_");
        
        delete cart._id
        console.log(cart);
        try {
            const res = await axios.patch("http://localhost:3003/api/placeorder",cart)
            console.log(res.data);
            navigate('/')
        } catch (error) {
            
        }
    }
    const editAddress=()=>{
        setTogle(!togle)
    }
    useEffect(()=>{
        getUser()
        getcartItems()
    },[userid,load])
  return (
    <>
    <UserNav />
      <div className="mt-24">
        
      {
        !togle ?
        <div className="container relative p-12 mx-auto">
                    
                    <div className=" flex flex-col w-full px-0 mx-auto md:flex-row">
                        <div className="flex flex-col md:w-full">
                            <div className='flex justify-between'>
                            <h1 className="mb-4 font-bold md:text-xl text-heading">Shipping Address
                                </h1>
                                <div className="">
                                        <button onClick={()=>setTogle(!togle)}
                                            className="w-full px-6 py-2 text-blue-500 bg-indigo-50 hover:bg-indigo-900 hover:text-white transition duration-700">Previous address</button>
                                    </div>
                            </div>
                            <form onSubmit={addAddress} className="justify-center w-full mx-auto">
                                <div className="">
                                    <div className="space-x-0 lg:flex lg:space-x-4">
                                        <div className="w-full lg:w-1/2">
                                            <label htmlFor="firstName" className="block mb-3 text-sm font-semibold text-gray-500">First
                                                Name</label>
                                            <input name="name" type="text" onChange={handleChange} placeholder="Name"
                                                className="w-full px-4 py-3 text-sm border border-gray-300 rounded lg:text-sm focus:outline-none focus:ring-1 focus:ring-blue-600"  required/>
                                        </div>
                                        <div className="w-full lg:w-1/2 ">
                                            <label htmlFor="firstName" className="block mb-3 text-sm font-semibold text-gray-500">Last
                                                Phone</label>
                                            <input name="phone" type="number" onChange={handleChange} placeholder="Phone"
                                                className="w-full px-4 py-3 text-sm border border-gray-300 rounded lg:text-sm focus:outline-none focus:ring-1 focus:ring-blue-600"  required/>
                                        </div>
                                    </div>
                                    <div className="mt-4">
                                        <div className="w-full">
                                            <label htmlFor="Email"
                                                className="block mb-3 text-sm font-semibold text-gray-500">Email</label>
                                            <input name="email" type="email" onChange={handleChange} placeholder="Email"
                                                className="w-full px-4 py-3 text-sm border border-gray-300 rounded lg:text-sm focus:outline-none focus:ring-1 focus:ring-blue-600"  required/>
                                        </div>
                                    </div>
                                    <div className="mt-4">
                                        <div className="w-full">
                                            <label htmlFor="Address"
                                                className="block mb-3 text-sm font-semibold text-gray-500">Address</label>
                                            <textarea
                                                className="w-full px-4 py-3 text-xs border border-gray-300 rounded lg:text-sm focus:outline-none focus:ring-1 focus:ring-blue-600"
                                                name="address" cols="20" rows="4" onChange={handleChange} placeholder="Address"></textarea>
                                        </div>
                                    </div>
                                    <div className="space-x-0 lg:flex lg:space-x-4">
                                        <div className="w-full lg:w-1/2">
                                            <label htmlFor="city"
                                                className="block mb-3 text-sm font-semibold text-gray-500">City</label>
                                            <input name="city" type="text" onChange={handleChange} placeholder="City"
                                                className="w-full px-4 py-3 text-sm border border-gray-300 rounded lg:text-sm focus:outline-none focus:ring-1 focus:ring-blue-600"  required/>
                                        </div>
                                        <div className="w-full lg:w-1/2 ">
                                            <label htmlFor="postalcode" className="block mb-3 text-sm font-semibold text-gray-500">
                                                Postalcode</label>
                                            <input name="postalCode" type="text" onChange={handleChange} placeholder="Postal Code"
                                                className="w-full px-4 py-3 text-sm border border-gray-300 rounded lg:text-sm focus:outline-none focus:ring-1 focus:ring-blue-600"  required/>
                                        </div>
                                    </div>
                                    <div className="mt-4">
                                        <button
                                            className="w-full px-6 py-2 text-blue-200 bg-blue-600 hover:bg-blue-900">Place Order</button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div> 
                :<>
                <section className="text-gray-600 body-font">
  <div className="container px-5 py-24 mx-auto">
    <div className="lg:w-2/3 flex flex-col sm:flex-row sm:items-center items-start mx-auto">
      <div className="flex-grow sm:pr-16 text-xl font-medium title-font text-gray-900">
        <p>Name : {check.name}</p>
        <p>Email : {check.email}</p>
        <p>Phone : {check.phone}</p>
        <p>Address : {check.address}</p>
        <p>City : {check.city}</p>
        <p>PostalCode : {check.postalCode}</p>
      <p onClick={editAddress} className="mt-5 w-[fit-content] p-2 focus:outline-none rounded text-lg mt-10 border-[1px]  hover:bg-blue-200 sm:mt-0">Edit Address</p>
        </div>
      <button className="flex-shrink-0 text-white bg-blue-500 border-0 py-2 px-8 focus:outline-none hover:bg-blue-600 rounded text-lg mt-10 sm:mt-0" onClick={placeOrder}>Place Order</button>
    </div>
  </div>
</section>
                </>
      }
      </div>
    </>
  )
}

export default CheckOut
