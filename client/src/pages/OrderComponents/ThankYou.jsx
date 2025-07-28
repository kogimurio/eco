import { useState, useEffect } from 'react'
import axios from 'axios';

const BASE_URL = process.env.REACT_APP_BASE_URL;
const localToken = localStorage.getItem('token');
const token = JSON.parse(localToken);

export default function OrderConfirmation() {
  const [address, setAddress] = useState(null);
  const [order, setOrder] = useState(null);
  const user = JSON.parse(localStorage.getItem('user'));

  useEffect(() => {
    const fetchAddress = async () => {
      if (!token) return;

      try {
        const res = await axios.get(`${BASE_URL}/address`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });

        if (res.data?.success) {
          setAddress(res.data.address);
          console.log("✅ Address fetched:", res.data.address);
        } else {
          console.warn("⚠️ Address fetch failed:", res.data.message);
        }
      } catch (error) {
        console.error("❌ Failed to fetch address:", error.response?.data?.message || error.message);
      }
    };

    fetchAddress();
  }, []);

  useEffect(() => {
    const fetchOrder = async () => {
      if (!token) return;

      try {
        const res = await axios.get(`${BASE_URL}/orders`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });

        if (res.data?.success) {
          setOrder(res.data.order);
          console.log("✅ Order fetched:", res.data.order);
        } else {
          console.warn("⚠️ Order fetch failed:", res.data.message);
        }
      } catch (error) {
        console.error("❌ Failed to fetch Order:", error.response?.data?.message || error.message);
      }
    };

    fetchOrder();
  }, []);

  return (
    <div className="min-h-[80vh] bg-gray-900 text-white flex flex-col items-center justify-center p-8">
      <div className="bg-gray-800 rounded-lg p-8 shadow-lg max-w-xl w-full text-center">
        <h2 className="text-3xl font-bold text-green-400 mb-4">🎉 Thank You for Your Order!</h2>
        <p className="text-gray-300 mb-6">
          Your order has been placed successfully. You will receive a confirmation email shortly.
        </p>

        {/* Order Summary */}
        <div className="bg-gray-700 p-4 rounded-lg text-left space-y-2 mb-6">
          <p><span className="font-semibold text-gray-400">Order ID:</span>
            {order ? ` #${order._id.toString().slice(-6).toUpperCase()}` : " Loading..."}
          </p>
          <p><span className="font-semibold text-gray-400">Estimated Delivery:</span> 3–5 business days</p>
          <p><span className="font-semibold text-gray-400">Shipping To:</span> {order.user.firstName}, {address?.city || "N/A"}, {address?.country || "N/A"}</p>
        </div>

        <div className="flex justify-center gap-4">
          <a
            href="/"
            className="bg-orange-600 hover:bg-orange-700 px-6 py-2 rounded text-white font-medium transition"
          >
            Back to Home
          </a>
          <a
            href="/dashboard/order"
            className="bg-gray-600 hover:bg-gray-700 px-6 py-2 rounded text-white font-medium transition"
          >
            View My Orders
          </a>
        </div>
      </div>
    </div>
  );
}
