import { useParams } from "react-router-dom";
import { useState, useEffect } from 'react';
import axios from 'axios';
import LoadingSpinner from '../LoadingSpinner';
import { toast } from 'react-toastify';

import { useAdmin } from '../../context/AdminContext';

const BASE_URL = process.env.REACT_APP_BASE_URL;
const localToken = localStorage.getItem('token');
const token = JSON.parse(localToken);

export default function ClientOrderView() {
  const { fetchOrders } = useAdmin();
  const [orderItems, setOrderItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const { id } = useParams();
  const [address, setAddress] = useState(null);

  const fetchOrderItems = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/orders/order_items/${id}`);
      setOrderItems(response.data.orderItems || []);
      setAddress(response.data.address);
      console.log("Order ID:", id);
    } catch (error) {
      console.error(error.response?.data?.message || error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrderItems();
  }, [id]);



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

  const handleStatusChange =async (newStatus) => {
    try {
      await axios.put(`${BASE_URL}/orders/${order._id}/status`, 
        { status: newStatus}, 
          {
            headers: {
              Authorization: `Bearer ${token}`
            }
        });
      toast.success(`Order marked as ${newStatus}`);
      await fetchOrderItems();
      fetchOrders();
    } catch (error) {
      toast.error("Failed to update order status");
    }
  };
  


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
          <p><span className="font-medium text-white">Payment:</span> Mpesa</p>
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

      <section className="bg-gray-800 p-6 rounded-lg shadow-md">
        <h3 className="text-lg font-semibold mb-4">Actions</h3>
        <div className="flex flex-wrap gap-4">
          <button
            onClick={() => handleStatusChange('cancelled')}
            className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded"
          >
            Cancel Order
          </button>
        </div>
      </section>
    </div>
  );
}
