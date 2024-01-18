import React, { useEffect, useState } from 'react'
import UserNav from '../../UserNav/UserNav'
import UserCarousel from '../UserCarousel/UserCarousel'
import Gallery from '../Gallery/Gallery'
import Footer from '../../Footer/Footer'
import UserProductCard from '../UserProductCard/UserProductCard'
import Advertisment from '../Advertisment/Advertisment'
import axios from 'axios'

const UserHome = () => {
  return (
    <>
      <UserNav home={'home'}/>
      <div className='w-[100%]'>
      <UserCarousel/>
      </div>
      <Gallery/>
      <div className='bg-gray-50 my-5'>
        <UserProductCard/>
      </div>
      <Advertisment/>
      <Footer/>
    </>
  )
}

export default UserHome
