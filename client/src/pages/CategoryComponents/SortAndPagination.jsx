export default function SortAndPagination({ selectedFilters, setSelectedFilters, products, allProducts }) {
  const brands = [...new Set(allProducts.map(p => p.brand))];
  const sizes = [...new Set(allProducts.map(p => p.size))];
  const colours = [...new Set(allProducts.map(p => p.colour))];

  const brandCounts = products.reduce((acc, p) => {
    acc[p.brand] = (acc[p.brand] || 0) + 1;
    return acc;
  }, {});

  const sizeCounts = products.reduce((acc, p) => {
    acc[p.size] = (acc[p.size] || 0) + 1;
    return acc;
  }, {});

  const colourCounts = products.reduce((acc, p) => {
    acc[p.colour] = (acc[p.colour] || 0) + 1;
    return acc;
  }, {});

  // update brand filter
  const toggleBrand = (brand) => {
    setSelectedFilters(prev => {
      const newBrands = prev.brand.includes(brand)
      ? prev.brand.filter(b => b !== brand)
      : [...prev.brand, brand];
      return { ...prev, brand: newBrands}
    });
  };

  // update brand size
  const toggleSize = (size) => {
    setSelectedFilters(prev => {
      const newSizes = prev.size.includes(size)
      ? prev.size.filter(s => s !== size)
      : [...prev.size, size];
      return { ...prev, size: newSizes}
    });
  };

  // update brand colour
  const toggleColour = (colour) => {
    setSelectedFilters(prev => {
      const newColours = prev.colour.includes(colour)
      ? prev.colour.filter(c => c !== colour)
      : [...prev.colour, colour];
      return { ...prev, colour: newColours}
    });
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-4 border lg:h-20 border-gray-100 m-4 p-4 rounded-lg w-full">
      {/* Sort Dropdown */}
      <div>
        <select className="rounded bg-gray-500 p-2 text-white w-full">
          <option>Sort By:</option>
          <option value="Best Seller">Best Seller</option>
          <option value="New">New Arrival</option>
          <option value="Featured">Featured</option>
        </select>
      </div>

      {/* Mobile Filters */}
      <div className="flex md:hidden space-x-2 justify-end">
        {/* Brand */}
        <select
          name="brand"
          onChange={(e) => toggleBrand(e.target.value)}
          value={selectedFilters.brand[0] || ""}
          className="rounded bg-gray-700 p-2 text-white"
        >
          <option value="">Brand</option>
          {brands.map((b, index) => (
            <option 
              key={index}
              value={b}
            >
              {b} ({brandCounts[b] || 0})
          </option>
          ))}
        </select>

        {/* Size */}
        <select
          name="size"
          onChange={(e) => toggleSize(e.target.value)}
          value={selectedFilters.size[0] || ""}
          className="rounded bg-gray-700 p-2 text-white"
        >
          <option value="">Size</option>
          {sizes.map((s, index) => (
            <option 
              key={index}
              value={s}
            >
              {s} ({sizeCounts[s] || 0})
          </option>
          ))}
        </select>

        {/* Colour */}
        <select
          name="colour"
          onChange={(e) => toggleSize(e.target.value)}
          value={selectedFilters.colour[0] || ""}
          className="rounded bg-gray-700 p-2 text-white"
        >
          <option value="">Colour</option>
          {colours.map((c, index) => (
            <option 
              key={index}
              value={c}
            >
              {c} ({colourCounts[c] || 0})
          </option>
          ))}
        </select>
      </div>
    </div>
  );
}
