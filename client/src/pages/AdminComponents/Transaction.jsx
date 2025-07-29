import { useEffect } from 'react';
import LoadingSpinner from '../LoadingSpinner';

import { useAdmin } from '../../context/AdminContext';



export default function Transactions() {
  const { loading, transactions, fetchTransactions } = useAdmin();


  useEffect(() => {
    fetchTransactions();
  }, []);

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
      <div className="mb-6 flex justify-between items-center">
        <h2 className="text-2xl font-semibold text-white">Transactions</h2>
        <input
          type="text"
          placeholder="Search transaction..."
          className="px-4 py-2 rounded-lg bg-gray-800 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-orange-500"
        />
      </div>

      {/* Users Table */}
      <div className="overflow-x-auto">
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
                <td className="py-3 px-4">{transaction.receipt}</td>
                <td className="py-3 px-4">{transaction.user?.firstName || 'N/A'}</td>
                <td className="py-3 px-4">{transaction.phone}</td>
                <td className="py-3 px-4">{transaction.user?.email || 'N/A'}</td>
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
