import { useState } from 'react';

export default function Profile() {
  const [form, setForm] = useState({
    name: 'John Doe',
    email: 'john@example.com',
    password: '',
    confirmPassword: '',
    profileImage: null,
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'profileImage') {
      setForm({ ...form, profileImage: files[0] });
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (form.password && form.password !== form.confirmPassword) {
      alert('Passwords do not match');
      return;
    }
    // Submit form to backend
    console.log(form);
    // axios.get('/api/users/profile', {
    //   headers: {
    //     Authorization: `Bearer ${token}`
    //   }
    // });

  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <div className="max-w-xl mx-auto bg-gray-800 rounded-lg shadow p-6 space-y-6">
        <h2 className="text-2xl font-semibold text-orange-500">My Profile</h2>

        {/* Profile Image */}
        <div className="flex items-center space-x-4">
          <img
            src={
              form.profileImage
                ? URL.createObjectURL(form.profileImage)
                : 'https://via.placeholder.com/80'
            }
            alt="Profile"
            className="w-20 h-20 rounded-full object-cover border-2 border-orange-500"
          />
          <label className="cursor-pointer bg-orange-600 hover:bg-orange-700 text-white px-4 py-2 rounded text-sm">
            Change Photo
            <input
              type="file"
              name="profileImage"
              onChange={handleChange}
              className="hidden"
            />
          </label>
        </div>

        {/* Profile Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="Full Name"
            className="w-full p-3 rounded bg-gray-700 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-orange-500"
          />
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            placeholder="Email"
            className="w-full p-3 rounded bg-gray-700 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-orange-500"
          />
          <input
            type="password"
            name="password"
            value={form.password}
            onChange={handleChange}
            placeholder="New Password"
            className="w-full p-3 rounded bg-gray-700 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-orange-500"
          />
          <input
            type="password"
            name="confirmPassword"
            value={form.confirmPassword}
            onChange={handleChange}
            placeholder="Confirm Password"
            className="w-full p-3 rounded bg-gray-700 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-orange-500"
          />

          <button
            type="submit"
            className="w-full bg-orange-600 hover:bg-orange-700 transition py-3 rounded font-semibold"
          >
            Update Profile
          </button>
        </form>
      </div>
    </div>
  );
}
