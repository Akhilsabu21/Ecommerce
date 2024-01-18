import React, { useEffect, useState } from 'react'
import AdminNav from '../../AdminNav/AdminNav';
import axios from 'axios';
import CategoryCard from '../CategoryCard/CategoryCard';

const Category = () => {
    const [categories,setCategories]=useState([]);
    const [count,setCount]=useState(0)
    const getCategories = () => {
        axios.get('http://localhost:3003/api/getCategory')
        .then((res)=>{
            setCount(0)
            setCategories(res.data)
        }).catch((error)=>{
            console.log(error);
        })
    }
    console.log(categories);
    useEffect(() => {
        getCategories();
    }, [count])
    return (
        <div className="flex me-5  min-h-screen">
            <AdminNav />
            <div className="container mx-auto mt-10">
                <h1 className='text-center text-3xl'>Category</h1>
                <div className="container mt-10 flex flex-wrap flex-row justify-around gap-10">
                {
                    categories.map((dt)=><CategoryCard count={setCount} key={dt._id} name={dt.category} id={dt._id} file={dt.categoryImage.filename} />)
                }
                </div>
            </div>
        </div>
    )
}

export default Category
