import { faChevronDown, faGift } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Carousel from "../CarouselComponents/Carousel";


const Home = () => {
    return (
        <div className="bg-gray-800 min-h-screen">
            <div className="h-17 bg-orange-600 py-4">
                <div className="flex items-center justify-between w-[90%] mx-auto">
                    
                    {/* Desktop Nav (Hidden on Mobile) */}
                    <div className="hidden md:flex items-center justify-between space-x-2">
                        <div className="relative group bg-gray-700 px-5 py-3 font-semibold rounded text-white flex items-center space-x-2">
                            <button className="transition-transform mr-2 duration-300 group-hover:scale-x-[-1]">
                                &#9776;
                            </button>
                            SHOP BY CATEGORIES
                            <ul className="absolute z-10 rounded-md shadow-lg mt-60 w-48 bg-gray-700 ring-1 ring-black ring-opacity-5 focus:outline-none hidden group-hover:block">
                                <li className="px-4 py-2 hover:bg-gray-100 hover:text-orange-700 cursor-pointer">Women's Fashion</li>
                                <li className="px-4 py-2 hover:bg-gray-100 hover:text-orange-700 cursor-pointer">Fashion Jewellery</li>
                                <li className="px-4 py-2 hover:bg-gray-100 hover:text-orange-700 cursor-pointer">Clearance</li>
                                <li className="px-4 py-2 hover:bg-gray-100 hover:text-orange-700 cursor-pointer">Men's Fashion</li>
                                <li className="px-4 py-2 hover:bg-gray-100 hover:text-orange-700 cursor-pointer">Kid's Fashion</li>
                            </ul>
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
                        <div className="inline-block whitespace-nowrap w-40 animate-marquee">
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
                        <div className="absolute left-3 top-2">
                            <h3 className="text-lg text-white">New Sale</h3>
                            <p className="text-lg text-white font-bold">Backpack</p>
                            <button
                                className="bg-gray-600 text-white px-4 py-2 text-sm rounded-xl hover:bg-orage-700 transition"
                            >Shop Now</button> 
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
                            <button
                                className="bg-orange-600 text-white px-4 py-2 font-bold rounded-xl hover:bg-orage-700 transition"
                            >save 20%</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Home;