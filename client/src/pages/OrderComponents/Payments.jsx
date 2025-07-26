export default function Payments() {
  return (
    <div className="bg-gray-900 min-h-screen flex items-center justify-center p-6">
      <div className="bg-gray-800 text-white w-full max-w-md rounded-lg shadow-lg p-6 space-y-6">
        <h2 className="text-2xl font-semibold text-center uppercase tracking-wide">Select Payment Method</h2>

        {/* Mpesa Option */}
        <button className="w-full flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-4 rounded transition duration-200">
          <img src="https://seeklogo.com/images/M/mpesa-logo-7207B8C8AF-seeklogo.com.png" alt="Mpesa" className="w-6 h-6" />
          Pay with M-PESA
        </button>

        {/* Divider */}
        <div className="flex items-center justify-between text-gray-400">
          <hr className="w-1/3 border-gray-600" />
          <span className="text-sm">or</span>
          <hr className="w-1/3 border-gray-600" />
        </div>

        {/* PayPal Option */}
        <button className="w-full flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-4 rounded transition duration-200">
          <img src="https://upload.wikimedia.org/wikipedia/commons/b/b5/PayPal.svg" alt="PayPal" className="w-6 h-6" />
          Pay with PayPal
        </button>
      </div>
    </div>
  );
}
