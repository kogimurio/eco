import { faChevronRight } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

const Adds = () => {
    return (
        <>
            <div className="grid w-[80%] grid-cols-1 mt-2 mx-auto">
                <div className="relative w-full">
                    <img
                        src="/top-banner-01.jpg"
                        alt='banner-bag'
                        className="rounded w-full object-contain p-0"
                    />
                    <div className="absolute left-16 top-20 md:left-3 md:top-6">
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
                <div className="relative w-full mt-4">
                    <img
                        src="/top-banner-02.jpg"
                        alt='banner-bag'
                        className="rounded w-full object-contain p-0"
                    />
                    <div className="absolute left-28 top-6 md:left-12 md:top-1">
                        <h3 className="text-xl md:text-lg text-white">New Arrivals</h3>
                        <p className="text-lg text-white font-bold">Styles Shoes</p>
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
                
        </>
    )
}

export default Adds;