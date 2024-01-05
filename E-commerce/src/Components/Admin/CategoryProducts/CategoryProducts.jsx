import React, { useEffect, useState } from 'react'
import AdminNav from '../AdminNav/AdminNav'
import { Link, useParams } from 'react-router-dom'
import axios from 'axios';
import ProductCard from '../AdminBody/ProductCard/ProductCard';
import DeleteMSG from '../AdminBody/ProductCard/DeleteMSG';

const CategoryProducts = () => {
    const { id } = useParams();
    const [popup, setPopup] = useState(false);
    const [count, setCount] = useState(false)
    const [products, setProducts] = useState([]);
    // const [available,setAvailable]=useState(false)

    const getProducts = () => {
        axios.get('http://localhost:3003/api/getProducts')
            .then((res) => {
                setProducts(res.data)
            })
            .catch((error) => {
                console.log(error);
            })
    }
    useEffect(() => {
        getProducts()
    }, [count])
    return (
        <div>
            <div className='flex me-5'>

                <AdminNav />

                <div className="container mx-auto mt-6">
                    <h1 className='text-center text-3xl'>Welcome {name}</h1>
                    <div className=" mt-10 w-full flex flex-wrap flex-row justify-center gap-10">

                        {
                            popup ?
                                <div className="deletemsg">
                                    <DeleteMSG setTriger={setPopup} />
                                </div> : ""
                        }
                        
                        <div className="relative w-11/12 overflow-x-auto shadow-md sm:rounded-lg">
                            <table className="w-full text-sm text-left rtl:text-right text-gray-700">
                                <thead className="text-xs text-gray-700 uppercase bg-white text-gray-700 shadow-2xl ">
                                    <tr>
                                        <th scope="col" className="px-6 py-3">

                                        </th>
                                        <th scope="col" className="px-6 py-3">
                                            Product name
                                        </th>
                                        <th scope="col" className="px-6 py-3">
                                            Category
                                        </th>

                                        <th scope="col" className="px-6 py-3">
                                            Stock
                                        </th>
                                        <th scope="col" className="px-6 py-3">
                                            Price
                                        </th>
                                        <th scope="col" className="ps-6 py-3">
                                            Action
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        products.map((dt) => {
                                            if (id == dt.category) {
                                                console.log(dt);
                                                return <ProductCard key={dt._id} count={setCount} setTriger={setPopup} name={dt.name} stock={dt.stock} file={dt.thumbnile[0].filename} id={dt._id} categoryName={dt.categoryName} price={dt.sellingPrice} />
                                            }
                                        })
                                    }
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>


            </div>

        </div>
    )
}

export default CategoryProducts
