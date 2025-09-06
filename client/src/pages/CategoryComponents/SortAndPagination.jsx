export default function SortAndPagination({ selectedFilters, setSelectedFilters, products, allProducts }) {
  const handleFilterChange = (e) => {
    const { name, value } = e.target;

    setSelectedFilters((prev) => ({
      ...prev,
      [name]: value ? [value] : [] // keep consistent with arrays
    }));
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
          onChange={handleFilterChange}
          value={selectedFilters.brand[0] || ""}
          className="rounded bg-gray-700 p-2 text-white"
        >
          <option value="">Brand</option>
          <option value="Nike">Nike</option>
          <option value="Adidas">Adidas</option>
          <option value="Puma">Puma</option>
        </select>

        {/* Size */}
        <select
          name="size"
          onChange={handleFilterChange}
          value={selectedFilters.size[0] || ""}
          className="rounded bg-gray-700 p-2 text-white"
        >
          <option value="">Size</option>
          <option value="S">S</option>
          <option value="M">M</option>
          <option value="L">L</option>
          <option value="XL">XL</option>
        </select>

        {/* Colour */}
        <select
          name="colour"
          onChange={handleFilterChange}
          value={selectedFilters.colour[0] || ""}
          className="rounded bg-gray-700 p-2 text-white"
        >
          <option value="">Colour</option>
          <option value="Red">Red</option>
          <option value="Black">Black</option>
          <option value="White">White</option>
          <option value="Blue">Blue</option>
        </select>
      </div>
    </div>
  );
}
