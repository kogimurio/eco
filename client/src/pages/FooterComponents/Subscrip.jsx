import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";


export default function Subscrip() {
    return (
        <div className="bg-orange-800 w-full py-10">
            <div className="w-[90%] mx-auto grid place-items-center grid-cols-1 lg:grid-cols-3 xl:grid-cols-3 gap-8">
                <div className="flex flex-col lg:flex-row gap-3">
                    <FontAwesomeIcon icon={faEnvelope} className="text-iconMedium text-white mx-auto"/>
                    <h6 className="text-white font-semibold mb-1 whitespace-nowrap text-center lg:text-left">Sign Up For Newsletter</h6>
                </div>
                <div>
                    <p className="text-white text-base mb-2">
                        Get the latest updates and offers. Subscribe to our newsletter and never miss out on exclusive deals!
                    </p>
                </div>
                <div className="w-full">
                    <form className="relative grid  gap-4 w-full">
                        <input 
                            type="email"
                            placeholder="Enter your email"
                            className="p-3 rounded-full w-full flex-1 focus:outline-none"
                        />
                        <button 
                            type="submit"
                            className="absolute right-0.25 text-white bg-orange-800 font-semibold px-6 py-3 rounded-full hover:bg-orange-700 transition"
                        >
                            Subscribe
                        </button>
                    </form>
                </div>
            </div>
        </div>
    )
}
