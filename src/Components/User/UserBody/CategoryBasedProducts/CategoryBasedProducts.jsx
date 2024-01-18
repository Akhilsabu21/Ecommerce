import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import UserNav from '../../UserNav/UserNav'
import './CategoryBasedProduct.css'

const CategoryBasedProducts = () => {
    const {id}=useParams()
    const [products, setProducts] = useState([])
    const getProducts = () => {
        axios.get('http://localhost:3003/api/getProducts')
            .then((res) => {
              // res.data.map((dt)=>{
              //   if(id==dt.category){
              //     console.log(dt);
              //     products.push(dt)
              //   }
              // })
                setProducts(res.data)
            })
            .catch((error) => {
                console.log(error);
            })
    }
    products.map((dt)=>{
      console.log('sfad',dt.name);
    })
    // console.log(products);
    useEffect(() => {
        getProducts()
        function reveal() {
            let reveals = document.querySelectorAll(".reveals");
    
            reveals.forEach((element) => {
                let windowHeight = window.innerHeight;
                let elementTop = element.getBoundingClientRect().top;
                let elementVisible = 100;
    
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
    <UserNav/>
      <section className="text-gray-600 body-font">
                <div className="container px-5 py-20 mx-auto">
                    <div className="flex flex-wrap m-4">
                        {
                            products.map((dt) => {
                                    if(dt.category==id){
                                      return <div id="RouterNavLink" key={dt._id} className="reveals product-cards lg:w-1/4 md:w-1/2 p-4 w-full">
                                    <Link to={`/userproduct/${dt._id}`} className='text-gray-600 hover:text-gray-800'>
                                    <div className="block relative h-80 rounded ">
                                        <img alt="ecommerce" className="product-img hover:scale-110 transition duration-700 object-cover object-center w-full h-full block" src={`../Products/${dt.thumbnile[0].filename}`}/>
                                    </div>
                                    <div className="mt-5 text-center">
                                        <h3 className="text-gray-500 text-xs tracking-widest title-font mb-1">{dt.categoryName}</h3>
                                        <h2 className="text-gray-900 title-font text-lg font-medium">{dt.name}</h2>
                                        <p className="mt-1">${dt.sellingPrice}.00</p>
                                        
                                    </div>
                                    </Link>
                                </div>
                                    }
                            })
                        }
                        {/* <div class="lg:w-1/4 md:w-1/2 p-4 w-full">
                            <a class="block relative h-48 rounded overflow-hidden">
                                <img alt="ecommerce" class="object-cover object-center w-full h-full block" src="https://dummyimage.com/420x260"/>
                            </a>
                            <div class="mt-4">
                                <h3 class="text-gray-500 text-xs tracking-widest title-font mb-1">CATEGORY</h3>
                                <h2 class="text-gray-900 title-font text-lg font-medium">The Catalyzer</h2>
                                <div className='flex items-center justify-between py-2 px-2'>
                                <p class="mt-1">$16.00</p>
                                
                                </div>
                            </div>
                        </div> */}
                        {/* <div class="lg:w-1/4 md:w-1/2 p-4 w-full">
                            <a class="block relative h-48 rounded overflow-hidden">
                                <img alt="ecommerce" class="object-cover object-center w-full h-full block" src="https://dummyimage.com/421x261"/>
                            </a>
                            <div class="mt-4">
                                <h3 class="text-gray-500 text-xs tracking-widest title-font mb-1">CATEGORY</h3>
                                <h2 class="text-gray-900 title-font text-lg font-medium">Shooting Stars</h2>
                                <p class="mt-1">$21.15</p>
                            </div>
                        </div>
                        <div class="lg:w-1/4 md:w-1/2 p-4 w-full">
                            <a class="block relative h-48 rounded overflow-hidden">
                                <img alt="ecommerce" class="object-cover object-center w-full h-full block" src="https://dummyimage.com/422x262"/>
                            </a>
                            <div class="mt-4">
                                <h3 class="text-gray-500 text-xs tracking-widest title-font mb-1">CATEGORY</h3>
                                <h2 class="text-gray-900 title-font text-lg font-medium">Neptune</h2>
                                <p class="mt-1">$12.00</p>
                            </div>
                        </div>
                        <div class="lg:w-1/4 md:w-1/2 p-4 w-full">
                            <a class="block relative h-48 rounded overflow-hidden">
                                <img alt="ecommerce" class="object-cover object-center w-full h-full block" src="https://dummyimage.com/423x263"/>
                            </a>
                            <div class="mt-4">
                                <h3 class="text-gray-500 text-xs tracking-widest title-font mb-1">CATEGORY</h3>
                                <h2 class="text-gray-900 title-font text-lg font-medium">The 400 Blows</h2>
                                <p class="mt-1">$18.40</p>
                            </div>
                        </div> */}
                    </div>
                </div>
            </section>
    </>
  )
}

export default CategoryBasedProducts
