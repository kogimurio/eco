import { useParams } from "react-router-dom";
import { useState, useEffect } from 'react';
import axios from 'axios';
import LoadingSpinner from '../LoadingSpinner';

const BASE_URL = process.env.REACT_APP_BASE_URL;

export default function ViewOrder() {
  const [orderItems, setOrderItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const { id: orderId } = useParams();
  const [address, setAddress] = useState(null);

  useEffect(() => {
    const fetchOrderItems = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/orders/order_items/${orderId}`);
        setOrderItems(response.data.orderItems || []);
        setAddress(response.data.address);
        console.log(response.data.orderItems);
      } catch (error) {
        console.error(error.response?.data?.message || error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchOrderItems();
  }, [orderId]);



  if (loading) {
    return (
      <div className="flex justify-center pt-4">
        <LoadingSpinner />
      </div>
    )
  }
    

  if (!orderItems || orderItems.length === 0) {
    return (
      <div className="text-white p-6">
        <h2 className="text-2xl font-semibold mb-4">Order Not Found</h2>
        <p className="text-gray-400">No order items were found for this order ID.</p>
      </div>
    );
  }

  // Use first item to access shared order data
  const order = orderItems[0]?.order || {};
  const createdAt = new Date(orderItems[0]?.createdAt).toLocaleDateString();
  const total = orderItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div className="bg-gray-900 text-white p-6 min-h-screen">
      <h2 className="text-2xl font-semibold mb-6">Order Details</h2>

      {/* Order Summary */}
      <section className="bg-gray-800 p-6 rounded-lg shadow-md mb-6">
        <h3 className="text-lg font-semibold mb-4">Order Summary</h3>
        <div className="grid md:grid-cols-2 gap-4 text-sm text-gray-300">
          <p><span className="font-medium text-white">Order ID:</span> {order?._id}</p>
          <p><span className="font-medium text-white">Date:</span> {createdAt}</p>
          <p><span className="font-medium text-white">Status:</span> {order?.status}</p>
          <p><span className="font-medium text-white">Total:</span> ${total.toFixed(2)}</p>
          <p><span className="font-medium text-white">Payment:</span> Credit Card</p>
        </div>
      </section>

      {/* Customer Info (Static for now) */}
      <section className="bg-gray-800 p-6 rounded-lg shadow-md mb-6">
        <h3 className="text-lg font-semibold mb-4">Customer Information</h3>
        <div className="grid md:grid-cols-2 gap-4 text-sm text-gray-300">
          <p><span className="font-medium text-white">Name:</span> {order.user.firstName}</p>
          <p><span className="font-medium text-white">Email:</span> {order.user.email}</p>
          <p><span className="font-medium text-white">Phone:</span> {address.phone}</p>
          <p><span className="font-medium text-white">Address:</span> {address.postalCode}, {address.addressLine} {address.city}, {address.country}</p>
        </div>
      </section>

      {/* Ordered Items */}
      <section className="bg-gray-800 p-6 rounded-lg shadow-md mb-6">
        <h3 className="text-lg font-semibold mb-4">Ordered Items</h3>
        <div className="space-y-4 text-sm text-gray-300">
          {orderItems.map((item, idx) => (
            <div key={idx} className="flex justify-between border-b border-gray-700 pb-2">
              <span>{item.product?.name} (x{item.quantity})</span>
              <span>${(item.price * item.quantity).toFixed(2)}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Admin Actions */}
      <section className="bg-gray-800 p-6 rounded-lg shadow-md">
        <h3 className="text-lg font-semibold mb-4">Actions</h3>
        <div className="flex gap-4">
          <button className="bg-green-600 hover:bg-green-700 px-4 py-2 rounded">
            Mark as Delivered
          </button>
          <button className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded">
            Print Invoice
          </button>
          <button className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded">
            Cancel Order
          </button>
        </div>
      </section>
    </div>
  );
}
