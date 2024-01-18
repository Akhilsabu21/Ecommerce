import React, { useEffect, useState } from 'react';
import './AdminHome.css';
import axios from 'axios';
import AdminNav from '../../AdminNav/AdminNav';
import { Link } from 'react-router-dom';

const AdminHome = () => {
  const [name, setName] = useState("")
  const [count,setCount] = useState(true)
  const [catCount, setCatCount] = useState(0)
  const [proCount, setProCount] = useState(0)
  const [orders,setOrders]=useState(0)
  const getAdmin = async () => {
    const key = JSON.parse(localStorage.getItem('admintoken'));
    console.log(key);
    const res = await axios.get('http://localhost:3003/api/adminHome', { headers: { 'Authorization': `Bearer ${key}` } })
    setName(res.data.msg)
  }
  const categoryCount = () => {
    axios.get('http://localhost:3003/api/getCategory')
      .then((res) => {
        setCatCount(res.data.length)
      }).catch((error) => {
        console.log(error);
      })
  }
  const productCount = () => {
    axios.get('http://localhost:3003/api/getProducts')
      .then((res) => {
        setProCount(res.data.length)
      })
      .catch((error) => {
        console.log(error);
      })
  }
    const getOrders=async()=>{
        const res=await axios.get('http://localhost:3003/api/getorder')
        console.log(res);
        setOrders(res.data.length)
    }
  useEffect(() => {
    getAdmin()
    categoryCount()
    productCount()
    getOrders()
  }, [count])

  return (
    <div className='flex me-5'>

      <AdminNav triger={setCount}/>

      <div className="container mx-auto mt-6">
        <h1 className='text-center text-3xl'>Welcome {name}</h1>


        <div className="grid mt-8 grid-cols-1 gap-6 mb-6 lg:grid-cols-2">
          <div className='flex justify-center'>
            <div className="w-full lg:w-2/3 px-auto py-4 bg-white rounded-lg cat-pro flex justify-center">
              <Link to={'/category'}>view category</Link>
            </div>
          </div>
          <div className='flex justify-center'>
            <div className="w-full lg:w-2/3 px-4 py-4 bg-white cat-pro rounded-lg flex justify-center">
              <Link to={'/product'}>view products</Link>
            </div>
          </div>
        </div>


        <div className="grid grid-cols-1 gap-6 mb-6 lg:grid-cols-3">





          <div className="w-full px-4 py-5 bg-white rounded-lg shadow">
            <div className="text-sm font-medium text-gray-500 truncate">
              Total Category
            </div>
            <div className="mt-1 text-3xl font-semibold text-gray-900">
              {
                catCount
              }
            </div>
          </div>
          <div className="w-full px-4 py-5 bg-white rounded-lg shadow">
            <div className="text-sm font-medium text-gray-500 truncate">
              Total Porducts
            </div>
            <div className="mt-1 text-3xl font-semibold text-gray-900">
              {
                proCount
              }
            </div>
          </div>
          <div className="w-full px-4 py-5 bg-white rounded-lg shadow">
            <div className="text-sm font-medium text-gray-500 truncate">
              Total Orders
            </div>
            <div className="mt-1 text-3xl font-semibold text-gray-900">
              {orders}
            </div>
          </div>
        </div>
      </div>


    </div>
  )
}

export default AdminHome
