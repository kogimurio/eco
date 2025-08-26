import { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

const BASE_URL = process.env.REACT_APP_BASE_URL;

export default function Modal ({ slug, onClose }) {
    const [formData, setFormData] = useState({
        rating: '',
        comment: ''
    });

    const token = JSON.parse(localStorage.getItem('token'));

    

    const handleChange = (e) => {
        setFormData({...formData, [e.target.name] : e.target.value })
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post(`${BASE_URL}/review/${slug}`, formData, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            setFormData({
                rating: '',
                comment: ''
            })
            console.log("Data sent to backend:", response.data);

        } catch (error) {

            const msg = 
            error.response?.data?.message || // Backend error
            error.message ||                 // Network Error/ Axios Error
            "Something went wrong"           // Fallback

            console.error(msg);
            toast.error(msg)
        }
    }
    
    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white text-black rounded-lg p-6 w-full max-w-md">
            <h3 className="text-lg font-semibold mb-6">Add a review</h3>
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <input
                    type="number"
                    name="rating"
                    min="1"
                    max="5"
                    placeholder="Rating (1-5)"
                    value={formData.rating}
                    onChange={handleChange}
                    className="border px-3 py-2 rounded w-full"
                />
                <textarea
                    name="comment"
                    value={formData.comment}
                    onChange={handleChange}
                    placeholder="Write your review..."
                    className="border px-3 py-2 rounded w-full resize-none"
                ></textarea>
                <button 
                    type='submit'
                    className="px-4 py-2 bg-orange-600 text-white rounded hover:bg-orange-700"
                >
                    Submit
                </button>
                <button 
                    type="button"
                    onClick={onClose}
                    className="px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700"
                >
                    Cancel
                </button>
            </form>
        </div>
    </div>
    )
}