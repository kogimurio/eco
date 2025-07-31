import {
  faUsers,
  faDollarSign,
  faHourglassHalf,
  faListAlt,
  faChevronRight
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from "react-router-dom";
import axios from 'axios';

import { useAdmin } from '../../context/AdminContext';

import LoadingSpinner from '../LoadingSpinner';

const BASE_URL = process.env.REACT_APP_BASE_URL;

const Overview = () => {
  const { users, products, orders, transactions, loading, fetchTransactions, fetchOrders } = useAdmin();
  const navigate = useNavigate();
  const [orderItems, setOrderItems] = useState([]);
  const { id: orderId } = useParams();

  useEffect(() => {
    const fetchOrderItems = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/orders/order_items/${orderId}`);
        setOrderItems(response.data.orderItems || []);
        console.log(response.data.orderItems);
      } catch (error) {
        console.error(error.response?.data?.message || error.message);
      }
    };
    fetchOrderItems();
  }, [orderId]);

  const totalSales = orders.reduce((sum, order) => sum + order.total_price, 0);
  const totalOrders = orders.length;
  

  useEffect(() => {
    fetchTransactions();
  }, [])

  useEffect(() => {
    fetchOrders();
  }, [])

  const handleOrders = () => {
    navigate("/dashboard/order");
  };

  const handleProducts = () => {
    navigate("/dashboard/products");
  };

  const handleUsers = () => {
    navigate("/dashboard/users");
  };

  const handleTransactions = () => {
    navigate("/dashboard/transactions");
  };

  if (loading) {
    return (
      <div className="flex justify-center">
        <LoadingSpinner />
      </div>
    )
  }
  return (
    <div className="grid grid-cols-1">
      <div className="p-6 grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-4 gap-6 h-28">
                {/* Card */}
                <div className="bg-gray-700 rounded-xl p-4 flex items-center gap-4 shadow-md">
                    <div className="bg-gray-900 p-3 rounded-full">
                    <FontAwesomeIcon icon={faUsers} className="text-blue-400 text-xl" />
                    </div>
                    <div>
                    <p className="text-sm text-gray-300">Total Users</p>
                    <p className="text-xl font-semibold">{users.length}</p>
                    </div>
                </div>

                <div className="bg-gray-700 rounded-xl p-4 flex items-center gap-4 shadow-md">
                    <div className="bg-gray-900 p-3 rounded-full">
                    <FontAwesomeIcon icon={faDollarSign} className="text-green-400 text-xl" />
                    </div>
                    <div>
                    <p className="text-sm text-gray-300">Total Sales</p>
                    <p className="text-xl font-semibold">$1{totalSales}</p>
                    </div>
                </div>

                <div className="bg-gray-700 rounded-xl p-4 flex items-center gap-4 shadow-md">
                    <div className="bg-gray-900 p-3 rounded-full">
                    <FontAwesomeIcon icon={faHourglassHalf} className="text-yellow-400 text-xl" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-300">Pending Orders</p>
                      <p className="text-xl font-semibold">{orders.filter(order => order.status === 'pending').length}</p>
                    </div>
                </div>

                <div className="bg-gray-700 rounded-xl p-4 flex items-center gap-4 shadow-md">
                    <div className="bg-gray-900 p-3 rounded-full">
                        <FontAwesomeIcon icon={faListAlt} className="text-purple-400 text-xl" />
                    </div>
                    <div>
                        <p className="text-sm text-gray-300">Total Orders</p>
                        <p className="text-xl font-semibold">{totalOrders}</p>
                    </div>
                </div>
            </div>
            <div className="p-6 grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Order Card */}
              <div className="bg-gray-700 rounded-xl p-6 shadow-md">
                <div className="flex justify-between items-center mb-4">
                  <h6 className="text-white font-semibold text-base">Latest Orders</h6>
                  <div className="flex items-center gap-1">
                    <span
                      onClick={handleOrders}
                      className="text-xs text-blue-400 hover:underline cursor-pointer flex items-center">
                        View All
                        <FontAwesomeIcon
                          icon={faChevronRight}
                          className="ml-1 w-3 h-3 text-white bg-orange-600 rounded-full p-1"
                        />
                    </span>
                  </div>
                </div>
                <div >
                    <table className="min-w-full bg-gray-800 text-white rounded-lg overflow-hidden">
                      <thead>
                        <tr className="bg-gray-700 text-left text-sm uppercase">
                          <th className="py-3 px-4">Order No.</th>
                          <th className="py-3 px-4">Client Name</th>
                          <th className="py-3 px-4">Status</th>
                        </tr>
                      </thead>
                      <tbody className="text-sm text-gray-300">
                        {orders.slice(0, 5).map((order, index) => (
                          <tr
                            key={index}
                            className="border-b border-gray-700 hover:bg-gray-700/50 transition duration-150 ease-in-out"
                          >
                            <td className="py-3 px-4">{`#${order._id?.slice(-6).toUpperCase()}`}</td>
                            <td className="py-3 px-4">{order.user?.firstName || "N/A"}</td>
                            <td className="py-3 px-4">
                              <span
                                className={`font-medium ${
                                  order.status === "pending"
                                    ? "text-yellow-400"
                                    : order.status === "shipped"
                                    ? "text-blue-400"
                                    : order.status === "delivered"
                                    ? "text-green-400"
                                    : order.status === "cancelled"
                                    ? "text-red-400"
                                    : "text-gray-400"
                                }`}
                              >
                                {order.status?.charAt(0).toUpperCase() + order.status?.slice(1)}
                              </span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                </div>
              </div>

              {/* Product Card */}
              <div className="bg-gray-700 rounded-xl p-6 shadow-md">
                <div className="flex justify-between items-center mb-4">
                  <h6 className="text-white font-semibold text-base">Top Products</h6>
                  <div className="flex items-center gap-1">
                    <span 
                      onClick={handleProducts}
                      className="text-xs text-blue-400 hover:underline cursor-pointer flex items-center">
                        View All
                        <FontAwesomeIcon
                        icon={faChevronRight}
                        className="ml-1 w-3 h-3 text-white bg-orange-600 rounded-full p-1"
                      />
                    </span>
                  </div>
                </div>
                <table className="min-w-full bg-gray-800 text-white rounded-lg overflow-hidden">
                  <thead>
                    <tr className="bg-gray-700 text-left text-sm uppercase">
                      <th className="py-3 px-4">Product</th>
                      <th className="py-3 px-4">Stock</th>
                    </tr>
                  </thead>
                  <tbody className="text-sm text-gray-300">
                    {products.slice(0, 5).map((product, index) => (
                      <tr
                        key={index}
                        className="border-b border-gray-700 hover:bg-gray700/50 transition duration-150 ease-in-out"
                      >
                        <td className="py-3 px-4">{product.name}</td>
                        <td className="py-3 px-4">{product.stock} pcs</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            <div className="p-6 grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* User Card */}
              <div className="bg-gray-700 rounded-xl p-6 shadow-md">
                <div className="flex justify-between items-center mb-4">
                  <h6 className="text-white font-semibold text-base">Users</h6>
                  <div className="flex items-center gap-1">
                    <span 
                      onClick={handleUsers}
                      className="text-xs text-blue-400 hover:underline cursor-pointer flex items-center">
                        View All
                        <FontAwesomeIcon icon={faChevronRight} className="ml-1 w-3 h-3 text-white bg-orange-600 rounded-full p-1" />
                    </span>
                  </div>
                </div>
                <table className="min-w-full bg-gray-800 text-white rounded-lg overflow-hidden">
                  <thead>
                    <tr className="bg-gray-700 text-left text-sm uppercase">
                      <th className="py-3 px-4">Name</th>
                      <th className="py-3 px-4">Email</th>
                    </tr>
                  </thead>
                  <tbody className="text-sm text-gray-300">
                    {users.slice(0, 5).map((user, index) => (
                      <tr
                        key={index}
                        className="border-b border-gray-700 hover:bg-gray-700/50 transition duration-150 ease-in-out"
                      >
                        <td className="py-3 px-4">{user.firstName} {user.lastName}</td>
                        <td className="py-3 px-4">{user.email}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                
              </div>


              {/* Transaction Card */}
              <div className="bg-gray-700 rounded-xl p-6 shadow-md">
                <div className="flex justify-between items-center mb-4">
                  <h6 className="text-white font-semibold text-base">Recent Transactions</h6>
                  <div className="flex items-center gap-1">
                    <span 
                      onClick={handleTransactions}
                      className="text-xs text-blue-400 hover:underline cursor-pointer flex items-center">
                        View All
                        <FontAwesomeIcon
                          icon={faChevronRight}
                          className="ml-1 w-3 h-3 text-white bg-orange-600 rounded-full p-1"
                        />
                    </span>
                    
                  </div>
                </div>
                <table className="min-w-full bg-gray-800 text-white rounded-lg overflow-hidden">
                  <thead>
                    <tr className="bg-gray-700 text-left text-sm uppercase">
                      <th className="py-3 px-4">Trans ID</th>
                      <th className="py-3 px-4">Amount</th>
                      <th className="py-3 px-4">Status</th>
                    </tr>
                  </thead>
                  <tbody className="text-sm text-gray-300">
                    {transactions.slice(0, 5).map((transaction, index) => (
                      <tr
                        key={index}
                        className="border-b border-gray-700 hover:bg-gray-700/50 transition duration-100 ease-in-out"
                      >
                        <td className="py-3 px-4 font-mono text-blue-400 hover:underline cursor-pointer">
                          {transaction.receipt}
                        </td>
                        <td className="py-3 px-4">{transaction.amount}</td>
                        <td className="py-3 px-4">{transaction.status}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                
              </div>
            </div>
    </div>
  );
};

export default Overview;