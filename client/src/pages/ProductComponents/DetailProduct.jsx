import { faStar as regularStar } from "@fortawesome/free-regular-svg-icons";
import { faStar as solidStar, faStarHalfStroke, faTrash  } from "@fortawesome/free-solid-svg-icons";
import { faPlus, faEye, faHeart } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState, useEffect } from "react";
import MinTaskBar from "../HomeComponents/MinTaskBar";
import { useNavigate } from "react-router-dom";
import MinProductBar from "./MinProductBar"
import { FaPen, FaChevronDown, FaChevronUp } from "react-icons/fa";
import axios from 'axios';
import { useParams } from "react-router-dom";
import LoadingSpinner from "../LoadingSpinner";
import { toast } from 'react-toastify';
import { useCart } from '../../context/CartContext';
import useResponsiveTextLength from "../../hooks/useResponsiveTextLength";
import ReviewList from '../ReviewComponents/ReviewsList';
import RelatedProducts from './RelatedProducts';

import Modal from '../ReviewComponents/Modal';

const BASE_URL = process.env.REACT_APP_BASE_URL;

const BASE_IMAGE_URL = process.env.REACT_APP_BASE_URL_IMAGE;

const localToken = localStorage.getItem('token')
const token = JSON.parse(localToken);

const storedUser = localStorage.getItem("user")
const user = storedUser ? JSON.parse(storedUser) : null;


