import React, { createContext, useContext, useState, useEffect, useRef } from 'react';
import { io } from 'socket.io-client';
import { toast } from 'react-toastify';

const NotificationContext = createContext();
export const useNotification = () => useContext(NotificationContext);

export const NotificationProvider = ({ children }) => {
    const [notifications, setNotifications] = useState([]);
    const socketRef = useRef(null);


    useEffect(() => {
        const rawToken = localStorage.getItem('token');
        if (!rawToken) return;

        const token = JSON.parse(rawToken);
        console.log("🔑 Sending socket token:", token);

        // Create socket
        socketRef.current = io('http://localhost:5000', {
            auth: { token },
        });

        socketRef.current.on("connect", () => {
            console.log("✅ Socket connected:", socketRef.current.id);
        });

        // Stock alerts
        socketRef.current.on("stock_updated", (data) => {
            const msg = `⚠️ Stock low: ${data.product} (remaining ${data.stock})`;
            setNotifications((prev) => [...prev, { type: "stock", ...data }]);
            toast.warn(msg);
        });

        // Listen for new order alert
        socketRef.current.on("order_created", (data) => {
            const msg = `🛒 New order placed: #${data._id}`;
            setNotifications((prev) => [...prev, { type: "order", ...data }]);
            toast.info(msg);
        });

        return () => {
            socketRef.current.disconnect();
        };
    }, []);

    return (
        <NotificationContext.Provider value={{ notifications, setNotifications }}>
            {children}
        </NotificationContext.Provider>
    );
};