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

    // Socket init
    useEffect(() => {
        const socket = io(`${process.env.REACT_APP_BASE_URL}`);

        socket.on("count", () => {
            console.log("🔌 Connected to notifications socket");
        });

        socket.on("notification", (newNotification) => {
            setNotifications((prev) => [newNotification, ...prev]);
        });

        return () => {
            socket.disconnect();
        };
    }, []);

    // Initial fetch notifications from DB
    useEffect(() => {
        if (!rawToken) return;
        console.log("🔑 Sending socket token:", token);

        
        const fetchNotifications = async () => {
            try {
                const response = await axios.get(
                    `${process.env.REACT_APP_BASE_URL_IMAGE}/notifications`,
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
