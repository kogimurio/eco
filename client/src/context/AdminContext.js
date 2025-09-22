import { Children, createContext, useContext, useEffect, useState } from "react";
import axios from 'axios';

const BASE_URL = process.env.REACT_APP_BASE_URL;
const AdminContext = createContext();


export const AdminProvider = ({ children }) => {
    const [orders, setOrders] = useState([]);
    const [products, setProducts] = useState([]);
    const [users, setUsers] = useState([]);
    const [transactions, setTransactions] = useState([]);
    const [loading, setLoading] = useState(true);

    // Fetch orders
    const fetchOrders = async () => {
        try {
            const response = await axios.get(`${BASE_URL}/orders/all_orders`);
            setOrders(response.data.orders || []);
        } catch (error) {
            console.error("Error fetching orders:", error.response?.data.message || error.message);
        }
    };

    // Fetch products
    const fetchProducts = async () => {
        await new Promise(res => setTimeout(res, 2000));
        try {
            const res = await axios.get(`${BASE_URL}/products`)
        setProducts(res.data.products)
        } catch (error) {
            console.error(error?.res?.data || error.message);
        }
    };

    // Fetch Users
    const fetchUsers = async () => {
        try {
            const response = await axios.get(`${BASE_URL}/users/get_all_users`)
            setUsers(response.data.users)
        } catch (error) {
            console.error(error.response.data.message || error.message);
        } 
    }

    // Fetch Transactions
    const fetchTransactions = async () => {
        try {
        const response = await axios.get(`${BASE_URL}/mpesa/all_payments`)
        setTransactions(response.data.payments)
        console.log(response.data.payments);
        } catch (error) {
        console.error(error.response.data || error.message);
        }
    }
    

    const fetchAllAdminData = async() => {
        setLoading(true);
        await Promise.all([
            fetchOrders(),
            fetchProducts(),
            fetchUsers(),
            fetchTransactions()
        ]);
        setLoading(false);
    };

    useEffect(() => {
        fetchAllAdminData();
    }, []);

    return (
        <AdminContext.Provider
        value={{
            orders,
            products,
            users,
            setUsers,
            transactions,
            loading,
            fetchOrders,
            fetchProducts,
            fetchUsers,
            fetchTransactions
        }}
        >
            {children}
        </AdminContext.Provider>
    )
};

export const useAdmin = () => useContext(AdminContext);