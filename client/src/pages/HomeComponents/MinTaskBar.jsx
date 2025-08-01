import { useState } from "react";
import { faChevronDown, faGift, faChevronRight, faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";


const MinTaskBar = () => {
    const [isDropDownOpen, setIsDropDownOpen] = useState(false);
    return (
        <div className="h-17 bg-orange-600 py-2">
                <div className="flex items-center justify-center xl:justify-between w-[90%] mx-auto">
                    
                    {/* Desktop Nav (Hidden on Mobile & tablets) */}
                    <div className="hidden lg:flex items-center justify-between space-x-2">
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
                                    <li className="px-4 py-2 hover:bg-gray-100 hover:text-orange-700 cursor-pointer text-sm"><FontAwesomeIcon icon={faChevronRight} className="mx-2" /><Link to="/category/mens-fashion">Men's Fashion</Link> </li>
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
                    <div className="group bg-gray-700 px-5 py-3 rounded text-white w-full md:w-auto text-center overflow-hidden relative">
                        <div className="inline-block whitespace-nowrap px-2 w-40 animate-marquee">
                            <FontAwesomeIcon icon={faGift} />
                            - Free Shipping on orders $99
                        </div>
                    </div>
                </div>
            </div>
    )
}

export default MinTaskBar