import { useNavigate } from "react-router-dom";
import {
  faTachometerAlt,
  faUsers,
  faClipboardList,
  faBoxOpen,
  faChartLine,
  faGear,
  faRightFromBracket,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Outlet } from "react-router-dom";

const Dashboard = () => {
  const navigate = useNavigate();

  const handleDashboard = () => {
    navigate("/dashboard");
  };

  const handleOrder = () => {
    navigate("/dashboard/order");
  };

  const handleProducts = () => {
    navigate("/dashboard/products");
  };

  const handleUsers = () => {
    navigate("/dashboard/users");
  };

  const handleSettings = () => {
    navigate("/dashboard/settings");
  };

  const handleAnalytics = () => {
    navigate("/dashboard/analytics");
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Header */}
      <div className="bg-gray-800 h-16 flex items-center justify-between px-8 shadow">
        <div className="text-xl font-bold text-orange-500">Fashionova Admin</div>
        <h1 className="text-lg font-semibold">Dashboard</h1>
        <button className="flex items-center gap-2 text-red-400 hover:text-red-600 transition">
          <FontAwesomeIcon icon={faRightFromBracket} />
          Logout
        </button>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-[220px_1fr]">
        {/* Sidebar */}
        <aside className="bg-gray-800 p-6 h-full min-h-screen space-y-6">
          <div 
            onClick={handleDashboard}
            className="flex items-center gap-2 cursor-pointer hover:text-orange-400"
          >
            <FontAwesomeIcon icon={faTachometerAlt} /> Dashboard
          </div>
          <div 
            onClick={handleOrder} 
            className="flex items-center gap-2 cursor-pointer hover:text-orange-400"
          >
            <FontAwesomeIcon icon={faClipboardList} /> 
            Orders
          </div>
          <div 
            className="flex items-center gap-2 cursor-pointer hover:text-orange-400"
            onClick={handleProducts} 
          >
            <FontAwesomeIcon icon={faBoxOpen} /> Products
          </div>
          <div 
            className="flex items-center gap-2 cursor-pointer hover:text-orange-400"
            onClick={handleUsers}
          >
            <FontAwesomeIcon icon={faUsers} /> Users
          </div>
          <div 
            className="flex items-center gap-2 cursor-pointer hover:text-orange-400"
            onClick={handleAnalytics}
          >
            <FontAwesomeIcon icon={faChartLine} /> Analytics
          </div>
          <div 
            className="flex items-center gap-2 cursor-pointer hover:text-orange-400"
            onClick={handleSettings}
          >
            <FontAwesomeIcon icon={faGear} /> Settings
          </div>
        </aside>

        {/* Dashboard Content */}
        <main className="grid grid-cols-1">
                        <Outlet />
        </main>
        
        {/* Sections */}
       
      </div>
    </div>
  );
};

export default Dashboard;
