import axios from 'axios';
import  MinProductBar from '../ProductComponents/MinProductBar'
import { Link } from 'react-router-dom'
import { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import useResponsiveTextLength from "../../hooks/useResponsiveTextLength";
import RelatedProductCard from '../ProductComponents/RelatedProductCard';
import LoadingSpinner from '../LoadingSpinner';
import { toast } from 'react-toastify';
import { useCart } from '../../context/CartContext';
const BASE_URL = process.env.REACT_APP_BASE_URL;



export default function CategoryDetail() {
    const [loading, setLoading] = useState(true);
    const [products, setProducts] = useState([]);
    const maxChars = useResponsiveTextLength();
    const navigate = useNavigate();
    const localToken = localStorage.getItem('token');
    const token = JSON.parse(localToken);
    const { addToCart } = useCart();
    const [wishlistProducts, setWishlistProducts] = useState([]);

    // Fetch products
    useEffect(() => {
        const fetchProduct = async () => {
            await new Promise(res => setTimeout(res, 2000));
            try {
            const res = await axios.get(`${BASE_URL}/products/best-sellers`)
            setProducts(res.data.products)
           
            } catch (error) {
            console.error(error?.res?.data || error.message);
            } finally {
            setLoading(false)
            }
        };

        fetchProduct()
    }, [])

    const truncate = (text) => {
        return text.length > maxChars ? text.slice(0, maxChars) + "…" : text
    }

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
        <>
            <MinProductBar />
            <div className=" bg-gray-800 text-white">
                <div className="grid grid-cols-1 md:grid-cols-[1fr_3fr] w-[90%] mx-auto py-8">
                    <div className="grid grid-cols-1 p-4">
                        <div className="border border-gray-100 rounded p-2">
                            <h4 className="bg-gray-950 p-4 text-sm mb-3 rounded">FOOTWARE</h4>
                            <ul className="text-sm">
                                <li><Link to="*">Boots</Link></li>
                                <li><Link to="*">Cassette player</Link></li>
                                <li><Link to="*">Casual</Link></li>
                                <li><Link to="*">Ethic</Link></li>
                                <li><Link to="*">Sneakers</Link></li>
                            </ul>
                        </div>
                        <div className="border border-gray-100 rounded p-2 mt-8">
                            <h4 className="bg-gray-950 p-4 text-sm rounded">REFINE BY</h4>
                            <p className="p-2 tex-sm">No filters applied</p>
                            <hr className="my-2"/>
                            <h3 className="font-bold text-sm">Brand</h3>
                            
                            <ul className="text-sm">
                                <li>
                                    <input 
                                        type="checkbox"
                                        className="mx-4"
                                    />
                                    <span className="pr-2">Nike</span>(3)
                                </li>
                                <li>
                                    <input 
                                        type="checkbox"
                                        className="mx-4"
                                    />
                                    <span className="pr-2">Puma</span>(5)
                                </li>
                                <li>
                                    <input 
                                        type="checkbox"
                                        className="mx-4"
                                    />
                                    <span className="pr-2">Addidas</span>(1)
                                </li>
                            </ul>


                            <hr className="my-2"/>
                            <h3 className="font-bold text-sm">Colour</h3>
                            <ul className="text-sm">
                                <li>
                                    <input 
                                        type="checkbox"
                                        className="mx-4"
                                    />
                                    <span className="pr-2">Red</span>(3)
                                </li>
                                <li>
                                    <input 
                                        type="checkbox"
                                        className="mx-4"
                                    />
                                    <span className="pr-2">White</span>(8)
                                </li>
                                <li>
                                    <input 
                                        type="checkbox"
                                        className="mx-4"
                                    />
                                    <span className="pr-2">Yellow</span>(3)
                                </li>
                            </ul>

                            <hr className="my-2"/>
                            <h3 className="font-bold text-sm">Size</h3>
                            <ul className="text-sm">
                                <li>
                                    <input 
                                        type="checkbox"
                                        className="mx-4"
                                    />
                                    <span className="pr-2">S</span>(3)
                                </li>
                                <li>
                                    <input 
                                        type="checkbox"
                                        className="mx-4"
                                    />
                                    <span className="pr-2">M</span>(8)
                                </li>
                                <li>
                                    <input 
                                        type="checkbox"
                                        className="mx-4"
                                    />
                                    <span className="pr-2">L</span>(3)
                                </li>
                            </ul>
                            <hr className="my-2"/>
                            <h3 className="font-bold text-sm">Wine Vintage</h3>
                            <ul className="text-sm">
                                <li>
                                    <input 
                                        type="checkbox"
                                        className="mx-4"
                                    />
                                    <span className="pr-2">1990</span>(3)
                                </li>
                                <li>
                                    <input 
                                        type="checkbox"
                                        className="mx-4"
                                    />
                                    <span className="pr-2">2000</span>(8)
                                </li>
                                <li>
                                    <input 
                                        type="checkbox"
                                        className="mx-4"
                                    />
                                    <span className="pr-2">1890</span>(3)
                                </li>
                            </ul>
                            <hr className="my-2"/>
                            <h3 className="font-bold text-sm">Price</h3>
                            <ul className="text-sm">
                                <li className="grid grid-cols-3">
                                    <input 
                                        type="number"
                                        className="mx-4 rounded p-2"
                                        placeholder="Min."
                                    />
                                    <input 
                                        type="number"
                                        className="mx-4 rounded p-2"
                                        placeholder="Max."
                                    />
                                    <button type="submit" className='bg-gray-400 hover:bg-orange-600 rounded-full'>Update</button>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div className='grid grid-cols-1'>
                        <div className='flex justify-between items-center my-4 border border-gray-100 m-4 p-4 h-20 rounded-lg'>
                            <div>
                                <select className='rounded bg-gray-500 p-2 w-56'>
                                    <option>Sort By:</option>
                                    <option value="Best Seller">Best Seller</option>
                                    <option value="Best Seller">New</option>
                                    <option value="Best Seller">Featured</option>
                                </select>
                            </div>
                            <div className='space-x-2'>
                                <span className='bg-gray-950 rounded-full p-2 hover:bg-orange-700 cursor-pointer'>1</span>
                                <span className='bg-gray-950 rounded-full p-2 hover:bg-orange-700 cursor-pointer'>2</span>
                                <span className='bg-gray-950 rounded-full p-2 hover:bg-orange-700 cursor-pointer'>next</span>
                            </div>
                        </div>
                        <div className="bg-gray-800 mt-8 py-4 overflow-x-hidden">
                            
                                {loading ? (
                                    <div className="flex justify-center">
                                        <LoadingSpinner size="40" />
                                    </div>
                                ) : (
                                    <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-2 w-full mx-auto">
                                        {products.map((product, index) => (
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
                    </div>
                </div>
            </div>
        </>
    )
}