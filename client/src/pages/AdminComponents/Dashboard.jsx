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
import { toast } from "react-toastify";

const Dashboard = () => {
  const navigate = useNavigate();

  const handleDashboard = () => {
    navigate("/dashboard");
  };

  const handleOrders = () => {
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

  const handleLogout = () => {
      localStorage.clear()
      setTimeout(() => {
        toast.success('Logout successful!');
        window.location.href="/"
      }, 3000)
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Header */}
      <div className="fixed top-0 left-0 w-full h-16 bg-gray-800 flex items-center justify-between px-8 shadow z-50">
        <div className="text-xl font-bold text-orange-500"><a href="/">Fashionova</a></div>
        <h1 className="text-lg font-semibold">Admin Dashboard</h1>
        <button 
          onClick={handleLogout}
          className="flex items-center gap-2 text-red-400 hover:text-red-600 transition">
          <FontAwesomeIcon icon={faRightFromBracket} />
          Logout
        </button>
      </div>

      {/* Main Grid */}
        {/* Sidebar */}
        <aside className="fixed top-16 left-0 w-[220px] h-[calc(100vh-4rem)] bg-gray-800 p-6 space-y-6 z-40">
          <div 
            onClick={handleDashboard}
            className="flex items-center gap-2 cursor-pointer hover:text-orange-400"
          >
            <FontAwesomeIcon icon={faTachometerAlt} /> Dashboard
          </div>
          <div 
            onClick={handleOrders} 
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
        <main className="ml-[220px] pt-16 p-6 min-h-screen bg-gray-900">
                        <Outlet />
        </main>
        
        {/* Sections */}
       
      </div>
  );
};

export default Dashboard;
