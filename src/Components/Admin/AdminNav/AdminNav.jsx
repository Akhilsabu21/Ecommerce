import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom'
import './AdminNav.css'
import axios from 'axios';

const AdminNav = ({triger}) => {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState('');
  
  const key = JSON.parse(localStorage.getItem('admintoken'));
  const getAdmin = async () => {
    const key = JSON.parse(localStorage.getItem('admintoken'));
    console.log(key);
    const res = await axios.get('http://localhost:3003/api/adminHome', { headers: { 'Authorization': `Bearer ${key}` } })
    setName(res.data.msg)
  }
  const logout = () => {
    triger(()=>false)
    localStorage.removeItem('admintoken');
    setName('')
  }
  console.log(open);
  useEffect(() => { 
    getAdmin()
  }, [])
  return (
    <div className={`${open ? "w-60" : "w-18"} min-h-screen h-auto transition ease-in duration-700 flex flex-col me-5 p-3 bg-white shadow bg-blue-100 side-bar`}>
      <div className="space-y-3">
        <div className="flex items-center p-2 space-y-1">

          <img src='/Images/Animation.gif' className='w-12 h-12' alt="" />

          <h2 className={`${!open && "hidden"} p-2 duratio-700 text-xl font-bold text-blue-700`}>Zap</h2>
        </div>
        <div className="flex-1">
          <ul className="pt-2 pb-4 space-y-1 text-sm">
            <li className="rounded-sm">
              <Link to={'/admin'}
                className="flex items-center p-2 space-x-3 rounded-md  hover:text-violet-800"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-8 h-8 hover:text-violet-800"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                  />
                </svg>
                <span className={`${!open && "hidden"}`} >Home</span>
              </Link>
            </li>
            <li className="rounded-sm">
              <Link to={'/addCategory'}
                className="flex items-center p-2 space-x-3 rounded-md hover:text-blue-700"
              >

                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none" viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="w-8 h-8 hover:text-blue-700">
                  <path strokeLinecap="round"
                    strokeLinejoin="round"
                    d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
                </svg>
                <span className={`${!open && "hidden"}`}>Add Category</span>
              </Link>
            </li>
            <li className="rounded-sm">
              <Link to={'/addProduct'}
                className="flex items-center p-2 space-x-3 rounded-md hover:text-fuchsia-700"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2}
                  stroke="currentColor"
                  className="w-8 h-8 hover:text-fuchsia-700">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 10.5v6m3-3H9m4.06-7.19-2.12-2.12a1.5 1.5 0 0 0-1.061-.44H4.5A2.25 2.25 0 0 0 2.25 6v12a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18V9a2.25 2.25 0 0 0-2.25-2.25h-5.379a1.5 1.5 0 0 1-1.06-.44Z" />
                </svg>
                <span className={`${!open && "hidden"}`}>Add Products</span>
              </Link>
            </li>
            <li className="rounded-sm">
              <Link to={'/orders'}
                className="flex items-center p-2 space-x-3 rounded-md hover:text-cyan-600"
              >

                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-8 h-8 hover:text-cyan-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                  />
                </svg>
                <span className={`${!open && "hidden"}`}>Orders</span>
              </Link>
            </li>
            <li className="rounded-sm">
              <a
                href="#"
                className="flex items-center p-2 space-x-3 rounded-md hover:text-rose-600"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-8 h-8 hover:text-rose-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1"
                  />
                </svg>
                {
                  name ? <span onClick={logout} className={`${!open && "hidden"}`}>Logout</span> : <Link to={'/adminlogin'} className={`${!open && "hidden"}`}>Log in</Link>
                }
              </a>
            </li>
          </ul>
        </div>
      </div>
      <button className={`${open && "rotate-180"} side-btn`} onClick={() => setOpen(!open)}><span className="material-symbols-outlined">
        arrow_forward_ios
      </span></button>
    </div>
  )
}

export default AdminNav
