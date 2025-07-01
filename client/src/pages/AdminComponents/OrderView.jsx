export default function ViewOrder() {
  return (
    <div className="bg-gray-900 text-white p-6 min-h-screen">
      <h2 className="text-2xl font-semibold mb-6">Order Details</h2>

      {/* Order Summary */}
      <section className="bg-gray-800 p-6 rounded-lg shadow-md mb-6">
        <h3 className="text-lg font-semibold mb-4">Order Summary</h3>
        <div className="grid md:grid-cols-2 gap-4 text-sm text-gray-300">
          <p><span className="font-medium text-white">Order ID:</span> #123456</p>
          <p><span className="font-medium text-white">Date:</span> June 24, 2025</p>
          <p><span className="font-medium text-white">Status:</span> Pending</p>
          <p><span className="font-medium text-white">Total:</span> $450.00</p>
          <p><span className="font-medium text-white">Payment:</span> Credit Card</p>
        </div>
      </section>

      {/* Customer Info */}
      <section className="bg-gray-800 p-6 rounded-lg shadow-md mb-6">
        <h3 className="text-lg font-semibold mb-4">Customer Information</h3>
        <div className="grid md:grid-cols-2 gap-4 text-sm text-gray-300">
          <p><span className="font-medium text-white">Name:</span> John Doe</p>
          <p><span className="font-medium text-white">Email:</span> johndoe@example.com</p>
          <p><span className="font-medium text-white">Phone:</span> +254712345678</p>
          <p><span className="font-medium text-white">Address:</span> 1234 Mombasa Rd, Nairobi, Kenya</p>
        </div>
      </section>

      {/* Products Ordered */}
      <section className="bg-gray-800 p-6 rounded-lg shadow-md mb-6">
        <h3 className="text-lg font-semibold mb-4">Ordered Items</h3>
        <div className="space-y-4 text-sm text-gray-300">
          {[
            { name: "Samsung Galaxy S25", qty: 2, price: 400 },
            { name: "Sony WH-1000XM5", qty: 1, price: 200 },
          ].map((item, idx) => (
            <div key={idx} className="flex justify-between border-b border-gray-700 pb-2">
              <span>{item.name} (x{item.qty})</span>
              <span>${item.price}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Admin Actions */}
      <section className="bg-gray-800 p-6 rounded-lg shadow-md">
        <h3 className="text-lg font-semibold mb-4">Actions</h3>
        <div className="flex gap-4">
          <button className="bg-green-600 hover:bg-green-700 px-4 py-2 rounded">
            Mark as Delivered
          </button>
          <button className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded">
            Print Invoice
          </button>
          <button className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded">
            Cancel Order
          </button>
        </div>
      </section>
    </div>
  );
}
