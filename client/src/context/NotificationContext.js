import React, { createContext, useContext, useState, useEffect, useRef } from 'react';
import { io } from 'socket.io-client';
import { toast } from 'react-toastify';
import axios from 'axios';

const NotificationContext = createContext();
export const useNotification = () => useContext(NotificationContext);


const rawToken = localStorage.getItem('token');
const token = JSON.parse(rawToken);

export const NotificationProvider = ({ children }) => {
    const [notifications, setNotifications] = useState([]);
    const socketRef = useRef(null);

    useEffect(() => {
        if (!rawToken) return;
        console.log("🔑 Sending socket token:", token);

        // Initial fetch notifications from DB
        const fetchNotifications = async () => {
            try {
                const response = await axios.get(
                    `${process.env.REACT_APP_BASE_URL}/notifications`,
                    { headers: { Authorization: `Bearer ${token}` } }
                );
                console.log("Fetched notifications:", response.data.notifications);
                setNotifications(response.data.notifications || []);
            } catch (error) {
                console.error("Failed to fetch notifications:", error);
                toast.error("Failed to fetch notifications");
            }
        };
        fetchNotifications();

        
        // Connect socket
        socketRef.current = io(`${process.env.REACT_APP_BASE_URL_IMAGE}`, {
            auth: { token },
        });

        socketRef.current.on("connect", () => {
            console.log("✅ Socket connected:", socketRef.current.id);
        });

        // Stock alerts
        socketRef.current.on("stock_updated", (data) => {
            const msg = `⚠️ Stock low: ${data.product} (remaining ${data.stock})`;

            const stockNotification = {
                _id: Date.now().toString(), // temporary client ID
                type: "stock",
                message: msg,
                data,
                read: false,
                createdAt: new Date().toISOString(),
            };

            setNotifications((prev) => [...prev, stockNotification]);
            toast.warn(msg);
        });

        // Order alerts
        socketRef.current.on("order_created", (data) => {
            const msg = `🛒 New order placed: #${data.orderId}`;

            const orderNotification = {
                _id: Date.now().toString(),
                type: "order",
                message: msg,
                data,
                read: false,
                createdAt: new Date().toISOString(),
            };

            setNotifications((prev) => [...prev, orderNotification]);
            toast.info(msg);
        });

        return () => {
            socketRef.current.disconnect();
        };
    }, []);

    // Mark notification as read
    const markAsRead = async (id) => {
        try {
            await axios.patch(
                `${process.env.REACT_APP_BASE_URL}/notifications/${id}/read`,
                {},
                { headers: {
                    Authorization: `Bearer ${token}`
                }}
            );
            setNotifications((prev) =>
            prev.map(n =>
                n._id === id ? { ...n, read: true } : n
            ));
        } catch (error) {
            console.error("Failed to mark notification as read:", error);
            toast.error("Failed to mark notification as read");
        }
    } 


    return (
        <NotificationContext.Provider value={{ notifications, setNotifications, markAsRead }}>
            {children}
        </NotificationContext.Provider>
    );
};
