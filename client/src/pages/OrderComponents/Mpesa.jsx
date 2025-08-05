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
                    console.log(`${BASE_URL}/mpesa/payment-status/${checkoutRequestID}`);

                    if (statusRes.data.status === 'success') {
                        clearInterval(interval);
                        toast.success("Payment successful!");
                        await axios.post(`${BASE_URL}/orders`, {}, {
                                headers: {
                                    Authorization: `Bearer ${token}`
                                }
                            });
                        closeModal();
                        
                        setTimeout(() => {
                            window.location.href='/order_confirmation, { state: { orderId: createdOrder._id } }';
                        }, 600);
                    } else if (statusRes.data.status === 'failed') {
                        clearInterval(interval);
                        toast.error("Payment failed or cancelled");
                    }
                } catch (error) {
                    console.error("Polling error:", error.message);
                }
            }, 3000); // poll every 3 sec
            // window.location.href=('/order_confirmation')
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
                value={subtotal}
                onChange={handleChange}
                className="w-full border px-4 py-2 rounded mt-4"
            />
            <input
                type="text"
                name="phone"
                placeholder="Phone (e.g 2547......)"
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