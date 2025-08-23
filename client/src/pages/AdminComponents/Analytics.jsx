import { useEffect, useMemo } from 'react';
import { useAdmin } from '../../context/AdminContext';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer
} from 'recharts';

const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
  'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
];

export default function Analytics() {
  const { orders, fetchOrders } = useAdmin();
  
  useEffect(() => {
    fetchOrders();
  }, []);

  // Order orders by month and calculate total sales per month
  const monthlySales = useMemo(() => {
    const salesMap = {};

    orders.forEach(order => {
      const date = new Date(order.createdAt);
      const month = date.getMonth();
      salesMap[month] = (salesMap[month] || 0) + order.total_price;
    });

    // Convert to full month structure
    return monthNames.map((monthName, index) => ({
      month: monthName,
      sales: salesMap[index] || 0
    }));
  }, [orders]);

  const productStats = useMemo(() => {
    const productMap ={};

    orders.forEach(order => {
      order.items.forEach(item => {
        if (!item.product) return;

        const productId = typeof item.product === 'object' ? item.product._id : item.product;
        const productName = item.product?.name || 'Unnamed Product'
        const productPrice = item.product.price || 0;

        if (!productMap[productId]) {
          productMap[productId] = {
            name: productName,
            sold: 0,
            sales: 0
          };
        }

        productMap[productId].sold += item.quantity;
        productMap[productId].sales += item.quantity * productPrice
      });
    });
    return Object.values(productMap);
  }, [orders]);


  return (
    <div className="p-6 text-white">
      <h2 className="text-2xl font-semibold mb-6">Analytics Dashboard</h2>

      {/* Monthly Sales Chart */}
      <div className="bg-gray-800 p-6 rounded-lg shadow-md mb-8">
        <h3 className="text-lg font-semibold mb-4">Monthly Sales</h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={monthlySales}>
            <CartesianGrid strokeDasharray="3 3" stroke="#444" />
            <XAxis dataKey="month" stroke="#ccc" />
            <YAxis stroke="#ccc" />
            <Tooltip />
            <Bar dataKey="sales" fill="#f97316" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Sales per Product */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {productStats.map((product, idx) => (
          <div
            key={idx}
            className="bg-gray-800 p-4 rounded-lg shadow-md flex justify-between items-center"
          >
            <div>
              <p className="text-sm text-gray-400">Product</p>
              <h3 className="text-lg font-bold">{product.name}</h3>
            </div>
            <div className="text-right">
              <p className="text-sm text-gray-400">Units Sold</p>
              <p className="text-xl font-semibold text-green-400">{product.sold}</p>
              <p className="text-sm text-gray-400">Revenue</p>
              <p className="text-xl font-semibold text-green-400">${product.sales.toFixed(2)}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
