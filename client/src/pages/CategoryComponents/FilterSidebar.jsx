import { Link, useParams } from "react-router-dom";
import { useState, useEffect } from 'react';
import axios from 'axios';
import LoadingSpinner from "../LoadingSpinner";

const BASE_URL = process.env.REACT_APP_BASE_URL;

export default function FilterSidebar() {
  const [products, setProducts] = useState([]);
  const [selectedFilters, setSelectedFilters] = useState({
    colour: [],
    size: [],
    brand: [],
    minPrice: '',
    maxPrice: ''
  });
  const [load, setLoading] = useState(true);
  const { slug } = useParams()

  useEffect(() => {
    const fetchProducts = async(filter)=> {
      try {
        const response = await axios.get(`${BASE_URL}/products/filterby?${filter}`)
        setProducts(response.data.products);
        console.log("Fetched products:", response.data.products)
      } catch (error) {
        const errorMessage =
                error.response?.data?.message || error.message || "An error occurred";
                console.error(errorMessage);
      }
    }
    fetchProducts();
  }, []);

  const brands = [...new Set(products.map(p => p.brand))];
  const sizes = [...new Set(products.map(p => p.size))];
  const colours = [...new Set(products.map(p => p.colour))];

  const brandCounts = products.reduce((acc, p) => {
    acc[p.brand] = (acc[p.brand] || 0) + 1;
    return acc;
  }, {});

  const sizeCounts = products.reduce((acc, p) => {
    acc[p.size] = (acc[p.size] || 0) + 1;
    return acc;
  }, {})


  return (
    <div className="hidden md:grid grid-cols-1 p-4 ">
      {/* Categories */}
      <div className="border border-gray-100 rounded p-2">
        <h4 className="bg-gray-950 p-4 text-sm mb-3 rounded">{slug.toUpperCase()}</h4>
        <ul className="text-sm space-y-1">
          <li><Link to="*">Boots</Link></li>
          <li><Link to="*">Cassette player</Link></li>
          <li><Link to="*">Casual</Link></li>
          <li><Link to="*">Ethnic</Link></li>
          <li><Link to="*">Sneakers</Link></li>
        </ul>
      </div>

      {/* Filters */}
      <div className="border border-gray-100 rounded p-2 mt-8">
        <h4 className="bg-gray-950 p-4 text-sm rounded">REFINE BY</h4>
        <p className="p-2 text-sm">No filters applied</p>

        <hr className="my-2" />
        <h3 className="font-bold text-sm">Brand</h3>
        {brands.map((brand, index) => (
          <div key={index}>
            <ul className="text-sm">
              <li>
                <input 
                  type="checkbox" 
                  className="mx-4" 
                  onChange={(e) => {
                    const checked = e.target.checked;
                    setSelectedFilters(prev => ({
                      ...prev,
                      brand: checked
                        ? [...prev.brand, brand]
                        : prev.brand.filter(b => b !== brand)
                    }));
                  }}
                /> {brand} ({brandCounts[brand]})
              </li>
            </ul>
          </div>
        ))}

        <hr className="my-2" />
        <h3 className="font-bold text-sm">Size</h3>
        {sizes.map((size, index) => (
          <div key={index}>
            <ul className="text-sm">
              <li>
                <input 
                  type="checkbox" 
                  className="mx-4" 
                  
                /> {size} ({sizeCounts[size]})
              </li>
            </ul>
          </div>
        ))}

        <hr className="my-2" />
        <h3 className="font-bold text-sm">Colours</h3>
        {colours.map((colour, index) => (
          <div key={index}>
            <ul className="text-sm">
              <li>
                <input 
                  type="checkbox" 
                  className="mx-4" 
                  
                /> {colour}
              </li>
            </ul>
          </div>
        ))}

        {/* Price Range */}
        <h3 className="flex font-bold text-sm">Price</h3>
        <ul className="text-sm">
          <li className="grid grid-cols-3 text-xs">
            <input type="number" className="mx-2 rounded p-2" placeholder="Min." />
            <input type="number" className="mx-2 rounded p-2" placeholder="Max." />
            <button className="flex w-full items-center justify-center p-1 bg-gray-400 hover:bg-orange-600 rounded-full">
              Update
            </button>
          </li>
        </ul>
      </div>
    </div>
  );
}
