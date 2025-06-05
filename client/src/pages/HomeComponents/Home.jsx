import { faChevronDown, faGift, faChevronRight, faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Carousel from "../CarouselComponents/Carousel";
import { useState } from "react";
import Offer from "./Offer";


const Home = () => {
    const [isDropDownOpen, setIsDropDownOpen] = useState(false);


    return (
        <div className="bg-gray-800 min-h-screen">
            <div className="h-17 bg-orange-600 py-4">
                <div className="flex items-center justify-between w-[90%] mx-auto">
                    
                    {/* Desktop Nav (Hidden on Mobile) */}
                    <div className="hidden md:flex items-center justify-between space-x-2">
                        <div className="relative group bg-gray-700 px-5 py-3 font-semibold rounded text-white flex items-center space-x-2">
                            <button 
                                onClick={() => setIsDropDownOpen(!isDropDownOpen)}
                                className="transition-transform mr-2 duration-300 group-hover:scale-x-[-1]">
                                &#9776;
                            </button>
                            <span onClick={() => setIsDropDownOpen(!isDropDownOpen)} className="cursor-pointer">SHOP BY CATEGORIES</span>
                            {isDropDownOpen && (
                                <ul className="absolute -left-2 -top-40 z-10 rounded-md shadow-lg mt-60 w-full bg-gray-700 ring-1 ring-black ring-opacity-5 focus:outline-none" >
                                    <li className="px-4 py-2 hover:bg-gray-100 hover:text-orange-700 cursor-pointer mt-2 text-sm"><FontAwesomeIcon icon={faChevronRight} className="mx-2" /> Women's Fashion</li>
                                    <li className="px-4 py-2 hover:bg-gray-100 hover:text-orange-700 cursor-pointer text-sm"><FontAwesomeIcon icon={faChevronRight} className="mx-2" /> Fashion Jewellery</li>
                                    <li className="px-4 py-2 hover:bg-gray-100 hover:text-orange-700 cursor-pointer text-sm"><FontAwesomeIcon icon={faChevronRight} className="mx-2" /> Clearance</li>
                                    <li className="px-4 py-2 hover:bg-gray-100 hover:text-orange-700 cursor-pointer text-sm"><FontAwesomeIcon icon={faChevronRight} className="mx-2" /> Men's Fashion</li>
                                    <li className="px-4 py-2 hover:bg-gray-100 hover:text-orange-700 cursor-pointer text-sm"><FontAwesomeIcon icon={faChevronRight} className="mx-2" /> Kid's Fashion</li>
                                    <li className="px-4 py-2 hover:bg-gray-100 hover:text-orange-700 cursor-pointer text-sm"><FontAwesomeIcon icon={faChevronRight} className="mx-2" /> Footware</li>
                                    <li className="px-4 py-2 hover:bg-gray-100 hover:text-orange-700 cursor-pointer text-sm"><FontAwesomeIcon icon={faChevronRight} className="mx-2" /> Electronics</li>
                                    <li className="px-4 py-2 hover:bg-gray-100 hover:text-orange-700 cursor-pointer text-sm"><FontAwesomeIcon icon={faChevronRight} className="mx-2" /> Furniture</li>
                                    <li className="px-4 py-2 hover:bg-gray-100 hover:text-orange-700 cursor-pointer text-sm"><FontAwesomeIcon icon={faChevronRight} className="mx-2" /> Cookware</li>
                                    <li className="px-4 py-2 hover:bg-gray-100 hover:text-orange-700 cursor-pointer text-sm"><FontAwesomeIcon icon={faPlus} className="mx-2" /> More</li>
                                </ul>
                            )}
                        </div>
                        <ul className="flex space-x-4">
                            <li className="text-white hover:text-gray-400 font-bold mx-4">
                                <a href="/aboutus">About Us</a>
                            </li>
                            <li className="text-white hover:text-gray-400 font-bold mx-4">
                                <a href="/affiliates">Affiliate</a>
                            </li>
                            <li className="text-white hover:text-gray-400 font-bold mx-4">
                                <a href="/contactus">Contact Us</a>
                            </li>
                        </ul>
                    <ul>
                        <li className="relative group cursor-pointer text-white font-bold mx-4">
                        <div className="flex items-center px-4 py-2 rounded transition-all duration-200 group-hover:bg-gray-900">
                            More
                            <FontAwesomeIcon icon={faChevronDown} className="text-white text-sm ml-1" />
                        </div>
                        <div className="absolute top-full right-0 w-48 bg-gray-700 rounded shadow-md hidden group-hover:block z-50">
                            <ul className="py-2">
                            <li className="text-white hover:text-gray-400 px-4 py-2">
                                <a href="/returns">Returns and policies</a>
                            </li>
                            <li className="text-white hover:text-gray-400 px-4 py-2">
                                <a href="/terms">Terms & conditions</a>
                            </li>
                            <li className="text-white hover:text-gray-400 px-4 py-2">
                                <a href="/blog">Blog</a>
                            </li>
                            </ul>
                        </div>
                        </li>
                    </ul>
                    </div>

                    {/* Shop Adds Here - Always Visible, Full Width on Mobile */}
                    <div className="group bg-gray-700 px-5 py-3 rounded text-white mr-5 w-full md:w-auto text-center overflow-hidden relative">
                        <div className="inline-block whitespace-nowrap px-2 w-40 animate-marquee">
                            <FontAwesomeIcon icon={faGift} />
                            - Free Shipping on orders $99
                        </div>
                    </div>
                </div>
            </div>

            <div className="grid w-[90%] mx-auto mt-4 grid-cols-1 md:grid-cols-[1fr_3fr_1fr] gap-4">
                <div>
                    
                </div>
                <div>
                    <Carousel />
                </div>
                <div className="grid w-[80%] grid-cols-1 mt-2 mx-auto">
                    <div className="relative w-full">
                        <img
                            src="/top-banner-01.jpg"
                            alt='banner-bag'
                            className="rounded w-full object-contain p-0"
                        />
                        <div className="absolute left-3 top-6">
                            <h3 className="text-lg text-white">New Sale</h3>
                            <p className="text-lg text-white font-bold">Backpack</p>
                            <div className="relative flex items-center justify-center group">
                                <button className="absolute left-0.5 top-4 origin-left w-20 group-hover:w-[110px] -translate-y-1/2 bg-gray-600 text-white pl-2 py-1 pr-2 text-sm rounded-xl hover:bg-orange-700 transition-all duration-300 ease-in-out">
                                    Shop Now
                                </button> 
                                    <FontAwesomeIcon
                                        icon={faChevronRight}
                                        className="absolute -right-4 top-4 w-3 group-hover:-right-6 -translate-y-1/2 text-white bg-orange-600 group-hover:bg-gray-600 rounded-full p-1 transition-all duration-300 ease-in-out"
                                    />
                            </div>
                        </div>
                    </div>
                    <div className="relative w-full">
                        <img
                            src="/top-banner-02.jpg"
                            alt='banner-bag'
                            className="rounded w-full object-contain p-0"
                        />
                        <div className="absolute left-12 top-1">
                            <h3 className="text-lg text-white">New Arrivals</h3>
                            <p className="text-lg text-white font-bold">Styles Shoes</p>
                            <div className="relative flex items-center justify-center group">
                                <button className="absolute left-0.5 top-4 origin-left w-20 group-hover:w-[115px] -translate-y-1/2 bg-gray-600 text-white pl-2 py-1 pr-2 text-sm rounded-xl hover:bg-orange-700 transition-all duration-300 ease-in-out">
                                    Save 20%
                                </button> 
                                    <FontAwesomeIcon
                                        icon={faChevronRight}
                                        className="absolute right-2 top-4 w-3 group-hover:-right-1 -translate-y-1/2 text-white bg-orange-600 group-hover:bg-gray-600 rounded-full p-1 transition-all duration-300 ease-in-out"
                                    />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Offer />
        </div>
    )
}

export default Home;