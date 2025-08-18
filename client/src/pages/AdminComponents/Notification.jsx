import React from 'react';
import { useEffect } from 'react';
import { toast } from 'react-toastify';
import axios from 'axios';
import { useNotification } from '../../context/NotificationContext';

const rawToken = localStorage.getItem('token');
const token = JSON.parse(rawToken);

export default function Notifications() {
    const { notifications, setNotifications, markAsRead } = useNotification();

    useEffect(() => {
        if (!rawToken) return;
        console.log("🔑 Sending socket token:", token);

        // Fetch existing notifications from DB
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
    }, [setNotifications]);

    return (
        <div className="fixed top-20 right-4 bg-gray-800 text-white p-4 rounded-lg shadow-lg  w-[50%] max-h-96 overflow-y-auto">
            <h3 className="font-bold mb-2">Notifications</h3>
            <ul className="space-y-2">
            {notifications.length === 0 ? (
                <li className="text-gray-600 italic text-center">No notifications</li>
            ) : (
                notifications.map((n, i) => (
                <li 
                    key={i} 
                    onClick={()=> markAsRead(n._id)}
                    className={`p-2 rounded cursor-pointer ${
                        n.read ? "bg-gray-700 opacity-60" : "bg-gray-600"
                    }`}>

                    {n.type === "stock" && n.data ? (
                        <>
                            <p>⚠️ Stock low:</p>
                            <p>{n.data.product} (remaining {n.data.stock})</p>
                        </>
                        ) : n.type === "order" && n.data ? (
                            <>
                                <p>🛒 New order placed: </p>
                                <p>#{n.data.orderId}</p>
                            </>
                        ) : (
                        <p>{n.message}</p> 
                    )}
                </li>
                ))
            )}
            </ul>
        </div>
    );

}