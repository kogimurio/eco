import React, { useState, useEffect } from 'react';

const Carousel = () => {
    const slides = [
        "/slider-01.jpg",
        "/slider-02.jpg",
        "/slider-03.jpg",
    ];
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIndex(prevIndex => (prevIndex + 1) % slides.length);
        }, 4000);

        return () => clearInterval(interval); // Cleanup on unmount
    }, [slides.length])

    const prevSlide = () => {
        setCurrentIndex((currentIndex - 1 + slides.length) % slides.length);
    };

    const nextSlide = () => {
        setCurrentIndex((currentIndex + 1) % slides.length);
    };

    return (
        <div className='w-full mx-auto p-2 bg-gray-800 rounded shadow'>
            <div className='relative bg-gray-800 rounded'>
                <img
                    src={slides[currentIndex]}
                    alt={`slide-${currentIndex}`}
                    className="rounded h-[360px] w-full object-cover"
                />
                <button
                    onClick={prevSlide}
                    className='absolute left-4 top-1/2 transform -translate-y-1/2 px-4 py-2 bg-gray-700 bg-opacity-50 text-white rounded-lg hover:bg-opacity-70'
                >
                    {'<'}
                </button>
                <button
                    onClick={nextSlide}
                    className='absolute right-4 top-1/2 transform -translate-y-1/2 px-4 py-2 bg-gray-700 bg-opacity-50 text-white rounded-lg hover:bg-opacity-70'
                >
                    &gt; 
                </button>
            </div>
            <div className='flex justify-center space-x-4'>
                
                
            </div>
        </div>
    );
};

export default Carousel;