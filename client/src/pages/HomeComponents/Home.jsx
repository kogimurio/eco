import { faChevronDown, faGift } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";


const Home = () => {
    return (
        <div className="bg-gray-500 min-h-screen">
            <div className="h-17 bg-orange-600 py-4">
                <div className="flex items-center justify-between w-[90%] mx-auto">
                    
                    {/* Desktop Nav (Hidden on Mobile) */}
                    <div className="hidden md:flex items-center justify-between space-x-2">
                        <div className="group bg-gray-800 px-5 py-3 font-semibold rounded text-white flex items-center space-x-2">
                            <span className="transition-transform mr-2 duration-300 group-hover:scale-x-[-1]">
                                &#9776;
                            </span>
                             Shop By Categories
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
                    <div className="group bg-gray-800 px-5 py-3 rounded text-white w-full md:w-auto text-center overflow-hidden relative">
                        <div className="inline-block whitespace-nowrap animate-marquee">
                            <FontAwesomeIcon icon={faGift} />
                            - Free Shipping on orders $99
                        </div>
                    </div>
                </div>
            </div>

            <div className="flex w-[90%] mx-auto">
                <h1>Home for ecoWebApp</h1>
            </div>
        </div>
    )
}

export default Home;