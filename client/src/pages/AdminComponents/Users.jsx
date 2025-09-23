import { useEffect, useState } from 'react';
import LoadingSpinner from '../LoadingSpinner';
import { toast } from 'react-toastify';
import axios from 'axios';

import { useAdmin } from '../../context/AdminContext';

const BASE_URL = process.env.REACT_APP_BASE_URL;

export default function Users() {
  const { users, setUsers, loading, fetchUsers } = useAdmin();
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchUsers();
  }, []);

  useEffect(() => {
    const delayDebounce = setTimeout(async () => {
        if (!searchTerm) {
          fetchUsers()
          return;
      }

      try {
        const response = await axios.get(`${BASE_URL}/users/search_user?q=${searchTerm}`)
        setUsers(response.data.results)
      } catch (error) {
        toast.error("Error searching users")
        console.error("Error searching users:", error)
      }
    }, 500);

    return () => clearTimeout(delayDebounce);
  }, [searchTerm])

  const highlightMatch = (text, query) => {
    if (!query) return text;
    const regex = new RegExp(`(${query})`, "gi");
    return text.split(regex).map((part, idx) => 
      regex.test(part) ? (
        <span key={idx} className='bg-yellow-500/30 font-bold text-yellow-300' >
          {part}
        </span>
      ) : (
        part
      )
    );
  };

  if (loading) {
    return (
      <div className="flex justify-center mt-4">
        <LoadingSpinner />
      </div>
    )
  }

  return (
    <div className="p-6">
      {/* Header */}
      <div className="mb-6 grid grid-cols-1 sm:grid-cols-2">
        <h2 className="text-2xl font-semibold text-white">Users Manager</h2>
          <input
            type="text"
            value={searchTerm}
            onChange={(e)=> setSearchTerm(e.target.value)}
            placeholder="Search by first or last name, email, role, status"
            className="w-full px-4 py-2 rounded-lg bg-gray-800 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-orange-500"
          />
      </div>

      {/* Users Table */}
      <div className="overflow-x-auto max-h-[70vh] overflow-y-auto">
        <table className="min-w-full bg-gray-800 text-white rounded-lg overflow-hidden">
          <thead>
            <tr className="bg-gray-700 text-left text-sm uppercase">
              <th className="py-3 px-4">Name</th>
              <th className="py-3 px-4">Email</th>
              <th className="py-3 px-4">Role</th>
              <th className="py-3 px-4">Status</th>
              <th className="py-3 px-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="text-sm">
            {users.map((user, idx) => (
              <tr key={idx} className="border-b border-gray-700 hover:bg-gray-700/50">
                <td className="py-3 px-4">
                  {highlightMatch(`${user.firstName} ${user.lastName}`, searchTerm)}
                </td>
                <td className="py-3 px-4">
                  {highlightMatch(user.email, searchTerm)}
                </td>
                <td className="py-3 px-4">
                  {highlightMatch(user.role, searchTerm)}
                </td>
                <td className="py-3 px-4">
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                    user.status === "Active"
                     ? "bg-green-500/20 text-green-400"
                      : "bg-red-500/20 text-red-400"
                  }`}>
                    {highlightMatch(user.status, searchTerm)}
                  </span>
                </td>
                <td className="py-3 px-4 text-right">
                  <button className="text-red-400 hover:text-red-600 text-sm">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
