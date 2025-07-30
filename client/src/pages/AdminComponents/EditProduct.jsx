import { useState, useEffect, useRef } from "react";
import axios from 'axios';
import { useNavigate, useParams } from "react-router-dom";
import { toast } from 'react-toastify';
import LoadingSpinner from '../LoadingSpinner';

const BASE_URL = process.env.REACT_APP_BASE_URL;

const BASE_IMAGE_URL = process.env.REACT_APP_BASE_URL_IMAGE


export default function UpdateProduct() {
    const [formData, setFormData] = useState({
        name: '',
        price: '',
        description: '',
        brand: '',
        category: '',
        stock: ''
    });
    const [images, setImages] = useState([]);
    const [categories, setCategories] = useState([]);
    const [thumnailPreview, setThumnailPreview] = useState(null);
    const [imagePreview, setImagePreview] = useState([]);
    const [thumbnailFile, setThumbnailFile] = useState(null);
    const [loading, setLoading] = useState(false);
    const [loadingCategories, setLoadingCategories] = useState(true)
    const fileInputRef = useRef();
    const navigate = useNavigate();
    const { slug } = useParams();
    const [product, setProduct] = useState(null)

    // Fetch product by id
    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const res = await axios.get(`${BASE_URL}/products/${slug}`);

                const fetchedProduct = res.data.product;

                setProduct(fetchedProduct)


                console.log("Fetched product ID:", fetchedProduct._id)
                setFormData({
                    name: fetchedProduct.name,
                    price: fetchedProduct.price,
                    description: fetchedProduct.description,
                    brand: fetchedProduct.brand,
                    category: fetchedProduct.category,
                    stock: fetchedProduct.stock,
                });
                const cleanThumbnail = (`${BASE_IMAGE_URL}/${fetchedProduct.thumbnail}`).replace(/\\/g, "/")
                const cleanImages = (fetchedProduct.images || []).map(img => `${BASE_IMAGE_URL}/${img}`.replace(/\\/g, "/"))
                setThumnailPreview(cleanThumbnail);
                setImagePreview(cleanImages);
            } catch (error) {
                toast.error('Failed to fetch product');
            }
        }
        if (slug) fetchProduct();
    }, [slug]);

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

    const handleFileChange = (e) => {
        const files = (Array.from(e.target.files));
        setImages(files);

        if (files) {
            const preview = files.map(file => URL.createObjectURL(file));
            setImagePreview(preview)
        } else {
            setImagePreview(null)
        }
    }

    const handleThumbnailChange = (e) => {
        const file = (e.target.files[0]);
        setThumnailPreview(URL.createObjectURL(file));
        setThumbnailFile(file);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        if(!thumbnailFile) return toast.error('Please select one product image');

        const data = new FormData();
        data.append('name', formData.name);
        data.append('price', formData.price);
        data.append('description', formData.description);
        data.append('brand', formData.brand);
        data.append('category', formData.category);
        data.append('stock', formData.stock);
        data.append('thumbnail', thumbnailFile);
        images.forEach(img => {
            data.append('images', img);
        });
        

        try {
            setLoading(true)
            const response = await axios.put(`${BASE_URL}/products/${product._id}`, data, {
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
            toast.success('Product updated');
            console.log(response.data);
            navigate('/dashboard/products');
        } catch (error) {
            toast.error('Failed to update product');
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
                <h2 className="text-2xl font-bold text-center text-orange-500">Edit Product</h2>
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
                {thumnailPreview && (
                    <div className="mt-4">
                        <p className="text-sm text-gray-300">Thumbnail Image</p>
                        <img
                            src={thumnailPreview}
                            alt={thumnailPreview}
                            className="w-full h-48 object-contain rounded"
                        />
                    </div>
                )}
                <label>Thumbnail Image</label>
                <input
                    type="file"
                    accept="image/"
                    name="thumnail"
                    onChange={handleThumbnailChange}
                    required={!thumnailPreview}
                    className="p-3 rounded bg-gray-700 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-orange-500"
                />
                {imagePreview.length > 0 && (
                    <div className="mt-4">
                        <p className="text-sm text-gray-300">Product Images</p>
                        <div className="grid grid-cols-3 gap-2">
                            {imagePreview.map((img, key) => (
                            <div key={key}>
                                <img
                                    src={img}
                                    alt={`Product ${key}`}
                                    className="w-full h-32 object-contain rounded"
                                />
                            </div>
                        ))}
                        </div>
                    </div>
                )}
                <label>Other Images</label>
                <input
                    type="file"
                    accept="image/"
                    name="images"
                    multiple
                    onChange={handleFileChange}
                    required
                    className="p-3 rounded bg-gray-700 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-orange-500"
                />
                <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-orange-600 hover:bg-orange-700 transition py-3 rounded font-semibold"
                >
                    {loading ? <LoadingSpinner size={20} color="white" /> : "Save"}
                </button>
            </form>
        </div>
    )
}