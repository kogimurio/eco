import { Outlet, Link } from "react-router-dom";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart, faBagShopping } from '@fortawesome/free-solid-svg-icons';
import { faShoppingCart, faUser, faSearch, faRightToBracket, faRightFromBracket, faGear, faBoxOpen } from "@fortawesome/free-solid-svg-icons";
import Banner from "./Banner";
import Footer from "../FooterComponents/Footer";
import MinTaskBar from "../HomeComponents/MinTaskBar"; 
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useEffect } from 'react';
import axios from 'axios';
import { useCart } from '../../context/CartContext';


const BASE_URL = process.env.REACT_APP_BASE_URL;
const localToken = localStorage.getItem('token');
const token = JSON.parse(localToken);

const Layout = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const { cartItems } = useCart();
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    const user = JSON.parse(localStorage.getItem("user"));

    const toggleMenu = () => {
        setIsMenuOpen(prev => !prev);
    }

    const handleWishList = () => {
        navigate("/wishlist")
    }

    const handleRegister = () => {
        navigate("/register")
    }

    const handleProfile = () => {
        navigate("/profile")
    }

    const handleCart = () => {
        navigate("/cart")
    }

    const handleLogout = () => {
        localStorage.clear()
        toast.success('Logout successful!');  // Would you like help adding automatic token expiration handling (like auto logout or redirect to login)?
        window.location.href="/"
    }

    const handleOrderList = () => {
        navigate("/client_order")
    }


    const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);


    return (
        <>
            <nav className="bg-gray-800 w-full fixed top-0 left-0 z-50">
                {/* Banner */}
                <Banner />

                <div className="w-[90%] mx-auto py-1 relative">

                    {/* MOBILE: First row */}
                    <div className="flex justify-between items-center md:hidden">
                        <div className="flex flex-row items-center space-x-4">
                            {/* Hamburger */}
                            <button onClick={toggleMenu} className="text-white text-2xl">
                                &#9776;
                            </button>

                            {/* Logo */}
                            <div className="text-white font-bold text-xl">
                                <Link to="/">Fashionova</Link>
                            </div>
                        </div>

                        {/* Icons (wish, cart, account) */}
                        <ul className="flex space-x-4 items-center">
                            {user && (
                                <button 
                                    className="text-white hover:text-red-500 transition-transform duration-300 hover:scale-x-[-1]" title="Orders"
                                    onClick={handleOrderList}
                                >
                                    <FontAwesomeIcon icon={faBoxOpen} />
                                </button>
                            )}
                            <button 
                                className="text-white hover:text-red-500 transition-transform duration-300 hover:scale-x-[-1]" title="Wish list"
                                onClick={handleWishList}
                            >
                                <FontAwesomeIcon icon={faHeart} />
                            </button>
                            <button 
                                className="relative text-white hover:text-blue-500" 
                                title="Cart"
                                onClick={handleCart}
                            >
                                <FontAwesomeIcon icon={faBagShopping} className="text-xl" />
                                {totalItems > 0 && (
                                    <span className="absolute -top-2 -right-2 bg-orange-600 text-white text-xs font-bold px-1.5 py-0.5 rounded-full">
                                        {totalItems}
                                    </span>
                                )}
                            </button>

                            {/* Dropdown Group */}
                        <li className="relative group cursor-pointer text-white font-bold mx-4">
                            <div className="flex items-center px-4 py-2 rounded transition-all duration-200 group-hover:bg-gray-900">
                                <FontAwesomeIcon icon={faUser} className="text-white text-sm ml-1" />
                            </div>
                            <div className="absolute top-full right-0 w-48 bg-gray-700 rounded shadow-md hidden group-hover:block z-50">
                                <ul className="py-2">
                                    {user ? (
                                        <>
                                            <li className="text-white hover:text-gray-400 px-4 py-2">
                                                <FontAwesomeIcon icon={faGear} className="mr-2"/>
                                                <a href="/profile">Settings</a>
                                            </li>
                                            <li onClick={handleLogout} className="text-white hover:text-gray-400 px-4 py-2">
                                                <FontAwesomeIcon icon={faRightFromBracket} className="mr-2"/>
                                                Logout
                                            </li>
                                        </>
                                    ): (
                                        <li className="text-white hover:text-gray-400 px-4 py-2">
                                            <FontAwesomeIcon icon={faRightToBracket} className="mr-2"/>
                                            <a href="/login">Login</a>
                                        </li>
                                    )}
                                </ul>
                            </div>
                        </li>
                        </ul>
                    </div>

                    {/* MOBILE: Second row - Search */}
                    <div className="relative mt-3 w-full md:hidden">
                        <input
                        type="text"
                        placeholder="Search..."
                        className="px-4 py-2 pr-10 rounded bg-gray-700 w-full text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        <button
                        type="submit"
                        className="absolute right-2 top-1/2 -translate-y-1/2 text-white"
                        >
                        <FontAwesomeIcon icon={faSearch} />
                        </button>
                    </div>

                    {/* Desktop Layout */}
                    <div className="w-full hidden md:flex justify-between items-center">
                        {/* Logo */}
                        <div className="font-hero text-hero text-orange-600 hover:text-orange-400 transition-colors duration-300">
                            <Link to="/">fashionova</Link>
                        </div>

                        {/* Search Bar */}
                        <div className="relative w-80">
                            <input
                                type="text"
                                placeholder="Search..."
                                className="px-4 py-2 pr-10 rounded bg-gray-700 w-full text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                            <button
                                type="submit"
                                className="absolute right-2 top-1/2 -translate-y-1/2 text-white"
                            >
                                <FontAwesomeIcon icon={faSearch} />
                            </button>
                        </div>

                        {/* Desktop Menu */}
                        <ul className="flex space-x-4 items-center">
                            {user && (
                                <button 
                                    className="text-white hover:text-red-500 transition-transform duration-300 hover:scale-x-[-1]" title="Orders"
                                    onClick={handleOrderList}
                                >
                                    <FontAwesomeIcon icon={faBoxOpen} />
                                </button>
                            )}
                            <button 
                                className="text-white hover:text-red-500 transition-transform duration-300 hover:scale-x-[-1]" title="Wish list"
                                onClick={handleWishList}
                            >
                                <FontAwesomeIcon icon={faHeart} />
                            </button>
                            <button 
                                className="relative text-white hover:text-blue-500" 
                                title="Cart"
                                onClick={handleCart}
                            >
                                <FontAwesomeIcon icon={faBagShopping} className="text-xl" />
                                {totalItems > 0 && (
                                    <span className="absolute -top-2 -right-2 bg-orange-600 text-white text-xs font-bold px-1.5 py-0.5 rounded-full">
                                        {totalItems}
                                    </span>
                                )}
                            </button>

                            {/* Dropdown Group */}
                        <li className="relative group cursor-pointer text-white font-bold mx-4">
                            <div className="flex items-center px-4 py-2 rounded transition-all duration-200 group-hover:bg-gray-900">
                                <FontAwesomeIcon icon={faUser} className="text-white text-sm ml-1" />
                            </div>
                            <div className="absolute top-full right-0 w-48 bg-gray-700 rounded shadow-md hidden group-hover:block z-50">
                                <ul className="py-2">
                                    {user ? (
                                        <>
                                            <li className="text-white hover:text-gray-400 px-4 py-2">
                                                <FontAwesomeIcon icon={faGear} className="mr-2"/>
                                                <a href="/profile">Settings</a>
                                            </li>
                                            <li onClick={handleLogout} className="text-white hover:text-gray-400 px-4 py-2">
                                                <FontAwesomeIcon icon={faRightFromBracket} className="mr-2"/>
                                                Logout
                                            </li>
                                        </>
                                    ): (
                                        <li className="text-white hover:text-gray-400 px-4 py-2">
                                            <FontAwesomeIcon icon={faRightToBracket} className="mr-2"/>
                                            <a href="/login">Login</a>
                                        </li>
                                    )}
                                </ul>
                            </div>
                        </li>
                        </ul>
                    </div>

                    {/* Mobile Menu */}
                    {isMenuOpen && (
                        <div
                            className={`fixed top-0 left-0 h-full w-64 bg-gray-800 z-50 transform transition-transform duration-300 ease-in-out md:hidden ${
                        isMenuOpen ? 'translate-x-0' : '-translate-x-full'
                            }`}
                        >
                            <button
                                className="text-red-600 text-2xl absolute top-4 right-4"
                                onClick={() => setIsMenuOpen(false)}
                            >
                                &times;
                            </button>
                            <ul className="flex flex-col space-y-4 p-4">
                                <li className="text-white hover:text-gray-400">
                                    <Link to="/category/womens-fashion" onClick={() => setIsMenuOpen(false)}>Women's Fashion</Link>
                                </li>
                                <li className="text-white hover:text-gray-400">
                                    <Link to="/category/mens-fashion" onClick={() => setIsMenuOpen(false)}>Men's Fashion</Link>
                                </li>
                                <li className="text-white hover:text-gray-400">
                                    <Link to="/category/kids-fashion" onClick={() => setIsMenuOpen(false)}>Kid's Fashion</Link>
                                </li>
                                <li className="text-white hover:text-gray-400">
                                    <Link to="/category/footware" onClick={() => setIsMenuOpen(false)}>Footware</Link>
                                </li>

                                <li className="text-white hover:text-gray-400">
                                    <Link to="/category/fashion-jewellery" onClick={() => setIsMenuOpen(false)}>Fashion Jewellery</Link>
                                </li>
                                <li className="text-white hover:text-gray-400">
                                    <Link to="/category/maternity-fashion" onClick={() => setIsMenuOpen(false)}>Maternity Fashion</Link>
                                </li>
                                <li className="text-white hover:text-gray-400">
                                    <Link to="/category/bags-and-accessories" onClick={() => setIsMenuOpen(false)}>Bags & Accessories</Link>
                                </li>
                                <li className="text-white hover:text-gray-400">
                                    <Link to="/category/beauty-and-personal-care" onClick={() => setIsMenuOpen(false)}>Beauty & Personal Care</Link>
                                </li>
                                <li className="text-white hover:text-gray-400">
                                    <Link to="/category/lingerie-and-sleepwear" onClick={() => setIsMenuOpen(false)}>Lingerie & Sleepwear</Link>
                                </li>
                                <li className="text-white hover:text-gray-400">
                                    <Link to="/category/activewear-sportswear" onClick={() => setIsMenuOpen(false)}>Activewear Sportswear</Link>
                                </li>
                            </ul>
                        </div>
                    )}
                </div>
                <MinTaskBar />
            </nav>

            <div className="pt-[160px]">
                <Outlet />
            </div>
            <Footer />
        </>
    )
};

export default Layout;