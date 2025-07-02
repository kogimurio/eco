import { useState } from 'react';
import { FaTrash, FaEye } from 'react-icons/fa';

export default function WishList() {
  const [wishlist, setWishlist] = useState([
    {
      id: 1,
      name: 'iPhone 15 Pro',
      price: '$1,199',
      image: 'https://via.placeholder.com/150',
    },
    {
      id: 2,
      name: 'Samsung Galaxy S25 Ultra',
      price: '$1,099',
      image: 'https://via.placeholder.com/150',
    },
  ]);

  const removeFromWishlist = (id) => {
    setWishlist(wishlist.filter((item) => item.id !== id));
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-2xl font-bold text-orange-500 mb-6">My Wishlist</h2>

        {wishlist.length === 0 ? (
          <p className="text-center text-gray-400">Your wishlist is empty.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {wishlist.map((item) => (
              <div
                key={item.id}
                className="bg-gray-800 rounded-lg shadow p-4 flex flex-col space-y-3"
              >
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-40 object-cover rounded"
                />
                <h3 className="text-lg font-semibold">{item.name}</h3>
                <p className="text-orange-400 font-bold">{item.price}</p>
                <div className="flex justify-between items-center mt-auto">
                  <button className="text-sm bg-blue-600 hover:bg-blue-700 text-white px-4 py-1 rounded flex items-center gap-2">
                    <FaEye /> View
                  </button>
                  <button
                    onClick={() => removeFromWishlist(item.id)}
                    className="text-sm bg-red-600 hover:bg-red-700 text-white px-4 py-1 rounded flex items-center gap-2"
                  >
                    <FaTrash /> Remove
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
