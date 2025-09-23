import { useEffect, useState } from 'react';
import LoadingSpinner from '../LoadingSpinner';
import { toast } from 'react-toastify';
import axios from 'axios';

import { useAdmin } from '../../context/AdminContext';

const BASE_URL = process.env.REACT_APP_BASE_URL;

export default function Transactions() {
  const { loading, transactions, setTransactions, fetchTransactions } = useAdmin();
  const [searchTerm, setSearchTerm] = useState('')


  useEffect(() => {
    fetchTransactions();
  }, []);

  useEffect(() => {
    const delayDebounce = setTimeout(async () => {
      if(!searchTerm) {
        fetchTransactions()
        return;
      }

      try {
          const response = await axios.get(`${BASE_URL}/mpesa/search_payment?q=${searchTerm}`)
          setTransactions(response.data.results)
      } catch (error) {
        console.error("Error in searching transaction:", error)
        toast.error("Error in searching transaction")
      }
    }, 500);

    return () => clearTimeout(delayDebounce)

  }, [searchTerm])

  const hightlightMatch = (text="", query) => {
    if (!text || typeof text !== 'string' ) return text || "";

    if (!query) return text;

    const regex = new RegExp(`(${query})`, "gi")
    return text.split(regex).map((part, idx) => 
      regex.test(part) ? (
        <span key={idx} className="bg-yellow-500/30 text-yellow-300 font-bold">
          {part}
        </span>
      ) : (
        part
      )
    )
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
        <h2 className="text-2xl font-semibold text-white">Transactions</h2>
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search transaction code, email, first name, phone number"
          className="px-4 py-2 rounded-lg bg-gray-800 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-orange-500"
        />
      </div>

      {/* Users Table */}
      <div className="overflow-x-auto max-h-[70vh] overflow-y-auto">
        <table className="min-w-full bg-gray-800 text-white rounded-lg overflow-hidden">
          <thead>
            <tr className="bg-gray-700 text-left text-sm uppercase">
              <th className="py-3 px-4">Trans No.</th>
              <th className="py-3 px-4">Client</th>
              <th className="py-3 px-4">Phone</th>
              <th className="py-3 px-4">Email</th>
              <th className="py-3 px-4">Amount</th>
              <th className="py-3 px-4">Status</th>
              <th className="py-3 px-4">Date</th>
            </tr>
          </thead>
          <tbody className="text-sm">
            {transactions.map((transaction, idx) => (
              <tr key={idx} className="border-b border-gray-700 hover:bg-gray-700/50">
                <td className="py-3 px-4">{hightlightMatch(transaction.receipt, searchTerm)}</td>
                <td className="py-3 px-4">{hightlightMatch(transaction.user?.firstName || 'N/A', searchTerm)}</td>
                <td className="py-3 px-4">{hightlightMatch(transaction.phone, searchTerm)}</td>
                <td className="py-3 px-4">{hightlightMatch(transaction.user?.email || 'N/A', searchTerm)}</td>
                <td className="py-3 px-4">$ {transaction.amount}</td>
                <td className={`py-3 px-4 capitalize ${
                  transaction.status === 'success' ? 'text-green-400' : transaction.status === 'failed' ? 'text-red-400' : 'text-orange-400'}`}>{transaction.status}</td>
                <td className="py-3 px-4">{new Date(transaction.createdAt).toLocaleDateString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
