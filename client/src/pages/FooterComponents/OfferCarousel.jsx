import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeadset, faTags, faDollarSign, faPlane  } from "@fortawesome/free-solid-svg-icons";
import React, { useState, useEffect } from 'react';

export default function OffersCarousel() {
    const slides = [
        {
            icon: faDollarSign,
            title: "Big Saving",
            subtitle: "At Lower Prices"
        },
        {
            icon: faHeadset,
            title: "Best Support",
            subtitle: "24/7 Support"
        },
        {
            icon: faTags,
            title: "Save 15%",
            subtitle: "When You Use Your Card"
        },
        {
            icon: faPlane,
            title: "Free Delivery",
            subtitle: "Worldwide"
        }
    ];

    const [currentIndex, setCurrentIndex] = useState(0);
    const [itemsPerSlide, setItemsPerSlide] = useState(1);

    useEffect(() => {
        const handleResize = () => {
            const width = window.innerWidth;
            if (width < 768) {
                setItemsPerSlide(1);
            } else if (width < 1024) {
                setItemsPerSlide(2);
            } else {
                setItemsPerSlide(3);
            }
        };
        handleResize();
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    const nextSlide = () => {
        setCurrentIndex((prevIndex) =>
            (prevIndex + itemsPerSlide) % slides.length
        );
    };

    useEffect(() => {
        const interval = setInterval(() => {
            nextSlide();
        }, itemsPerSlide * 1000);
        return () => clearInterval(interval);
    }, [itemsPerSlide]);

    const visibleSlides = slides.slice(currentIndex, currentIndex + itemsPerSlide);
    const displaySlides =
        visibleSlides.length < itemsPerSlide
            ? [...visibleSlides, ...slides.slice(0, itemsPerSlide - visibleSlides.length)]
            : visibleSlides;

    return (
        <div className="bg-gray-800 text-white w-full py-6">
            <div className="bg-gray-950 flex w-[90%] mx-auto gap-4 flex-wrap justify-center">
                {displaySlides.map((slide, index) => (
                    <div key={index} className=" rounded px-6 py-4 flex items-center gap-4 shadow-md w-full sm:w-[calc(50%-1rem)] md:w-[calc(33%-1rem)]">
                        <FontAwesomeIcon icon={slide.icon} className="text-2xl text-orange-400" />
                        <div>
                            <h6 className="font-semibold text-white">{slide.title}</h6>
                            <p className="text-sm text-stone-400">{slide.subtitle}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
