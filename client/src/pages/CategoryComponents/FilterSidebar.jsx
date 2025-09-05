import { Link, useParams } from "react-router-dom";


export default function FilterSidebar({ selectedFilters, setSelectedFilters, products }) {
  const { slug } = useParams()

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

  // update brand filter
  const toggleBrand = (brand) => {
    setSelectedFilters(prev => {
      const newBrands = prev.brand.includes(brand)
        ? prev.brand.filter(b => b !== brand) // remove if already checked
        : [...prev.brand, brand];             // otherwise add
      return { ...prev, brand: newBrands };   // update state
    });
  };

  // update size filter
  const toggleSize = (size) => {
    setSelectedFilters(prev => {
      const newSizes = prev.size.includes(size)
        ? prev.size.filter(s => s !== size)
        : [...prev.size, size];
      return { ...prev, size: newSizes };
    });
  };

  // update colour filter
  const toggleColour = (colour) => {
    setSelectedFilters(prev => {
      const newColours = prev.colour.includes(colour)
        ? prev.colour.filter(c => c !== colour)
        : [...prev.colour, colour];
      return { ...prev, colour: newColours };
    });
  };

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

        {/* Active filters */}
        <div className="p-2 text-sm">
          {selectedFilters.brand.length === 0 &&
          selectedFilters.size.length === 0 &&
          selectedFilters.colour.length === 0 &&
          !selectedFilters.minPrice &&
          !selectedFilters.maxPrice ? (
            <p>No filters applied</p>
          ) : (
            <div className="flex flex-wrap gap-2">
              {selectedFilters.brand.map((b, i) => (
                <span key={`brand-${i}`} className="px-2 py-1 bg-gray-200 text-gray-800 rounded">
                  {b}
                </span>
              ))}
              {selectedFilters.size.map((s, i) => (
                <span key={`size-${i}`} className="px-2 py-1 bg-gray-200 text-gray-800 rounded">
                  Size {s}
                </span>
              ))}
              {selectedFilters.colour.map((c, i) => (
                <span key={`colour-${i}`} className="px-2 py-1 bg-gray-200 text-gray-800 rounded">
                  {c}
                </span>
              ))}
              {(selectedFilters.minPrice || selectedFilters.maxPrice) && (
                <span className="px-2 py-1 bg-gray-200 text-gray-800 rounded">
                  {selectedFilters.minPrice || "0"} – {selectedFilters.maxPrice || "∞"}
                </span>
              )}
            </div>
          )}
        </div>


        <hr className="my-2" />
        <h3 className="font-bold text-sm">Brand</h3>
        {brands.map((brand, index) => (
          <div key={index}>
            <ul className="text-sm">
              <li>
                <input 
                  type="checkbox" 
                  className="mx-4" 
                  onChange={() => toggleBrand(brand)}
                  checked={selectedFilters.brand.includes(brand)}
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
                  onChange={() => toggleSize(size)}
                  checked={selectedFilters.size.includes(size)}
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
                  onChange={() => toggleColour(colour)}
                  checked={selectedFilters.colour.includes(colour)}
                /> {colour}
              </li>
            </ul>
          </div>
        ))}

        {/* Price Range */}
        <h3 className="flex font-bold text-sm">Price</h3>
        <ul className="text-sm">
          <li className="grid grid-cols-3 text-xs">
            <input 
              type="number" 
              className="mx-2 rounded p-2 bg-gray-700" 
              placeholder="Min" 
              value={selectedFilters.minPrice}
              onChange={(e) => 
                setSelectedFilters(prev => ({ ...prev, minPrice: e.target.value }))
              }
            />
            <input 
              type="number" 
              className="mx-2 rounded p-2 bg-gray-700" 
              placeholder="Max" 
              value={selectedFilters.maxPrice}
              onChange={(e) => 
                setSelectedFilters(prev => ({ ...prev, maxPrice: e.target.value}))
              }
            />
            {/* <button className="flex w-full items-center justify-center p-1 bg-gray-400 hover:bg-orange-600 rounded-full">
              Update
            </button> */}
          </li>
        </ul>
      </div>
    </div>
  );
}
