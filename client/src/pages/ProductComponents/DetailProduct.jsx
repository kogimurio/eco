import { faStar as regularStar } from "@fortawesome/free-regular-svg-icons";
import { faStar as solidStar, faStarHalfStroke, faTrash  } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState, useEffect } from "react";
import MinTaskBar from "../HomeComponents/MinTaskBar";
import MinProductBar from "./MinProductBar"
import { FaPen, FaChevronDown, FaChevronUp } from "react-icons/fa";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import axios from 'axios';
import { useParams } from "react-router-dom";
import LoadingSpinner from "../LoadingSpinner";
import { toast } from 'react-toastify';

const BASE_URL = process.env.REACT_APP_BASE_URL;

const BASE_IMAGE_URL = process.env.REACT_APP_BASE_URL_IMAGE;

const localToken = localStorage.getItem('token')
const token = JSON.parse(localToken);

export default function DetailProduct() {
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const { slug } = useParams()
    

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

    const handleAddToCart = async () => {
        try {
                const quantity = 1;
                

            await axios.post(`${BASE_URL}/cart`, 
                {
                    productId: product._id,
                    quantity: quantity
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                })
            toast.success('Product added to cart')
        } catch (error) {
            console.error("Add to Cart Error:", error.response?.data?.message || error.message);
            toast.error("Error adding product")
        }
    }

    if (loading) {
        return <LoadingSpinner />
    };

    return (
        <>
        <MinTaskBar />
        <MinProductBar />
        <div className="bg-gray-800 py-4 min-h-screen">
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

                        <p className="py-3 text-white">{product?.price}</p>
                        <div className="flex text-yellow-400 pb-2">
                            <FontAwesomeIcon icon={solidStar} />
                            <FontAwesomeIcon icon={solidStar} />
                            <FontAwesomeIcon icon={solidStar} />
                            <FontAwesomeIcon icon={faStarHalfStroke} />
                            <FontAwesomeIcon icon={regularStar} />

                            <div className="w-px h-4 bg-stone-400 ml-2"></div>
                            <p className="text-stone-400 pl-2 text-xs">
                                No reviews yet 
                            </p>
                            <div className="w-px h-4 bg-stone-400 ml-2"></div>
                            <div className="flex items-center text-stone-400 pl-2 text-xs gap-1 cursor-pointer hover:text-blue-400">
                                <FaPen />
                                <span>Write a Review</span>
                            </div>
                            <div className="w-px h-4 bg-stone-400 ml-2"></div>
                            <div className="flex items-center text-stone-400 pl-2 text-xs gap-1 cursor-pointer hover:text-blue-400">
                                <FaPen />
                                <span>Edit</span>
                            </div>
                            <div className="w-px h-4 bg-stone-400 ml-2"></div>
                            <div className="flex items-center text-stone-400 pl-2 text-xs gap-1 cursor-pointer hover:text-blue-400">
                                <FontAwesomeIcon icon={faTrash} className="text-red-500 hover:text-red-700 cursor-pointer" />
                                <span>Delete</span>
                            </div>
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
                                <p className="pl-6 text-stone-400 text-sm">{product?.sku}</p>
                                <p className="pl-6 text-stone-400 text-sm">{product?.condition}</p>
                                <p className="pl-6 text-stone-400 text-sm">{product?.weight}</p>
                                <p className="pl-6 text-stone-400 text-sm">{product?.wrapping}</p>
                                <p className="pl-6 text-stone-400 text-sm">{product?.shipping}</p>
                                <p className="pl-6 text-stone-400 text-sm">{product?.vintage}</p>
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
                                        {product?.quatity}
                                    </div>
                                    <div className="flex flex-col justify-center gap-1">
                                        <FaChevronUp className="cursor-pointer text-white hover:text-blue-400" />
                                        <FaChevronDown className="cursor-pointer text-white hover:text-blue-400" />
                                    </div>
                                </div>

                                {/* Add to Cart Button */}
                                <button 
                                    onClick={handleAddToCart}
                                    className="bg-orange-600 text-white px-4 py-2 rounded-lg hover:bg-orange-700 transition duration-200">
                                    Add to Cart
                                </button>
                            </div>
                        </div>
                        {/* Wishlist */}
                        <div className="mt-4 text-stone-400 text-sm flex items-center gap-2 cursor-pointer">
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
        </>
        
    );
}