import React from 'react'
import './UserCarousel.css'


const UserCarousel = () => {
    return (
       
<div id="carouselExampleDark" className="mt-20 carousel carousel-dark slide" data-bs-ride="carousel">
  <div className="carousel-indicators">
    <button type="button" data-bs-target="#carouselExampleDark" data-bs-slide-to="0" className="active" aria-current="true" aria-label="Slide 1"></button>
    <button type="button" data-bs-target="#carouselExampleDark" data-bs-slide-to="1" aria-label="Slide 2"></button>
    <button type="button" data-bs-target="#carouselExampleDark" data-bs-slide-to="2" aria-label="Slide 3"></button>
  </div>
  <div className="carousel-inner relative">
  <div className="carousel-item active">
      <img src="/Images/c-2.jpg" className="d-block w-100" alt="..."/>
      <div className="carousel-caption pt-5 d-none d-md-block absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 my-auto">
        <h5 className='text-white font-bold text-[35px] c-details'>HOLIDAY COLLECTION
WINTER WONDERGLAM
FOR YOU & YOUR CREW!</h5>
        <button className='text-white border-solid px-3 py-2 font-bold border-2 border-white hover:bg-gray-800 hover:border-0 hover:text-[#E0A94C] transition duration-700 c-details'>Explore</button>
      </div>
    </div>
    <div className="carousel-item relative " data-bs-interval="10000">
      <img src="/Images/c-3.jpg" className="d-block w-100" alt="..."/>
      <div className="carousel-caption filter drop-shadow-{-6px 12px 22px #ffffff}  pt-5 d-none d-md-block absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 my-auto">
        <h5 className='text-[#E0A94C] font-bold text-[35px] c-details'>HOLIDAY COLLECTION
WINTER WONDERGLAM
FOR YOU & YOUR CREW!</h5>
        <button className='text-[#E0A94C] border-solid px-3 py-2 font-bold border-2 border-[#E0A94C] hover:bg-[#E0A94C] hover:text-gray-800 transition duration-700 c-details'>Explore</button>
      </div>
    </div>
    <div className="carousel-item relative" data-bs-interval="2000">
      <img src="/Images/c-1.jpg" className="d-block w-100" alt="..."/>
      <div className="carousel-caption filte drop-shadow-xl pt-5 d-none d-md-block absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 my-auto">
        <h5 className='text-rose-600 font-bold text-[35px] c-details'>HOLIDAY COLLECTION
WINTER WONDERGLAM
FOR YOU & YOUR CREW!</h5>
{/* filter drop-shadow-{amount} */}
        <button className='text-rose-700  border-solid px-3 py-2 font-bold border-2 border-rose-500 hover:bg-rose-700 hover:text-white transition duration-700 c-details'>Explore</button>
      </div>
    </div>
    
  </div>
  <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleDark" data-bs-slide="prev">
    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
    <span className="visually-hidden">Previous</span>
  </button>
  <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleDark" data-bs-slide="next">
    <span className="carousel-control-next-icon" aria-hidden="true"></span>
    <span className="visually-hidden">Next</span>
  </button>
</div>
    )
}

export default UserCarousel

