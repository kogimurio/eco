import React, { useState, useEffect } from 'react';
import { faChevronRight, faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Carousel = () => {
    const slides = [
        {
            image: "/slider-01.jpg",
            heading: "STYLES WEAR",
            paragraph: "New Brands Cloth Incoming",
            buttonText: "Shop Now",
            alignment: "left",
        },
        {
            image: "/slider-02.jpg",
            heading: "NEW ARRIVALS",
            paragraph: "Winter Jackets Collection",
            buttonText: "Shop Now",
            alignment: "left",
        },
        {
            image: "/slider-03.jpg",
            heading: "BID DISCOUNT",
            paragraph: "The Pretty Styles Wear",
            buttonText: "Shop Now",
            alignment: "right",
        }
    ];
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIndex(prevIndex => (prevIndex + 1) % slides.length);
        }, 5000);

        return () => clearInterval(interval); // Cleanup on unmount
    }, [slides.length])

    const prevSlide = () => {
        setCurrentIndex((currentIndex - 1 + slides.length) % slides.length);
    };

    const nextSlide = () => {
        setCurrentIndex((currentIndex + 1) % slides.length);
    };

    const { image, heading, paragraph, buttonText, alignment } = slides[currentIndex];

    // Tailwind classes based on alignment
    const alignmentClasses = {
        left: "justify-start text-left pl-8",
        center: "justify-center text-center",
        right: "justify-end text-right pr-8"
    };

    return (
        <div className='w-full mx-auto p-2 bg-gray-800 rounded shadow'>
            <div className='relative bg-gray-800 rounded group overflow-hidden'>
                <img
                    src={image}
                    alt={`slide-${currentIndex}`}
                    className="rounded h-[360px] w-full object-cover cursor-pointer"
                />
                {/* Text Overlay */}
                <div className={`absolute inset-0 flex items-center bg-black bg-opacity-30 ${alignmentClasses[alignment]}`}>
                    <div className="relative max-w-md space-y-4">
                        <h3 className="text-2xl sm:text-4xl font-bold text-white">{heading}</h3>
                        <p className="text-white text-base sm:text-lg">{paragraph}</p>
                        <button className="mt-2 px-5 py-2 text-white bg-orange-800 font-semibold rounded-lg hover:bg-gray-100 hover:text-gray-950 hover:w-40 transition">
                            {buttonText}
                        </button>
                    </div>
                </div>

                <button
                    onClick={prevSlide}
                    className='absolute hidden group-hover:flex left-9 top-1/2 -translate-y-1/2 translate-x-[-0.5rem] group-hover:translate-x-5 transition-all duration-300 ease-in-out px-4 py-2 bg-gray-700 bg-opacity-50 text-white rounded-lg hover:bg-opacity-70'
                >
                    <FontAwesomeIcon icon={faChevronLeft} className="text-white text-lg" />
                </button>
                <button
                    onClick={nextSlide}
                    className='absolute hidden group-hover:flex right-16 top-1/2 -translate-y-1/2 translate-x-[-0.5rem] group-hover:translate-x-5 transition-all duration-300 ease-in-out px-4 py-2 bg-gray-700 bg-opacity-50 text-white rounded-lg hover:bg-opacity-70'
                    
                >
                    <FontAwesomeIcon icon={faChevronRight} className="text-white text-lg" /> 
                </button>
            </div>
            <div className='flex justify-center space-x-4'>
                
                
            </div>
        </div>
    );
};

export default Carousel;