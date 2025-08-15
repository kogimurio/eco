import Carousel from "../CarouselComponents/Carousel";
import MinTaskBar from "./MinTaskBar";
import Offer from "./Offer";
import Adds from './Adds';
import Categories from './Categories';
import SubBanner from './SubBanner';
import FeaturedProduct from './FeaturedProduct';
import Clearance from "./Clearance";
import BestSellers from "./BestSellers";
import BottomBanner from "./BottomBanner";
import NewProduct from './NewProduct';
import Blog from './Blog';


const Home = () => {
    


    return (
        <div className="bg-gray-800 min-h-screen">
            {/* <MinTaskBar /> */}

            <div className="grid w-[90%] mx-auto pt-6 grid-cols-1 md:grid-cols-[1fr_3fr_1fr] gap-4">
                <div>
                    
                </div>
                <div>
                    <Carousel />
                </div>
                <Adds />
            </div>
            <Offer />
            <Categories />
            <SubBanner />
            <Clearance />
            <FeaturedProduct />
            <BestSellers />
            <BottomBanner />
            <NewProduct />
            <Blog />
        </div>
    )
}

export default Home;