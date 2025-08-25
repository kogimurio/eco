import React, { useState, useEffect } from 'react';
import Pagination from './Pagination';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faCalendarDays  } from "@fortawesome/free-solid-svg-icons";

const Blog = () => {
    const slides = [
        { image: "/01.jpg", title: "Winter is Here", content: "Stay warm.", userName: "John", date: "2023-10-01" },
        { image: "/02.jpg", title: "Streetwear 2023", content: "Trendy wear.", userName: "Emily", date: "2023-10-10" },
        { image: "/03.jpg", title: "Sustainable Fashion", content: "Go green.", userName: "Alex", date: "2023-11-01" },
        { image: "/04.jpg", title: "Accessories", content: "Elevate look.", userName: "Samantha", date: "2023-12-05" },
        { image: "/05.jpg", title: "New Arrivals", content: "Check them out.", userName: "Daniel", date: "2024-01-05" },
        { image: "/01.jpg", title: "Winter is Here", content: "Stay warm.", userName: "John", date: "2023-10-01" },
        { image: "/02.jpg", title: "Streetwear 2023", content: "Trendy wear.", userName: "Emily", date: "2023-10-10" },
        { image: "/03.jpg", title: "Sustainable Fashion", content: "Go green.", userName: "Alex", date: "2023-11-01" },
        { image: "/04.jpg", title: "Accessories", content: "Elevate look.", userName: "Samantha", date: "2023-12-05" },
        { image: "/05.jpg", title: "New Arrivals", content: "Check them out.", userName: "Daniel", date: "2024-01-05" }
    ];

    const [currentIndex, setCurrentIndex] = useState(0);
    const [itemsPerSlide, setItemsPerSlide] = useState(4);

    useEffect(() => {
        const handleResize = () => {
            const width = window.innerWidth;
            if (width < 640) {
                setItemsPerSlide(1);
            } else if (window.innerWidth < 768) {
                setItemsPerSlide(2); // Smaill tablets
            } else if (window.innerWidth < 1024) {
                setItemsPerSlide(3); // Desktop and above
            } else {
                setItemsPerSlide(4); // Large desktop
            }
        };
        handleResize();
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    const totalPages = Math.ceil(slides.length / itemsPerSlide);

    const handlePageChange = (pageNum) => {
        setCurrentIndex(pageNum - 1);
    };

    const nextSlide = () => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % totalPages);
    };

    useEffect(() => {
        const interval = setInterval(() => {
            nextSlide();
        }, 10000);
        return () => clearInterval(interval);
    }, [itemsPerSlide, totalPages]);

    const translateX = -(currentIndex * 100);

    return (
        <div className="w-[90%] mx-auto mt-4 overflow-hidden">
            <div className="flex justify-between items-center w-[90%] mx-auto my-4">
                <h2 className="text-white text-sectionHeading font-semibold whitespace-nowrap">Latest Blog</h2>
                <div className="hidden md:flex w-full max-w-xs md:max-w-md lg:max-w-lg mx-auto border-t border-gray-600 my-2"></div>
                <div className="flex items-center gap-2 mt-4 justify-center">
                    <Pagination 
                        currentPage={currentIndex + 1}
                        totalPages={totalPages}
                        onPageChange={handlePageChange}
                    />
                </div>
            </div>

            <div className="relative w-full overflow-hidden">
                <div 
                    className="flex transition-transform duration-700 ease-in-out"
                    style={{ transform: `translateX(${translateX}%)` }}
                >
                    {slides.map((slide, index) => (
                        <div 
                            key={index} 
                            className={`flex-shrink-0 w-full sm:w-1/2 md:w-1/2 lg:w-1/3 xl:w-1/4 p-2`}
                        >
                            <div className="bg-gray-800 flex flex-col rounded-lg shadow hover:shadow-lg transition">
                                <img src={slide.image} alt={slide.title} className="h-auto w-full object-contain rounded-md" />
                                <div className="p-2">
                                    <p className="text-body text-white">{slide.content}</p>
                                    <p className="text-orange-600 text-iconSmall">
                                       <FontAwesomeIcon icon={faUser} /> {slide.userName} - <FontAwesomeIcon icon={faCalendarDays} className="text-orange-400 px-1" />
                                        {new Date(slide.date).toLocaleDateString()}
                                    </p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Blog;
