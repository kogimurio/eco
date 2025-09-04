import { useState, useRef, useEffect } from "react";
import { faChevronDown, faGift, faChevronRight, faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import useClickAway from "../../utilis/useClickAway";
import { toast } from "react-toastify";
import axios from 'axios';

const BASE_URL = process.env.REACT_APP_BASE_URL;


const MinTaskBar = () => {
  const [category, setCategory] = useState([]);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const menuRef = useRef();

  useEffect(() => {
      const fetchCategories = async() => {
          try {
              const response = await axios.get(`${BASE_URL}/category`)
              setCategory(response.data.category);
              console.log("Fetched categories:", response.data.category)
          } catch (error) {
              const errorMessage =
              error.response?.data?.message || error.message || "An error occurred";
              console.error("Error fetching categories:", errorMessage)
              toast.error(errorMessage);
          } finally {
              setLoading(false);
          }
      }
      fetchCategories();
  }, []);

  useClickAway(menuRef, () => setIsMenuOpen(false));

  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };

  return (
    <div className="h-17 bg-orange-600 py-2">
      <div className="flex items-center justify-center xl:justify-between w-[90%] mx-auto">

        {/* Desktop Nav */}
        <div className="hidden lg:flex items-center justify-between space-x-2">
          <div className="relative group bg-gray-700 px-5 py-3 font-semibold rounded text-white flex items-center space-x-2">
            <button 
              onClick={toggleMenu}
              className="transition-transform mr-2 duration-300 group-hover:scale-x-[-1]">
              &#9776;
            </button>
            <span onClick={toggleMenu} className="cursor-pointer">SHOP BY CATEGORIES</span>

            {isMenuOpen && (
              <ul ref={menuRef} className="absolute -left-2 -top-40 z-10 rounded-md shadow-lg mt-60 w-full bg-gray-700 ring-1 ring-black ring-opacity-5 focus:outline-none">
                {category.map((c, idx) => (
                    <li 
                        key={idx}
                        className="px-4 py-2 hover:bg-gray-100 hover:text-orange-700 cursor-pointer text-sm">
                          <FontAwesomeIcon icon={faChevronRight} className="mx-2" />
                        <Link to={`/category/${c.slug}`} onClick={() => setIsMenuOpen(false)}>{c.name}</Link>
                    </li>
                ))}
              </ul>
            )}
          </div>
          {/* About, Affiliate, Contact */}
          <ul className="flex space-x-4">
            <li className="text-white hover:text-gray-400 font-bold mx-4"><a href="/aboutus">About Us</a></li>
            <li className="text-white hover:text-gray-400 font-bold mx-4"><a href="/affiliates">Affiliate</a></li>
            <li className="text-white hover:text-gray-400 font-bold mx-4"><a href="/contactus">Contact Us</a></li>
          </ul>

          {/* More Dropdown (unchanged) */}
          <ul>
            <li className="relative group cursor-pointer text-white font-bold mx-4">
              <div className="flex items-center px-4 py-2 rounded transition-all duration-200 group-hover:bg-gray-900">
                More
                <FontAwesomeIcon icon={faChevronDown} className="text-white text-sm ml-1" />
              </div>
              <div className="absolute top-full right-0 w-48 bg-gray-700 rounded shadow-md hidden group-hover:block z-50">
                <ul className="py-2">
                  <li className="text-white hover:text-gray-400 px-4 py-2"><a href="/returns">Returns and policies</a></li>
                  <li className="text-white hover:text-gray-400 px-4 py-2"><a href="/terms">Terms & conditions</a></li>
                  <li className="text-white hover:text-gray-400 px-4 py-2"><a href="/blog">Blog</a></li>
                </ul>
              </div>
            </li>
          </ul>
        </div>

        {/* Shop Ads */}
        <div className="group bg-gray-700 px-5 py-3 rounded text-white w-full md:w-auto text-center overflow-hidden relative">
          <div className="inline-block whitespace-nowrap px-2 w-40 animate-marquee">
            <FontAwesomeIcon icon={faGift} />
            - Free Shipping on orders $99
          </div>
        </div>

      </div>
    </div>
  );
};


export default MinTaskBar