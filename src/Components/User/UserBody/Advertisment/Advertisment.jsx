import React from 'react'

const Advertisment = () => {
    return (
        <>
            <section className="text-gray-600 body-font">
                <div className="container mx-auto flex px-5 pt-12 pb-24 md:flex-row flex-col items-center">
                    <div className="lg:flex-grow md:w-1/2 lg:pr-24 md:pr-16 flex flex-col md:items-start md:text-left mb-16 md:mb-0 items-center text-center">
                        <h1 className="title-font sm:text-4xl text-3xl mb-4 font-medium text-gray-900 text-left">Before they sold out
                            <br className="hidden lg:inline-block text-left"/>ready to Buy
                        </h1>
                        <p className="mb-8 leading-relaxed text-left">Lorem ipsum dolor sit amet consectetur, adipisicing elit. Reprehenderit, animi obcaecati eos voluptas nisi nobis nemo fugiat dicta sunt quidem placeat harum repellendus quae, modi doloribus ab ex. Reprehenderit, qui.</p>
                        <div className="flex justify-center">
                            <button className="inline-flex text-white bg-red-400 border-0 py-2 px-6 focus:outline-none hover:bg-red-500 rounded text-lg transition duration-700">Buy Now</button>
                            <button className="ml-4 inline-flex text-gray-700 bg-gray-100 border-0 py-2 px-6
                            focus:outline-none hover:bg-gray-200 rounded text-lg transition duration-700">Later</button>
                        </div>
                    </div>
                    <div className="lg:max-w-lg lg:w-full md:w-1/2 w-5/6">
                        <img className="object-cover object-center rounded" alt="hero" src="/Images/add-1.avif"/>
                    </div>
                </div>
            </section>
        </>
    )
}

export default Advertisment
