import React from 'react';
import { useNavigate } from "react-router-dom";
import { useEffect } from 'react';
import LoadingSpinner from '../LoadingSpinner';
import { useAdmin } from '../../context/AdminContext';


export default function Order() {
  const { orders, loading, fetchOrders } = useAdmin();

  const navigate = useNavigate();

  useEffect(() => {
      fetchOrders();
  }, []);

  const handleOrderView = (orderId) => {
    navigate(`/dashboard/order_view/${orderId}`);
  };

  const formatDate = (isoDate) => {
    return new Date(isoDate).toLocaleDateString();
  };

  const getStatusStyles = (status) => {
    switch (status) {
      case "pending":
        return "bg-yellow-500/20 text-yellow-400";
      case "shipped":
        return "bg-blue-500/20 text-blue-400";
      case "delivered":
        return "bg-green-500/20 text-green-400";
      case "cancelled":
        return "bg-red-500/20 text-red-400";
      default:
        return "bg-gray-500/20 text-gray-400";
    }
  };

  return (
    <div className="p-6">
      {/* Header */}
      <div className="mb-6 flex justify-between items-center">
        <h2 className="text-2xl font-semibold text-white">Orders</h2>
        <div className="flex gap-2">
          <input
            type="text"
            placeholder="Search by client..."
            className="px-4 py-2 rounded-lg bg-gray-800 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-orange-500"
          />
          <select className="px-4 py-2 rounded-lg bg-gray-800 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-orange-500">
            <option value="">All Status</option>
            <option value="pending">Pending</option>
            <option value="shipped">Shipped</option>
            <option value="delivered">Delivered</option>
          </select>
        </div>
      </div>

      {/* Orders Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full bg-gray-800 text-white rounded-lg overflow-hidden">
          <thead>
            <tr className="bg-gray-700 text-left text-sm uppercase">
              <th className="py-3 px-4">Order ID</th>
              <th className="py-3 px-4">Client Name</th>
              <th className="py-3 px-4">Products</th>
              <th className="py-3 px-4">Status</th>
              <th className="py-3 px-4">Total</th>
              <th className="py-3 px-4">Date</th>
              <th className="py-3 px-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="text-sm">
            {loading ? (
              <tr>
                <td colSpan="7" className="text-center py-6">
                  <LoadingSpinner />
                </td>
              </tr>
            ) : orders.length === 0 ? (
              <tr>
                <td colSpan="7" className="text-center py-6 text-gray-400">
                  No orders found.
                </td>
              </tr>
            ) : (
              orders.map((order, idx) => (
                <tr key={idx} className="border-b border-gray-700 hover:bg-gray-700/50">
                  <td className="py-3 px-4">{`#${order._id?.slice(-6).toUpperCase()}`}</td>
                  <td className="py-3 px-4">{order.user?.firstName || "N/A"}</td>
                  <td className="py-3 px-4">
                    {order.items?.map((item, i) => (
                      <div key={i}>{item.product?.name || "Product"} ×{item.quantity}</div>
                    ))}
                  </td>
                  <td className="py-3 px-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusStyles(order.status)}`}>
                      {order.status?.charAt(0).toUpperCase() + order.status?.slice(1)}
                    </span>
                  </td>
                  <td className="py-3 px-4">${order.total_price?.toFixed(2)}</td>
                  <td className="py-3 px-4">{formatDate(order.createdAt)}</td>
                  <td className="py-3 px-4 text-right space-x-2">
                    <button
                      className="text-blue-400 hover:text-blue-600 text-sm"
                      onClick={() => handleOrderView(order._id)}
                    >
                      View
                    </button>
                    <button className="text-red-400 hover:text-red-600 text-sm">
                      Cancel
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
