import React, { useState } from 'react'
import './AdminForgot.css'
import AdminNav from '../../AdminNav/AdminNav'
import { Link } from 'react-router-dom';
import axios from 'axios';

const AdminForgot = () => {
  const [option,setOption]=useState("username");
  const [val,setVal]=useState({
    phone:"",
    email:"",
    password:"",
    rpwd:""
  })
  const select=(e)=>{
    setOption(e.target.value);
  }
  const handleChange=(e)=>{
    setVal((pre)=>{
      return { ...pre, [e.target.name]:e.target.value }
    })
  }
  const Submit=async(e)=>{
    e.preventDefault();
    if(val.password===val.rpwd){
      const res=await axios.get(`http://localhost:3003/api/forgotAdminUserName/${val.phone}`)
    if(!res.data)
    return alert("user not exist")
    if(res.data.email!==val.email)
    return alert("email doesn't match")
    if(option==="password"){
      const newPassword={password:val.password}
      const data=await axios.patch(`http://localhost:3003/api/forgotAdminPassword/${val.phone}`,newPassword)
      console.log(data);
    }else{
    alert(res.data.UserName);
    }
    }else{
      alert("password is not match")
    }
  }
  return (
    <div className='flex me-5'>
      <AdminNav/>
      <div className="form-body mt-10 w-full">
<form className="max-w-sm mx-auto sm-mx-1" onSubmit={Submit}>
  <div className="mb-5">
    <select className="bg-transparent shadow-sm  border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:border-gray-600 dark:placeholder-gray-400 dark:text-gray-800 dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" required  onChange={select} id="">
      <option value="username">forgot Username</option>
      <option value="password">forgot Password</option>
    </select>
  </div>
  <div className="mb-5">
    <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-900">email</label>
    <input onChange={handleChange} name="email" type="email" id="email" className="bg-transparent shadow-sm  border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:border-gray-600 dark:placeholder-gray-400 dark:text-gray-800 dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" placeholder="name@gmail.com" required />
  </div>
  <div className="mb-5">
    <label htmlFor="phone" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-900">Phone number</label>
    <input onChange={handleChange} name="phone" type="number" id="phone" className="bg-transparent shadow-sm  border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:border-gray-600 dark:placeholder-gray-400 dark:text-gray-800 dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" required />
  </div>
  {
    option=="password" &&
    <div className="mb-5">
    <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-900">Enter your new password</label>
    <input onChange={handleChange}  name="password" type="password" id="password" className="bg-transparent shadow-sm  border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:border-gray-600 dark:placeholder-gray-400 dark:text-gray-800 dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" required />
    </div>
  }
  {
    option=="password" &&
    <div className="mb-5">
    <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-900">Confirm new password</label>
    <input onChange={handleChange}  name="rpwd" type="password" className="bg-transparent shadow-sm  border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:border-gray-600 dark:placeholder-gray-400 dark:text-gray-800 dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" required />
    </div>
  }
  
  {
    option=="username"?<button type="submit" className="text-white mt-4 bg-blue-950 hover:bg-blue-900 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-950 dark:hover:bg-blue-800 dark:focus:ring-blue-800 transition duration-700 ease-in-out">find username</button>:
    <button type="submit" className="text-white mt-4 bg-blue-950 hover:bg-blue-900 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-950 dark:hover:bg-blue-800 dark:focus:ring-blue-800 transition duration-700 ease-in-out">find password</button>
  }
  
</form>
</div>

    </div>
  )
}

export default AdminForgot
