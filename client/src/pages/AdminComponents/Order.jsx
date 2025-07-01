import { useNavigate } from "react-router-dom";


export default function Order() {
    const navigate = useNavigate();


    const handleOrderView = () => {
        navigate("/dashboard/order_view");
    }
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
          <select
            className="px-4 py-2 rounded-lg bg-gray-800 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-orange-500"
          >
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
              <th className="py-3 px-4">Product</th>
              <th className="py-3 px-4">Status</th>
              <th className="py-3 px-4">Total</th>
              <th className="py-3 px-4">Date</th>
              <th className="py-3 px-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="text-sm">
            {[
              {
                id: "ORD203",
                client: "John Doe",
                product: "MacBook Pro M3",
                status: "Pending",
                total: "$2,500",
                date: "2025-06-20",
              },
              {
                id: "ORD204",
                client: "Alice Smith",
                product: "iPhone 15 Pro",
                status: "Shipped",
                total: "$1,100",
                date: "2025-06-19",
              },
            ].map((order, idx) => (
              <tr key={idx} className="border-b border-gray-700 hover:bg-gray-700/50">
                <td className="py-3 px-4">{order.id}</td>
                <td className="py-3 px-4">{order.client}</td>
                <td className="py-3 px-4">{order.product}</td>
                <td className="py-3 px-4">
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                    order.status === "Pending" ? "bg-yellow-500/20 text-yellow-400" :
                    order.status === "Shipped" ? "bg-blue-500/20 text-blue-400" :
                    "bg-green-500/20 text-green-400"
                  }`}>
                    {order.status}
                  </span>
                </td>
                <td className="py-3 px-4">{order.total}</td>
                <td className="py-3 px-4">{order.date}</td>
                <td className="py-3 px-4 text-right space-x-2">
                  <button 
                    className="text-blue-400 hover:text-blue-600 text-sm"
                    onClick={handleOrderView}
                >
                    View
                </button>
                  <button className="text-red-400 hover:text-red-600 text-sm">Cancel</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
