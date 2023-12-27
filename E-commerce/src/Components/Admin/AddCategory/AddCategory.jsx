import React, { useEffect, useState } from 'react'
import AdminNav from '../AdminNav/AdminNav'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const Category = () => {
    const [categoryData,setCategoryData]=useState({
        category:"",
        categoryImage:""
    })
    const navigate=useNavigate()
    const submitHandler = (event) => {
        event.preventDefault();
        let formData = new FormData();
        console.log(Object.entries(categoryData));
        Object.entries(categoryData).forEach(item => formData.append(item[0],item[1]));
       axios.post("http://localhost:3003/api/addCategory",categoryData,{headers:{'Content-Type':'multipart/form-data'}})
       .then(()=>{
        alert("Category Added")
        navigate('/admin')
       })
       .catch((error)=>{
        alert("Category Not Added",error)
       })
      }
      const setData=(e)=>{
        setCategoryData((pre)=>{
            return {...pre , [e.target.name]:e.target.value}
           })
      }
      const setImages= (e)=>{
        // console.log(e.target.files);
        setCategoryData((pre)=>{
             return {...pre , [e.target.name]:e.target.files[0]}
            })
      }
      console.log(categoryData);
    return (
        <div className='flex me-5'>
            <AdminNav />

            <div className="container mx-auto mt-6">
                <h1 className='text-center text-3xl'>Category Register</h1>
                <form className="max-w-md mx-auto bg-blue-50 p-8 rounded-xl mt-12" onSubmit={submitHandler}>
                    <div className="relative z-0 w-full mb-5 group">
                        <input type="text" name="category" id="name" onChange={setData} className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-1 border-b-2 border-gray-300 appearance-none dark:text-gray-800 dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
                        <label htmlFor="category" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Category Name</label>
                    </div>
                        <div className="relative z-0 w-full mb-5 group">
                            <input type="file" name="categoryImage" onChange={setImages} multiple id="floating_last_name" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-gray-800 dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
                            <label htmlFor="images" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">categoryImage</label>
                        </div>
                    <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Submit</button>
                </form>
            </div>
        </div>
    )
}

export default Category
