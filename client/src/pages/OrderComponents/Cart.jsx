import { useNavigate } from "react-router-dom";
import { useEffect, useState } from 'react';
import LoadingSpinner from "../LoadingSpinner";
import { toast } from 'react-toastify';
import axios from 'axios';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart, faBagShopping, faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import { FaEye } from 'react-icons/fa';
import { useCart } from '../../context/CartContext';

const BASE_URL = process.env.REACT_APP_BASE_URL;
const BASE_IMAGE_URL = process.env.REACT_APP_BASE_URL_IMAGE;

const token = JSON.parse(localStorage.getItem('token'));

export default function Cart() {
  const { addToCart, cartItems, loadingCart, updateCartItem, removeFromCart } = useCart();
    const [loadingItem, setLoadingItem] = useState(null)
    const [wishlistProducts, setWishlistProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
      const fetchCart = async () => {
        try {
            await fetchCart();
        } catch (error) {
          console.error("Error fetching cart:", error);
        } finally {
          setLoadingItem(false);
        }
      }
      fetchCart()
    }, []);

    useEffect(() => {
      const fetchWishlist = async () => {
        try {
          const res = await axios.get(`${BASE_URL}/wishlist`, {
            headers: {
              Authorization: `Bearer ${token}`
            }
          });
          setWishlistProducts(res.data.wishlist?.products || []);
        } catch (error) {
          toast.error("Error:", error);
        } finally {
          setLoading(false);
        }
      }

      fetchWishlist();
    }, [token]);

    const handleAddToCart = async (prodctId) => {
        await addToCart(prodctId, 1);
        toast.success('Product added to cart');
    };

    const handleUpdateCart = async (productId, newQuatity) => {
      setLoadingItem(productId);
      try {
        await updateCartItem(productId, newQuatity)
      } catch (error) {
        console.error("Error updating cart:", error.response?.data?.message || error.message );
        toast.error("Error updating cart")
      } finally {
        setLoadingItem(null);
      }
    }

    const handleCartRemove = async (productId) => {
      setLoadingItem(productId);
      try {
        await removeFromCart(productId);
        toast.success("Product removed from your cart")
      } catch (error) {
        console.error("Error delete product:", error.response?.data?.message || error.message );
        toast.error("Error delete product")
      } finally {
        setLoadingItem(null);
      }
    }

    

  const subtotal = cartItems.reduce((total, item) => {
    return total + (item.product?.price ? item.product.price * item.quantity : 0);
  }, 0);

  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  const handleCheckout = () => {
    navigate("/checkout")
  }

  const productDetail = (slug) => {
      navigate(`/productdetail/${slug}`);
  }
  if (loadingItem) {
    return (
      <div className="flex justify-center">
        <LoadingSpinner />
      </div>
    )
  } 

  return (
    <div className="bg-gray-900 text-white min-h-screen p-6">
      <h2 className="text-2xl font-semibold mb-6 text-gray-200">Your Shopping Cart <span className="text-orange-500">({totalItems} {totalItems === 1 ? "item" : "items"} )</span></h2>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Cart Items */}
        {!loadingItem && cartItems.length === 0 ? (
          <div className="min-h-40 flex items-center justify-center text-white bg-gray-900 p-10 w-full lg:col-span-2">
            <div className="text-center space-y-4">
              <h2 className="text-2xl font-bold">🛒 Your cart is empty</h2>
              <p className="text-gray-400">Looks like you haven't added anything yet.</p>
              <button
                onClick={() => navigate('/')}
                className="px-6 py-2 bg-orange-600 hover:bg-orange-700 rounded"
              >
                Go Shopping
              </button>
            </div>
          </div>
        ) : (
          <div className="lg:col-span-2 space-y-4">
          {cartItems.map((item) => (
            <div key={item._id} className="flex items-center justify-between bg-gray-800 rounded-lg p-4 shadow-md">
              <div className="flex items-center gap-4">
                <img src={`${BASE_IMAGE_URL}/${item.product.thumbnail}`} alt={item.product.name} className="w-16 h-16 rounded-lg object-cover" />
                <div>
                  <h4 className="text-lg font-semibold">{item.product.name}</h4>
                  <p className="text-gray-400">{item.product?.price ? `$${item.product.price.toFixed(2)}` : "Price not available"}</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="flex items-center border border-gray-700 rounded">
                  <button 
                    disabled={loadingItem === item.product._id}
                    onClick={() =>{
                      if (item.quantity > 1) {
                        handleUpdateCart(item.product._id, item.quantity - 1);
                      }
                    }}
                    className="px-3 py-1 hover:bg-gray-700"
                  >
                    {loadingItem === item.product._id ?  <LoadingSpinner size='12' /> : '-'}
                  </button>
                  <span className="px-4">{item.quantity}</span>
                  <button 
                    disabled={loadingItem === item.product._id}
                    onClick={() => handleUpdateCart(item.product._id, item.quantity + 1)}
                    className="px-3 py-1 hover:bg-gray-700"
                  >
                    {loadingItem === item.product._id ? <LoadingSpinner size='12' /> : '+'}
                  </button>
                </div>
                <button 
                  disabled={loadingItem === item.product._id}
                  onClick={() => handleCartRemove(item.product._id)}
                  className="text-red-500 hover:underline text-sm">
                    {loadingItem === item.product._id ? <LoadingSpinner size='12' /> : 'Remove'}
                </button>
              </div>
            </div>
          ))}
        </div>
        )}
        

        {/* Summary */}
        <div className="bg-gray-800 rounded-lg p-6 shadow-md">
          <h3 className="text-lg font-semibold mb-4">Order Summary</h3>
          <div className="flex justify-between mb-2">
            <span className="text-gray-400">Subtotal</span>
            <span>${subtotal.toFixed(2)}</span>
          </div>
          <div className="flex justify-between mb-4">
            <span className="text-gray-400">Shipping</span>
            <span>Free</span>
            {/* {cartItems.map((shipping, id) => (
              <span key={id}>{shipping.product?.shipping}</span>
            ))} */}
          </div>
          <hr className="border-gray-700 mb-4" />
          <div className="flex justify-between font-bold text-lg">
            <span>Total</span>
            <span>${subtotal.toFixed(2)}</span>
          </div>
          <button 
            className={`mt-6 w-full py-2 rounded text-white font-semibold transition ${
              cartItems.length === 0 ? 'bg-gray-500 cursor-not-allowed' : 'bg-orange-600 hover:bg-orange-700'
            }`}
            onClick={handleCheckout}
            disabled={cartItems.length === 0}
          >
            Proceed to Checkout
          </button>
        </div>
      </div>
      <div className="bg-gray-900 text-white p-6">
            <div className="max-w-6xl mx-auto">
              <h2 className="text-2xl font-bold text-orange-500 mb-6">My Wishlist</h2>
      
              {!token ? (
                <p className="text-center text-gray-400"><a href='/login' className='text-blue-400 underline'>Login</a> to Add to wishlist.</p>
              ) : (
                wishlistProducts.length === 0 ? (
                  <p className="text-center text-gray-400">Your wishlist is empty.</p>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {wishlistProducts.map(item => (
                      <div
                        key={item.id}
                        className="bg-gray-800 rounded-lg shadow p-4 flex flex-col space-y-3"
                      >
                        <img
                          src={`${BASE_IMAGE_URL}/${item.thumbnail}`}
                          alt={item.name}
                          className="w-full h-40 object-cover rounded"
                        />
                        <h3 className="text-lg font-semibold">{item.name}</h3>
                        <p className="text-orange-400 font-bold">{item.price}</p>
                        <div className="flex justify-between items-center mt-auto">
                          <button 
                            onClick={(e) =>{
                                e.stopPropagation()
                                productDetail(item.slug)
                            }}
                            className="text-sm bg-blue-600 hover:bg-blue-700 text-white px-4 py-1 rounded flex items-center gap-2">
                            <FaEye /> View
                          </button>
                          <button 
                            onClick={() => handleAddToCart(item._id)}
                            className="text-sm bg-orange-600 hover:bg-orange-700 text-white px-8 py-2 rounded flex items-center gap-2">
                            <FontAwesomeIcon icon={faShoppingCart} />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )
              )}
            </div>
          </div>
    </div>
  );
}
