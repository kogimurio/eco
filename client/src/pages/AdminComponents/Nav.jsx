import {
  faTachometerAlt,
  faUsers,
  faClipboardList,
  faBoxOpen,
  faChartLine,
  faGear,
  faDollarSign,
  faHourglassHalf,
  faListAlt
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Order from "./Order";
import { useNavigate } from "react-router-dom";

export default function Nav() {
    const navigate = useNavigate()

    const handleOrder = () => {
        navigate('/order')
    }
    return (
        <>
            <div className="bg-gray-800 h-14 text-white flex items-center justify-between rounded-t-lg shadow px-6">
                <div>
                    logo
                </div>
                <div>
                    <h1>Admin Dashboard</h1>
                </div>
                <div>
                    logout
                </div>
            </div>
            <div className="flex flex-col gap-6 bg-gray-800 w-48 h-auto pb-4 rounded-b-lg pl-6 text-white">
                <div className="mt-2">
                    <FontAwesomeIcon icon={faTachometerAlt} className="text-gray-400 mr-2" /> <a href="*">Dashboard</a>
                </div>
                <div className="flex cursor-pointer" onClick={handleOrder}>
                    <FontAwesomeIcon icon={faClipboardList} className="text-gray-400 mr-2" /> Order
                </div>
                <div>
                    <FontAwesomeIcon icon={faBoxOpen} className="text-gray-400 mr-2" /> <a href="*">Products</a>
                </div>
                <div>
                    <FontAwesomeIcon icon={faUsers} className="text-gray-400 mr-2" /> <a href="*">Users</a>
                </div>
                <div className="h-36">
                    <FontAwesomeIcon icon={faChartLine} className="text-gray-400 mr-2" /> <a href="*">Analytics</a>
                </div>
                <div>
                    <FontAwesomeIcon icon={faGear} className="text-gray-400 mr-2" /> <a href="*">Settings</a>
                </div>
            </div>
        </>
        
    )
}