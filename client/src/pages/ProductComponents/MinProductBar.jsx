import { useNavigate, Link, useParams } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
const BASE_URL = process.env.REACT_APP_BASE_URL;



export default function MinProductBar() {
    const [product, setProduct] = useState(null);
    const [category, setCategory] = useState(null);
    const { slug } = useParams()
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate()

    const [itemsPerRow, setItemsPerRow] = useState(2);


    useEffect(() => {
        const handleSize = () => {
            const width = window.innerWidth;
            if (width < 768) {
                setItemsPerRow(1);
            } else {
                setItemsPerRow(2);
            }
        }
        handleSize();
        window.addEventListener("resize", handleSize);
        return () => window.removeEventListener("resize", handleSize);
    }, []);

    useEffect(() => {
        const fetchProduct = async() => {
            try {
                const res = await axios.get(`${BASE_URL}/products/${slug}`)
                setProduct(res.data.product)
                console.log("Response data:",res.data.product);
                console.log("Category slug:", res.data.product.category.slug);
            } catch (error) {
                console.error("Error in fetching product:", error);
            } finally {
                setLoading(false);
            }
            
        }
        if (product?.category?.slug) {
            console.log("Category ID:", product.category.slug);
        }

        fetchProduct();
        
    }, [slug])

    // Fetch Category
    useEffect(() => {
        const fetchCategory =async () => {
            if (!product?.category?.slug) return;
            try {
                const response = await axios.get(`${BASE_URL}/category/${product.category.slug}`)
                setCategory(response.data.category);
                
            } catch (error) {
                console.error("Failed to fetch caategory:", error.response?.message || error.message);
            }
        }

        fetchCategory();
    }, [product?.category?.slug]);

    return (
        <div className="bg-gray-700 w-full h-20">
            <div className="flex items-center justify-between w-[90%] mx-auto py-4">
                <div>
                    <p className='text-white'>{product?.name}</p>
                </div>
                <div>
                    <div className='flex flex-col md:flex-row items-center text-white'>
                        <div>
                            <a href='/' className='text-stone-300 text-xs'>Home /</a>
                            {product?.category?.slug && (
                                <Link 
                                    to={`/category/${product.category.slug}`} 
                                    className='text-stone-300 text-xs'
                                >
                                    {product.category.name} /
                                </Link>
                            )}
                        </div>
                         <div>
                            <p className="text-xs text-stone-300">
                                {product?.name}
                            </p>
                         </div>
                    </div>
                </div>
            </div>
        </div>
    )
}