import React, { useEffect, useState } from 'react'
import './UserProductCard.css'
import axios from 'axios'
import { Link } from 'react-router-dom'

const UserProductCard = () => {
    const [products, setProducts] = useState([])
    const [search, setSearch] = useState('')
    const getProducts = () => {
        axios.get('http://localhost:3003/api/getProducts')
            .then((res) => {
                setProducts(res.data)
            })
            .catch((error) => {
                console.log(error);
            })
    }
    const searchProduct = (e) => {
        setSearch((e.target.value).toUpperCase())
        const reveals = document.getElementsByClassName("reveals");

        for (let i = 0; i < reveals.length; i++) {
            reveals[i].style.transform = "translateZ(0)";
        }
    }
    console.log(search);
    // console.log(products);
    useEffect(() => {
        getProducts();
        function reveal() {
            let reveals = document.querySelectorAll(".reveals");
    
            reveals.forEach((element) => {
                let windowHeight = window.innerHeight;
                let elementTop = element.getBoundingClientRect().top;
                let elementVisible = 150;
    
                if (elementTop < windowHeight - elementVisible) {
                    element.classList.add("aos-animate");
                } else {
                    element.classList.remove("aos-animate");
                }
            });
        }
        window.addEventListener("scroll", reveal);
    
        return () => {
            window.removeEventListener("scroll", reveal);
        };

    }, [])
    return (
        <>
            <section className="text-gray-600 body-font" id='productsdisplay'>
                <div className="container px-5 py-24 mx-auto">
                    <div className="w-full">
                        <input
                            type="search"
                            className=" mx-auto block min-w-0 flex-auto rounded-l border border-solid border-neutral-300 bg-white bg-clip-padding px-3 w-1/4 py-[0.40rem] text-base font-normal leading-[1.6] text-neutral-700 outline-none transition duration-200 ease-in-out focus:z-[3] focus:border-gray-800 focus:text-neutral-700 focus:outline-none text-gray-500"
                            placeholder="Search"
                            aria-label="Search"
                            aria-describedby="button-addon1"
                            onChange={searchProduct} />
                    </div>
                    <div className="flex flex-wrap m-4 z-10" >
                        {
                            products.map((dt) => {
                                const qty = dt.stock;
                                console.log(`qty${dt._id}`, qty);
                                const pname = (dt.name).toUpperCase();
                                if (pname.indexOf(search) > -1) {
                                    return <div id="RouterNavLink" key={dt._id} className="reveals product-cards lg:w-1/4 md:w-1/2 p-4 w-full">
                                        <Link to={`/userproduct/${dt._id}`} className='text-gray-600 hover:text-gray-800'>
                                            <div className="block relative h-80 rounded ">
                                                <img alt="ecommerce" className="product-img hover:scale-110 transition duration-700 object-cover object-center w-full h-full block" src={`../Products/${dt.thumbnile[0].filename}`} />
                                            </div>
                                            <div className="mt-5 text-center">
                                                <h3 className="text-gray-500 text-xs tracking-widest title-font mb-1">{dt.categoryName}</h3>
                                                <h2 className="text-gray-900 title-font text-lg font-medium">{dt.name}</h2>
                                                <p className="mt-1">${dt.sellingPrice}.00</p>
                                                {
                                                    qty < 1 && <span className='text-center w-full text-rose-600'>out of stock</span>
                                                }
                                            </div>
                                        </Link>
                                    </div>
                                }

                            })
                        }
                    </div>
                </div>
            </section>
        </>
    )
}

export default UserProductCard
