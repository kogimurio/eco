import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { FaEye, FaEyeSlash } from "react-icons/fa";

const BASE_URL = process.env.REACT_APP_BASE_URL;

export default function Register() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [errors, setErrors] = useState([]);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  

  const validateForm = () => {
    const newErrors = {};

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Enter a valid email address";
    }

    if (!formData.password.trim()) {
      newErrors.password = "Password is required"
    } else if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/.test(formData.password)) {
      newErrors.password = "Password must be 8+ chars, include upeer, lower, number & symbol";
      }

    if(!formData.firstName.trim()) {
      newErrors.firstName = "Fill your first name";
    }

    if(!formData.lastName.trim()) {
      newErrors.lastName = "Fill your last name";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }

  const checkPasswordRules = (password) => {
    return {
      lowercase: /[a-z]/.test(password),
      uppercase: /[A-Z]/.test(password),
      digit: /[\d]/.test(password),
      special: /[\W_]/.test(password),
      length: password.length >= 8,
    }
  }


  const rules = checkPasswordRules(formData.password)
  const passwordMatch = formData.password === formData.confirmPassword && formData.confirmPassword.length > 0;
  const allRulesPassed = Object.values(rules).every(Boolean) && passwordMatch;

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      toast.error("Please fix errors before registering")
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }
    try {
      const response = await axios.post(`${BASE_URL}/users/register`, {
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        password: formData.password
      });
      toast.success('Registration successful!');
      console.log(response.data);
      navigate('/login');
    } catch (error) {
      console.log(error.response?.data || error.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white px-4">
      <form
        onSubmit={handleSubmit}
        noValidate
        className="bg-gray-800 p-8 rounded-lg shadow-md w-full max-w-md space-y-6"
      >
        <h2 className="text-2xl font-bold text-center text-orange-500">Create an Account</h2>

        <div>
          <input
            type="text"
            name="firstName"
            placeholder="First Name"
            value={formData.firstName}
            onChange={handleChange}
            className="w-full p-3 rounded bg-gray-700 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-orange-500"
          />
          {errors.firstName && <p className="text-red-500 text-sm">{errors.firstName}</p>}
        </div>

        <div>
          <input
            type="text"
            name="lastName"
            placeholder="Last Name"
            value={formData.lastName}
            onChange={handleChange}
            className="w-full p-3 rounded bg-gray-700 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-orange-500"
          />
          {errors.lastName && <p className="text-red-500 text-sm">{errors.lastName}</p>}
        </div>

        <div>
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            className="w-full p-3 rounded bg-gray-700 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-orange-500"
          />
          {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
        </div>

        <div className='space-y-4'>
          <ul className='text-sm text-gray-300'>
            <li className={rules.lowercase ? "text-green-400" : "text-red-400"}>
              {rules.lowercase ? "✅" : "❌"} At least one lowercase</li>
            <li className={rules.uppercase ? "text-green-400" : "text-red-400"}>
              {rules.uppercase ? "✅" : "❌"} At least one uppercase</li>
            <li className={rules.digit ? "text-green-400" : "text-red-400"}>
              {rules.digit ? "✅" : "❌"} At least one digit</li>
            <li className={rules.special ? "text-green-400" : "text-red-400"}>
              {rules.special ? "✅" : "❌"} At least one special character</li>
            <li className={rules.length ? "text-green-400" : "text-red-400"}>
              {rules.length ? "✅" : "❌"} Minimum 8 characters</li>
          </ul>
          <div className='relative'>
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              className="w-full p-3 rounded bg-gray-700 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-2 top-4 text-gray-100"
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>
          <div className='relative'>
            <input
              type={showConfirmPassword ? "text" : "password"}
              name="confirmPassword"
              placeholder="Confirm Password"
              value={formData.confirmPassword}
              onChange={handleChange}
              className="w-full p-3 mb-4 rounded bg-gray-700 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute right-2 top-4 text-gray-100"
            >
              {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
            {formData.confirmPassword && (
            <p className={passwordMatch ? "text-green-400 text-sm" : "text-red-400 text-sm"}>
              {passwordMatch ? "✅ Passwords match" : "❌ Passwords do not match"}
            </p>
          )}
          </div>
          {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}
        </div>

        <button
          type="submit"
          disabled={!allRulesPassed}
          className={`w-full py-3 rounded font-semibold transition
            ${allRulesPassed ? "bg-orange-600 hover:bg-orange-700" : "bg-gray-500 cursor-not-allowed"}
            `}
        >
          Register
        </button>

        <p className="text-center text-sm text-gray-400">
          Already have an account? <a href="/login" className="text-orange-400 hover:underline">Login</a>
        </p>
      </form>
    </div>
  );
}
