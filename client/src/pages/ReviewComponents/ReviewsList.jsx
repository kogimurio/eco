import React, { useState, useEffect } from "react";
import axios from 'axios';
import { toast } from 'react-toastify';
import { useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar as regularStar } from "@fortawesome/free-regular-svg-icons";
import { faStar as solidStar, faStarHalfStroke } from "@fortawesome/free-solid-svg-icons";
import Pagination from '../HomeComponents/Pagination';


const BASE_URL = process.env.REACT_APP_BASE_URL;


export default function ReviewList() {
    const [reviews, setReviews] = useState([]);
    const { slug } = useParams()

    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(3);

    const indexOfLast = currentPage * itemsPerPage;
    const indexOfFirst = indexOfLast - itemsPerPage;
    const currentFeaturedReviews = reviews.slice(indexOfFirst, indexOfLast);

    const totalPages = Math.ceil(reviews.length / itemsPerPage);

    const handlePageChange = (pageNum) => setCurrentPage(pageNum);

    useEffect(() => {
        try {
                const fetchReviews = async () => {
                const response = await axios.get(`${BASE_URL}/review/${slug}`)
                setReviews(response.data.reviews);
                console.log("Fetched reviews:", response.data);
            } 
            
            fetchReviews();
        } catch (error) {
            const msg =
            error.response?.data ||
            error.message ||
            "something went wrong"
            console.log(msg);
            toast.error(msg);
        }
    }, [slug]);

    const totalRatings = reviews.reduce((sum, r) => sum + r.rating, 0);
    const averageRating = reviews.length > 0 ? (totalRatings / reviews.length).toFixed(1) : 0;

    const totalComments = reviews.length;

    function StarRating({ averageRating }) {
        return (
            <div className="flex text-orange-400">
                {[1, 2, 3, 4, 5].map((i) => {
                    if (averageRating >= i) {
                        return <FontAwesomeIcon key={i} icon={solidStar} />; 
                    } else if (averageRating >= i - 0.5) {
                        return <FontAwesomeIcon key={i} icon={faStarHalfStroke} />;
                    } else {
                        return <FontAwesomeIcon key={i} icon={regularStar} />;
                    }
                })}
            </div>
        )
    }

    const formatDate = (isoDate) => {
        return new Date(isoDate).toLocaleDateString();
    }

    return (
        <div className="bg-gray-700 py-4 overflow-x-hidden">
            {reviews.length > 0 ? (
                <div className="w-[80%] mx-auto mt-4">
                <h3 className="text-bold text-lg text-white">Customers feedback</h3>
                <div className="w-full bg-gray-950 h-0.25 my-4"></div>
                <div className="grid grid-cols-1 md:grid-cols-[1fr_3fr] gap-4">
                    <div className="grid grid-cols-1 text-gray-300 ">
                        <h5 className="my-3 uppercase text-white">Verified Ratings ({reviews.length})</h5>
                        <div className="flex flex-col items-center justify-center bg-gray-800 rounded-lg py-4 space-y-2 text-sm">
                            <p className="text-lg">{averageRating}/5</p>
                                <StarRating averageRating={averageRating} />
                            <p>{reviews.length} verified ratings</p>
                        </div>
                    </div>
                    <div className="text-gray-300">
                        <h5 className="my-3 uppercase text-white">Product Reviews ({totalComments})</h5>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                            {currentFeaturedReviews.map((review, idx) => (
                                <ul key={idx} className=" bg-gray-800 rounded-lg p-4 text-sm">
                                    <StarRating averageRating={review.rating} />
                                    <div className=" space-y-1">
                                        <li className="pt-2">{review.comment}</li>
                                        <li className="py-1">{formatDate(review.createdAt)} by {review.user.firstName}</li>
                                    </div>
                                </ul>
                            ))}
                        </div>
                        {/* Pagination */}
                        {reviews.length > 0 && (
                            <div className="flex items-center gap-2 mt-4 justify-center">
                                <Pagination 
                                    currentPage={currentPage}
                                    totalPages={totalPages}
                                    onPageChange={handlePageChange}
                                />
                            </div>
                        )}  
                    </div>
                </div>
            </div>
            ) : (
                <div className="flex items-center w-[80%] mx-auto text-gray-300">
                    <p className="text-center">No reviews yet</p>
                </div>
            )}
        </div>
    )
}