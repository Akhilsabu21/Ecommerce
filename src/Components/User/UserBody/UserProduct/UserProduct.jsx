import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import UserNav from '../../UserNav/UserNav'

const UserProduct = () => {
  const { id } = useParams()
  const navigate=useNavigate()
  const [count, setCount] = useState(0)
  const [data, setData] = useState({})
  const [file, setFile] = useState('')
  const [images, setImages] = useState([])
  const [userid, setUserid] = useState('')
  const [load, setLoad] = useState(true)
  const [render,setRender]=useState(true)
  const [goToCart, setGoToCart] = useState(false)
  const [fav, setFav] = useState(false)
  const getUser = async () => {
    const key = JSON.parse(localStorage.getItem('usertoken'));
    // console.log(key);
    if (key) {
      const res = await axios.get('http://localhost:3003/api/userhome', { headers: { 'Authorization': `Bearer ${key}` } })
      setUserid(res.data.userid);
      check(res.data.userid);
      checkFav(res.data.userid);
    }
  }
  const getProduct = async () => {
    setCount(count + 1)
    const res = await axios.get(`http://localhost:3003/api/singlepeoduct/${id}`)
    setData(res.data)
    setFile(res.data.thumbnile[0].filename)
    let arr = [];
    res.data.images.map((dt) => {
      arr.push(dt.filename)
      setImages([...arr])
    })
  }
  const Wishlist=async()=>{
    const favitems = {
      userId: userid,
      favorite: [
        {
          productid: id,
          image: data.thumbnile[0].filename,
          price: data.sellingPrice,
          categoryName: data.categoryName,
          productName: data.name
        }
      ]
    }
    try {
      console.log(favitems);
      const res = await axios.post(`http://localhost:3003/api/favitems/${userid}`, favitems)
      console.log(res);
      setRender(!render)
    } catch (error) {
      console.log(error);
    }
  }
  const checkFav = async (userid) => {
    try {
      const response = await axios.get(`http://localhost:3003/api/getfav/${userid}`);
      console.log('res', response);
      response.data.favorite.map((dt) => {
        if (dt.productid == id) {
          setFav(true)
        }
      })
    } catch (error) {
      console.log(error);
    }
  }
  const removeItem =async () => {
    try {
      const pid=id
      console.log(id);
        const res =await axios.patch(`http://localhost:3003/api/favitemremove/${userid}`, {pid})
        console.log(res.data);
        setFav(false)
    } catch (error) {
        console.log(error);
    }
}
  const AddToCart = async () => {
    if(userid){
      const cartItems = {
        userId: userid,
        orderItems: [
          {
            productid: id,
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
        const res = await axios.post(`http://localhost:3003/api/addtocart/${userid}`, cartItems)
        console.log(res);
        setLoad(!load)
      } catch (error) {
        console.log(error);
      }
    }else{
      navigate('/userlogindirect')
    }
  }
  const changePic = (e) => {
    console.log(e.id);
    setFile(e.id)
  }
  const check = async (userid) => {
    try {
      const response = await axios.get(`http://localhost:3003/api/getcart/${userid}`);
      console.log('res', response.data.orderItems);
      response.data.orderItems.map((dt) => {
        if (dt.productid == id) {
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
  }, [load,render])
  return (
    <>
      <UserNav reload={load} />
      <section className="text-gray-600 mt-20 body-font overflow-hidden">
        <div className="container py-24 mx-auto">
          <div className=" lg:w-4/5 mx-auto flex flex-wrap">
            <div className='lg:w-1/2 w-full lg:h-96 h-96  flex'>
              <div className='w-1/4 px-4 flex flex-col gap-1  overflow-y-auto  scrollbar-hide'>
                {
                  images.map((dt) => <img key={dt} id={dt} alt="ecommerce" onClick={() => changePic(event.target)}
                    className="w-full shadow-md m-3" src={`../Products/${dt}`} />)
                }


              </div>
              <div className='w-3/4 flex items-center'>
                <img alt="ecommerce" className=" w-full" src={`../Products/${file}`} />
              </div>
            </div>
            <div className="lg:w-1/2 w-full mt-6 lg:mt-0">
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
              <div className="flex mt-6 items-center pb-2 border-b-2 border-gray-100 mb-3">
                <div className="flex">
                  <span className="mr-3">Stock available {data.stock}</span>
                  <span>
                    {
                      !fav?<svg  onClick={Wishlist} className="w-6 h-6 text-gray-800 dark:text-black" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 21 19">
                      <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 4C5.5-1.5-1.5 5.5 4 11l7 7 7-7c5.458-5.458-1.542-12.458-7-7Z" />
                    </svg>:
                    <svg onClick={()=>{removeItem()}} className="w-6 h-6 fill-rose-600 text-rose-600" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 21 19">
                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 4C5.5-1.5-1.5 5.5 4 11l7 7 7-7c5.458-5.458-1.542-12.458-7-7Z" />
                  </svg>
                    }
                  </span>
                </div>
              </div>
              <div className="flex flex-wrap flex-row mt-3">
                <div className='lg:w-[40%] flex justify-center mb-2 justify-center'>
                  <span className="title-font font-medium  text-xl text-gray-900"><del>${data.originalPrice}.00</del></span>
                  <span className="title-font font-medium text-xl text-gray-900">${data.sellingPrice}.00</span>
                </div>
                {
                  data.stock > 1 ? <div className='lg:w-48% flex flex-wrap  justify-center'>
                    {
                      goToCart ? <Link to={`/cart/${userid}`} className="flex ml-2 w-[110px] justify-center  text-white bg-blue-700 border-0 py-2 focus:outline-none hover:bg-blue-500 rounded transition duration-700">Go To Cart</Link>
                        :
                        <div>
                          {
                            userid ?
                              <button onClick={() => AddToCart()} className="flex ml-2 w-[110px] justify-center ml-auto text-white bg-blue-700 border-0 py-2 focus:outline-none hover:bg-blue-500 rounded transition duration-700">Add To Cart</button>
                              :
                              <Link to={'/userlogindirect'} className="flex ml-2 w-[110px] justify-center ml-auto text-white bg-blue-700 border-0 py-2 focus:outline-none hover:bg-blue-500 rounded transition duration-700">Add To Cart</Link>
                          }
                        </div>
                    }

                    <Link to={`/buynow/${id}`} className="flex ml-2 w-[110px] justify-center text-white bg-yellow-500 border-0 py-2 focus:outline-none hover:bg-yellow-400 rounded transition duration-700">Buy Now</Link>
                  </div> : <div>
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
