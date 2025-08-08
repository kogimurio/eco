import {useState} from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faMinus } from "@fortawesome/free-solid-svg-icons";

export default function Links() {
    const [isInfoOpen, setIsInfoOpen] = useState(false);
    const [isNavOpen, setIsNavOpen] = useState(false);
    const [isCategoriesOpen, setIsCategoriesOpen] = useState(false);
    return (
        <div className="bg-gray-900">
            <div className="w-[90%] mx-auto grid grid-cols-1 lg:grid-cols-4 gap-4">
                {/* Info */}
                <div className="mt-4">
                    <div className="flex justify-between items-center cursor-pointer" onClick={() => setIsInfoOpen(!isInfoOpen)}>
                        <h6 className="text-white text-lg font-semibold mb-4">Info</h6>
                        <span className="lg:hidden text-white">
                            <FontAwesomeIcon icon={isInfoOpen ? faMinus : faPlus} />
                        </span>
                    </div>
                    
                    {/* mobile toggle content */}
                    <div className={`${isInfoOpen ? 'block' : 'hidden'} lg:hidden`}>
                        <p className="text-stone-400 text-sm mb-1">
                            Nairobi, Kenya <br />
                            Roysambu <br />
                            Lumumba Drive <br />
                        </p>
                        <p className="text-stone-400 text-sm mb-1">
                            kogimurio@gmail.com
                        </p>
                        <p className="text-stone-400 text-sm mb-1">
                            +254 712 345 678 <br />
                            +254 712 345 678
                        </p>
                    </div>

                    {/* desktop toggle content */}
                    <div className='hidden lg:flex flex-col'>
                        <p className="text-stone-400 text-sm mb-1">
                            Nairobi, Kenya <br />
                            Roysambu <br />
                            Lumumba Drive <br />
                        </p>
                        <p className="text-stone-400 text-sm mb-1">
                            fashionova.com
                        </p>
                        <p className="text-stone-400 text-sm mb-1">
                            +254 712 345 678 <br />
                            +254 712 345 876
                        </p>
                    </div>
                </div>
                {/* Nav */}
                <div className="mt-4">
                    <div className="flex justify-between items-center cursor-pointer" onClick={() => setIsNavOpen(!isNavOpen)}>
                        <h6 className="text-white text-lg font-semibold mb-4">Navigation</h6>
                        <span className="lg:hidden text-white">
                            <FontAwesomeIcon icon={isNavOpen ? faMinus : faPlus} />
                        </span>
                    </div>
                    {/* Mobile toggle */}
                    <div className={`${isNavOpen ? 'flex flex-col' : 'hidden'} lg:hidden`}>
                        <a href='*' className="text-stone-400 text-sm mb-1">About Us</a>
                        <a href='*' className="text-stone-400 text-sm mb-1">Affiliate</a>
                        <a href='*' className="text-stone-400 text-sm mb-1">Return Policy</a>
                        <a href='*' className="text-stone-400 text-sm mb-1">Shipping & Return</a>
                        <a href='*' className="text-stone-400 text-sm mb-1">Contact Us</a>
                        <a href='*' className="text-stone-400 text-sm mb-1">Blog</a>
                        <a href='*' className="text-stone-400 text-sm mb-1">Sitemap</a>
                    </div>

                    {/* Desktop */}
                    <div className="hidden lg:flex flex-col justify-center">
                        <a href='*' className="text-stone-400 text-sm mb-1">About Us</a>
                        <a href='*' className="text-stone-400 text-sm mb-1">Affiliate</a>
                        <a href='*' className="text-stone-400 text-sm mb-1">Return Policy</a>
                        <a href='*' className="text-stone-400 text-sm mb-1">Shipping & Return</a>
                        <a href='*' className="text-stone-400 text-sm mb-1">Contact Us</a>
                        <a href='*' className="text-stone-400 text-sm mb-1">Blog</a>
                        <a href='*' className="text-stone-400 text-sm mb-1">Sitemap</a>
                    </div>
                </div>

                {/* Categories */}
                <div className="mt-4">
                    <div className="flex justify-between items-center cursor-pointer" onClick={() => setIsCategoriesOpen(!isCategoriesOpen)}>
                        <h6 className="text-white text-lg font-semibold mb-4">Categories</h6>
                        <span className="lg:hidden text-white">
                            <FontAwesomeIcon icon={isCategoriesOpen ? faMinus : faPlus} />
                        </span>
                    </div>
                    {/* Mobile toggle */}
                    <div className={`${isCategoriesOpen ? 'flex flex-col' : 'hidden'}`}>
                        <a href='*' className="text-stone-400 text-sm mb-1">Women's Fashion</a>
                        <a href='*' className="text-stone-400 text-sm mb-1">Men's Fashion</a>
                        <a href='*' className="text-stone-400 text-sm mb-1">Kid's Fashion</a>
                        <a href='*' className="text-stone-400 text-sm mb-1">Clearance</a>
                        <a href='*' className="text-stone-400 text-sm mb-1">Footware</a>
                        <a href='*' className="text-stone-400 text-sm mb-1">Fashion Jewellery</a>
                    </div>

                    {/* Desktop */}
                    <div className="hidden lg:flex flex-col justify-center">
                        <a href='*' className="text-stone-400 text-sm mb-1">Women's Fashion</a>
                        <a href='*' className="text-stone-400 text-sm mb-1">Men's Fashion</a>
                        <a href='*' className="text-stone-400 text-sm mb-1">Kid's Fashion</a>
                        <a href='*' className="text-stone-400 text-sm mb-1">Clearance</a>
                        <a href='*' className="text-stone-400 text-sm mb-1">Footware</a>
                        <a href='*' className="text-stone-400 text-sm mb-1">Fashion Jewellery</a>
                    </div>
                </div>

                {/* Brand Logos */}
                <div className="mt-4 mb-4">
                    <div className="flex lg:flex-row gap-2 flex-wrap items-center">
                        <a href="https://www.adidas.com" target="_blank" rel="noopener noreferrer">
                        <img src="/adidas-logo-3.svg" alt="Adidas" className="w-auto h-10 rounded object-contain hover:scale-105 transition-transform" />
                        </a>
                        <a href="https://www.chanel.com" target="_blank" rel="noopener noreferrer">
                        <img src="/Chanel-logo-3.svg" alt="Chanel" className="w-auto h-10 rounded object-contain hover:scale-105 transition-transform" />
                        </a>
                        <a href="https://www.dior.com" target="_blank" rel="noopener noreferrer">
                        <img src="/Dior-Logo.svg" alt="Dior" className="w-auto h-10 rounded object-contain hover:scale-105 transition-transform" />
                        </a>
                        <a href="https://www.gucci.com" target="_blank" rel="noopener noreferrer">
                        <img src="/gucci-logo-3.svg" alt="Gucci" className="w-auto h-10 rounded object-contain hover:scale-105 transition-transform" />
                        </a>
                        <a href="https://www2.hm.com" target="_blank" rel="noopener noreferrer">
                        <img src="/HM-Logo.svg" alt="H&M" className="w-auto h-10 rounded object-contain hover:scale-105 transition-transform" />
                        </a>
                        <a href="https://www.kappa-usa.com" target="_blank" rel="noopener noreferrer">
                        <img src="/kappa-logo-2.svg" alt="Kappa" className="w-auto h-10 rounded object-contain hover:scale-105 transition-transform" />
                        </a>
                        <a href="https://www.louisvuitton.com" target="_blank" rel="noopener noreferrer">
                        <img src="/louis-vuitton-logo-1.svg" alt="Louis Vuitton" className="w-auto h-10 rounded object-contain hover:scale-105 transition-transform" />
                        </a>
                        <a href="https://www.nike.com" target="_blank" rel="noopener noreferrer">
                        <img src="/nike-logo-1.svg" alt="Nike" className="w-auto h-10 rounded object-contain hover:scale-105 transition-transform" />
                        </a>
                        <a href="https://www.zara.com" target="_blank" rel="noopener noreferrer">
                        <img src="/Zara-Logo-2.svg" alt="Zara" className="w-auto h-10 rounded object-contain hover:scale-105 transition-transform" />
                        </a>
                        <a href="https://www.puma.com" target="_blank" rel="noopener noreferrer">
                        <img src="/PUMA-Logo-1.svg" alt="PUMA" className="w-auto h-10 rounded object-contain hover:scale-105 transition-transform" />
                        </a>
                    </div>
                </div>
            </div>
        </div>
    )
}