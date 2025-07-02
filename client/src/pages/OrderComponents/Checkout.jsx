import { useNavigate } from "react-router-dom";

export default function Checkout() {
    const navigate = useNavigate(); 

    const handleThankYou = () => {
        navigate('/order_confirmation')
    }
  return (
    <div className="bg-gray-900 text-white min-h-screen p-6">
      <h2 className="text-2xl font-semibold mb-6">Checkout</h2>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Shipping Info */}
        <div className="lg:col-span-2 bg-gray-800 p-6 rounded-lg shadow-md space-y-4">
          <h3 className="text-lg font-semibold">Shipping Information</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input type="text" placeholder="Full Name" className="p-3 bg-gray-700 rounded" />
            <input type="email" placeholder="Email Address" className="p-3 bg-gray-700 rounded" />
            <input type="tel" placeholder="Phone Number" className="p-3 bg-gray-700 rounded" />
            <input type="text" placeholder="Street Address" className="p-3 bg-gray-700 rounded" />
            <input type="text" placeholder="City" className="p-3 bg-gray-700 rounded" />
            <input type="text" placeholder="Postal Code" className="p-3 bg-gray-700 rounded" />
            <select className="p-3 bg-gray-700 rounded col-span-2">
              <option>Select Country</option>
              <option>Kenya</option>
              <option>USA</option>
              <option>UK</option>
            </select>
          </div>
        </div>

        {/* Summary + Payment */}
        <div className="bg-gray-800 p-6 rounded-lg shadow-md space-y-4">
          <h3 className="text-lg font-semibold">Payment</h3>
          <input type="text" placeholder="Card Number" className="w-full p-3 bg-gray-700 rounded" />
          <div className="grid grid-cols-2 gap-4">
            <input type="text" placeholder="MM/YY" className="p-3 bg-gray-700 rounded" />
            <input type="text" placeholder="CVV" className="p-3 bg-gray-700 rounded" />
          </div>

          <hr className="border-gray-600" />

          <h3 className="text-lg font-semibold">Order Summary</h3>
          <div className="flex justify-between">
            <span>Subtotal</span>
            <span>$2,850.00</span>
          </div>
          <div className="flex justify-between">
            <span>Shipping</span>
            <span>Free</span>
          </div>
          <div className="flex justify-between font-bold text-lg">
            <span>Total</span>
            <span>$2,850.00</span>
          </div>

          <button 
            className="w-full bg-orange-600 hover:bg-orange-700 py-2 rounded text-white font-semibold transition"
            onClick={handleThankYou}
        >
            Place Order
          </button>
        </div>
      </div>
    </div>
  );
}
