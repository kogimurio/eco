import Mpesa from './Mpesa';


export default function PaymentModal ({ type, onClose }) {
    
    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white text-black rounded-lg p-6 w-full max-w-sm">
                <h3 className="text-lg font-semibold mb-4">
                    {type === 'mpesa' ? 'M-Pesa Payment' : 'PayPal Payment'}
                </h3>
                <p className="mb-4">
                    {type === 'mpesa'? (
                        <div>
                            <p>Enter your phone number to receive a payment prompt on your phone.</p>
                            <Mpesa closeModal={onClose} />
                        </div>
                    ) : (
                        'Redirecting to PayPal...'
                    )}
                </p>
                <button
                    className="bg-gray-700 text-white px-4 py-2 rounded hover:bg-gray-800"
                    onClick={onClose}
                >
                    Close
                </button>
            </div>
        </div>
    )
}