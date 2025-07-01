import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer
} from 'recharts';

export default function Analytics() {
  const monthlySales = [
    { month: 'Jan', sales: 4000 },
    { month: 'Feb', sales: 3000 },
    { month: 'Mar', sales: 5000 },
    { month: 'Apr', sales: 4000 },
    { month: 'May', sales: 6000 },
    { month: 'Jun', sales: 7000 },
    { month: 'Jul', sales: 8000 },
    { month: 'Aug', sales: 6500 },
    { month: 'Sep', sales: 7200 },
    { month: 'Oct', sales: 5300 },
    { month: 'Nov', sales: 4800 },
    { month: 'Dec', sales: 9100 },
  ];

  const productStats = [
    { name: "Galaxy S25 Ultra", sold: 500 },
    { name: "MacBook Pro M3", sold: 300 },
    { name: "Sony WH-1000XM5", sold: 250 },
    { name: "Canon EOS R6", sold: 180 },
  ];

  return (
    <div className="p-6 text-white">
      <h2 className="text-2xl font-semibold mb-6">Analytics Dashboard</h2>

      {/* Sales per Product */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
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
            </div>
          </div>
        ))}
      </div>

      {/* Monthly Sales Chart */}
      <div className="bg-gray-800 p-6 rounded-lg shadow-md">
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
    </div>
  );
}
