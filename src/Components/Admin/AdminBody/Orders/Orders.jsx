import React, { useEffect, useState } from 'react'
import AdminNav from '../../AdminNav/AdminNav'
import axios from 'axios'

const Orders = () => {
    const [orders,setOrders]=useState(0)
    const [items,setItems]=useState([])
    const getOrders = async () => {
        try {
          const res = await axios.get('http://localhost:3003/api/getorder');
          console.log(res);
      
          setOrders(res.data.length);
            setItems(res.data)
        } catch (error) {
          console.error('Error fetching orders:', error);
        }
      };
      
    console.log(items);
    useEffect(()=>{
        getOrders()
    },[])
    return (
        <>
            <div className='flex me-5'>
            <AdminNav />
            <div className="container mx-auto mt-6">
            orders : {orders}
            </div>
            </div>

        </>
    )
}

export default Orders
