import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import './ProductCard.css'
import axios from 'axios'

const ProductCard = ({name,stock,id,price,categoryName,file,setTriger,count}) => {
    const deleteProduct = async () => {
        console.log(id);
        const data= await axios.delete(`http://localhost:3003/api/productRemove/${id}`)
        console.log(data);
        setTriger(true)
        count(1)
    }
    
    useEffect(()=>{
    },[])
    return (
        <>
                <tr className="bg-white even:bg-gray-50  hover:bg-gray-600 hover:bg-blue-100 shadow-inner">
                <th scope="row" className="w-20 pe-6 px-2 py-2 font-medium text-gray-900 whitespace-nowrap">  
                    <img src={`../Products/${file}`}  className='product-img w-full rounded-full ' alt='product image'/>
                </th>
                <td className="px-6 py-4">
                    {name}
                </td>
                <td className="px-6 py-4">
                    {categoryName}
                </td>
                <td className="px-6 py-4">
                    {stock}
                </td>
                <td className="px-6 py-4">
                    ${price}
                </td>
                <td className="ps-6 py-4">
                    <Link to={`/viewProduct/${id}`} href="#" className="px-3 font-medium text-blue-600 dark:text-blue-500 hover:underline">View</Link>
                    <Link to={`/editProduct/${id}`} href="#" className="px-3 font-medium text-blue-600 dark:text-blue-500 hover:underline">Edit</Link>
                    {/* <button onClick={deleteProduct(categoryid)} href="#" className="px-3 font-medium text-blue-600 dark:text-blue-500 hover:underline">Delete</button> */}
                    <button onClick={deleteProduct}className="px-3 font-medium text-blue-600 dark:text-blue-500 hover:underline">Delete</button>
                </td>
            </tr>
        </>
    )
}

export default ProductCard
