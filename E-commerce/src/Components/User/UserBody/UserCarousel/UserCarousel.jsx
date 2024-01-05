import React from 'react'
import './UserCarousel.css'


const UserCarousel = ({ slides }) => {
    // const [current, setCurrent] = useState(0)

    // const previousSlide = () => {
    //     if (current === 0) setCurrent(slides.length - 1)
    //     else setCurrent(current - 1)
    // }
    // const nextSlide = () => {
    //     if (current === slides.length - 1) setCurrent(0)
    //     else setCurrent(current + 1)
    // }
    return (
        // <div className='carousel-body overflow-hidden relative'>
        //     <div className={`w-[100%] flex  transition ease-out duration-400`} style={{
        //         transform:`translateX(-${current * 100}%)`
        //     }}>
        //         {
        //             slides.map((s,i) => {
        //                 return <img key={i} className='c-img w-[100vw] object-cover' src={s} />
        //             })
        //         }
        //     </div>

        //     <div className='absolute top-0 h-full w-full flex items-center justify-between'>
        //     <button onClick={previousSlide}>
        //     <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
        //         <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
        //     </svg>
        //     </button>

        //     <button onClick={nextSlide}>
        //     <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
        //         <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
        //     </svg>
        //     </button>
        //     </div>

        // </div>
        // <>
        //     <div>
        //         <b-carousel
        //             id="carousel-fade"
        //             style="text-shadow: 0px 0px 2px #000"
        //             fade
        //             indicators
        //             img-width="1024"
        //             img-height="480"
        //         >
        //             <b-carousel-slide
        //                 caption="First Slide"
        //                 img-src="https://picsum.photos/1024/480/?image=10"
        //             ></b-carousel-slide>
        //             <b-carousel-slide
        //                 caption="Second Slide"
        //                 img-src="https://picsum.photos/1024/480/?image=12"
        //             ></b-carousel-slide>
        //             <b-carousel-slide
        //                 caption="Third Slide"
        //                 img-src="https://picsum.photos/1024/480/?image=22"
        //             ></b-carousel-slide>
        //         </b-carousel>
        //     </div>
        // </>/
        // const slides=[
    //     'https://images.pexels.com/photos/2306210/pexels-photo-2306210.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    //     'https://images.pexels.com/photos/965989/pexels-photo-965989.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    //     'https://images.pexels.com/photos/4155478/pexels-photo-4155478.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    //     'https://images.pexels.com/photos/413998/pexels-photo-413998.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    // ]
        
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

