import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import MinProductBar from "../ProductComponents/MinProductBar";
import LoadingSpinner from "../LoadingSpinner";
import RelatedProductCard from "../ProductComponents/RelatedProductCard";
import FilterSidebar from "./FilterSidebar";
import SortAndPagination from "./SortAndPagination";
import { useCart } from "../../context/CartContext";
import { toast } from "react-toastify";
import useResponsiveTextLength from "../../hooks/useResponsiveTextLength";

const BASE_URL = process.env.REACT_APP_BASE_URL;

export default function CategoryDetail() {
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState([]);
  const [wishlistProducts, setWishlistProducts] = useState([]);
  const maxChars = useResponsiveTextLength();
  const { slug } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const token = JSON.parse(localStorage.getItem("token"));

  // Fetch products
  useEffect(() => {
    const fetchProduct = async () => {
      await new Promise((res) => setTimeout(res, 2000));
      try {
        const res = await axios.get(`${BASE_URL}/category/${slug}`);
        setProducts(res.data.products);
        console.log("Fetched related products:", res.data.products)
      } catch (error) {
        console.error(error?.res?.data || error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [slug]);

  const truncate = (text) => {
    if (!text) return "";
    return text.length > maxChars ? text.slice(0, maxChars) + "…" : text;
  }
    

  const productDetail = (slug) => navigate(`/productdetail/${slug}`);

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
      const errorMessage =
        error.response?.data?.message || error.message || "An error occurred";
      toast.error(errorMessage);
    }
  };

  const handleAddToCart = async (productId) => {
    await addToCart(productId, 1);
    toast.success("Product added to cart");
  };

  return (
    <>
      <MinProductBar />
      <div className="bg-gray-800 text-white">
        <div className="grid grid-cols-1 md:grid-cols-[1fr_3fr] w-[90%] mx-auto py-8">
          
          {/* Sidebar */}
          <FilterSidebar />

          {/* Main Content */}
          <div className="grid grid-cols-1">
            <SortAndPagination />

            <div className="bg-gray-800 mt-8 py-4 overflow-x-hidden">
              {loading ? (
                <div className="flex justify-center">
                  <LoadingSpinner size="40" />
                </div>
              ) : products.length === 0 ? (
                <p className="text-center text-gray-400">
                  No products found in this category.
                </p>
              ) : (
                <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4 w-full mx-auto">
                  {products.map((product, index) => (
                    <RelatedProductCard
                      key={index}
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
          </div>
        </div>
      </div>
    </>
  );
}
