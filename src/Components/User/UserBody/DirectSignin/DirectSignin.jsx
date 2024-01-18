import axios from 'axios'
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

const DirectSignin = () => {
    const navigate = useNavigate()
    const [val, setVal] = useState({
      email: "",
      UserName: "",
      phone: "",
      password: "",
      rpwd: ""
    })
  
  
  
    const handleChange = (e) => {
      setVal((pre) => {
        return { ...pre, [e.target.name]: e.target.value }
      })
    }
    // const handlePwd=(e)=>{
  
    // }
    console.log(val);
  
    const submit = (e) => {
      e.preventDefault()
      if (val.password !== val.rpwd)
        return alert("password is not match")
  
      axios.post('http://localhost:3003/api/addUser', val)
        .then((res) => {
          console.log(res);
          axios.post('http://localhost:3003/api/userlogin',val)
      .then((res)=>{
        console.log(res);
        localStorage.setItem("usertoken",JSON.stringify(res.data.token))
        navigate(-1)
      }).catch((error)=>{
        console.log(error.response.data.msg);
        alert(error.response.data.msg)
      })
          navigate(-1)
        })
    }
  
  return (
    <div className='realtive'>
    <Link to={'/'} className='absolute top-4 right-4'>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
        </svg>
    </Link>
    <div className="min-h-screen bg-gray-100 py-6 flex flex-col justify-center sm:py-12">
        <div className="relative py-3 lg:w-1/2 sm:max-w-xl sm:mx-auto">
            <div
                className="absolute inset-0 bg-gradient-to-r from-rose-400 to-rose-700 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl">
            </div>
            <div className="relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-20">
                <div className="max-w-md mx-auto">
                    <div>
                        <h1 className="text-2xl font-semibold text-rose-700">Sign in</h1>
                    </div>
                    <div className="divide-y divide-gray-200">
                        <div className="py-8 text-base leading-6 space-y-4 text-gray-700 sm:text-lg sm:leading-7">
                            <div className="relative">
                                <input onChange={handleChange} autoComplete="off" id="email" name="email" type="text" className="peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:borer-rose-600" placeholder="Email address" />
                                <label htmlFor="email" className="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm">Email Address</label>
                            </div>
                            <div className="relative">
                                <input onChange={handleChange} autoComplete="off"  name="UserName" type="text" className="peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:borer-rose-600" placeholder="Email address" />
                                <label className="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm">Username</label>
                            </div>
                            <div className="relative">
                                <input onChange={handleChange} autoComplete="off" name="phone" type="text" className="peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:borer-rose-600" placeholder="Email address" />
                                <label className="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm">Phone</label>
                            </div>
                            <div className="relative">
                                <input onChange={handleChange} autoComplete="off" id="password" name="password" type="password" className="mb-2 peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:borer-rose-600" placeholder="Password" />
                                <label htmlFor="password" className="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm">Password</label>
                            </div>
                            <div className="relative">
                                <input onChange={handleChange} autoComplete="off" name="rpwd" type="password" className="mb-2 peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:borer-rose-600" placeholder="Password" />
                                <label htmlFor="password" className="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm">Confirm Password</label>
                            </div>
                            <div className='block text-center text-[12px] p-0 m-0'>
                            <Link to={'/userlogin'}>Already have a account</Link>
                            </div>
                            <div className='block text-[12px] text-center p-0 m-0'>
                            </div>
                            <div className="relative">
                                <button onClick={submit} className="bg-rose-500 text-white rounded-md px-2 py-1">Signin</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
  )
}

export default DirectSignin
