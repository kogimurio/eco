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
  const [errors, setErrors] = useState([]);
  const [addressSaved, setAddressSaved] = useState(false);

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
          user: user.firstName,
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
          console.error("Something went wrong:", error.response?.data?.message || error.message || error.toString());
        }
      }
      fetchAddress();
    },[])

    const handleChange = (e) => {
      setFormData({...formData, [e.target.name]: e.target.value});
    }



    const subtotal = cartItems.reduce((total, item) => {
      return total + (item.product?.price ? item.product.price * item.quantity : 0);
    }, 0);

    const validateForm = () => {
      const newErrors = {};

      if (!formData.phone.trim()) {
        newErrors.phone = "Phone number is required";
      } else if (!/^(07\d{8}|01[01]\d{7}|\+254\d{9})$/.test(formData.phone)) {
        newErrors.phone = "Enter a validate phone number";
      }

      if (!formData.addressLine.trim()) {
        newErrors.addressLine = "Street address is required";
      }

      if (!formData.city.trim()) {
        newErrors.city = "City is required";
      }

      if (!formData.postalCode.trim()) {
        newErrors.postalCode = "Postcode is required";
      }

      if (!formData.country.trim()) {
        newErrors.country = "Please select your country";
      }

      setErrors(newErrors);
      return Object.keys(newErrors).length === 0; // true if no errors
    }

    const handleSubmit =async (e) => {
      e.preventDefault();

      if (!validateForm()) {
        toast.error("Please fix errors before submitting");
        return;
      }

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

        let response;

        if (address) {
          response = await axios.put(`${BASE_URL}/address`, payload, {
            headers: {
              Authorization: `Bearer ${token}`
            }
          });
          console.log("Update address:", response.data);
          toast.success("Address updated")
        } else {
          response = await axios.post(`${BASE_URL}/address`, payload)
          console.log(response.data);
          toast.success("Your address has been added")
        }

        setAddress(response.data.address);
        setAddressSaved(true);
        
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

    const isAddressSavedAndComplete = () => {
      return (
        address &&
        address.phone?.trim() !== '' &&
        address.addressLine?.trim() !== '' &&
        address.city?.trim() !== '' &&
        address.postalCode?.trim() !== '' &&
        address.country?.trim() !== ''
      );
    };

    
  return (
    <div className="bg-gray-900 text-white min-h-screen p-6">
      <h2 className="text-2xl font-semibold mb-6">Checkout</h2>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Shipping Info */}
        <div className="lg:col-span-2 bg-gray-800 p-6 rounded-lg shadow-md space-y-4">
          <h3 className="text-lg font-semibold">Shipping Information</h3>
          <div className="lg:col-span-2 bg-gray-800 p-6 rounded-lg shadow-md">
            
            <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <input
                  type="text"
                  name="user"
                  value={user.firstName}
                  disabled
                  onChange={handleChange}
                  placeholder="Full Name"
                  className="p-3 bg-gray-700 rounded text-white placeholder-gray-400 w-full"
                />
              </div>
              <div>
                <input
                  type="email"
                  name="email"
                  value={user.email}
                  disabled
                  onChange={handleChange}
                  placeholder="Email Address"
                  className="p-3 bg-gray-700 rounded text-white placeholder-gray-400 w-full"
                />
              </div>
              <div>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="Phone Number"
                  className="p-3 bg-gray-700 rounded text-white placeholder-gray-400 w-full"
                />
                {errors.phone && <p className="text-red-500 text-sm">{errors.phone}</p>}
              </div>
              <div>
                <input
                  type="text"
                  name="addressLine"
                  value={formData.addressLine}
                  onChange={handleChange}
                  placeholder="Street Address"
                  className="p-3 bg-gray-700 rounded text-white placeholder-gray-400 w-full"
                />
                {errors.addressLine && <p className="text-red-500 text-sm">{errors.addressLine}</p>}
              </div>
              <div>
                <input
                  type="text"
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                  placeholder="City"
                  className="p-3 bg-gray-700 rounded text-white placeholder-gray-400 w-full"
                />
                {errors.city && <p className="text-red-500 text-sm">{errors.city}</p>}
              </div>
              <div>
                <input
                  type="text"
                  name="postalCode"
                  value={formData.postalCode}
                  onChange={handleChange}
                  placeholder="Postal Code"
                  className="p-3 bg-gray-700 rounded text-white placeholder-gray-400 w-full"
                />
                {errors.postalCode && <p className="text-red-500 text-sm">{errors.postalCode}</p>}
              </div>
              <div>
                <select
                  name="country"
                  value={formData.country}
                  onChange={handleChange}
                  className="p-3 bg-gray-700 rounded text-white placeholder-gray-400 col-span-1 md:col-span-2 w-full"
                >
                  <option value="">Select Country</option>
                  <option value="Kenya">Kenya</option>
                  <option value="USA">USA</option>
                  <option value="UK">UK</option>
                </select>
                {errors.country && <p className="text-red-500 text-sm">{errors.country}</p>}
              </div>
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
            <span>${subtotal.toFixed(2)}</span>
          </div>
          <div className="flex justify-between">
            <span>Shipping</span>
            <span>Free</span>
          </div>
          <div className="flex justify-between font-bold text-lg">
            <span>Total</span>
            <span>${subtotal.toFixed(2)}</span>
          </div>

          {isAddressSavedAndComplete() ? (
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
          ) : (
            <p className="text-yellow-400 text-sm text-center mt-4">
              🚫 Please fill out your shipping address to enable payment options.
            </p>
          )}
        </div>
            {showModal && <PaymentModal type={selectedMethod} onClose={closeModal} />}
      </div>
    </div>
  );
}

