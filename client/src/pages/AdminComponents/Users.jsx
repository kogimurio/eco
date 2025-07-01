export default function Users() {
  const users = [
    { name: "Jane Doe", email: "jane@gmail.com", role: "Customer", status: "Active" },
    { name: "Alice Smith", email: "alice@gmail.com", role: "Customer", status: "Active" },
    { name: "Bob Johnson", email: "bob@gmail.com", role: "Customer", status: "Suspended" },
    { name: "Emily Rose", email: "emily@gmail.com", role: "Customer", status: "Active" },
    { name: "Mike Dean", email: "mike@gmail.com", role: "Customer", status: "Suspended" },
  ];

  return (
    <div className="p-6">
      {/* Header */}
      <div className="mb-6 flex justify-between items-center">
        <h2 className="text-2xl font-semibold text-white">Users Manager</h2>
        <input
          type="text"
          placeholder="Search users..."
          className="px-4 py-2 rounded-lg bg-gray-800 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-orange-500"
        />
      </div>

      {/* Users Table */}
      <div className="overflow-x-auto">
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
                <td className="py-3 px-4">{user.name}</td>
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
