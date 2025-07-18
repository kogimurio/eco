import { useNavigate } from "react-router-dom";


export default function Cart() {
    const navigate = useNavigate();
  const cartItems = [
    {
      id: 1,
      name: "Asymmetric Top With Bow",
      price: 100.99,
      quantity: 1,
      image: "/05__85237.jpg",
    }
  ];

  const subtotal = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);

  const handleCheckout = () => {
    navigate("/checkout")
  }

  return (
    <div className="bg-gray-900 text-white min-h-screen p-6">
      <h2 className="text-2xl font-semibold mb-6">Your Shopping Cart</h2>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Cart Items */}
        <div className="lg:col-span-2 space-y-4">
          {cartItems.map((item) => (
            <div key={item.id} className="flex items-center justify-between bg-gray-800 rounded-lg p-4 shadow-md">
              <div className="flex items-center gap-4">
                <img src={item.image} alt={item.name} className="w-16 h-16 rounded-lg object-cover" />
                <div>
                  <h4 className="text-lg font-semibold">{item.name}</h4>
                  <p className="text-gray-400">${item.price.toFixed(2)}</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="flex items-center border border-gray-700 rounded">
                  <button className="px-3 py-1 hover:bg-gray-700">-</button>
                  <span className="px-4">{item.quantity}</span>
                  <button className="px-3 py-1 hover:bg-gray-700">+</button>
                </div>
                <button className="text-red-500 hover:underline text-sm">Remove</button>
              </div>
            </div>
          ))}
        </div>

        {/* Summary */}
        <div className="bg-gray-800 rounded-lg p-6 shadow-md">
          <h3 className="text-lg font-semibold mb-4">Order Summary</h3>
          <div className="flex justify-between mb-2">
            <span className="text-gray-400">Subtotal</span>
            <span>${subtotal.toFixed(2)}</span>
          </div>
          <div className="flex justify-between mb-4">
            <span className="text-gray-400">Shipping</span>
            <span>Free</span>
          </div>
          <hr className="border-gray-700 mb-4" />
          <div className="flex justify-between font-bold text-lg">
            <span>Total</span>
            <span>${subtotal.toFixed(2)}</span>
          </div>
          <button 
            className="mt-6 w-full bg-orange-600 hover:bg-orange-700 py-2 rounded text-white font-semibold transition cursor-pointer"
            onClick={handleCheckout}
        >
            Proceed to Checkout
          </button>
        </div>
      </div>
    </div>
  );
}
