import { Link } from "react-router-dom";

export default function FilterSidebar() {
  return (
    <div className="hidden md:grid grid-cols-1 p-4 ">
      {/* Categories */}
      <div className="border border-gray-100 rounded p-2">
        <h4 className="bg-gray-950 p-4 text-sm mb-3 rounded">FOOTWEAR</h4>
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

        {["Brand", "Colour", "Size", "Wine Vintage"].map((filter) => (
          <div key={filter}>
            <h3 className="font-bold text-sm">{filter}</h3>
            <ul className="text-sm">
              <li>
                <input type="checkbox" className="mx-4" /> Option 1 (3)
              </li>
              <li>
                <input type="checkbox" className="mx-4" /> Option 2 (5)
              </li>
            </ul>
            <hr className="my-2" />
          </div>
        ))}

        {/* Price Range */}
        <h3 className="font-bold text-sm">Price</h3>
        <ul className="text-sm">
          <li className="grid grid-cols-3">
            <input type="number" className="mx-2 rounded p-2" placeholder="Min." />
            <input type="number" className="mx-2 rounded p-2" placeholder="Max." />
            <button className="bg-gray-400 hover:bg-orange-600 rounded-full">
              Update
            </button>
          </li>
        </ul>
      </div>
    </div>
  );
}
