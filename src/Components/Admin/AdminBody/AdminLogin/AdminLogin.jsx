import React, { useState } from 'react'
import './AdminLogin.css'
import AdminNav from '../../AdminNav/AdminNav'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'

const AdminLogin = () => {
    const navigate=useNavigate()
    const [val,setVal]=useState({
      email:"",
      UserName:"",
      password:""
    })
    
  
  
    const handleChange=(e)=>{
      setVal((pre)=>{
        return {...pre, [e.target.name]:e.target.value}
      })
    }
    console.log(val);
  
    const submit=async(e)=>{
      e.preventDefault()
      axios.post('http://localhost:3003/api/adminlogin',val)
      .then((res)=>{
        console.log(res);
        localStorage.setItem("admintoken",JSON.stringify(res.data.token))
        navigate('/admin')
      }).catch((error)=>{
        console.log(error.response.data.msg);
        alert(error.response.data.msg)
      })
      
    }
  
  return (
    <div>

      
<nav className="bg-white ">
    <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl p-4">
        <Link to={'/admin'} className="flex items-center space-x-3 rtl:space-x-reverse">
        <span className="material-symbols-outlined">
            health_and_beauty
        </span>
            <span className="self-center text-2xl font-semibold whitespace-nowrap text-gray-800">Zap</span>
        </Link>
        <div className="flex items-center space-x-6 rtl:space-x-reverse">
            <Link to={'/adminsignin'} href="#" className="text-sm  text-blue-600 dark:text-blue-500 hover:underline">Signin</Link>
        </div>
    </div>
</nav>



      <div className="form-body">
<form className="max-w-sm mx-auto sm-mx-1" onSubmit={submit}>
  <div className="mb-3">
    <label htmlFor="UserName" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-900">User Name</label>
    <input onChange={handleChange} name="UserName" type="text" id="UserName" className="bg-transparent shadow-sm  border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:border-gray-600 dark:placeholder-gray-400 dark:text-gray-800 dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" required />
  </div>
  <div className="mb-3">
    <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-900">email</label>
    <input onChange={handleChange} name="email" type="email" id="email" className="bg-transparent shadow-sm  border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:border-gray-600 dark:placeholder-gray-400 dark:text-gray-800 dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" placeholder="name@gmail.com" required />
  </div>
  <div className="mb-3">
    <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-900">password</label>
    <input onChange={handleChange} name="password" type="password" id="password" className="bg-transparent shadow-sm  border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:border-gray-600 dark:placeholder-gray-400 dark:text-gray-800 dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" required />
  </div>
  <Link to={'/adminforgot'} className='forget-link hover:underline transition duration-700 ease-in-out' >Forget user name or password</Link>
  
  <button type="submit" className="text-white mt-4 bg-blue-950 hover:bg-blue-900 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-950 dark:hover:bg-blue-800 dark:focus:ring-blue-800 transition duration-700 ease-in-out">Register Now</button>
</form>
</div>

    </div>
  )
}

export default AdminLogin
