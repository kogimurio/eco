import { faChevronRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { useState, useEffect } from 'react';

const Categories = () => {
    const categoryData = [
        {
            img: '/category-img-01__92702.original.jpg',
            title: 'Clearance',
            items: 13,
        },
        {
            img: '/category__47215.original.jpg',
            title: "Women's Fashion",
            items: 53,
        },
        {
            img: '/category-img-03__99914.original.jpg',
            title: 'Fashion Jewellery',
            items: 8,
        },
        {
            img: '/category-img-04__51045.original.jpg',
            title: 'Footwear',
            items: 20,
        },
        {
            img: '/category-img-05__29041.original.jpg',
            title: "Kid's Fashions",
            items: 1,
        },
        {
            img: '/category-img-07__56875.original.jpg',
            title: "Men's Fashion",
            items: 15,
        },
        {
            img: '/category-img-06__05690.original.jpg',
            title: "Shop All",
            items: 19,
        },
    ];
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(5);

    const indexOfLast = currentPage * itemsPerPage;
    const indexOfFirst = indexOfLast - itemsPerPage;
    const currentCategories = categoryData.slice(indexOfFirst, indexOfLast)

    const totalPages = Math.ceil(categoryData.length / itemsPerPage)

    const handlePageChange = (pageNum) => setCurrentPage(pageNum);

    // Dynamically adjust itemsPerPage based on screen width
    useEffect(() => {
        const updatedItemsPerPage = () => {
            if (window.innerWidth < 640) {
                setItemsPerPage(1); // Mobile
            } else if (window.innerWidth < 768) {
                setItemsPerPage(2); //Small tablets
            } else {
                setItemsPerPage(5); // Desktop and above
            }
        }

        updatedItemsPerPage(); // Set on mount

        window.addEventListener("resize", updatedItemsPerPage); // Update on resize

        return () => window.removeEventListener("resize", updatedItemsPerPage);
    }, []);

    
    return (
        <div className="bg-gray-700 mt-8 py-4 overflow-x-hidden">
            <div className="flex justify-between items-center w-[90%] mx-auto">
                <h2 className="text-white text-xl font-semibold">Shop Categories</h2>

                {/* Line Breaker */}
                <div className="w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg mx-auto border-t border-gray-800 my-2"></div>
                
                {/* Pagination */}
                <div className="flex gap-2">
                    {Array.from({ length:totalPages }, (_, i) => (
                        <button
                            key={i}
                            onClick={() => handlePageChange(i + 1)}
                            className={`px-4 py-1 rounded-md text-white ${
                                currentPage === i + 1 ? 'bg-orange-600' : 'bg-gray-800 hover:bg-gray-600'
                            }`}
                        >
                            {i + 1}
                        </button>
                    ))}
                </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 w-[90%] mx-auto gap-4">
                {currentCategories.map((currentCategory, index) => (
                    <div className="grid grid-cols-1 p-4">
                        <img
                            src={currentCategory.img}
                            alt={currentCategory.title}
                            className="rounded-full w-full object-cover cursor-pointer"
                        />
                        {/* Text Overlay */}
                        <div className="flex items-center bg-gray-700 py-4">
                            <div className="relative max-w-md w-[80%] mx-auto text-center">
                                <p className="md:text-[18px] font-semibold sm:text-3xl text-white">{currentCategory.title}</p>
                                <p className="text-sm sm:text-base text-white mt-1 flex items-center justify-center gap-2">
                                    {currentCategory.items} <FontAwesomeIcon icon={faChevronRight} className="text-white" />
                                </p>
                            </div>
                        </div>
                    </div>
                ))}
                
            </div>
        </div>
    )
}

export default Categories;