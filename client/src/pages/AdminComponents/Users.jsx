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

  const handleSearch = async (e) => {
    e.preventDefault()
    if (!searchTerm) {
        fetchUsers()
    }

    try {
      const response = await axios.get(`${BASE_URL}/users/search_user?q=${searchTerm}`)
      setUsers(response.data.results)
    } catch (error) {
      toast.error("Error:", error)
      console.error("Error searching users:", error)
    }
  }

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
        <form onSubmit={handleSearch} className="flex flex-row justify-between items-center">
          <input
            type="text"
            value={searchTerm}
            onChange={(e)=> setSearchTerm(e.target.value)}
            placeholder="Search user by first or last name, email, role, status"
            className="w-full px-4 py-2 rounded-lg bg-gray-800 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-orange-500"
          />
          <button type='submit' className='ml-2 bg-gray-800 py-2 px-6 rounded-lg hover:bg-orange-500 border border-orange-500'>Search</button>
        </form>
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
                <td className="py-3 px-4">{user.firstName} {user.lastName}</td>
                <td className="py-3 px-4">{user.email}</td>
                <td className="py-3 px-4">{user.role}</td>
                <td className="py-3 px-4">
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                    user.status === "Active" ? "bg-green-500/20 text-green-400" : "bg-red-500/20 text-red-400"
                  }`}>
                    {user.status}
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
