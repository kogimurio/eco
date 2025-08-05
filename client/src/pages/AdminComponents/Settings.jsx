export default function Settings() {
  return (
    <div className="p-6 text-white space-y-8">
      <h2 className="text-2xl font-semibold">Settings</h2>

      {/* Profile Settings */}
      <section className="bg-gray-800 p-6 rounded-lg shadow-md space-y-4">
        <h3 className="text-lg font-semibold">Admin Profile</h3>
        <div className="grid gap-4 md:grid-cols-2 px-4">
          <input type="text" placeholder="Name" className="p-2 rounded bg-gray-700 text-white w-full" />
          <input type="email" placeholder="Email" className="p-2 rounded bg-gray-700 text-white w-full" />
          <input type="password" placeholder="New Password" className="p-2 rounded bg-gray-700 text-white w-full" />
          <input type="file" className="p-2 bg-gray-700 rounded text-white w-full" />
        </div>

        <button className="bg-orange-600 hover:bg-orange-700 px-4 py-2 rounded mt-2">Update Profile</button>
      </section>

      {/* System Preferences */}
      <section className="bg-gray-800 p-6 rounded-lg shadow-md space-y-4">
        <h3 className="text-lg font-semibold">System Preferences</h3>
        <div className="flex items-center justify-between">
          <p>Dark Mode</p>
          <input type="checkbox" className="toggle toggle-warning" />
        </div>
        <div>
          <label>Language</label>
          <select className="w-full bg-gray-700 p-2 rounded mt-1">
            <option>English</option>
            <option>French</option>
            <option>Swahili</option>
          </select>
        </div>
      </section>

      {/* Notification Preferences */}
      <section className="bg-gray-800 p-6 rounded-lg shadow-md space-y-4">
        <h3 className="text-lg font-semibold">Notifications</h3>
        <div className="flex justify-between">
          <span>Order Notifications</span>
          <input type="checkbox" defaultChecked className="toggle toggle-warning" />
        </div>
        <div className="flex justify-between">
          <span>Low Stock Alerts</span>
          <input type="checkbox" className="toggle toggle-warning" />
        </div>
      </section>

      {/* Security Settings */}
      <section className="bg-gray-800 p-6 rounded-lg shadow-md space-y-4">
        <h3 className="text-lg font-semibold">Security</h3>
        <div className="flex justify-between">
          <span>Two-Factor Authentication</span>
          <input type="checkbox" className="toggle toggle-warning" />
        </div>
        <button className="text-red-500 hover:underline">Logout All Devices</button>
      </section>

      {/* Danger Zone */}
      <section className="bg-gray-800 p-6 rounded-lg shadow-md">
        <h3 className="text-lg font-semibold text-red-500 mb-2">Danger Zone</h3>
        <button className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded">Delete My Account</button>
      </section>
    </div>
  );
}