export default function DetailProduct() {
    const [product, setProduct] = useState(null);
    const [relatedProducts, setRelatedProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [wishlistProducts, setWishlistProducts] = useState([]);
    const { slug } = useParams()
    const { addToCart, cartItems, loadingCart, updateCartItem, removeFromCart } = useCart();
    const [loadingItem, setLoadingItem] = useState(null)
    const [isModalopen, setIsModalOpen] = useState(false);
    const [reviews, setReviews] = useState([]);
    const maxChars = useResponsiveTextLength();
    const navigate = useNavigate();
    

    useEffect(() => {
        const fetchProduct = async() => {
            try {
                const res = await axios.get(`${BASE_URL}/products/${slug}`)
                setProduct(res.data.product)
                console.log("Response data:",res.data);
            } catch (error) {
                console.error("Error in fetching product:", error);
            } finally {
                setLoading(false);
            }
            
        }

        fetchProduct();
        
    }, [slug])

    useEffect(() => {
        const fetchProduct = async() => {
            try {
                const res = await axios.get(`${BASE_URL}/products/related_products/${slug}`)
                setRelatedProducts(res.data.relatedProducts)
                console.log("Related products response:",res.data);
            } catch (error) {
                console.error("Error in fetching related products:", error);
            } finally {
                setLoading(false);
            }
            
        }

        fetchProduct();
        
    }, [slug])

    useEffect(() => {
        try {
            const fetchReviews = async () => {
            const response = await axios.get(`${BASE_URL}/review/${slug}`)
            setReviews(response.data.reviews);
            console.log("Fetched reviews:", response.data);
        } 
        
        fetchReviews();
        } catch (error) {
            const msg =
            error.response?.data ||
            error.message ||
            "something went wrong"
            console.log(msg);
            toast.error(msg);
        }
    }, [slug]);

    const totalRatings = reviews.reduce((sum, r) => sum + r.rating, 0);
    const averageRating = reviews.length > 0 ? (totalRatings / reviews.length).toFixed(1) : 0;

    function StarRating({ averageRating }) {
        return (
            <div className="flex text-orange-400">
                {[1, 2, 3, 4, 5].map((i) => {
                    if (averageRating >= i) {
                        return <FontAwesomeIcon key={i} icon={solidStar} />; 
                    } else if (averageRating >= i - 0.5) {
                        return <FontAwesomeIcon key={i} icon={faStarHalfStroke} />;
                    } else {
                        return <FontAwesomeIcon key={i} icon={regularStar} />;
                    }
                })}
            </div>
        )
    }


    const truncate = (text) => {
        return text.length > maxChars ? text.slice(0, maxChars) + "…" : text
    }

    const handleAddToCart = async (prodctId) => {
         try {
            await addToCart(prodctId, 1);
            toast.success('Product added to cart');
         } catch (error) {
            toast.error("Failed to add to cart");
         } 
    };

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

    const handleUpdateCart = async (productId, newQuatity) => {
          setLoadingItem(productId);
          try {
            await updateCartItem(productId, newQuatity);
          } catch (error) {
            console.error("Error updating cart:", error.response?.data?.message || error.message );
            toast.error("Error updating cart")
          } finally {
            setLoadingItem(null);
          }
        }

    const currentQty = product ? cartItems.find((item) => item.product?._id === product?._id)?.quantity || 0 : 0;

    const productDetail = (slug) => {
        navigate(`/productdetail/${slug}`);
    }

    const handleCreateReview = () => {
        setIsModalOpen(true);
    }

    const handleCloseModal = () => {
        setIsModalOpen(false);
    }

    if (loading || !product) {
        <div className="flex justify-center">
            return <LoadingSpinner />;
        </div>
    }

    return (
        <>
        <MinProductBar />
        <div className="bg-gray-800 py-4 min-h-screen">
            {isModalopen && (
                <Modal slug={slug} onClose={handleCloseModal} />
            )}
            <div className="grid grid-cols-1 max-w-7xl mx-auto overflow-x-hidden px-4">
                <div className="grid grid-cols-1 lg:grid-cols-2 w-[90%] mx-auto py-4">
                    <div className="border border-gray-700 px-3 rounded-lg shadow h-auto">
                        <img
                            src={`${BASE_IMAGE_URL}/${product?.thumbnail}`}
                            alt={product?.name}
                            className="w-full h-fit object-cover rounded-lg shadow-lg"
                        />
                    </div>
                    <div className="ml-4 lg:h-96">
                        <p className="text-white mt-2">{product?.name}</p>
                        <hr className="flex my-4 border border-gray-400"/>
                        <a href="*" className="text-xs text-stone-400">{product?.brand}</a>

                        <p className="py-3 text-white">${product?.price}</p>
                        <div className="flex text-yellow-400 pb-2">
                            <StarRating averageRating={averageRating} />

                            <div className="w-px h-4 bg-stone-400 ml-2"></div>
                            <p className="text-stone-400 pl-2 text-xs">
                                {averageRating}
                            </p>
                            
                            {user?.role !== 'admin' && (
                                <>
                                    <div className="w-px h-4 bg-stone-400 ml-2"></div>
                                    <div className="flex items-center text-stone-400 pl-2 text-xs gap-1 cursor-pointer hover:text-blue-400">
                                        <FaPen onClick={handleCreateReview} />
                                        <span>a review</span>
                                    </div>
                                </>
                            )}
                            
                            {user?.role === 'admin' && (
                                <>
                                    <div className="w-px h-4 bg-stone-400 ml-2"></div>
                                    <div className="flex items-center text-stone-400 pl-2 text-xs gap-1 cursor-pointer hover:text-blue-400">
                                        <FaPen />
                                        <span>Edit</span>
                                    </div>
                                    <div className="w-px h-4 bg-stone-400 ml-2"></div>
                                    <div className="flex items-center text-stone-400 pl-2 text-xs gap-1 cursor-pointer hover:text-blue-400">
                                        <FontAwesomeIcon icon={faTrash} className="text-red-500 hover:text-red-700 cursor-pointer" />
                                    </div>
                                </>
                            )}
                        </div>
                        <hr className="flex my-4 border border-gray-400"/>
                        {/* Product Details */}
                        <div className="flex items-center space-x-4">
                            <div>
                                <p className="text-white text-sm">SKU: </p>
                                <p className="text-white text-sm">Condition: </p>
                                <p className="text-white text-sm">Weight: </p>
                                <p className="text-white text-sm">Gift wrapping: </p>
                                <p className="text-white text-sm">Shipping: </p>
                                <p className="text-white text-sm">Wine Vintage: </p>
                            </div>
                            <div>
                                <p className="pl-6 text-stone-400 text-sm">{product?.sku || "N/A"}</p>
                                <p className="pl-6 text-stone-400 text-sm">{product?.condition || "N/A"}</p>
                                <p className="pl-6 text-stone-400 text-sm">{product?.weight || "N/A"}</p>
                                <p className="pl-6 text-stone-400 text-sm">{product?.giftWrapping || "N/A"}</p>
                                <p className="pl-6 text-stone-400 text-sm">{product?.shipping || "N/A"}</p>
                                <p className="pl-6 text-stone-400 text-sm">{product?.vintage || "N/A"}</p>
                            </div>
                        </div>
                        <hr className="flex my-4 border border-gray-400"/>
                        <p className="text-white text-sm">Current Stock: <span className="ml-2">{product?.stock}</span></p>
                        <div className="text-white">
                            <p className="mb-2 text-sm">Quantity:</p>
                            {/* Cart */}
                            <div className="flex items-center gap-4">
                                {/* Quantity Controls */}
                                <div className="flex items-center gap-2">
                                    <div className="border border-gray-400 rounded px-3 py-1 text-center w-16 text-white">
                                        {currentQty}
                                    </div>
                                    <div className="flex flex-col justify-center gap-1">
                                    <FaChevronUp 
                                        disabled={loadingItem === product?._id}
                                        onClick={() => handleUpdateCart(product?._id, currentQty + 1)}
                                        className="cursor-pointer text-white hover:text-blue-400" 
                                    />
                                    <FaChevronDown 
                                        disabled={loadingItem === product?._id}
                                        onClick={() =>{
                                            if (currentQty > 1) {
                                                handleUpdateCart(product?._id, currentQty - 1);
                                            }
                                        }}
                                        className="cursor-pointer text-white hover:text-blue-400" 
                                    />
                                    </div>
                                </div>

                                {/* Add to Cart Button */}
                                <button 
                                    onClick={() => handleAddToCart(product._id)}
                                    className="bg-orange-600 text-white px-4 py-2 rounded-lg hover:bg-orange-700 transition duration-200">
                                    Add to Cart
                                </button>
                            </div>
                        </div>
                        {/* Wishlist */}
                        <div 
                            onClick={(e) =>{
                                e.stopPropagation();
                                handleAddToWishlist(product._id)
                            }}
                            className="mt-4 text-stone-400 text-sm flex items-center gap-2 cursor-pointer">
                            <span>Add to Wishlist</span>
                            <button className="text-white hover:text-red-500 text-base">
                                <FontAwesomeIcon icon={faHeart} />
                            </button>
                        </div>
                        {/* Product images */}
                        <div className="mt-4 overflow-x-auto flex gap-2">
                            {product?.images?.map((img, i) => (
                                <img
                                    key={i}
                                    src={`${BASE_IMAGE_URL}/${img}`}
                                    alt={`${product.name} image ${i + 1}`}
                                    className="w-20 h-auto object-contain rounded cursor-pointer hover:scale-110 transition-transform duration-300"
                                />
                            ))}
                        </div>
                        
                    </div>
                </div>
                <div className="flex flex-col w-[90%] mx-auto py-4 border border-gray-700 rounded-lg shadow p-8">
                    <h2 className="text-white text-lg font-semibold">Product Description</h2>
                    <hr className="flex my-6 border border-gray-400"/>
                    <p className="text-stone-400 text-sm">
                        {product?.description}
                    </p>
                </div>
            </div>
            
        </div>
        <ReviewList />
        <RelatedProducts />
        </>
        
    );
}