import { createContext, useContext, useEffect, useState } from 'react';
import axios from 'axios';

const BASE_URL = process.env.REACT_APP_BASE_URL;
const CartContext = createContext();

export const CartProvider = ({ children }) => {
    const [cartItems, setCartItems] = useState([]);
    const [loadingCart, setLoadingCart] = useState(true);

    const localToken = localStorage.getItem('token');
    const token = localToken ? JSON.parse(localToken) : null;

    const fetchCart =async () => {
        if (!token) return;
        try {
            const res = await axios.get(`${BASE_URL}/cart`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            setCartItems(res.data.cart.items || []);
        } catch (error) {
            console.error("Cart fetch failed:", error);
            setCartItems([]);
        } finally {
            setLoadingCart(false);
        }
    };

    const addToCart = async (productId, quantity = 1) => {
        try {
            await axios.post(`${BASE_URL}/cart`, {
                productId,
                quantity
            }, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            // Update cart after adding
            await fetchCart();
        } catch (error) {
            console.error("Add to cart failed:", error);
        }
    };

    const updateCartItem = async (productId, quantity) => {
        try {
            await axios.put(`${BASE_URL}/cart`, {
                productId,
                quantity
            }, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            await fetchCart();
        } catch (error) {
            console.error("Update cart failed:", error);
        }
    };

    const removeFromCart = async (productId) => {
        try {
            await axios.delete(`${BASE_URL}/cart/${productId}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            await fetchCart();
        } catch (error) {
            console.error("Remove from cart failed:", error);
        }
    }

    useEffect(() => {
        fetchCart();
    }, [token]);

    return (
        <CartContext.Provider value={{ removeFromCart, cartItems, loadingCart, fetchCart, addToCart, updateCartItem }}>
            {children}
        </CartContext.Provider>
    );
};

export const useCart = () => useContext(CartContext);