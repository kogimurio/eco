import { faPlus, faEye } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { useState, useEffect } from 'react';
import { faHeart } from "@fortawesome/free-regular-svg-icons";
import Pagination from "./Pagination";
import { faStar as solidStar, faStarHalfStroke } from "@fortawesome/free-solid-svg-icons";
import { faStar as regularStar } from "@fortawesome/free-regular-svg-icons";
import { useNavigate } from "react-router-dom";
import useResponsiveTextLength from "../../hooks/useResponsiveTextLength";

import LoadingSpinner from '../LoadingSpinner';
import axios from 'axios';
import { toast } from 'react-toastify';

import { useCart } from '../../context/CartContext';

const BASE_URL = process.env.REACT_APP_BASE_URL;

export const BASE_IMAGE_URL = process.env.REACT_APP_BASE_URL_IMAGE;


const Clearance = ({ product }) => {
    const [products, setProducts] = useState([]);
    const [prodctId, setProductId] = useState(null);
    const [loading, setLoading] = useState(true);
    const [wishlistProducts, setWishlistProducts] = useState([]);
    const [cartItems, setCartItems] = useState([]);
    const maxChars = useResponsiveTextLength();
    const { addToCart } = useCart();
    const navigate = useNavigate();
    const localToken = localStorage.getItem('token');
    const token = JSON.parse(localToken);

    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(4);

    const indexOfLast = currentPage * itemsPerPage;
    const indexOfFirst = indexOfLast - itemsPerPage;
    const currentFeaturedProducts = products.slice(indexOfFirst, indexOfLast);

    const totalPages = Math.ceil(products.length / itemsPerPage);

    const truncate = (text) => {
        return text.length > maxChars ? text.slice(0, maxChars) + "…" : text
    }

    // Fetch products
    useEffect(() => {
        const fetchProduct = async () => {
            await new Promise(res => setTimeout(res, 2000));
            try {
            const res = await axios.get(`${BASE_URL}/products/clearance`)
            setProducts(res.data.products)
            setProductId(res.data.products.map((product) => product === product._id))
            } catch (error) {
            console.error(error?.res?.data || error.message);
            } finally {
            setLoading(false)
            }
        };

        fetchProduct()
    }, [])

    

    const handlePageChange = (pageNum) => setCurrentPage(pageNum);

    // Dynamically adjust itemsPerPage based on screen width
    useEffect(()=> {
        const updatedItemsPerPage = () => {
            if (window.innerWidth < 393) {
                setItemsPerPage(1); // Mobile
            } else if (window.innerWidth < 640) {
                setItemsPerPage(2); // Small tablets
            } else if (window.innerWidth < 768) {
                setItemsPerPage(2); // Tablets
            } else if (window.innerWidth < 1024) {
                setItemsPerPage(3); // Small laptops
            } else if (window.innerWidth < 1280) {
                setItemsPerPage(4); // Laptops
            } else if (window.innerWidth < 1536) {
                setItemsPerPage(5); // Desktop
            } else {
                setItemsPerPage(6); // Wide screens
            }
        }

        updatedItemsPerPage(); // Set on mount

        window.addEventListener("resize", updatedItemsPerPage); // Updated on resize

        return () => window.removeEventListener("resize", updatedItemsPerPage); // Cleanup
    }, []);

    const productDetail = (slug) => {
        navigate(`/productdetail/${slug}`);
    }

    const handleAddToWishlist = async (productId) => {
        try {
            await axios.post(`${BASE_URL}/wishlist/`, 
                {productId},
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    },

            });

            const addedProductId = productId;

            setWishlistProducts((prevWishlist)=> {
                if (!prevWishlist.some((item) => item._id === addedProductId)) {
                    return [...prevWishlist, { _id: addedProductId }];
                };
                return prevWishlist;
            });
            toast.success("Product has been added to your wishlist")
            
        } catch (error) {
            console.error("Error adding product to wishlist:", error);
            const errorMessage = error.response?.data?.message || error.message || "An error has occured";
            toast.error(errorMessage);
        }
    }

    const handleAddToCart = async (prodctId) => {
        await addToCart(prodctId, 1);
        toast.success('Product added to cart');
    };

    return (
        <div className="bg-gray-800 mt-8 py-4 overflow-x-hidden">
            <div className="flex justify-between items-center w-[90%] mx-auto my-4">
                <h2 className="text-white text-sectionHeading font-semibold whitespace-nowrap">Clearance</h2>

                {/* Line Breaker */}
                <div className="w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg mx-auto border-t border-gray-600 my-2"></div>
                
                {/* Pagination */}
                <div className="flex items-center gap-2 mt-4 justify-center">
                    <Pagination 
                        currentPage={currentPage}
                        totalPages={totalPages}
                        onPageChange={handlePageChange}
                    />
                </div>
            </div>
            
            {loading ? (
                <div className="flex justify-center">
                    <LoadingSpinner size="40" />
                </div>
            ) : (
                <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-2 w-[90%] mx-auto">
                    {currentFeaturedProducts.map((product, index) => (
                        <div 
                            key={index} 
                            className="relative w-full group cursor-pointer"
                            >
                                <div className="md:left-2 md:top-2 pl-2">
                                    <h3 className="text-stone-400 text-brandLabel">{product.brand}</h3>
                                    <p className="text-body text-white py-1">
                                        {truncate(product.name)}
                                    </p>
                                </div>
                                <div className="flex text-yellow-400 pl-2 pb-2">
                                    <FontAwesomeIcon icon={solidStar} />
                                    <FontAwesomeIcon icon={solidStar} />
                                    <FontAwesomeIcon icon={solidStar} />
                                    <FontAwesomeIcon icon={faStarHalfStroke} />
                                    <FontAwesomeIcon icon={regularStar} />
                                </div>

                                <img
                                    src={`${BASE_IMAGE_URL}/${product.thumbnail}`}
                                    alt={product.name}
                                    className="w-64 h-72 rounded object-contain hover:scale-105 cursor-pointer transition-transform duration 300"
                                />
                                <div className="md:left-2 md:top-2">
                                    <p className="text-white py-1 pl-2 text-price">${product.price}</p>
                                </div>

                                {/* Plus icon - always visible */}
                                <div className={`absolute bottom-3 right-2 w-38 group/icon
                                ${product.stock === 0 ? 'bg-gray-500 cursor-not-allowed' : 'bg-orange-600 hover:bg-orange-600'}
                                lg:bg-gray-900  lg:w-8 lg:hover:w-36 p-2 rounded-full flex items-center overflow-hidden transition-all duration-500`}>
                                    <FontAwesomeIcon
                                        icon={faPlus}
                                        className={`${product.stock === 0 ? 'hidden' : 'text-white text-iconMedium'}`}
                                    />
                                    <span 
                                        onClick={product.stock === 0 ? null : () => handleAddToCart(product._id)}
                                        className="text-white font-bold text-button ml-2 whitespace-nowrap 
                                        opacity-100 lg:opacity-0 lg:group-hover/icon:opacity-100 
                                        transition-opacity duration-500">
                                        {product.stock === 0 ? "Out of stock" : "Add to Cart"}
                                    </span>
                                </div>

                                {/* Icons and animated line divider */}
                                <div className="absolute bottom-14 right-2 flex flex-col items-center gap-2 animate-slide-down lg:group-hover:flex">
                                    <button
                                        onClick={(e) =>{
                                            e.stopPropagation();
                                            handleAddToWishlist(product._id)
                                        }}
                                        className="bg-gray-900 p-2 z-1000 rounded-full text-white hover:text-red-500"
                                        title="Wish list"
                                    >
                                    <FontAwesomeIcon icon={faHeart} className="text-iconMedium" />
                                    </button>

                                    {/* Line divider with animation */}
                                    <div className="w-8 border-t border-gray-700 transition-all duration-500 transform scale-x-0 lg:group-hover:scale-x-100"></div>

                                    <button
                                        onClick={(e) =>{
                                            e.stopPropagation()
                                            productDetail(product.slug)
                                        }}
                                        className="bg-gray-900 p-2 rounded-full text-white hover:text-orange-500"
                                        title="View"
                                    >
                                    <FontAwesomeIcon icon={faEye} className="text-iconMedium" />
                                    </button>
                                </div>
                        </div>
                    ))}
                </div>
            )}
            

        </div>
    );
};

export default Clearance;