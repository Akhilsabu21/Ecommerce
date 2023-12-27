import React from 'react'
import UserNav from '../../UserNav/UserNav'
import UserCarousel from '../UserCarousel/UserCarousel'
import Gallery from '../Gallery/Gallery'
import Footer from '../../Footer/Footer'
import UserProductCard from '../UserProductCard/UserProductCard'

const UserHome = () => {
    
  return (
    <>
      <UserNav/>
      <div className='w-[100%]'>
      <UserCarousel/>
      </div>
      <Gallery/>
      <div className='bg-gray-100 my-5'>
        <UserProductCard/>
      </div>
      <Footer/>
    </>
  )
}

export default UserHome
