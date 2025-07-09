import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const BASE_URL = process.env.REACT_APP_BASE_URL;

export default function Login() {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const response = await axios.post(`${BASE_URL}/users/login`, formData, {
        withCredentials: true
      });
      // Store user data
      localStorage.setItem('user', JSON.stringify(response.data.user));
      toast.success('Login successful!');
      console.log(response.data);
      navigate('/')
    } catch (error) {
      console.log(error.response?.data || error.message);
      toast.error(error.response?.data?.error || 'Login failed');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white px-4">
      <form
        onSubmit={handleSubmit}
        className="bg-gray-800 p-8 rounded-lg shadow-md w-full max-w-md space-y-6"
      >
        <h2 className="text-2xl font-bold text-center text-orange-500">Login to Your Account</h2>

        <input
          type="email"
          placeholder="Email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
          className="w-full p-3 rounded bg-gray-700 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-orange-500"
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          required
          className="w-full p-3 rounded bg-gray-700 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-orange-500"
        />

        <button
          type="submit"
          className="w-full bg-orange-600 hover:bg-orange-700 transition py-3 rounded font-semibold"
        >
          Login
        </button>

        <p className="text-center text-sm text-gray-400">
          Don't have an account? <a href="/register" className="text-orange-400 hover:underline">Register</a>
        </p>
      </form>
    </div>
  );
}
