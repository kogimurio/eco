export default function OrderConfirmation() {
  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center justify-center p-6">
      <div className="bg-gray-800 rounded-lg p-8 shadow-lg max-w-xl w-full text-center">
        <h2 className="text-3xl font-bold text-green-400 mb-4">🎉 Thank You for Your Order!</h2>
        <p className="text-gray-300 mb-6">
          Your order has been placed successfully. You will receive a confirmation email shortly.
        </p>

        {/* Order Summary */}
        <div className="bg-gray-700 p-4 rounded-lg text-left space-y-2 mb-6">
          <p><span className="font-semibold text-gray-400">Order ID:</span> #ORD-456789</p>
          <p><span className="font-semibold text-gray-400">Estimated Delivery:</span> 3–5 business days</p>
          <p><span className="font-semibold text-gray-400">Shipping To:</span> John Doe, Nairobi, Kenya</p>
        </div>

        <div className="flex justify-center gap-4">
          <a
            href="/"
            className="bg-orange-600 hover:bg-orange-700 px-6 py-2 rounded text-white font-medium transition"
          >
            Back to Home
          </a>
          <a
            href="/dashboard/order"
            className="bg-gray-600 hover:bg-gray-700 px-6 py-2 rounded text-white font-medium transition"
          >
            View My Orders
          </a>
        </div>
      </div>
    </div>
  );
}
