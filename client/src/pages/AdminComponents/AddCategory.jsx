import { useState } from "react";
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';
import LoadingSpinner from '../LoadingSpinner';

const BASE_URL = process.env.REACT_APP_BASE_URL;


export default function CreateCategory() {
    const [formData, setFormData] = useState({
        name: ''
    });
    const [image, setImage] = useState('')
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();


    const handleChange = (e) => {
        setFormData({...formData, [e.target.name]: e.target.value});
    }

    const handlefileChange = (e) => {
        const file = (e.target.files[0]);
        setImage(file);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!image) return toast.error("Please select an image");

        const data = new FormData();
        data.append('name', formData.name);
        data.append('image', image);

        try {
            setLoading(true)
            const response = await axios.post(`${BASE_URL}/category`, data, {
                headers: { "Content-Type": "multipart/form-data" }
            });
            setFormData({
                name: ''
            });
            setImage('');
            toast.success('Category added');
            console.log(response.data);
            navigate('/dashboard/products');
        } catch (error) {
            toast.error('Failed to add category');
            console.error(error.response.data || error.message);
        } finally {
            setLoading(false);
        }
    }
    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white px-4">
            <form
                onSubmit={handleSubmit}
                className="bg-gray-800 p-8 rounded-lg shadow-lg w-full max-w-md space-y-6 mt-6"
            >
                <h2 className="text-2xl font-bold text-center text-orange-500">Create Category</h2>
                <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Product Category"
                    required
                    className="w-full p-3 rounded bg-gray-700 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-orange-500"
                />

                <input
                    type="file"
                    accept="image/*"
                    name="image"
                    onChange={handlefileChange}
                    required
                    className="cursor-pointer p-3 rounded bg-gray-700 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-orange-500"
                />
                
                <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-orange-600 hover:bg-orange-700 transition py-3 rounded font-semibold"
                >
                    {loading ? <LoadingSpinner size={20} color="white" /> : "Add Category"}
                </button>
            </form>
        </div>
    )
}