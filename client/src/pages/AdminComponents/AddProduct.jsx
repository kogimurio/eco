import { useState, useEffect, useRef } from "react";
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';
import LoadingSpinner from '../LoadingSpinner';

const BASE_URL = process.env.REACT_APP_BASE_URL;


export default function CreateProduct() {
    const [formData, setFormData] = useState({
        name: '',
        price: '',
        description: '',
        brand: '',
        category: '',
        stock: ''
    });
    const [images, setImages] = useState([]);
    const [thumbnail, setThumbnail] = useState('');
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(false);
    const [loadingCategories, setLoadingCategories] = useState(true)
    const fileInputRef = useRef();
    const navigate = useNavigate();

    // Fetch Category
    useEffect(() => {
        const fetchCategory = async() => {
            try {
                const res = await axios.get(`${BASE_URL}/category`);
                setCategories(res.data.category || []);
            } catch(error) {
                toast.error('Failed to load category');
            } finally {
                setLoadingCategories(false);
            }
        }
        fetchCategory();
    }, []);


    const handleChange = (e) => {
        setFormData({...formData, [e.target.name]: e.target.value});
    }

    const handleThambnailChange = (e) => {
        setThumbnail(e.target.files[0]);
    }

    const handleFileChange = (e) => {
        setImages(Array.from(e.target.files));
    }
    const handleSubmit = async (e) => {
        e.preventDefault();

        if(images.length === 0) return toast.error('Please select atleast one product image');

        const data = new FormData();
        data.append('name', formData.name);
        data.append('price', formData.price);
        data.append('description', formData.description);
        data.append('brand', formData.brand);
        data.append('category', formData.category);
        data.append('stock', formData.stock);
        data.append('thumbnail', thumbnail);
        images.forEach(img => {
            data.append('image', img);
        });
        

        try {
            setLoading(true)
            const response = await axios.post(`${BASE_URL}/products`, data, {
                headers: { "Content-Type": "multipart/form-data" }
            });
            setFormData({
                name: '',
                price: '',
                description: '',
                brand: '',
                category: '',
                stock: ''
            });
            setImages([]);
            if (fileInputRef.current) fileInputRef.current.value = '';
            toast.success('Product added');
            console.log(response.data);
            navigate('/dashboard/products');
        } catch (error) {
            toast.error('Failed to add product');
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
                <h2 className="text-2xl font-bold text-center text-orange-500">Create Product</h2>
                <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Product Name"
                    required
                    className="w-full p-3 rounded bg-gray-700 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-orange-500"
                />
                <input
                    type="number"
                    name="price"
                    value={formData.price}
                    onChange={handleChange}
                    placeholder="Product Price"
                    required
                    className="w-full p-3 rounded bg-gray-700 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-orange-500"
                />
                <input
                    type="text"
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    placeholder="Product Description"
                    required
                    className="w-full p-3 rounded bg-gray-700 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-orange-500"
                />
                <input
                    type="text"
                    name="brand"
                    value={formData.brand}
                    onChange={handleChange}
                    placeholder="Product Brand"
                    required
                    className="w-full p-3 rounded bg-gray-700 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-orange-500"
                />

                {/* Category Dropdown */}
                {loadingCategories ? (
                    <div className="flex justify-center items-center py-4">
                        <LoadingSpinner size={15} color="white" />
                    </div>
                ) : (
                    <select
                        name="category"
                        value={formData.category}
                        onChange={handleChange}
                        required
                        className="w-full p-3 rounded bg-gray-700"
                    >
                        <option value="">Select Category</option>
                        {categories.map((cat) => (
                            <option
                                key={cat._id}
                                value={cat._id}
                            >
                                {cat.name}
                            </option>
                        ))}
                    </select>
                )}
                
                <input
                    type="number"
                    name="stock"
                    value={formData.stock}
                    onChange={handleChange}
                    placeholder="Product Stock"
                    required
                    className="w-full p-3 rounded bg-gray-700 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-orange-500"
                />
                <label>Thumbnail Image</label>
                <input
                    type="file"
                    accept="image/"
                    name="thumbnail"
                    onChange={handleThambnailChange}
                    required
                    className="p-3 rounded bg-gray-700 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-orange-500"
                />
                <label>Additional Images</label>
                <input
                    type="file"
                    name="images"
                    accept="image/"
                    multiple
                    onChange={handleFileChange}
                    className="p-3 rounded bg-gray-700 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-orange-500"
                />
                <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-orange-600 hover:bg-orange-700 transition py-3 rounded font-semibold"
                >
                    {loading ? <LoadingSpinner size={20} color="white" /> : "Add Product"}
                </button>
            </form>
        </div>
    )
}