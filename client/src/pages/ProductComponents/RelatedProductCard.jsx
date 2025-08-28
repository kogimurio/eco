import React, { useState, useEffect } from "react";
import axios from "axios";
import { faStar as regularStar } from "@fortawesome/free-regular-svg-icons";
import { faStar as solidStar, faStarHalfStroke, faPlus, faEye, faHeart } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const BASE_URL = process.env.REACT_APP_BASE_URL;
const BASE_IMAGE_URL = process.env.REACT_APP_BASE_URL_IMAGE;

export default function RelatedProductCard({ product, truncate, handleAddToCart, handleAddToWishlist, productDetail }) {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const res = await axios.get(`${BASE_URL}/review/${product.slug}`);
        setReviews(res.data.reviews);
      } catch (err) {
        console.error("Error fetching reviews:", err);
      }
    };
    fetchReviews();
  }, [product.slug]);

  const totalRatings = reviews.reduce((sum, r) => sum + r.rating, 0);
  const averageRating = reviews.length > 0 ? (totalRatings / reviews.length).toFixed(1) : 0;

  function StarRating({ averageRating }) {
    return (
      <div className="flex text-orange-400">
        {[1, 2, 3, 4, 5].map((i) => {
          if (averageRating >= i) return <FontAwesomeIcon key={i} icon={solidStar} />;
          else if (averageRating >= i - 0.5) return <FontAwesomeIcon key={i} icon={faStarHalfStroke} />;
          else return <FontAwesomeIcon key={i} icon={regularStar} />;
        })}
      </div>
    );
  }

  return (
    <div className="relative w-full group cursor-pointer">
      <div className="md:left-2 md:top-2 pl-2">
        <h3 className="text-stone-400 text-brandLabel">{product.brand}</h3>
        <p className="text-body text-white py-1">{truncate(product.name)}</p>
      </div>

      <div className="md:left-2 md:top-2 pl-2 pb-2">
        <StarRating averageRating={averageRating} />
      </div>
      <img
        src={`${BASE_IMAGE_URL}/${product.thumbnail}`}
        alt={product.name}
        className="w-64 h-72 rounded object-contain hover:scale-105 cursor-pointer transition-transform duration 300"
      />

      <div className="md:left-2 md:top-2">
        <p className="text-white py-1 pl-2 text-price">${product.price}</p>
      </div>

      {/* Add to Cart */}
      <div className={`absolute bottom-3 right-2 w-28 group/icon
        ${product.stock === 0 ? "bg-gray-700" : "bg-orange-600 hover:bg-orange-600"}
         lg:w-8 lg:hover:w-36  p-2 rounded-full flex items-center overflow-hidden transition-all duration-500`}>
          {product.stock === 0 ? null : <FontAwesomeIcon icon={faPlus} className="hidden lg:flex text-white text-iconMedium" />}
        <span
          onClick={product.stock === 0 ? null : () => handleAddToCart(product._id)}
          className="text-white font-bold text-button ml-2 whitespace-nowrap opacity-100 lg:opacity-0 lg:group-hover/icon:opacity-100 transition-opacity duration-500"
        >
          {product.stock === 0 ? "Out of stock" : "Add to Cart"}
        </span>
      </div>

      {/* Wishlist + View Buttons */}
      <div className="absolute bottom-14 right-2 flex flex-col items-center gap-2 animate-slide-down lg:group-hover:flex">
        <button
          onClick={(e) => {
            e.stopPropagation();
            handleAddToWishlist(product._id);
          }}
          className="bg-gray-900 p-2 z-1000 rounded-full text-white hover:text-red-500"
          title="Wish list"
        >
          <FontAwesomeIcon icon={faHeart} className="text-iconMedium" />
        </button>

        <div className="w-8 border-t border-gray-700 transition-all duration-500 transform scale-x-0 lg:group-hover:scale-x-100"></div>

        <button
          onClick={(e) => {
            e.stopPropagation();
            productDetail(product.slug);
          }}
          className="bg-gray-900 p-2 rounded-full text-white hover:text-orange-500"
          title="View"
        >
          <FontAwesomeIcon icon={faEye} className="text-iconMedium" />
        </button>
      </div>
    </div>
  );
}
