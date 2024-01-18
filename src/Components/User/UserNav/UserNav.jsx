import React, { useEffect, useState } from 'react'
import './UserNav.css'
import { Link } from 'react-router-dom';
import axios from 'axios';

const UserNav = ({reload,cartcount,home}) => {
    
    const [count,setCount]=useState(0)
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [categories,setCategories]=useState([]);
    const [name,setName]=useState('')
    const [userId,setUserId]=useState('')
    const [cartCount,setCartCount]=useState(0);
    const [index,setIndex]=useState(true)
    const getUser = async () => {
    const key = JSON.parse(localStorage.getItem('usertoken'));
    // console.log(key);
    if(key){
        const res = await axios.get('http://localhost:3003/api/userhome', { headers: { 'Authorization': `Bearer ${key}` } })
    setName(res.data.msg)
    setUserId(res.data.userid);
        try {
            const id=res.data.userid;
            const response = await axios.get(`http://localhost:3003/api/getcart/${id}`);
            if(response.data){
                console.log(response.data.orderItems.length);
                setCartCount(response.data.orderItems.length)
            }else{
                setCartCount(0)
            }
            } catch (error) {
            console.log(error);
            }
        }else{
            setName('')
        }
    }
    const getCategories = () => {
        axios.get('http://localhost:3003/api/getCategory')
        .then((res)=>{
            setCategories(res.data)
        }).catch((error)=>{
            console.log(error);
        })
    }
    // console.log('user',name);
    // console.log(categories);
    
    const Logout=()=>{
        console.log("clicked" , count);
        localStorage.removeItem('usertoken');
        setCount(preCount=>preCount+1)
    }
    const handleClick = () => {
        setIsMenuOpen(prevIsMenuOpen => !prevIsMenuOpen);
    };
    const menuStyle = {
        display: isMenuOpen ? 'block' : 'none',
        padding: '10px',
    };

    useEffect(() => {
        console.log("re rendering");
        getCategories();
        getUser();
        // cartitems()
    }, [count,reload,cartcount])
    var prevScrollpos = window.pageYOffset;
    window.onscroll = function() {
    var currentScrollPos = window.pageYOffset;
      if (prevScrollpos > currentScrollPos) {
        document.getElementById("navbar").style.top = "0";
        setIndex(true)
      } else {
        document.getElementById("navbar").style.top = "-50px";
        setIndex(false)
      }
      prevScrollpos = currentScrollPos;
    }

    return (
        <>
            <nav className={`w-full ${!index ? "opacity-0" : "z-20"} border-b bg-white font-sans min-h-[60px] nav-bar` }id='navbar'>
                <div className='flex flex-wrap items-center justify-between xl:px-10 px-4 py-3 relative lg:gap-y-2 gap-y-4 gap-x-4'>
                    <Link to={'/'} className='flex items-center gap-2 font-bold text-[24px] text-blue-500 tracking-widest'><img src='/Images/Animation.gif' alt="logo" className='w-12' />
                        Zap
                    </Link>
                    <div className=' flex gap-3 items-center max-lg:ml-auto lg:order-1'>
                    {
                        name&&<Link to={`/wishlist/${userId}`}>
                        <svg className="w-6 h-6 hover:text-rose-400  text-gray-800 dark:text-black" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 21 19">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 4C5.5-1.5-1.5 5.5 4 11l7 7 7-7c5.458-5.458-1.542-12.458-7-7Z"/>
                        </svg>
                        </Link>
                    }
                        <div>
                        {
                            name?<Link to={`/cart/${userId}`} className="relative ">
                            <svg xmlns="http://www.w3.org/2000/svg" width="20px" height="20px"
                                className="cursor-pointer fill-[gray-800] hover:fill-rose-400 inline" viewBox="0 0 512 512">
                                <path
                                    d="M164.96 300.004h.024c.02 0 .04-.004.059-.004H437a15.003 15.003 0 0 0 14.422-10.879l60-210a15.003 15.003 0 0 0-2.445-13.152A15.006 15.006 0 0 0 497 60H130.367l-10.722-48.254A15.003 15.003 0 0 0 105 0H15C6.715 0 0 6.715 0 15s6.715 15 15 15h77.969c1.898 8.55 51.312 230.918 54.156 243.71C131.184 280.64 120 296.536 120 315c0 24.812 20.188 45 45 45h272c8.285 0 15-6.715 15-15s-6.715-15-15-15H165c-8.27 0-15-6.73-15-15 0-8.258 6.707-14.977 14.96-14.996zM477.114 90l-51.43 180H177.032l-40-180zM150 405c0 24.813 20.188 45 45 45s45-20.188 45-45-20.188-45-45-45-45 20.188-45 45zm45-15c8.27 0 15 6.73 15 15s-6.73 15-15 15-15-6.73-15-15 6.73-15 15-15zm167 15c0 24.813 20.188 45 45 45s45-20.188 45-45-20.188-45-45-45-45 20.188-45 45zm45-15c8.27 0 15 6.73 15 15s-6.73 15-15 15-15-6.73-15-15 6.73-15 15-15zm0 0"
                                    data-original="#000000"></path>
                            </svg>
                            <span className="absolute left-auto -ml-1 top-0 rounded-full bg-red-500 px-1 py-0 text-xs text-white">{cartCount}</span>
                        </Link>:<></>
                        }
                        </div>



                        {
                            !name?<div>
                            <Link to={'/userlogin'} className=" hover:text-white border-solid border-2 border-gray-300 transition duration-700 hover:bg-rose-400  font-medium rounded-lg text-sm px-3 py-2 text-center inline-flex items-center tracking-widest">
                                Login in
                                <svg className="rtl:rotate-180 w-3.5 h-3.5 ms-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 5h12m0 0L9 1m4 4L9 9" />
                                </svg>
                            </Link>
                            </div>:<div><Link to={`/profile/${userId}`} className='ms-3'>{name}</Link><button onClick={Logout} className='border-solid border-2 ms-2 py-1 px-2 hover:bg-black hover:text-white transition duration-700 rounded-lg'>Logout</button></div>
                        }

                        <button
                            id="toggle"
                            onClick={handleClick}
                            className='lg:hidden'
                            aria-label={isMenuOpen ? 'Close Menu' : 'Open Menu'}
                        >
                            <svg className="w-7 h-7" fill="#171e26" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                <path fillRule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd"></path>
                            </svg>
                        </button>
                    </div>
                    <ul id="collapseMenu" style={menuStyle} className={`lg:!flex items-center max-lg:hidden max-lg:w-full lg:space-x-5 max-lg:space-y-3 max-lg:my-4 ${isMenuOpen ? 'block' : 'hidden'}`}>
                        <li className=' max-lg:py-2'><Link to={'/'}
                            className='hover:text-[#0165ff] font-bold text-[18px] text-[#00171f] block tracking-widest'>Home</Link></li>
                            
                        <li className=' max-lg:py-2'><Link
                            className='hover:text-[#f26a8d] font-bold text-[15px] text-[#171e26] block tracking-widest'>Best Selling</Link></li>
                        {/* <li className=' max-lg:py-2'><Link
                            className='hover:text-[#f26a8d] font-bold text-[15px] text-[#171e26] block'>make-up</Link></li>
                        <li className='max-lg:py-2'><Link
                            className='hover:text-[#f26a8d] font-bold text-[15px] text-[#171e26] block'>Hair care</Link></li>
                        <li className=' max-lg:py-2'><Link
                            className='hover:text-[#f26a8d] font-bold text-[15px] text-[#171e26] block'>Fragrances</Link></li>
                        <li className=' max-lg:py-2'><Link
                            className='hover:text-[#f26a8d] font-bold text-[15px] text-[#171e26] block'>Personal Care</Link></li> */}
                            <li className='group max-lg:border-b max-lg:py-2 relative'>
          <a
            className='hover:text-[#f26a8d] font-bold text-[15px] text-[#171e26] block block tracking-widest'>Categories
            {/* <svg
              xmlns="http://www.w3.org/2000/svg" width="16px" height="16px" fill='currentColor' className="ml-1 inline-block"
              viewBox="0 0 24 24">
              <path
                d="M12 16a1 1 0 0 1-.71-.29l-6-6a1 1 0 0 1 1.42-1.42l5.29 5.3 5.29-5.29a1 1 0 0 1 1.41 1.41l-6 6a1 1 0 0 1-.7.29z"
                data-name="16" data-original="#000000" />
            </svg> */}
          </a>
          <ul
            className='absolute hidden group-hover:block shadow-lg max-lg:border max-lg:border-gray-500 bg-white px-6 pb-4 pt-6 space-y-3 lg:top-5 max-lg:top-8 lg:-left-6 min-w-[250px] z-50'>
                {
                                categories.map((dt)=>
                                <li key={dt._id} className=' max-lg:py-2'><Link to={`/categoryproducts/${dt._id}`}
                                className='hover:text-[#f26a8d] font-bold text-[15px] text-[#171e26] block tracking-widest'>{dt.category}</Link></li>
                                )
                            }
            </ul>
        </li>
                        <li className=' max-lg:py-2'>
                            <div className="flex w-full flex-wrap items-stretch">
                                {
                                    home&&<a href='#productsdisplay'
                                    className="hover:text-[#f26a8d]"
                                    type="button"
                                    id="button-addon1"
                                    data-te-ripple-init
                                    data-te-ripple-color="light">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 20 20"
                                        fill="currentColor"
                                        className="h-5 w-5">
                                        <path
                                            fillRule="evenodd"
                                            d="M9 3.5a5.5 5.5 0 100 11 5.5 5.5 0 000-11zM2 9a7 7 0 1112.452 4.391l3.328 3.329a.75.75 0 11-1.06 1.06l-3.329-3.328A7 7 0 012 9z"
                                            clipRule="evenodd" />
                                    </svg>
                                </a>
                                }
                            </div>
                        </li>
                    </ul>
                </div>
            </nav>





        </>
    )
}

export default UserNav
