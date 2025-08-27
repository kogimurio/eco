import React, { useState, useEffect } from "react";
import LoadingSpinner from "../LoadingSpinner";
import useResponsiveTextLength from "../../hooks/useResponsiveTextLength";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { useCart } from "../../context/CartContext";
import RelatedProductCard from "./RelatedProductCard";

const BASE_URL = process.env.REACT_APP_BASE_URL;
const localToken = localStorage.getItem("token");
const token = JSON.parse(localToken);

export default function RelatedProducts() {
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const { addToCart } = useCart();
  const [wishlistProducts, setWishlistProducts] = useState([]);
  const maxChars = useResponsiveTextLength();
  const navigate = useNavigate();
  const { slug } = useParams();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await axios.get(`${BASE_URL}/products/related_products/${slug}`);
        setRelatedProducts(res.data.relatedProducts);
      } catch (error) {
        console.error("Error in fetching related products:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [slug]);

  const truncate = (text) => (text.length > maxChars ? text.slice(0, maxChars) + "…" : text);

  const handleAddToCart = async (productId) => {
    try {
      await addToCart(productId, 1);
      toast.success("Product added to cart");
    } catch (error) {
      toast.error("Failed to add to cart");
    }
  };

  const handleAddToWishlist = async (productId) => {
    try {
      await axios.post(
        `${BASE_URL}/wishlist/`,
        { productId },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setWishlistProducts((prev) => {
        if (!prev.some((item) => item._id === productId)) {
          return [...prev, { _id: productId }];
        }
        return prev;
      });
      toast.success("Product has been added to your wishlist");
    } catch (error) {
      const errorMessage = error.response?.data?.message || error.message || "An error has occured";
      toast.error(errorMessage);
    }
  };

  const productDetail = (slug) => navigate(`/productdetail/${slug}`);

  return (
    <>
      {relatedProducts.length > 0 && (
        <div className="bg-gray-800 py-4 overflow-x-hidden">
          <div className="w-[80%] mx-auto my-4">
            <h2 className="text-white text-lg font-semibold text-left">Customers who viewed this also viewed</h2>
          </div>

          {loading ? (
            <div className="flex justify-center">
              <LoadingSpinner size="40" />
            </div>
          ) : (
            <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-2 w-[80%] mx-auto">
              {relatedProducts.map((product) => (
                <RelatedProductCard
                  key={product._id}
                  product={product}
                  truncate={truncate}
                  handleAddToCart={handleAddToCart}
                  handleAddToWishlist={handleAddToWishlist}
                  productDetail={productDetail}
                />
              ))}
            </div>
          )}
        </div>
      )}
    </>
  );
}
