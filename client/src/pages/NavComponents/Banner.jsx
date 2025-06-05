import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPhone, faTag, faEnvelope } from "@fortawesome/free-solid-svg-icons";


const Banner = () => {
    return (
        <div className="bg-gray-950 w-full hidden md:flex">
            <div className="flex flex-col md:flex-row justify-between py-5 w-[90%] mx-auto">
                <p className="text-sm text-white">
                    <FontAwesomeIcon icon={faTag} /> get upto 25% cashback on first order
                </p>
                <span className="text-sm text-white space-x-2">
                    <FontAwesomeIcon icon={faPhone} /> +254721696609   <FontAwesomeIcon icon={faEnvelope} /> support@ecostore.com
                </span>   
            </div>
            
        </div>
    )
}

export default Banner;