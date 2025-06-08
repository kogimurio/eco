import { faChevronRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const SubBanner = () => {
    return (
        <div className="bg-gray-800 w-[90%] mx-auto mt-6">
            <div className="grid sm:grid-cols-1 grid-cols-1 md:grid-cols-3 gap-4">
                <div className="relative w-full">
                    <img
                        src="/sub-banner-01.jpg"
                        alt='banner-bag'
                        className="rounded object-contain p-0"
                    />
                    <div className="absolute left-12 top-20 md:left-2 md:top-2">
                        <h3 className="text-lg text-white">New Sale</h3>
                        <p className="text-lg text-white font-bold">Backpack</p>
                        <div className="group relative flex items-center mt-2 w-fit">
                            <button className="w-24 origin-left hover:w-28 bg-gray-600 text-white px-2 py-1 text-sm rounded-xl hover:bg-orange-700 transition-all">
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
                        src="/sub-banner-02.jpg"
                        alt='banner-bag'
                        className="rounded object-contain p-0"
                    />
                    <div className="absolute left-12 top-20 md:left-2 md:top-2">
                        <h3 className="text-lg text-white">New Sale</h3>
                        <p className="text-lg text-white font-bold">Backpack</p>
                        <div className="group relative flex items-center mt-2 w-fit">
                            <button className="w-24 origin-left hover:w-28 bg-gray-600 text-white px-2 py-1 text-sm rounded-xl hover:bg-orange-700 transition-all">
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
                        src="/sub-banner-03.jpg"
                        alt='banner-bag'
                        className="rounded object-contain p-0"
                    />
                    <div className="absolute left-12 top-16 md:left-2 md:top-2">
                        <h3 className="text-lg text-white">New Sale</h3>
                        <p className="text-lg text-white font-bold">Backpack</p>
                        <div className="group relative flex items-center mt-2 w-fit">
                            <button className="w-24 origin-left hover:w-28 bg-gray-600 text-white px-2 py-1 text-sm rounded-xl hover:bg-orange-700 transition-all">
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

export default SubBanner;