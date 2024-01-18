import React, { useEffect, useState } from 'react'
import AdminNav from '../AdminNav/AdminNav'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const Products = () => {
    const [categoryOption, setCategoryOption] = useState([])
    const [productData, setProductData] = useState({
        name: [],
        category: [],
        categoryName: [],
        originalPrice: [],
        sellingPrice: [],
        rating: [],
        description: [],
        stock: [],
        thumbnile: [],
        images: []
    })
    const navigate = useNavigate();
    const getCategory = async () => {
        const res = await axios.get('http://localhost:3003/api/getCategory')
        setCategoryOption(() => res.data);
    }
    // console.log(categoryOption);
    // const addCategorieName = async() => {
    //     console.log(productData.category[0]);
    //     let catName = await axios.get(`http://localhost:3003/api/getSingleCategory/${productData.category[0]}`)
    //     catName = catName.data.category;
    //     console.log(catName);
    //     setProductData((pre) => {
    //         return { ...pre, ["categoryName"]: [catName] }
    //     })
    // }
    const submitHandler = async (event) => {
        event.preventDefault();
        if (productData.category[0] == null)
            return alert("Select a category")
        // addCategorieName()
        console.log(productData);
        let formData = new FormData();
        Object.entries(productData).forEach(item => {
            console.log(item);
            item[1].forEach(field => formData.append(item[0], field))
            // console.log(item);
        })
        const res = await axios.post("http://localhost:3003/api/addProducts", formData, { headers: { "Content-Type": "multipart/form-data" } })
        console.log(res);
        if (res.status == 200) {
            alert('product added')
            navigate('/admin')
        } else {
            alert('product not added some error')
        }
    }
    const setData = async (e) => {
        if (e.target.name == 'category') {
            const id = e.target.value;
            let catName = await axios.get(`http://localhost:3003/api/getSingleCategory/${id}`)
            catName = catName.data.category;
            console.log(catName);
            setProductData((pre) => {
                return { ...pre, ["categoryName"]: [catName] }
            })
        }
        setProductData((pre) => {
            return { ...pre, [e.target.name]: [e.target.value] }
        })
    }
    const getPic = (e) => {
        if(e.target.name=='thumbnile'){
            Object.values(e.target.files).forEach(file => {
                setProductData((pre) => ({ ...pre, [e.target.name]: [[e.target.name], file] }))
            })
        }else{
            Object.values(e.target.files).forEach(file => {
                setProductData((pre) => ({ ...pre, [e.target.name]: [...pre[e.target.name], file] }))
            })
        }
    }

    // console.log(productData);
    useEffect(() => {
        getCategory()
    }, [])
    return (
        <div className='flex me-5'>
            <AdminNav />

            <div className="container mx-auto mt-6">
                <h1 className='text-center text-3xl'>Product Register</h1>
                <form className="max-w-md mx-auto bg-blue-50 p-8 rounded-xl mt-12" onSubmit={submitHandler}>
                    <div className="relative z-0 w-full mb-4 group">
                        <input type="text" name="name" id="name" onChange={setData} className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-1 border-b-2 border-gray-300 appearance-none dark:text-gray-800 dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
                        <label htmlFor="name" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Product Name</label>
                    </div>
                    <div className="relative z-0 w-full mb-4 group">
                        <select onChange={setData} id='cat' name="category" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-1 border-b-2 border-gray-300 appearance-none dark:text-gray-800 dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer">
                            <option>Select a category____</option>
                            {
                                categoryOption.map((dt) => <option key={dt._id} value={dt._id}>{dt.category}</option>)
                            }
                        </select>
                        {/* <input type="text" name="category" id="floating_password" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-1 border-b-2 border-gray-300 appearance-none dark:text-gray-800 dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
                <label htmlFor="floating_password" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Password</label> */}
                    </div>
                    <div className="grid md:grid-cols-2 md:gap-6">
                        <div className="relative z-0 w-full mb-4 group">
                            <input type="number" min={5} name="originalPrice" onChange={setData} id="floating_first_name" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-1 border-b-2 border-gray-300 appearance-none dark:text-gray-800 dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
                            <label htmlFor="originalPrice" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Original Price</label>
                        </div>
                        <div className="relative z-0 w-full mb-4 group">
                            <input type="number" min={5} name="sellingPrice" id="floating_last_name" onChange={setData} className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-1 border-b-2 border-gray-300 appearance-none dark:text-gray-800 dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
                            <label htmlFor="sellingPrice" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Selling Price</label>
                        </div>
                    </div>
                    <div className="grid md:grid-cols-2 md:gap-6">
                        <div className="relative z-0 w-full mb-4 group">
                            <input type="number" min={1} name="stock" id="floating_first_name" onChange={setData} className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-1 border-b-2 border-gray-300 appearance-none dark:text-gray-800 dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
                            <label htmlFor="stock" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">stock</label>
                        </div>
                        <div className="relative z-0 w-full mb-4 group">
                            <input type="number" max={5} name="rating" id="floating_last_name" onChange={setData} className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-1 border-b-2 border-gray-300 appearance-none dark:text-gray-800 dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
                            <label htmlFor="rating" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">rating</label>
                        </div>
                    </div>
                    <div className="relative z-0 w-full mb-4 group">
                        <input type="text" name="description" id="description" onChange={setData} className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-1 border-b-2 border-gray-300 appearance-none dark:text-gray-800 dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
                        <label htmlFor="description" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Description</label>
                    </div>
                    <div className="grid md:grid-cols-2 md:gap-6">
                        <div className="relative z-0 w-full mb-4 group">
                            <input type="file" name="thumbnile" onChange={getPic} className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-1 border-b-2 border-gray-300 appearance-none dark:text-gray-800 dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
                            <label htmlFor="thumbnile" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Thumbnile</label>
                        </div>
                        <div className="relative z-0 w-full mb-4 group">
                            <input type="file" name="images" onChange={getPic} multiple id="floating_last_name" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-1 border-b-2 border-gray-300 appearance-none dark:text-gray-800 dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
                            <label htmlFor="images" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Product Images</label>
                        </div>
                    </div>
                    <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Submit</button>
                </form>
            </div>
        </div>
    )
}

export default Products
