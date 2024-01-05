import React from 'react'
import './Gallery.css'

const Gallery = () => {
  return (
    <>
      <section className="text-gray-600 body-font">
  <div className="container px-5 pt-20 pb-14 mx-auto flex flex-wrap">
    <div className="flex w-full mb-20 flex-wrap">
      <h1 className="sm:text-3xl text-2xl font-medium title-font text-gray-900 lg:w-1/3 lg:mb-0 mb-4 textZoomAnimation">
        <span className='text-[12px] block'>FIND INSPIRATION</span>
        THE TREND IS GLOW!!!!!!</h1>
      <p className="lg:pl-6 lg:w-2/3 mx-auto leading-relaxed text-base textZoomAnimation">Lorem ipsum dolor sit amet consectetur adipisicing elit. Odit eius doloremque eveniet. Provident quaerat sint tempora blanditiis vero voluptate at labore quas neque eligendi. Ea ex eius cupiditate placeat voluptates.</p>
    </div>
    <div className="flex flex-wrap md:-m-2 -m-1">
      <div className="flex flex-wrap w-1/2">
        <div className="md:p-2 p-1 w-1/2">
          <img alt="gallery" className="w-full object-cover h-full object-center block" src="https://images.unsplash.com/photo-1526045478516-99145907023c?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"/>
        </div>
        <div className="md:p-2 p-1 w-1/2">
          <img alt="gallery" className="w-full object-cover h-full object-center block" src="https://plus.unsplash.com/premium_photo-1703483854271-44b6a1de388a?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3Dhttps://plus.unsplash.com/premium_photo-1703483854271-44b6a1de388a?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"/>
        </div>
        <div className="md:p-2 p-1 w-full">
          <img alt="gallery" className="w-full h-full object-cover object-center block" src="https://img.freepik.com/free-photo/woman-enjoying-relaxing-bubble-bath_23-2149122079.jpg?w=1060&t=st=1703614200~exp=1703614800~hmac=c3c8001ce291c7e2f4acd08551fbbdb9b0db0997258e91638f55147ee4c10a92"/>
        </div>
      </div>
      <div className="flex flex-wrap w-1/2">
        <div className="md:p-2 p-1 w-full">
          <img alt="gallery" className="w-full h-full object-cover object-center block" src="https://images.unsplash.com/photo-1557827983-012eb6ea8dc1?q=80&w=1776&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"/>
        </div>
        <div className="md:p-2 p-1 w-1/2">
          <img alt="gallery" className="w-full object-cover h-full object-center block" src="https://images.unsplash.com/photo-1579752515149-489d8d711342?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"/>
        </div>
        <div className="md:p-2 p-1 w-1/2">
          <img alt="gallery" className="w-full object-cover h-full object-center block" src="https://images.unsplash.com/photo-1583784561126-c18e59057f3b?q=80&w=2069&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"/>
        </div>
      </div>
    </div>
  </div>
</section>
    </>
  )
}

export default Gallery
