import { useNavigate, Link } from "react-router-dom";
import {
  faTachometerAlt,
  faUsers,
  faClipboardList,
  faBoxOpen,
  faChartLine,
  faGear,
  faRightFromBracket,
  faArrowsRotate
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Outlet } from "react-router-dom";
import { toast } from "react-toastify";
import { useState } from "react";

const Dashboard = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleToggle = () => {
    setIsMenuOpen(prev => !prev);
  }


  const handleLogout = () => {
      localStorage.clear()
      setTimeout(() => {
        toast.success('Logout successful!');
        window.location.href="/"
      }, 3000)
  }
  const SidebarLinks = () => (
    <>
      <div 
        onClick={() => setIsMenuOpen(false)}
        className="flex items-center gap-2 cursor-pointer hover:text-orange-400">
        <FontAwesomeIcon icon={faTachometerAlt} /> 
        <Link to="/dashboard">Dashboard</Link> 
      </div>
      <div 
        onClick={() => setIsMenuOpen(false)}
        className="flex items-center gap-2 cursor-pointer hover:text-orange-400">
        <FontAwesomeIcon icon={faClipboardList} />
        <Link to="/dashboard/order">Orders</Link> 
      </div>
      <div 
        onClick={() => setIsMenuOpen(false)}
        className="flex items-center gap-2 cursor-pointer hover:text-orange-400">
        <FontAwesomeIcon icon={faBoxOpen} /> 
        <Link to="/dashboard/products">Products</Link>
      </div>
      <div 
        onClick={() => setIsMenuOpen(false)} 
        className="flex items-center gap-2 cursor-pointer hover:text-orange-400">
        <FontAwesomeIcon icon={faArrowsRotate} /> 
        <Link to="/dashboard/transactions">Transactions</Link>
      </div>
      <div 
        onClick={() => setIsMenuOpen(false)}
        className="flex items-center gap-2 cursor-pointer hover:text-orange-400">
        <FontAwesomeIcon icon={faUsers} /> 
        <Link to="/dashboard/users">Users</Link>
      </div>
      <div 
        onClick={() => setIsMenuOpen(false)}
        className="flex items-center gap-2 cursor-pointer hover:text-orange-400">
        <FontAwesomeIcon icon={faChartLine} /> 
        <Link to="/dashboard/analytics">Analytics</Link>
      </div>
      <div 
        onClick={() => setIsMenuOpen(false)}
        className="flex items-center gap-2 cursor-pointer hover:text-orange-400">
        <FontAwesomeIcon icon={faChartLine} /> 
        <Link to="/dashboard/notifications">Notifications</Link>
      </div>
      <div 
        onClick={() => setIsMenuOpen(false)} 
        className="flex items-center gap-2 cursor-pointer hover:text-orange-400">
        <FontAwesomeIcon icon={faGear} /> 
        <Link to="/dashboard/settings">Settings</Link>
      </div>
    </>
  );


  return (
    <div className="min-h-screen bg-gray-900 text-white">
      
      {/* Header */}
      <div className="fixed top-0 left-0 w-full h-16 bg-gray-800 flex items-center justify-between px-8 shadow z-50">
        <div className="text-xl font-bold text-orange-500">
          <a href="/">Fashionova</a>
        </div>
        <h1 className="text-lg font-semibold hidden sm:block">Admin Dashboard</h1>

        <div className="flex items-center gap-4">
          {/* Hamburger for mobile */}
          <button 
            onClick={handleToggle}
            className="lg:hidden text-white text-3xl"
          >
            &#9776;
          </button>

          {/* Logout button - always visible */}
          <button 
            onClick={handleLogout}
            className="hidden lg:flex items-center gap-2 text-red-400 hover:text-red-600 transition"
          >
            <FontAwesomeIcon icon={faRightFromBracket} />
            Logout
          </button>
        </div>
      </div>


      {/* Main Grid */}
        {/* Sidebar */}
        <aside className="hidden lg:flex fixed top-16 left-0 w-[220px] h-[calc(100vh-4rem)] bg-gray-800 p-6 space-y-6 z-40 flex-col">
          <SidebarLinks />
        </aside>

        
        {isMenuOpen && (
          <div
            className={`fixed top-0 left-0 h-full w-64 bg-gray-800 z-50 transform transition-transform duration-300 ease-in-out lg:hidden space-y-4 ${
              isMenuOpen ? 'translate-x-0' : '-translate-x-full'
            }`}
          >
            <button
              className="text-red-600 text-2xl absolute top-4 right-4"
              onClick={() => setIsMenuOpen(false)}
            >
              &times;
            </button>
              <SidebarLinks  />
              <button 
                onClick={handleLogout}
                className="hidden sm:flex items-center gap-2 text-red-400 hover:text-red-600 transition"
              >
                <FontAwesomeIcon icon={faRightFromBracket} />
                Logout
              </button>
          </div>
        )}

        {/* Dashboard Content */}
        <main className="lg:ml-[220px] pt-16 p-6 min-h-screen bg-gray-900">
            <Outlet />
        </main>
        
        {/* Sections */}
       
      </div>
  );
};

export default Dashboard;
