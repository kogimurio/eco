import { faChevronLeft, faChevronRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';

import LoadingSpinner from '../LoadingSpinner';


const BASE_URL = process.env.REACT_APP_BASE_URL;

const BASE_IMAGE_URL = process.env.REACT_APP_BASE_URL_IMAGE;

const Categories = () => {
    const [categoryData, setCategoryData] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(5);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchCategories = async() => {
            try {
                const response = await axios.get(`${BASE_URL}/category`)
                setCategoryData(response.data.category);
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

    const indexOfLast = currentPage * itemsPerPage;
    const indexOfFirst = indexOfLast - itemsPerPage;
    const currentCategories = categoryData.slice(indexOfFirst, indexOfLast)

    const totalPages = Math.ceil(categoryData.length / itemsPerPage)

    const handlePageChange = (pageNum) => setCurrentPage(pageNum);

    // Dynamically adjust itemsPerPage based on screen width
    useEffect(() => {
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

        window.addEventListener("resize", updatedItemsPerPage); // Update on resize

        return () => window.removeEventListener("resize", updatedItemsPerPage);
    }, []);

    const handleCategory = (slug)=> {
        navigate(`/category/${slug}`)
    }

    
    return (
        <div className="bg-gray-700 mt-8 py-4 overflow-x-hidden">
            <div className="flex justify-between items-center w-[90%] mx-auto">
                <h2 className="text-white text-lg sm:text-xl md:text-2xl lg:3xl xl:sectionHeading font-semibold">Shop Categories</h2>

                {/* Line Breaker */}
                <div className="hidden md:flex w-full max-w-xs md:max-w-md lg:max-w-lg mx-auto border-t border-gray-600 my-2"></div>
                
                {/* Pagination */}
                <div className="flex items-center gap-2 mt-2 justify-center">
                    <button
                        onClick={() => currentPage > 1 && handlePageChange(currentPage - 1)}
                        disabled={currentPage === 1}
                        className="bg-gray-800 hover:bg-gray-600 text-white px-3 py-1 rounded-md disabled:opacity-50"
                        title="Previous"
                    >
                        <FontAwesomeIcon icon={faChevronLeft} />
                    </button>
                    <button
                        onClick={() => currentPage < totalPages && handlePageChange(currentPage + 1)}
                        disabled={currentPage === totalPages}
                        className="bg-gray-800 hover:bg-gray-600 text-white px-3 py-1 rounded-md disabled:opacity-50"
                        title="Next"
                    >
                        <FontAwesomeIcon icon={faChevronRight} />
                    </button>
                </div>
            </div>
            {loading ? (
                <div className="flex justify-center">
                    <LoadingSpinner size="40" />
                </div>
            ) : (
                <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-2 w-[90%] mx-auto">
                    {currentCategories.map((currentCategory, index) => (
                        <div className="grid grid-cols-1 p-4">
                            <img
                                src={`${BASE_IMAGE_URL}/${currentCategory.image}`}
                                alt={currentCategory.name}
                                className="rounded-full w-full object-cover cursor-pointer"
                                onClick={() => handleCategory(currentCategory.slug)}
                                // onLoad={() => console.log("Image loaded:", `${BASE_IMAGE_URL}/${currentCategory.image}`)}
                                // onError={() => console.error("Image failed:", `${BASE_IMAGE_URL}/${currentCategory.image}`)}
                            />
                            {/* Text Overlay */}
                            <div className="flex items-center bg-gray-700 py-4">
                                <div className="relative max-w-md w-[80%] mx-auto text-center">
                                    <p className="font-semibold text-productTitle text-white">{currentCategory.name}</p>
                                    <p className="text-sprice text-white mt-1 flex items-center justify-center gap-2">
                                        {currentCategory.productCount} <FontAwesomeIcon icon={faChevronRight} className="w-3 h-3 text-white bg-gray-600 rounded-full p-2 text-iconMedium" />
                                    </p>
                                </div>
                            </div>
                        </div>
                    ))}
                    
                </div>
            )}
            
        </div>
    );
}

export default Categories;