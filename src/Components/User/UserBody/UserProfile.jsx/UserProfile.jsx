
import React, { useEffect, useState } from 'react'
import UserNav from '../../UserNav/UserNav'
import axios from 'axios'
import { useParams } from 'react-router-dom'
const UserProfile = () => {
    const {userid}=useParams()
    const [address,setAddress]=useState({
        "name":'',
        "phone":'',
        "email":'',
        "address":'',
        "city":'',
        "postalCode":''
    })
    const [name,setName]=useState('')
    const getUser = async () => {
        const key = JSON.parse(localStorage.getItem('usertoken'));
        // console.log(key);
        if(key){
            const res = await axios.get('http://localhost:3003/api/userhome', { headers: { 'Authorization': `Bearer ${key}` } })
        setName(res.data.msg)
        }
    }
    const handleChange=(e)=>{
        setAddress((pre)=>{
            return {...pre,[e.target.name]:e.target.value}
        })
    }
    const addAddress=async(e)=>{
        e.preventDefault()
        try {
            const res = await axios.post(`http://localhost:3003/api/addAddress/${userid}`,address)
        console.log(res);
        } catch (error) {
            console.log(error);
        }
    }
        useEffect(()=>{
            getUser()
        },[])
    return (
        < >
        <UserNav/>
            <h1 className='text-center pt-2 mt-20 text-[40px] font-bold'>
                Hello {name}
            </h1>
            <div className='w-full'>
                <div className='lg:w-[80%] h-[100vh] my-6 bg-gray-100 mx-auto roundedz'>
                    <h1 className='text-center p-2'>Personal information update</h1>
        <div className="container p-12 mx-auto">
                    <div className="flex flex-col w-full px-0 mx-auto md:flex-row">
                        <div className="flex flex-col md:w-full">
                            <h2 className="mb-4 font-bold md:text-xl text-heading ">Shipping Address
                            </h2>
                            <form onSubmit={addAddress} className="justify-center w-full mx-auto">
                                <div className="">
                                    <div className="space-x-0 lg:flex lg:space-x-4">
                                        <div className="w-full lg:w-1/2">
                                            <label htmlFor="firstName" className="block mb-3 text-sm font-semibold text-gray-500">First
                                                Name</label>
                                            <input name="name" type="text" onChange={handleChange} placeholder="Name"
                                                className="w-full px-4 py-3 text-sm border border-gray-300 rounded lg:text-sm focus:outline-none focus:ring-1 focus:ring-blue-600" required/>
                                        </div>
                                        <div className="w-full lg:w-1/2 ">
                                            <label htmlFor="firstName" className="block mb-3 text-sm font-semibold text-gray-500">Last
                                                Phone</label>
                                            <input name="phone" type="number" onChange={handleChange} placeholder="Phone"
                                                className="w-full px-4 py-3 text-sm border border-gray-300 rounded lg:text-sm focus:outline-none focus:ring-1 focus:ring-blue-600" required/>
                                        </div>
                                    </div>
                                    <div className="mt-4">
                                        <div className="w-full">
                                            <label htmlFor="Email"
                                                className="block mb-3 text-sm font-semibold text-gray-500">Email</label>
                                            <input name="email" type="email" onChange={handleChange} placeholder="Email"
                                                className="w-full px-4 py-3 text-sm border border-gray-300 rounded lg:text-sm focus:outline-none focus:ring-1 focus:ring-blue-600" required/>
                                        </div>
                                    </div>
                                    <div className="mt-4">
                                        <div className="w-full">
                                            <label htmlFor="Address"
                                                className="block mb-3 text-sm font-semibold text-gray-500">Address</label>
                                            <textarea
                                                className="w-full px-4 py-3 text-xs border border-gray-300 rounded lg:text-sm focus:outline-none focus:ring-1 focus:ring-blue-600"
                                                name="address" cols="20" rows="4" onChange={handleChange} placeholder="Address" required></textarea >
                                        </div>
                                    </div>
                                    <div className="space-x-0 lg:flex lg:space-x-4">
                                        <div className="w-full lg:w-1/2">
                                            <label htmlFor="city"
                                                className="block mb-3 text-sm font-semibold text-gray-500">City</label>
                                            <input name="city" type="text" onChange={handleChange} placeholder="City"
                                                className="w-full px-4 py-3 text-sm border border-gray-300 rounded lg:text-sm focus:outline-none focus:ring-1 focus:ring-blue-600" required/>
                                        </div>
                                        <div className="w-full lg:w-1/2 ">
                                            <label htmlFor="postalcode" className="block mb-3 text-sm font-semibold text-gray-500">
                                                Postalcode</label>
                                            <input name="postalCode" type="text" onChange={handleChange} placeholder="Postal Code"
                                                className="w-full px-4 py-3 text-sm border border-gray-300 rounded lg:text-sm focus:outline-none focus:ring-1 focus:ring-blue-600" required/>
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
                </div>
            </div>
        </>
    )
}
export default UserProfile
