import { useNavigate } from "react-router-dom";
import { useEffect, useState } from 'react';
import { useCart } from '../../context/CartContext';
import axios from 'axios';

const BASE_URL = process.env.REACT_APP_BASE_URL;
const token = JSON.parse(localStorage.getItem('token'));

export default function Checkout() {
  const [formData, setFormData] = useState({
    user: '',
    email: '',
    phone: '',
    addressLine: '',
    city: '',
    postalCode: '',
    country: ''
  });
  const [address, setAddress] = useState(null);
  const user = JSON.parse(localStorage.getItem('user'));
    const navigate = useNavigate(); 
    const { cartItems } = useCart();
    const [loadingItem, setLoadingItem] = useState(null)
    const [loading, setLoading] = useState(false);

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
      if (user) {
        setFormData((prev) => ({
          ...prev,
          user: user.firName,
          email: user.email,
        }))
      }
    }, [user]);

    useEffect(() => {
      const fetchAddress = async () => {
        try {
          const res = await axios.get(`${BASE_URL}/address`, {
            headers: {
              Authorization: `Bearer ${token}`
            }
          })
          setAddress(res.data.address);
          console.log("Updated Address:", res.data.address);
          setFormData((prev) => ({
            ...prev,
            phone: res.data.address.phone || '',
            addressLine: res.data.addressLine.addressLine || '',
            city: res.data.city.city || '',
            postalCode: res.data.postalCode.postalCode || '',
            country: res.data.country.country || '',
          }));
        } catch (error) {
          console.error("Failed to fetch address:", error.res.data.message || error.message);
        }
      }
      fetchAddress();
    })

    const handleChange = (e) => {
      setFormData({...formData, [e.target.name]: e.target.value});
    }

    const handleThankYou = () => {
        navigate('/order_confirmation')
    }

    const subtotal = cartItems.reduce((total, item) => {
      return total + (item.product?.price ? item.product.price * item.quantity : 0);
    }, 0);

    const handleSubmit =async (e) => {
      e.preventDefault();

      const payload = {
        user: user.id,
        email: user.email,
        phone: formData.phone,
        addressLine: formData.addressLine,
        city: formData.city,
        postalCode: formData.postalcode,
        country: formData.country
      };

      try {
        setLoading(true);
        const response = await axios.post(`${BASE_URL}/address`, payload)
        setFormData({
          user: '',
          phone: '',
          addressLine: '',
          city: '',
          postalcode: '',
          country: ''
        });
        console.log(response.data);
        navigate('/payments');
      } catch (error) {
        console.error(error.response.data || error.message);
      }
    }
  return (
    <div className="bg-gray-900 text-white min-h-screen p-6">
      <h2 className="text-2xl font-semibold mb-6">Checkout</h2>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Shipping Info */}
        <div className="lg:col-span-2 bg-gray-800 p-6 rounded-lg shadow-md space-y-4">
          <h3 className="text-lg font-semibold">Shipping Information</h3>
          <div className="lg:col-span-2 bg-gray-800 p-6 rounded-lg shadow-md">
            
            <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                type="text"
                name="user"
                value={user.firstName}
                disabled
                onChange={handleChange}
                placeholder="Full Name"
                className="p-3 bg-gray-700 rounded text-white placeholder-gray-400 w-full"
              />
              <input
                type="email"
                name="email"
                value={user.email}
                disabled
                onChange={handleChange}
                placeholder="Email Address"
                className="p-3 bg-gray-700 rounded text-white placeholder-gray-400 w-full"
              />
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="Phone Number"
                className="p-3 bg-gray-700 rounded text-white placeholder-gray-400 w-full"
              />
              <input
                type="text"
                name="addressLine"
                value={formData.addressLine}
                onChange={handleChange}
                placeholder="Street Address"
                className="p-3 bg-gray-700 rounded text-white placeholder-gray-400 w-full"
              />
              <input
                type="text"
                name="city"
                value={formData.city}
                onChange={handleChange}
                placeholder="City"
                className="p-3 bg-gray-700 rounded text-white placeholder-gray-400 w-full"
              />
              <input
                type="text"
                name="postalcode"
                value={formData.postalcode}
                onChange={handleChange}
                placeholder="Postal Code"
                className="p-3 bg-gray-700 rounded text-white placeholder-gray-400 w-full"
              />
              <select
                name="country"
                value={formData.country}
                onChange={handleChange}
                className="p-3 bg-gray-700 rounded text-white placeholder-gray-400 col-span-1 md:col-span-2"
              >
                <option value="">Select Country</option>
                <option value="Kenya">Kenya</option>
                <option value="USA">USA</option>
                <option value="UK">UK</option>
              </select>

              <button
                type="submit"
                className="mt-2 md:col-span-2 w-full bg-orange-600 hover:bg-orange-700 py-2 rounded text-white font-semibold transition"
              >
                Continue to Payment
              </button>
            </form>
          </div>
        </div>

        {/* Order Summary */}
        <div className="bg-gray-800 p-6 rounded-lg shadow-md space-y-4">
          <h3 className="text-lg font-semibold">Order Summary</h3>
          <div className="flex justify-between">
            <span>Subtotal</span>
            <span>{subtotal}</span>
          </div>
          <div className="flex justify-between">
            <span>Shipping</span>
            <span>Free</span>
          </div>
          <div className="flex justify-between font-bold text-lg">
            <span>Total</span>
            <span>{subtotal}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
