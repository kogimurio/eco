import { faPlus, faEye, faStarHalfStroke, faStar as solidStar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { useState, useEffect } from 'react';
import { faHeart, faStar as regularStar } from "@fortawesome/free-regular-svg-icons";
import Pagination from "./Pagination";
import { useNavigate } from "react-router-dom";


const FeaturedProduct = () => {
    const FeaturedProductData = [
        {
            img: '/02-__44986.jpg',
            title: 'Asymmetric Top with Bow',
            price: '$455.00',
            brand: 'TrendyZone'
        },
        {
            img: '/04-__99752.jpg',
            title: 'Lace-up Leather High Heel',
            price: '$849.00',
            brand: 'Lenovo Mobile'
        },
        {
            img: '/07-__10802.jpg',
            title: 'Satin Crossover Top',
            price: '$565.95',
            brand: 'Premium Quality'
        },
        {
            img: '/11-__90450.jpg',
            title: 'Flowing Satin Shirt',
            price: '$519.99',
            brand: 'OFS'
        },
        {
            img: '/13-__16784.jpg',
            title: 'Pleated Wide-leg Trouser',
            price: '$354.95',
            brand: 'Sagaform'
        },
        {
            img: '/16-__46949.jpg',
            title: 'Pleated Plumetis Dress',
            price: '$749.00',
            brand: 'Mountain Climbing'
        },
        {
            img: '/19-__91054.jpg',
            title: 'Contrast Blouse with Elastic',
            price: '$255.00',
            brand: 'OFS'
        },
        {
            img: '/20-__59539.jpg',
            title: 'Poplin Flounce shoe',
            price: '$509.00',
            brand: 'Sagaform'
        }
    ];
    const navigate = useNavigate();
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(5);

    const indexOfLast = currentPage * itemsPerPage;
    const indexOfFirst = indexOfLast - itemsPerPage;
    const currentFeaturedProducts = FeaturedProductData.slice(indexOfFirst, indexOfLast);

    const totalPages = Math.ceil(FeaturedProductData.length / itemsPerPage);

    const handlePageChange = (pageNum) => setCurrentPage(pageNum);

    // Dynamically adjust itemsPerPage based on screen width
    useEffect(()=> {
        const updatedItemsPerPage = () => {
            if (window.innerWidth < 393) {
                setItemsPerPage(1); // Mobile
            } else if (window.innerWidth < 640) {
                setItemsPerPage(2); // Smaill tablets
            } else if (window.innerWidth < 768) {
                setItemsPerPage(2); // Smaill tablets
            } else if (window.innerWidth < 1024) {
                setItemsPerPage(3); // Desktop and above
            } else if (window.innerWidth < 1280) {
                setItemsPerPage(4); // Large desktop
            } else if (window.innerWidth < 1536) {
                setItemsPerPage(5); // Extra large desktop
            } else {
                setItemsPerPage(6); // Extra extra large destop
            }
        }

        updatedItemsPerPage(); // Set on mount

        window.addEventListener("resize", updatedItemsPerPage); // Updated on resize

        return () => window.removeEventListener("resize", updatedItemsPerPage); // Cleanup
    }, []);

    const productDetail = () => {
        window.location.href = "/productdetail";
    }

    return (
        <div className="bg-gray-700 mt-8 py-4 overflow-x-hidden">
            <div className="flex justify-between items-center w-[90%] mx-auto my-4">
                <h2 className="text-white text-sectionHeading font-semibold whitespace-nowrap">Featured Products</h2>

                {/* Line Breaker */}
                <div className="w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg mx-auto border-t border-gray-800 my-2"></div>
                
                {/* Pagination */}
                <div className="flex items-center gap-2 mt-4 justify-center">
                    <Pagination 
                        currentPage={currentPage}
                        totalPages={totalPages}
                        onPageChange={handlePageChange}
                    />
                    {/* Numbered buttons */}
                    {/* {Array.from({ length: totalPages }, (_, index) => (
                        <button
                        key={index}
                        onClick={() => handlePageChange(index + 1)}
                        className={`px-4 py-1 rounded-md text-white ${
                            currentPage === index + 1
                            ? 'bg-orange-600'
                            : 'bg-gray-800 hover:bg-gray-600'
                        }`}
                        >
                        {index + 1}
                        </button>
                    ))} */}
                </div>

            </div>
            
            <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-2 w-[90%] mx-auto">
                {currentFeaturedProducts.map((product, index) => (
                    <div key={index} className="relative w-full group  cursor-pointer" onClick={productDetail}>
                        <div className="md:left-2 md:top-2 pl-2">
                            <h3 className="text-stone-400 text-brandLabel">{product.brand}</h3>
                            <p className="text-body text-white py-1">{product.title}</p>
                        </div>

                        <div className="flex text-yellow-400 pl-2 pb-2">
                            <FontAwesomeIcon icon={solidStar} />
                            <FontAwesomeIcon icon={solidStar} />
                            <FontAwesomeIcon icon={solidStar} />
                            <FontAwesomeIcon icon={faStarHalfStroke} />
                            <FontAwesomeIcon icon={regularStar} />
                        </div>

                        <img
                            src={product.img}
                            alt={product.title}
                            className="w-full h-auto rounded object-contain"
                        />

                        <div className="md:left-2 md:top-2">
                            <p className="text-white py-1 pl-2 text-price">{product.price}</p>
                        </div>

                        {/* Plus icon - always visible */}
                        <div className="absolute bottom-3 right-2 group/icon bg-gray-900 w-8 hover:w-36 hover:bg-orange-600 p-2 rounded-full flex items-center overflow-hidden transition-all duration-500">
                            <FontAwesomeIcon
                                icon={faPlus}
                                className="text-white text-iconMedium"
                            />
                            <span className="text-white font-bold text-button ml-2 whitespace-nowrap opacity-0 group-hover/icon:opacity-100 transition-opacity duration-500">
                                Add to Cart
                            </span>
                        </div>


                        {/* Icons and animated line divider */}
                        <div className="absolute bottom-14 right-2 hidden group-hover:flex flex-col items-center gap-2 animate-slide-down">
                            <button
                            className="bg-gray-900 p-2 rounded-full text-white hover:text-red-500"
                            title="Wish list"
                            >
                            <FontAwesomeIcon icon={faHeart} className="text-iconMedium"/>
                            </button>

                            {/* Line divider with animation */}
                            <div className="w-8 border-t border-gray-700 transition-all duration-500 transform scale-x-0 group-hover:scale-x-100"></div>

                            <button
                            className="bg-gray-900 p-2 rounded-full text-white hover:text-orange-500 text-button"
                            title="View"
                            >
                            <FontAwesomeIcon icon={faEye} className="text-iconMedium"/>
                            </button>
                        </div>
                    </div>
                ))}
            </div>

        </div>
    );
};

export default FeaturedProduct;