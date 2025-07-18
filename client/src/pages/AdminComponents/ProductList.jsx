import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function ProductList() {
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('all');

  const products = [
    {
      id: 1,
      name: 'Samsung Galaxy S25 Ultra',
      stock: 500,
      sold: 200,
    },
    {
      id: 2,
      name: 'Apple MacBook Pro M3',
      stock: 120,
      sold: 80,
    },
  ];
  const navigate = useNavigate();

  const handleCreateProduct = () => {
    navigate('/dashboard/add_product')
  }

  return (
    <div className="p-6 space-y-6">
      {/* Top Bar: Add + Search + Filter */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-4">
        <button 
          onClick={handleCreateProduct}
          className="bg-orange-600 hover:bg-orange-700 text-white px-5 py-2 rounded-lg shadow">
          + Add Product
        </button>

        <div className="flex flex-col md:flex-row gap-4 items-center">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search product..."
            className="px-4 py-2 rounded-md bg-gray-800 text-white border border-gray-600 focus:outline-none focus:ring focus:ring-orange-500"
          />

          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="px-4 py-2 rounded-md bg-gray-800 text-white border border-gray-600 focus:outline-none focus:ring focus:ring-orange-500"
          >
            <option value="all">All</option>
            <option value="inStock">In Stock</option>
            <option value="outOfStock">Out of Stock</option>
          </select>
        </div>
      </div>

      {/* Product Cards */}
      <div className="space-y-4">
        {products.map((product) => (
          <div
            key={product.id}
            className="bg-gray-800 rounded-xl p-6 shadow-md flex flex-col md:flex-row justify-between items-start md:items-center"
          >
            <div className="text-white space-y-1">
              <h3 className="text-lg font-semibold">{product.name}</h3>
              <p className="text-sm text-gray-400">
                <span className="font-medium text-gray-300">Stock:</span> {product.stock} pcs
              </p>
              <p className="text-sm text-gray-400">
                <span className="font-medium text-gray-300">Total Sales:</span> {product.sold} pcs
              </p>
            </div>

            <div className="flex gap-2 mt-4 md:mt-0">
              <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg shadow text-sm">
                Edit
              </button>
              <button className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg shadow text-sm">
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
