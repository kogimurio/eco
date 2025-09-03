export default function SortAndPagination() {
  return (
    <div className="grid grid-cols-2 my-4 border border-gray-100 m-4 p-4 h-20 rounded-lg w-full">
      <div>
        <select className="rounded bg-gray-500 p-2">
          <option>Sort By:</option>
          <option value="Best Seller">Best Seller</option>
          <option value="New">New</option>
          <option value="Featured">Featured</option>
        </select>
      </div>

      <div className="flex items-center justify-end space-x-2">
        <span className="bg-gray-950 rounded-full p-2 hover:bg-orange-700 cursor-pointer">1</span>
        <span className="bg-gray-950 rounded-full p-2 hover:bg-orange-700 cursor-pointer">2</span>
        <span className="bg-gray-950 rounded-full p-2 hover:bg-orange-700 cursor-pointer">Next</span>
      </div>
    </div>
  );
}
