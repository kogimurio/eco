import { useParams } from "react-router-dom";
import { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import LoadingSpinner from '../LoadingSpinner';
import { toast } from 'react-toastify';

import { useAdmin } from '../../context/AdminContext';

const BASE_URL = process.env.REACT_APP_BASE_URL;
const localToken = localStorage.getItem('token');
const token = JSON.parse(localToken);

export default function ViewOrder() {
  const { fetchOrders } = useAdmin();
  const [orderItems, setOrderItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const { id } = useParams();
  const [address, setAddress] = useState(null);
  const invoiceRef = useRef();

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
  
  const printInvoice = () => {
    const printWindow = window.open('', '_blank', 'width=900,height=650');

    if (!printWindow) { 
      alert("Popup blocked! Please allow popups for this site.");
      return;
    }

    const itemRows = orderItems.map(item => `
      <tr>
        <td>${item.product?.name}</td>
        <td>${item.quantity}</td>
        <td>$${(item.price * item.quantity).toFixed(2)}</td>
      </tr>
    `).join('');

    const htmlContent = `
      <!DOCTYPE html>
      <html>
        <head>
          <title>Invoice - ${order?._id}</title>
          <style>
            body { font-family: sans-serif; padding: 20px; }
            h2 { margin-bottom: 10px; }
            table { width: 100%; border-collapse: collapse; margin-top: 20px; }
            th, td { border: 1px solid #ddd; padding: 8px; text-align: left; }
            th { background-color: #f4f4f4; }
          </style>
        </head>
        <body>
        <img src="https://fashionova-frontend.vercel.app/fashionova-preview.png" alt="Fashionova Logo" style="width: 120px; margin-bottom: 20px;"/>
          <h2>Invoice</h2>
          <p><strong>Order ID:</strong> ${order?._id}</p>
          <p><strong>Date:</strong> ${createdAt}</p>
          <p><strong>Status:</strong> ${order?.status}</p>
          <p><strong>Total:</strong> $${total?.toFixed(2)}</p>

          <h3>Customer Information</h3>
          <p><strong>Name:</strong> ${order?.user?.firstName} ${order?.user?.lastName}</p>
          <p><strong>Email:</strong> ${order?.user?.email}</p>
          <p><strong>Phone:</strong> ${address?.phone}</p>
          <p><strong>Address:</strong> ${address?.postalCode}, ${address?.addressLine}, ${address?.city}, ${address?.country}</p>

          <h3>Items</h3>
          <table>
            <thead>
              <tr>
                <th>Product</th>
                <th>Qty</th>
                <th>Price</th>
              </tr>
            </thead>
            <tbody>
              ${itemRows}
            </tbody>
          </table>
          <footer style="margin-top: 40px; text-align: center; color: #888; font-size: 0.9em;">
            Thank you for shopping with Fashionova!
            Need help? Contact us at <a href="mailto:support@fashionova.com">support@fashionova.com</a>
          </footer>
        </body>
      </html>
    `;

    printWindow.document.open();
    printWindow.document.write(htmlContent);
    printWindow.document.close();

    // Wait for content to load, then print
    printWindow.onload = function () {
      printWindow.focus();
      printWindow.print();

      // Optional: Close after delay to avoid race conditions
      setTimeout(() => {
        printWindow.close();
      }, 1000);
    };
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
            onClick={() => handleStatusChange('processing')}
            className="bg-yellow-600 hover:bg-yellow-700 px-4 py-2 rounded"
          >
            Mark as Processing
          </button>
          <button
            onClick={() => handleStatusChange('shipped')}
            className="bg-indigo-600 hover:bg-indigo-700 px-4 py-2 rounded"
          >
            Mark as Shipped
          </button>
          <button
            onClick={() => handleStatusChange('delivered')}
            className="bg-green-600 hover:bg-green-700 px-4 py-2 rounded"
          >
            Mark as Delivered
          </button>
          <button
            onClick={() => printInvoice(order)}
            className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded"
          >
            Print Invoice
          </button>
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
