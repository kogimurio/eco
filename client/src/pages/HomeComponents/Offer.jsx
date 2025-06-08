import React, { useState, useEffect } from 'react';
import { faChevronRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Offer = () => {
    const slides = [
        { image: "/offer-img-01.jpg", title: "SONY PS5", offer: "Up to 30%" },
        { image: "/offer-img-02.jpg", title: "SAMSUNG GALAXY S24", offer: "Up to 30%" },
        { image: "/offer-img-03.jpg", title: 'LG TV 32"', offer: "Up to 30%" },
        { image: "/offer-img-04.jpg", title: 'LG TV 50"', offer: "Up to 40%" },
        { image: "/offer-img-05.jpg", title: 'LG TV 65"', offer: "Up to 45%" },
    ];

    const [currentIndex, setCurrentIndex] = useState(0);
    const [itemsPerSlide, setItemsPerSlide] = useState(1);

    useEffect(() => {
        const handleResize = () => {
            const width = window.innerWidth;
            if (width < 640) {
                setItemsPerSlide(1); // mobile
            } else if (width < 768) {
                setItemsPerSlide(2); // tablet
            } else {
                setItemsPerSlide(3); // desktop
            }
        };

        handleResize(); // set initially
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    const nextSlide = () => {
        setCurrentIndex((prevIndex) =>
            (prevIndex + itemsPerSlide) % slides.length
        );
    };

    const prevSlide = () => {
        setCurrentIndex((prevIndex) =>
            (prevIndex - itemsPerSlide + slides.length) % slides.length
        );
    };

    useEffect(() => {
        const interval = setInterval(() => {
            nextSlide();
        }, 4000);
        return () => clearInterval(interval);
    }, [itemsPerSlide]);

    const visibleSlides = slides.slice(currentIndex, currentIndex + itemsPerSlide);
    const displaySlides =
        visibleSlides.length < itemsPerSlide
            ? [...visibleSlides, ...slides.slice(0, itemsPerSlide - visibleSlides.length)]
            : visibleSlides;

    return (
        <div className="w-[90%] mx-auto">
            {/* <div className="flex justify-between items-center mb-4">
                <button onClick={prevSlide} className="px-3 py-1 bg-gray-700 text-white rounded hover:bg-gray-600">Prev</button>
                <button onClick={nextSlide} className="px-3 py-1 bg-gray-700 text-white rounded hover:bg-gray-600">Next</button>
            </div> */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 mt-4 gap-4">
                {displaySlides.map((slide, index) => (
                    <div key={index} className="bg-gray-800 flex align-center justify-center rounded-lg shadow hover:shadow-lg transition">
                        <img
                            src={slide.image}
                            alt={slide.title}
                            className="h-32 object-contain rounded-md mr-10"
                        />
                        <div className="flex flex-col align-center justify-center">
                            <p className="font-bold text-white">{slide.title}</p>
                            <p className="text-orange-600">
                                {slide.offer}
                                <FontAwesomeIcon icon={faChevronRight} className="text-white ml-1" />
                            </p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Offer;
