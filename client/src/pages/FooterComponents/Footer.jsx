import Subscrip from "./Subscrip";
import Links from "./Links";
import OffersCarousel from './OfferCarousel';
import PaymentMethods from './PaymentMethods';
import CopyRights from './Copyrights';

const Footer = () => {
    return (
        <>
            <div className="bg-gray-900 text-white w-full py-8">
                <div className="grid grid-cols-1 lg:grid-cols-[3fr_1fr] xl:grid-cols-[3fr_1fr] w-[90%] mx-auto gap-8">
                    
                    {/* Testimonial Section */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        
                        {/* User Info */}
                        <div className="flex items-center p-4">
                            <img
                                src="https://www.w3schools.com/howto/img_avatar.png"
                                alt="John Doe"
                                className="w-24 h-24 object-cover rounded-full mr-4 border-2 border-white"
                            />
                            <p className="text-lg font-semibold">John Doe</p>
                        </div>

                        {/* Testimonial Quote */}
                        <div className="flex items-center justify-center p-4">
                            <p className="text-base italic text-center max-w-md">
                                "They have the latest fashion and the best prices. I love shopping here!"
                            </p>
                        </div>
                    </div>

                    {/* Download App Section */}
                    <div className="flex flex-col items-center justify-center gap-6">
                    <h3 className="text-xl font-semibold mb-2">Download App</h3>

                    <div className="grid grid-cols-2 lg:grid-cols-1 xl:grid-cols-2 gap-4 w-full">
                            <img
                                src="app-store-badge.svg"
                                alt="App Store"
                                className="h-14 w-full object-contain"
                            />
                            <img
                                src="https://upload.wikimedia.org/wikipedia/commons/7/78/Google_Play_Store_badge_EN.svg"
                                alt="Google Play"
                                className="h-14 w-full object-contain"
                            />
                    </div>
                </div>
                </div>
            </div>
            <Subscrip />
            <Links />
            <OffersCarousel />
            <PaymentMethods />
            <CopyRights />
        </>
    );
}

export default Footer;
