import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import UserNav from '../../UserNav/UserNav'

const UserProduct = () => {
    const {id}=useParams()
    const [count,setCount]=useState(0)
    const [data, setData] = useState({})
    const [file, setFile] = useState('')
    const [images, setImages] = useState([])
    const [userid,setUserid]=useState('')
    const [load,setLoad]=useState(true)
    const [goToCart,setGoToCart]=useState(false)
    const getUser = async () => {
      const key = JSON.parse(localStorage.getItem('usertoken'));
      // console.log(key);
      if(key){
          const res = await axios.get('http://localhost:3003/api/userhome', { headers: { 'Authorization': `Bearer ${key}` } })
          setUserid(res.data.userid);
          check(res.data.userid);
          }
      }
    const getProduct = async () => {
          setCount(count+1)
          const res = await axios.get(`http://localhost:3003/api/singlepeoduct/${id}`)
        setData(res.data)
        setFile(res.data.thumbnile[0].filename)
        let arr=[];
        res.data.images.map((dt)=>{
          arr.push(dt.filename)
          setImages([...arr])
        })
    }
    const AddToCart=async()=>{
      const cartItems={
        userId:userid,
        orderItems:[
          {
            productid:id, 
            qty: 1, 
            image: data.thumbnile[0].filename,
            price: data.sellingPrice,
            categoryName: data.categoryName,
            productName: data.name
          }
        ]
      }
      try {
        console.log(cartItems);
        const res = await axios.post(`http://localhost:3003/api/addtocart/${userid}`,cartItems)
        console.log(res);
        setLoad(!load)
      } catch (error) {
        console.log(error);
      }
    }
    const changePic=(e)=>{
      console.log(e.id);
      setFile(e.id)
    }
    const check=async(userid)=>{
      try {
            const response = await axios.get(`http://localhost:3003/api/getcart/${userid}`);
            console.log('res',response.data.orderItems);
            response.data.orderItems.map((dt)=>{
              if(dt.productid==id){
                setGoToCart(true)
              }
            })
        } catch (error) {
            console.log(error);
        }
    }
    // console.log("sacd",cartItems);
    useEffect(() => {
        getProduct();
        getUser();
        
    }, [])
  return (
    <>
    <UserNav reload={load}/>
    <section className="text-gray-600 mt-20 body-font overflow-hidden">
  <div className="container px-5 py-24 mx-auto">
    <div className=" lg:w-4/5 mx-auto flex flex-wrap">
      <div className='lg:w-1/2 w-full lg:h-88 h-80 flex'>
      <div className='w-1/4 px-4 flex flex-col gap-1 overflow-y-auto  scrollbar-hide'>
        {
          images.map((dt)=><img key={dt} id={dt} alt="ecommerce" onClick={()=>changePic(event.target)}
          className="w-full shadow-md m-3" src={`../Products/${dt}`}/>)
        }
      
      
      </div>
      <div className='w-3/4 flex items-center'>
      <img alt="ecommerce" className=" w-full" src={`../Products/${file}`}/>
      </div>
      </div>
      <div className="lg:w-1/2 w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0">
        <h2 className="text-sm title-font text-gray-500 tracking-widest">{data.categoryName}</h2>
        <h1 className="text-gray-900 text-3xl title-font font-medium mb-1">{data.name}</h1>
        <div className="flex mb-4">
          <span className="flex items-center">
            <svg fill="currentColor" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-4 h-4 text-green-500" viewBox="0 0 24 24">
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
            </svg>
            <svg fill="currentColor" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-4 h-4 text-green-500" viewBox="0 0 24 24">
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
            </svg>
            <svg fill="currentColor" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-4 h-4 text-green-500" viewBox="0 0 24 24">
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
            </svg>
            <svg fill="currentColor" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-4 h-4 text-green-500" viewBox="0 0 24 24">
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
            </svg>
            <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-4 h-4 text-green-500" viewBox="0 0 24 24">
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
            </svg>
            <span className="text-gray-600 ml-3">{data.rating} Rating</span>
          </span>
          
        </div>
        <p className="leading-relaxed text-justify">{data.description}
         Lorem ipsum dolor sit amet consectetur adipisicing elit. Commodi minus cupiditate explicabo, deserunt rem consequuntur fugit itaque, beatae, atque nesciunt autem eligendi sint quos. Molestias nam impedit rerum cumque rem.</p>
        <div className="flex mt-6 items-center pb-5 border-b-2 border-gray-100 mb-5">
          <div className="flex">
            <span className="mr-3">Stock available {data.stock}</span>
          </div>
        </div>
        <div className="flex flex-wrap">
          <div className='flex justify-center mb-2 justify-center'>
          <span className="title-font font-medium  text-2xl text-gray-900"><del>${data.originalPrice}.00</del></span>
          <span className="title-font font-medium text-2xl text-gray-900">${data.sellingPrice}.00</span>
          </div>
          {
            data.stock>1?<div className='md:mx-2 flex flex-wrap gap-2 justify-center'>
            {
              !goToCart?<button onClick={()=>AddToCart()} className="flex w-40 justify-center ml-auto text-white bg-blue-700 border-0 py-2 focus:outline-none hover:bg-blue-500 rounded transition duration-700">Add To Cart</button>:
              <Link to={`/cart/${userid}`} className="flex w-40 justify-center  text-white bg-blue-700 border-0 py-2 focus:outline-none hover:bg-blue-500 rounded transition duration-700">Go To Cart</Link>
            }
            
            <button className="flex w-40 justify-center text-white bg-yellow-500 border-0 py-2 focus:outline-none hover:bg-yellow-400 rounded transition duration-700">Buy Now</button>
            </div>:<div>
            <h4 className='text-rose-600 ms-4'>Out of Stock</h4>
            </div>
          }
          
        </div>
      </div>
    </div>
  </div>
</section>
    </>
  )
}

export default UserProduct
