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
  const [allProducts, setAllProducts] = useState([]);
  const [selectedFilters, setSelectedFilters] = useState({
    brand: [],
    size: [],
    colour: [],
    minPrice: "",
    maxPrice: "",
    isClearance: false,
    isBestSeller: false,
    isFeatured: false
  });
  const [wishlistProducts, setWishlistProducts] = useState([]);
  const maxChars = useResponsiveTextLength();
  const { slug } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const token = JSON.parse(localStorage.getItem("token"));

  // Fetch all related products
  useEffect(() => {
    const fetchAll = async() => {
      const response = await axios.get(`${BASE_URL}/category/${slug}`);
      setAllProducts(response.data.products);
    };
    fetchAll();
  }, [slug]);
  // Fetched filtered products
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const query = new URLSearchParams();

        if (selectedFilters.isFeatured)
          query.append("isFeatured", true);

        if (selectedFilters.isBestSeller)
          query.append("isBestSeller", true);

        if (selectedFilters.isClearance)
          query.append("isClearance", true);

        if (selectedFilters.brand.length)
          query.append("brand", selectedFilters.brand.join(","));

        if (selectedFilters.size.length)
          query.append("size", selectedFilters.size.join(","));

        if (selectedFilters.colour.length)
          query.append("colour", selectedFilters.colour.join(","));

        if (selectedFilters.minPrice.length)
          query.append("minPrice", selectedFilters.minPrice);

        if (selectedFilters.maxPrice.length)
          query.append("maxPrice", selectedFilters.maxPrice);


        const res = await axios.get(`${BASE_URL}/category/${slug}?${query.toString()}`);
        setProducts(res.data.products);
        console.log("Query sent to backend:", (`${BASE_URL}/category/${slug}?${query.toString()}`))
      } catch (error) {
        console.error(error?.res?.data || error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [slug, selectedFilters]);

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
      <div className="bg-gray-800 text-white p-4">
        
          <>
            <MinProductBar />
            <div className="grid grid-cols-1 md:grid-cols-[1fr_3fr] w-[90%] mx-auto py-8">
              {/* Sidebar */}
              <FilterSidebar
                selectedFilters={selectedFilters}
                setSelectedFilters={setSelectedFilters}
                products={products} // pass for counts
                allProducts={allProducts}
              />

              {/* Main Content */}
              <div className="grid grid-cols-1">
                <SortAndPagination 
                  selectedFilters={selectedFilters}
                  setSelectedFilters={setSelectedFilters}
                  products={products} // pass for counts
                  allProducts={allProducts}
                />
                {loading ? (
                    <div className="flex justify-center">
                      <LoadingSpinner size="40" />
                    </div>
                ) : products.length === 0 ? (
                  <p className="text-center text-gray-400">
                    No products found in {slug} category.
                  </p>
                ) : (
                  <div className="bg-gray-800 py-4 overflow-x-hidden">
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
                  </div>
                )}
              </div> 
            </div>
          </>
      </div>
    </>
  );
}
