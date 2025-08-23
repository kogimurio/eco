import { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import { toast } from 'react-toastify';

import { useCart } from '../../context/CartContext';

const BASE_URL = process.env.REACT_APP_BASE_URL;

const user = JSON.parse(localStorage.getItem('user'));
const token = JSON.parse(localStorage.getItem('token'));


export default function Mpesa ({ closeModal }) {
    const [formData, setFormData] = useState({
        product: '',
        amount: '',
        phone: ''
    });
    const [loadingItem, setLoadingItem] = useState(null)
    const { cartItems, loadingCart } = useCart();
    const { clearCart } = useCart();
    const navigate = useNavigate(); 
    const userId = user?.id;

    useEffect(() => {
        const fetchCart = async () => {
        try {
            await fetchCart();
        } catch (error) {
            console.error("Error fetching cart:", error);
        } finally {
            setLoadingItem(false);
        }
        }
        fetchCart()
    }, []);

    const subtotal = cartItems.reduce((total, item) => {
        return total + (item.product?.price ? item.product.price * item.quantity : 0);
    }, 0);

    const amountToSend = Math.round(subtotal);


    const handleChange = (e) => {
        setFormData({...formData, [e.target.name]: e.target.value});
    }

    const handleSubmit =async (e) => {
        e.preventDefault();

        try {
            const res = await axios.post(`${BASE_URL}/mpesa`, {
                phone: formData.phone,
                amount: amountToSend,
                accountReferencee: formData.product,
                user: userId,
            },{
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        );

            const checkoutRequestID = res.data.data.CheckoutRequestID;
            toast.success("STK Push sent! Waiting for payment...");

            // Poll for payment result
            const interval = setInterval(async () => {
                try {
                    const statusRes = await axios.get(`${BASE_URL}/mpesa/payment-status/${checkoutRequestID}`);
                    
                    console.log("Current payment status:", statusRes.data);
                    

                    if (statusRes.data.status === 'success') {
                        clearInterval(interval);
                        

                        toast.success("Payment successful! Redirecting.....");
                        
                        const orderId = statusRes.data.orderId;
                        console.log("Order ID from backend:", orderId);

                        closeModal();
                        
                        setTimeout(() => {
                            window.location.href=`/order_confirmation?orderId=${orderId}`;
                        }, 600);
                    } else if (statusRes.data.status === 'failed') {
                        clearInterval(interval);
                        console.log("Closing modal on failure");
                        closeModal();
                        
                        const reason = statusRes.data.resultDesc || "Payment failed or cancelled";
                        toast.error(`Payment failed ${reason}`);
                    }
                } catch (error) {
                    console.error("Polling error:", error.message);
                }
            }, 3000);

            
        } catch (error) {
            toast.error(error.response?.data?.message || error.message);
            console.error(error.response?.data?.message || error.message);
        }
    }
    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <input
                type="text"
                name="amount"
                placeholder="Amount"
                disabled
                value={subtotal.toFixed(2)}
                onChange={handleChange}
                className="w-full border px-4 py-2 rounded mt-4"
            />
            <input
                type="text"
                name="phone"
                placeholder="Phone (e.g 0712345678)"
                value={formData.phone}
                onChange={handleChange}
                className="w-full border px-4 py-2 rounded mt-4"
            />
            <button 
                type="submit"
                className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700 transition"
            >
                Send STK Push
            </button>
        </form>
    )
}