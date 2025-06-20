import Subscrip from "./Subscrip";
import Links from "./Links";
import OffersCarousel from './OfferCarousel';
import PaymentMethods from './PaymentMethods';
import CopyRights from './Copyrights';
import React, { useState, useEffect } from 'react';

const Footer = () => {
    const slides = [
        {
        image: "https://www.w3schools.com/howto/img_avatar2.png",
        content: "Absolutely love the styles here! Super trendy and affordable.",
        name: "Sarah M."
    },
    {
        image: "https://www.w3schools.com/howto/img_avatar.png",
        content: "Great customer service and fast delivery. My go-to fashion store!",
        name: "Michael K."
    },
    {
        image: "https://www.w3schools.com/howto/img_avatar2.png",
        content: "I’m impressed by the variety. There’s something new every time I visit.",
        name: "Emily R."
    },
    {
        image: "https://www.w3schools.com/howto/img_avatar.png",
        content: "Quality meets affordability. I bought a jacket that’s lasted for seasons!",
        name: "James T."
    },
    {
        image: "https://www.w3schools.com/howto/img_avatar2.png",
        content: "Easy shopping experience and great fit on all my orders.",
        name: "Laura B."
    },
    {
        image: "https://www.w3schools.com/howto/img_avatar.png",
        content: "Stylish, modern, and always on point. Highly recommend Fashionova!",
        name: "Chris D."
    }
    ];

    const [currentIndex, setCurrentIndex] = useState(0);
    const [itemsPerSlide, setItemsPerSlide] = useState(1);

    const nextSlide = () => {
        setCurrentIndex((prevIndex) =>
            (prevIndex + itemsPerSlide) % slides.length
        );
    }

    const prevSlide = () => {
        setCurrentIndex((prevSlide) => 
        (prevSlide - itemsPerSlide + slides.length) % slides.length
        )
    }

    useEffect(() => {
        const interval = setInterval(()=> {
            nextSlide();
        }, [itemsPerSlide * 6000]);
        return () => clearInterval(interval);
    }, [itemsPerSlide]);

    const visibleSlides = slides.slice(currentIndex, currentIndex + itemsPerSlide);
    const displaySlides = 
        visibleSlides.length < itemsPerSlide
        ? [...visibleSlides, ...slides.slice(0, itemsPerSlide - visibleSlides.length)]
        : visibleSlides;

        
    return (
        <>
            <div className="bg-gray-900 text-white w-full py-8">
                <div className="grid grid-cols-1 lg:grid-cols-[3fr_1fr] xl:grid-cols-[3fr_1fr] w-[90%] mx-auto gap-8">
                    
                    {/* Testimonial Section */}
                    {displaySlides.map((slide, index) => (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        
                        {/* User Info */}
                        <div className="flex items-center p-4">
                            <img
                                src={slide.image}
                                alt={slide.name}
                                className="w-24 h-24 object-cover rounded-full mr-4 border-2 border-white"
                            />
                            <p className="text-lg font-semibold">{slide.name}</p>
                        </div>

                        {/* Testimonial Quote */}
                        <div className="flex items-center justify-center p-4">
                            <p className="text-base italic text-center max-w-md">
                                {slide.content}
                            </p>
                        </div>
                    </div>
                    ))}
                    
                    {/* Download App Section */}
                    <div className="flex flex-col items-center justify-center gap-6">
                    <h3 className="text-xl font-semibold mb-2">Download App</h3>

                    <div className="grid grid-cols-2 lg:grid-cols-1 xl:grid-cols-2 gap-4 w-full">
                            <img
                                src="app-store-badge.svg"
                                alt="App Store"
                                className="h-14 w-full object-contain"
                            />
                            <img
                                src="https://upload.wikimedia.org/wikipedia/commons/7/78/Google_Play_Store_badge_EN.svg"
                                alt="Google Play"
                                className="h-14 w-full object-contain"
                            />
                    </div>
                </div>
                </div>
            </div>
            <Subscrip />
            <Links />
            <OffersCarousel />
            <PaymentMethods />
            <CopyRights />
        </>
    );
}

export default Footer;
