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
import RelatedProductCard from '../ProductComponents/RelatedProductCard';

import LoadingSpinner from '../LoadingSpinner';
import axios from 'axios';
import { toast } from 'react-toastify';

import { useCart } from '../../context/CartContext';

const BASE_URL = process.env.REACT_APP_BASE_URL;

export const BASE_IMAGE_URL = process.env.REACT_APP_BASE_URL_IMAGE;


const BestSellers = ({ product }) => {
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
            const res = await axios.get(`${BASE_URL}/products/new`)
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
                <h2 className="text-white text-sectionHeading font-semibold whitespace-nowrap">New Products</h2>

                {/* Line Breaker */}
                <div className="hidden md:flex w-full md:max-w-md lg:max-w-lg mx-auto border-t border-gray-600 my-2"></div>
                
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
                        <RelatedProductCard
                            key={index}
                            product={product}
                            truncate={truncate}
                            handleAddToCart={handleAddToCart}
                            handleAddToWishlist={handleAddToWishlist}
                            productDetail={productDetail}
                        />
                    ))}
                </div>
            )}
        </div>
    );
};

export default BestSellers;