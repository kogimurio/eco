import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import LoadingSpinner from '../LoadingSpinner';
import axios from 'axios';
import { useAdmin } from '../../context/AdminContext';
import Swal from 'sweetalert2';

const BASE_URL = process.env.REACT_APP_BASE_URL;

export default function ProductList() {
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('all');
  const { products, loading, fetchProducts } = useAdmin();


  
  const navigate = useNavigate();

  // Fetch products
  useEffect(() => {
      fetchProducts();
  }, [])

  const handleCreateProduct = () => {
    navigate('/dashboard/add_product')
  }

  const handleCreateCategory = () => {
    navigate('/dashboard/add_category')
  }

  const handleEditProduct = (slug) => {
    navigate(`/dashboard/edit_product/${slug}`)
  }

  const handleDeleteProduct = async (id) => {
    const product = products.find(p => p._id === id);

    const result = await Swal.fire({
      title: 'Are you sure?',
      html: `Do you want to delete </br> <span style="color: #ffffff; font-weight: bold;">${product.name}</span>?`,
      icon: 'warning',
      color: '#f87171',
      background: '#1f2937',
      showCancelButton: true,
      confirmButtonColor: '#dc2626',
      cancelButtonColor: '#6b7280',
      confirmButtonText: 'Yes, delete it!',
    });

    if (!result.isConfirmed) return;

    try {
      await axios.delete(`${BASE_URL}/products/${id}`);
      Swal.fire('Deleted!', 'Product has been deleted.', 'success');
      // navigate('/dashboard/products');
      window.location.href = '/dashboard/products';
    } catch (error) {
      Swal.fire('Error', 'Failed to delete the product.', 'error');
    }
  };

  return (
    <div className="p-6 space-y-6">
      {/* Top Bar: Add + Search + Filter */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-4">
        <div className='flex gap-4'>
          <button 
            onClick={handleCreateProduct}
            className="bg-orange-600 hover:bg-orange-700 text-white px-5 py-2 rounded-lg shadow">
            + Add Product
          </button>
          <button 
            onClick={handleCreateCategory}
            className="bg-orange-600 hover:bg-orange-700 text-white px-5 py-2 rounded-lg shadow">
            + Add Category
          </button>
        </div>

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
        {loading ? (
          <div className='flex justify-center'>
            <LoadingSpinner size="60" />
          </div>
        ) : (
          products.map((product) => (
            <div
              key={product._id}
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
                <button 
                  onClick={() => handleEditProduct(product.slug)}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg shadow text-sm">
                  Edit
                </button>
                <button 
                  onClick={() => handleDeleteProduct(product._id)}
                  className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg shadow text-sm">
                  Delete
                </button>
              </div>
            </div>
        ))
        )}
        
      </div>
    </div>
  );
}
