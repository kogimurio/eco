import { useState, useEffect } from 'react';
import { FaTrash, FaEye } from 'react-icons/fa';
import axios from 'axios';
import LoadingSpinner from '../LoadingSpinner';
import { toast } from 'react-toastify';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';

import { useCart } from '../../context/CartContext';

const BASE_URL = process.env.REACT_APP_BASE_URL;
const BASE_IMAGE_URL = process.env.REACT_APP_BASE_URL_IMAGE;

export default function WishList() {
  const { addToCart } = useCart();
  const [wishlistProducts, setWishlistProducts] = useState([]);
  const localToken = localStorage.getItem('token');
  const token = JSON.parse(localToken);
  const [loading, setLoading] = useState(true);

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

  const removeFromWishlist = async (productId) => {
    const confirmDelete = window.confirm("Are you sure you want to remove this product from your wishlist");
    if (!confirmDelete) return;
    try {
        await axios.delete(`${BASE_URL}/wishlist/${productId}`, {
            headers: {
              Authorization: `Bearer ${token}`
            }
      });
      setWishlistProducts((prevWishlist)=>
      prevWishlist.filter((item) => item._id !== productId));
      toast.success("Product has been removed from your wishlist")
    } catch (error) {
      toast.error("Error removing item:", error);
    }
  };

  const handleAddToCart = async (prodctId) => {
        await addToCart(prodctId, 1);
        toast.success('Product added to cart');
    };

  if (loading) {
    return <LoadingSpinner />
  }

  return (
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
                    <button className="text-sm bg-blue-600 hover:bg-blue-700 text-white px-4 py-1 rounded flex items-center gap-2">
                      <FaEye /> View
                    </button>
                    <button
                      onClick={() => removeFromWishlist(item._id)}
                      className="text-sm bg-red-600 hover:bg-red-700 text-white px-4 py-1 rounded flex items-center gap-2"
                    >
                      <FaTrash /> Remove
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
  );
}
