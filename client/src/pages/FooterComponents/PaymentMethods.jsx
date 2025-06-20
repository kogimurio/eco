export default function PaymentMethods() {
    return (
        <div className="bg-gray-800 text-white w-full py-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 w-[90%] mx-auto gap-6 items-center">
                {/* Social Links */}
                <div className="flex justify-center items-center gap-4">
                    <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer">
                        <img
                            src="https://img.icons8.com/ios-filled/50/ffffff/facebook-new.png"
                            alt="Facebook"
                            className="h-5 w-auto hover:scale-105 transition-transform"
                        />
                    </a>
                    <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer">
                        <img
                            src="https://img.icons8.com/ios-filled/50/ffffff/instagram-new.png"
                            alt="Instagram"
                            className="h-5 w-auto hover:scale-105 transition-transform"
                        />
                    </a>
                    <a href="https://www.youtube.com" target="_blank" rel="noopener noreferrer">
                        <img
                            src="https://img.icons8.com/ios-filled/50/ffffff/youtube-play.png"
                            alt="YouTube"
                            className="h-5 w-auto hover:scale-105 transition-transform"
                        />
                    </a>
                </div>

                {/* Payment Logos */}
                    <div className="flex justify-center items-center gap-2 flex-wrap">
                       <img
                            src="https://upload.wikimedia.org/wikipedia/commons/0/04/Mastercard-logo.png"
                            alt="MasterCard"
                            className="h-5 w-auto"
                        />
                        <img
                            src="https://upload.wikimedia.org/wikipedia/commons/5/5e/Visa_Inc._logo.svg"
                            alt="Visa"
                            className="h-5 w-auto"
                        />
                        <img
                            src="/american-express-logo-20.svg"
                            alt="American Express"
                            className="h-5 w-auto"
                        />
                        <img
                            src="https://www.paypalobjects.com/webstatic/icon/pp258.png"
                            alt="PayPal"
                            className="h-5 w-auto"
                        />
                        <img
                            src="/mpesa.jpg"
                            alt="M-Pesa"
                            className="h-5 w-auto"
                        />
                        <img
                            src="https://upload.wikimedia.org/wikipedia/commons/4/46/Bitcoin.svg"
                            alt="Bitcoin"
                            className="h-5 w-auto"
                        />
                    </div>
            </div>
        </div>
    );
}
