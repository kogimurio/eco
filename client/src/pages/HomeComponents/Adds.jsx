import { faChevronRight } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

const Adds = () => {
    return (
        <>
            <div className="grid w-full grid-cols-1 mt-2">
                <div className="relative w-full">
                    <img
                        src="/top-banner-01.jpg"
                        alt='banner-bag'
                        className="rounded w-full object-contain p-0 h-[190px]"
                    />
                    <div className="absolute left-10 top-20 md:left-1 md:top-0.5 lg:left-1 lg:top-1 xl:left-4 xl:top-8">
                        <h3 className="text-stone-200 text-brandLabe leading-10 tracking-wide truncate">New Sale</h3>
                        <p className="text-body text-white font-semibold truncate">Backpack</p>
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
                <div className="relative w-full mt-2">
                    <img
                        src="/top-banner-02.jpg"
                        alt='banner-bag'
                        className="rounded w-full object-contain p-0 h-[190px]"
                    />
                    <div className="absolute left-28 top-14 md:left-3 md:top-0.5 lg:left-6 lg:top-1 xl:left-14 xl:top-8">
                        <h3 className="text-stone-200 text-brandLabe leading-10 tracking-wide truncate">New Arrivals</h3>
                        <p className="text-body text-white font-semibold truncate">Styles Shoes</p>
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
                
        </>
    )
}

export default Adds;