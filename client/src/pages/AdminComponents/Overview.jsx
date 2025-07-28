import {
  faUsers,
  faDollarSign,
  faHourglassHalf,
  faListAlt,
  faChevronRight
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from 'react';
import axios from 'axios';
import LoadingSpinner from '../LoadingSpinner';

const BASE_URL = process.env.REACT_APP_BASE_URL;


const Overview = () => {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTrans = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/mpesa/all_payments`)
        setTransactions(response.data.payments)
        console.log(response.data.payments);
      } catch (error) {
        console.error(error.response.data || error.message);
      } finally {
        setLoading(false);
      }
    }
    fetchTrans();
  }, [])

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
                    <p className="text-xl font-semibold">500</p>
                    </div>
                </div>

                <div className="bg-gray-700 rounded-xl p-4 flex items-center gap-4 shadow-md">
                    <div className="bg-gray-900 p-3 rounded-full">
                    <FontAwesomeIcon icon={faDollarSign} className="text-green-400 text-xl" />
                    </div>
                    <div>
                    <p className="text-sm text-gray-300">Total Sales</p>
                    <p className="text-xl font-semibold">$100,000</p>
                    </div>
                </div>

                <div className="bg-gray-700 rounded-xl p-4 flex items-center gap-4 shadow-md">
                    <div className="bg-gray-900 p-3 rounded-full">
                    <FontAwesomeIcon icon={faHourglassHalf} className="text-yellow-400 text-xl" />
                    </div>
                    <div>
                    <p className="text-sm text-gray-300">Pending Orders</p>
                    <p className="text-xl font-semibold">10</p>
                    </div>
                </div>

                <div className="bg-gray-700 rounded-xl p-4 flex items-center gap-4 shadow-md">
                    <div className="bg-gray-900 p-3 rounded-full">
                        <FontAwesomeIcon icon={faListAlt} className="text-purple-400 text-xl" />
                    </div>
                    <div>
                        <p className="text-sm text-gray-300">Total Orders</p>
                        <p className="text-xl font-semibold">400</p>
                    </div>
                </div>
            </div>
            <div className="p-6 grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Order Card */}
              <div className="bg-gray-700 rounded-xl p-6 shadow-md">
                <div className="flex justify-between items-center mb-4">
                  <h6 className="text-white font-semibold text-base">Latest Orders</h6>
                  <div className="flex items-center gap-1">
                    <a href="*" className="text-xs text-blue-400 hover:underline">View All</a>
                    <FontAwesomeIcon
                      icon={faChevronRight}
                      className="w-3 h-3 text-white bg-orange-600 rounded-full p-1"
                    />
                  </div>
                </div>
                <div className="flex justify-between flex-col md:flex-row text-sm text-gray-300">
                  <div>
                    <h6 className="text-gray-400 font-medium">Order No.</h6>
                    <p>203</p>
                    <p>204</p>
                    <p>205</p>
                    <p>206</p>
                    <p>207</p>
                  </div>
                  <div>
                    <h6 className="text-gray-400 font-medium">Client Name</h6>
                    <p>John Doe</p>
                    <p>Alice Smith</p>
                    <p>Bob Johnson</p>
                    <p>Emily Rose</p>
                    <p>Michael Scott</p>
                  </div>
                  <div>
                    <h6 className="text-gray-400 font-medium">Status</h6>
                    <p className="text-yellow-400">Pending</p>
                    <p className="text-yellow-400">Shipped</p>
                    <p className="text-yellow-400">Delivered</p>
                    <p className="text-yellow-400">Cancelled</p>
                    <p className="text-yellow-400">Processing</p>
                  </div>
                </div>
              </div>

              {/* Product Card */}
              <div className="bg-gray-700 rounded-xl p-6 shadow-md">
                <div className="flex justify-between items-center mb-4">
                  <h6 className="text-white font-semibold text-base">Top Products</h6>
                  <div className="flex items-center gap-1">
                    <a href="*" className="text-xs text-blue-400 hover:underline">View All</a>
                    <FontAwesomeIcon
                      icon={faChevronRight}
                      className="w-3 h-3 text-white bg-orange-600 rounded-full p-1"
                    />
                  </div>
                </div>
                <div className="flex justify-between flex-col md:flex-row text-sm text-gray-300">
                  <div>
                    <h6 className="text-gray-400 font-medium">Samsung Galaxy S25 Ultra</h6>
                    <h6 className="text-gray-400 font-medium">Apple MacBook Pro M3</h6>
                    <h6 className="text-gray-400 font-medium">Sony WH-1000XM5</h6>
                    <h6 className="text-gray-400 font-medium">Dell XPS 15</h6>
                    <h6 className="text-gray-400 font-medium">Canon EOS R6</h6>
                  </div>
                  <div>
                    <p>500 pcs</p>
                    <p>300 pcs</p>
                    <p>250 pcs</p>
                    <p>150 pcs</p>
                    <p>120 pcs</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-6 grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* User Card */}
              <div className="bg-gray-700 rounded-xl p-6 shadow-md">
                <div className="flex justify-between items-center mb-4">
                  <h6 className="text-white font-semibold text-base">Users</h6>
                  <div className="flex items-center gap-1">
                    <a href="*" className="text-xs text-blue-400 hover:underline">View All</a>
                    <FontAwesomeIcon icon={faChevronRight} className="w-3 h-3 text-white bg-orange-600 rounded-full p-1" />
                  </div>
                </div>
                <div className="space-y-3 text-sm text-gray-300">
                  {[
                    ['Jane Doe', 'janedoe@gmail.com', '11__98713.jpg'],
                    ['Alice Smith', 'alice@gmail.com', '18__10246.jpg'],
                    ['Bob Johnson', 'bob@gmail.com', '16__10413.jpg'],
                    ['Emily Rose', 'emily@gmail.com', '20__80554.jpg'],
                    ['Mike Dean', 'mike@gmail.com', '11__98713.jpg'],
                  ].map(([name, email, img], i) => (
                    <div key={i} className="flex justify-between flex-col md:flex-row gap-2">
                      <div className="flex items-center gap-2">
                        <img src={img} alt={name} className="w-6 h-6 object-cover rounded-full" />
                        <h6 className="text-gray-400 font-medium">{name}</h6>
                      </div>
                      <div><p>{email}</p></div>
                    </div>
                  ))}
                </div>
              </div>


              {/* Transaction Card */}
              <div className="bg-gray-700 rounded-xl p-6 shadow-md">
                <div className="flex justify-between items-center mb-4">
                  <h6 className="text-white font-semibold text-base">Recent Transactions</h6>
                  <div className="flex items-center gap-1">
                    <a href="*" className="text-xs text-blue-400 hover:underline">View All</a>
                    <FontAwesomeIcon
                      icon={faChevronRight}
                      className="w-3 h-3 text-white bg-orange-600 rounded-full p-1"
                    />
                  </div>
                </div>
                <div className="flex justify-between flex-col md:flex-row text-sm text-gray-300">
                  {transactions.map((transaction, index) => (
                    <span key={index}>
                      <div>
                        <h6 className="text-gray-400 font-medium">{transaction.status}</h6>
                      </div>
                      <div>
                        <p>{transaction.amount}</p>
                      </div>
                    </span>
                  ))}
                </div>
              </div>
            </div>
    </div>
  );
};

export default Overview;