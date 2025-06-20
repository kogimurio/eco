import { faPlus, faEye } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { useState, useEffect } from 'react';
import { faHeart } from "@fortawesome/free-regular-svg-icons";
import Pagination from "./Pagination";
import { faStar as solidStar, faStarHalfStroke } from "@fortawesome/free-solid-svg-icons";
import { faStar as regularStar } from "@fortawesome/free-regular-svg-icons";


const BestSellers = () => {
    const FeaturedProductData = [
        {
            img: '/20__80554.jpg',
            title: 'Poplin Flounce Dress',
            price: '$509.00',
            brand: 'Sagaform'
        },
        {
            img: '/18__10246.jpg',
            title: 'Printed Paperbag Jeans',
            price: '$649.00',
            brand: 'Panasonic'
        },
        {
            img: '/16__10413.jpg',
            title: 'Pleated Plumetis Dress',
            price: '$749.95',
            brand: 'Mountain Climbing'
        },
        {
            img: '/19__21358.jpg',
            title: 'Contrast Blouse With Elastic',
            price: '$225.99',
            brand: 'OFS'
        },
        {
            img: '/05__85237.jpg',
            title: 'Printed Cut-out Top',
            price: '$200.95',
            brand: 'Panasonic'
        },
        {
            img: '/11__98713.jpg',
            title: 'Flowing Satin Shirt',
            price: '$519.00',
            brand: 'OFS'
        }
    ];
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(4);

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
            } else if (window.innerWidth > 394 && window.innerWidth < 640) {
                setItemsPerPage(2); // Smaill tablets
            } else if (window.innerWidth < 768) {
                setItemsPerPage(2); // Smaill tablets
            } else if (window.innerWidth < 1024) {
                setItemsPerPage(3); // Desktop and above
            } else if (window.innerWidth < 1440) {
                setItemsPerPage(4); // Large desktop
            } else {
                setItemsPerPage(5); // Extra large desktop
            }
        }

        updatedItemsPerPage(); // Set on mount

        window.addEventListener("resize", updatedItemsPerPage); // Updated on resize

        return () => window.removeEventListener("resize", updatedItemsPerPage); // Cleanup
    }, []);

    return (
        <div className="bg-gray-800 mt-8 py-4 overflow-x-hidden">
            <div className="flex justify-between items-center w-[90%] mx-auto my-4">
                <h2 className="text-white text-sectionHeading font-semibold whitespace-nowrap">Best Sellers</h2>

                {/* Line Breaker */}
                <div className="w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg mx-auto border-t border-gray-600 my-2"></div>
                
                {/* Pagination */}
                <div className="flex items-center gap-2 mt-4 justify-center">
                    <Pagination 
                        currentPage={currentPage}
                        totalPages={totalPages}
                        onPageChange={handlePageChange}
                    />
                </div>
            </div>
            
            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-2 w-[90%] mx-auto">
            {currentFeaturedProducts.map((product, index) => (
                <div key={index} className="relative w-full group cursor-pointer">
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
                        <FontAwesomeIcon icon={faHeart} className="text-iconMedium" />
                        </button>

                        {/* Line divider with animation */}
                        <div className="w-8 border-t border-gray-700 transition-all duration-500 transform scale-x-0 group-hover:scale-x-100"></div>

                        <button
                        className="bg-gray-900 p-2 rounded-full text-white hover:text-orange-500"
                        title="View"
                        >
                        <FontAwesomeIcon icon={faEye} className="text-iconMedium" />
                        </button>
                    </div>
                </div>
            ))}
            </div>

        </div>
    );
};

export default BestSellers;