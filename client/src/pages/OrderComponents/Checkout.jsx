import { useNavigate } from "react-router-dom";
import { useEffect, useState } from 'react';
import { useCart } from '../../context/CartContext';
import axios from 'axios';
import { toast } from 'react-toastify';
import PaymentModal from './PaymentModal';


const BASE_URL = process.env.REACT_APP_BASE_URL;

const localToken = localStorage.getItem('token');
const token = JSON.parse(localToken);

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
  const [showModal, setShowModal] = useState(false);
  const [selectedMethod, setSeletedMethod] = useState(null);
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
          });
          setAddress(res.data.address);
          console.log("Updated Address:", res.data.address);
          setFormData((prev) => ({
            ...prev,
            phone: res.data.address.phone || '',
            addressLine: res.data.address.addressLine || '',
            city: res.data.address.city || '',
            postalCode: res.data.address.postalCode || '',
            country: res.data.address.country || '',
          }));
        } catch (error) {
          console.error("Failed to fetch address:", error.res.data.message || error.message);
        }
      }
      fetchAddress();
    },[])

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
        postalCode: formData.postalCode,
        country: formData.country
      };

      try {
        setLoading(true);

        if (address) {
          const response = await axios.put(`${BASE_URL}/address`, payload, {
            headers: {
              Authorization: `Bearer ${token}`
            }
          });
          console.log("Update address:", response.data);
          toast.success("Address updated")
        } else {
          const response = await axios.post(`${BASE_URL}/address`, payload)
          setFormData({
            user: '',
            phone: '',
            addressLine: '',
            city: '',
            postalCode: '',
            country: ''
          });
          console.log(response.data);
          toast.success("Your address has been added")
        }
        
      } catch (error) {
        toast.error("Internal server error")
        console.error(error.response.data || error.message);
      }
    }

    const openPaymentModal = (method) => {
      setSeletedMethod(method);
      setShowModal(true);
    }

    const closeModal = () => {
      setShowModal(false);
      setSeletedMethod(null)
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
                value={formData.postalCode}
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
                Save
              </button>
            </form>
          </div>
        </div>

        {/* Order Summary & Payments */}
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
          <div className="bg-gray-800 text-white w-full max-w-md rounded-lg shadow-lg p-6 space-y-6">
            <h2 className="text-2xl font-semibold text-center uppercase tracking-wide">Select Payment</h2>

            {/* Mpesa Option */}
            <button 
              onClick={() => openPaymentModal('mpesa')}
              className="w-full flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-4 rounded transition duration-200">
              <img src="/mpesa.jpg" alt="Mpesa" className="w-6 h-6 rounded" />
              Pay with M-PESA
            </button>

            {/* Divider */}
            <div className="flex items-center justify-between text-gray-400">
              <hr className="w-1/3 border-gray-600" />
              <span className="text-sm">or</span>
              <hr className="w-1/3 border-gray-600" />
            </div>

            {/* PayPal Option */}
            <button 
              onClick={() => openPaymentModal('paypal')}
              className="w-full flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-4 rounded transition duration-200">
              <img src="https://upload.wikimedia.org/wikipedia/commons/b/b5/PayPal.svg" alt="PayPal" className="w-6 h-6" />
              Pay with PayPal
            </button>
          </div>
        </div>
        {showModal && <PaymentModal type={selectedMethod} onClose={closeModal} />}
      </div>
    </div>
  );
}
