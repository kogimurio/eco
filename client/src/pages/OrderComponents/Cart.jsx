import { useNavigate } from "react-router-dom";
import { useEffect, useState } from 'react';
import axios from 'axios';
import LoadingSpinner from "../LoadingSpinner";

const BASE_URL = process.env.REACT_APP_BASE_URL;

const BASE_IMAGE_URL = process.env.REACT_APP_BASE_URL_IMAGE;


export default function Cart() {
    const [cartItems, setCartItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
    const localToken = localStorage.getItem('token');
    const token = JSON.parse(localToken);

    useEffect(() => {
      const fetchCart = async () => {
        try {
            const res = await axios.get(`${BASE_URL}/cart`, {
            headers: {
              Authorization: `Bearer ${token}`
            }
          });
          setCartItems(res.data.cart.items);
        } catch (error) {
          console.error("Error fetching cart:", error);
        } finally {
          setLoading(false);
        }
      }
      fetchCart()
    }, [token]);

    

  const subtotal = cartItems.reduce((total, item) => {
    return total + (item.product?.price ? item.product.price * item.quantity : 0);
  }, 0);

  const handleCheckout = () => {
    navigate("/checkout")
  }
  if (loading) return <LoadingSpinner />

  return (
    <div className="bg-gray-900 text-white min-h-screen p-6">
      <h2 className="text-2xl font-semibold mb-6">Your Shopping Cart</h2>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Cart Items */}
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
                  <button className="px-3 py-1 hover:bg-gray-700">-</button>
                  <span className="px-4">{item.quantity}</span>
                  <button className="px-3 py-1 hover:bg-gray-700">+</button>
                </div>
                <button className="text-red-500 hover:underline text-sm">Remove</button>
              </div>
            </div>
          ))}
        </div>

        {/* Summary */}
        <div className="bg-gray-800 rounded-lg p-6 shadow-md">
          <h3 className="text-lg font-semibold mb-4">Order Summary</h3>
          <div className="flex justify-between mb-2">
            <span className="text-gray-400">Subtotal</span>
            <span>${subtotal.toFixed(2)}</span>
          </div>
          <div className="flex justify-between mb-4">
            <span className="text-gray-400">Shipping</span>
            {cartItems.map((shipping, id) => (
              <span key={id}>{shipping.product?.shipping}</span>
            ))}
          </div>
          <hr className="border-gray-700 mb-4" />
          <div className="flex justify-between font-bold text-lg">
            <span>Total</span>
            <span>${subtotal.toFixed(2)}</span>
          </div>
          <button 
            className="mt-6 w-full bg-orange-600 hover:bg-orange-700 py-2 rounded text-white font-semibold transition cursor-pointer"
            onClick={handleCheckout}
        >
            Proceed to Checkout
          </button>
        </div>
      </div>
    </div>
  );
}
