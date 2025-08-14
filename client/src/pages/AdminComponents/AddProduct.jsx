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
        stock: '',
        giftWrapping: '',
        vintage: '',
        isClearance: '',
        isBestSeller: '',
        isFeatured: ''
    });
    const [images, setImages] = useState([]);
    const [imagePreview, setImagePreview] = useState([]);
    const [thumbnail, setThumbnail] = useState('');
    const [thumbnailPreview, setThumbnailPreview] = useState('');
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

    // Revoke Thumbnail Preview
    useEffect(() => {
        return() => {
            if (thumbnailPreview) {
                URL.revokeObjectURL(thumbnailPreview);
            }
        }
    }, [thumbnailPreview]);


    const handleChange = (e) => {
        setFormData({...formData, [e.target.name]: e.target.value});
    }

    const handleThambnailChange = (e) => {
        const file = (e.target.files[0]);
        setThumbnail(file);

        if (file) {
            const previewURL = URL.createObjectURL(file);
            setThumbnailPreview(previewURL);
        } else {
            setThumbnailPreview(null);
        }
    }

    const handleFileChange = (e) => {
        const files = (Array.from(e.target.files));
        setImages(files);
        

        if (files) {
            const previewImageUrl = files.map(file => URL.createObjectURL(file));
            setImagePreview(previewImageUrl);
        } else {
            setImagePreview(null);
        }
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
        data.append('giftWrapping', formData.giftWrapping);
        data.append('isClearance', formData.isClearance);
        data.append('isBestSeller', formData.isBestSeller);
        data.append('isFeatured', formData.isFeatured);
        data.append('vintage', formData.vintage);
        images.forEach(img => {
            data.append('images', img);
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
                <label className="flex items-center gap-2">
                    <input
                        type="checkbox"
                        name="giftWrapping"
                        checked={formData.giftWrapping}
                        onChange={(e) => 
                            setFormData({...formData, giftWrapping: e.target.checked })
                        }
                        placeholder="Gift Wrapping"
                        className="w-5 h-5 text-orange-500 cursor-pointer"
                    />
                    Gift Wrapping
                </label>
                <label className="flex items-center gap-2">
                    <input
                        type="checkbox"
                        name="isClearance"
                        checked={formData.isClearance}
                        onChange={(e) => 
                            setFormData({...formData, isClearance: e.target.checked })
                        }
                        placeholder="Gift Wrapping"
                        className="w-5 h-5 text-orange-500 cursor-pointer"
                    />
                    Is Clearance
                </label>
                <label className="flex items-center gap-2">
                    <input
                        type="checkbox"
                        name="isBestSeller"
                        checked={formData.isBestSeller}
                        onChange={(e) => 
                            setFormData({...formData, isBestSeller: e.target.checked })
                        }
                        placeholder="Gift Wrapping"
                        className="w-5 h-5 text-orange-500 cursor-pointer"
                    />
                    Is Best Seller
                </label>
                <label className="flex items-center gap-2">
                    <input
                        type="checkbox"
                        name="isFeatured"
                        checked={formData.isFeatured}
                        onChange={(e) => 
                            setFormData({...formData, isFeatured: e.target.checked })
                        }
                        placeholder="Gift Wrapping"
                        className="w-5 h-5 text-orange-500 cursor-pointer"
                    />
                    Is Featured
                </label>
                
                <input
                    type="number"
                    name="vintage"
                    value={formData.vintage}
                    onChange={handleChange}
                    placeholder="vintage"
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
                {/* Thumbnail preview */}
                {thumbnailPreview && (
                    <div className="mt-4">
                        <p className="text-sm text-gray-300 mb-1">Thumbnail Preview</p>
                        <img
                            src={thumbnailPreview}
                            alt="Thumbnail Preview"
                            className="w-full h-48 object-contain rounded border border-gray-600"
                        />
                    </div>
                )}
                <label className="my-2">Thumbnail Image</label>
                <input
                    type="file"
                    accept="image/"
                    name="thumbnail"
                    onChange={handleThambnailChange}
                    required
                    className="cursor-pointer p-3 rounded bg-gray-700 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-orange-500"
                />
                {/* Images preview */}
                {imagePreview.length > 0 && (
                    <div className="mt-4">
                        <p className="text-sm text-gray-300">Product images</p>
                        <div className="grid grid-cols-3 gap-2">
                            {imagePreview.map((img, key) => (
                                <div key={key}>
                                    <img
                                        src={img}
                                        alt='product images'
                                        className="w-full h-32 object-cover rounded"
                                    />
                                </div>
                            ))}
                        </div>
                    </div>
                )}
                <label className="mt-2">Additional Images</label>
                <input
                    type="file"
                    name="images"
                    accept="image/"
                    multiple
                    onChange={handleFileChange}
                    className="cursor-pointer p-3 rounded bg-gray-700 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-orange-500"
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