import { faChevronRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const BottomBanner = () => {
    return (
        <div className="bg-gray-800 w-[90%] mx-auto mt-6">
            <div className="grid sm:grid-cols-1 grid-cols-1 md:grid-cols-2 gap-4">
                <div className="relative w-full">
                    <img
                        src="/bottom-banner-01.jpg"
                        alt="banner-bag"
                        className="rounded object-contain p-0 w-full"
                    />

                    <div className="absolute left-52 top-2 sm:left-52 sm:top-2 md:left-52 md:top-1 lg:left-80 lg:top-4 xl:left-[400px] xl:top-16">
                        <h3 className="text-stone-200 text-brandLabe leading-10 tracking-wide">Big Discounts</h3>
                        <p className="text-body text-white font-semibold">Pretty Lifestyle</p>

                        <div className="group relative flex items-center mt-2 w-fit">
                            <button className="w-24 origin-left hover:w-28 bg-gray-600 text-white px-2 py-1 text-button rounded-xl hover:bg-orange-700 transition-all">
                                Shop Now
                            </button>
                            <FontAwesomeIcon
                                icon={faChevronRight}
                                className="absolute left-20 top-1/2 -translate-y-1/2 w-3 h-3 text-white bg-orange-600 rounded-full p-2 transition-all duration-300 ease-in-out group-hover:translate-x-1 group-hover:bg-gray-600"
                            />
                        </div>
                    </div>
                </div>
                <div className="relative w-full">
                    <img
                        src="/bottom-banner-02.jpg"
                        alt="banner-bag"
                        className="rounded object-contain p-0 w-full"
                    />

                    <div className="absolute left-52 top-2 sm:left-52 sm:top-2 md:left-52 md:top-1 lg:left-80 lg:top-4 xl:left-[400px] xl:top-16">
                        <h3 className="text-stone-200 text-brandLabe leading-10 tracking-wide truncate">Save 45% OFF</h3>
                        <p className="text-body text-white font-semibold truncate">Women's Bag</p>

                        <div className="group relative flex items-center mt-2 w-fit">
                            <button className="w-24 origin-left hover:w-28 bg-gray-600 text-white px-2 py-1 text-button rounded-xl hover:bg-orange-700 transition-all">
                                Shop Now
                            </button>
                            <FontAwesomeIcon
                                icon={faChevronRight}
                                className="absolute left-20 top-1/2 -translate-y-1/2 w-3 h-3 text-white bg-orange-600 rounded-full p-2 transition-all duration-300 ease-in-out group-hover:translate-x-1 group-hover:bg-gray-600"
                            />
                        </div>

                    </div>
                </div>
            
            </div>
            
        </div>
    )
};

export default BottomBanner;