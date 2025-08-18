import React from 'react';
import { useNotification } from '../../context/NotificationContext';


export default function Notifications() {
    const { notifications } = useNotification();



    return (
        <div className="fixed top-4 right-4 bg-gray-800 text-white p-4 rounded-lg shadow-lg w-80 max-h-96 overflow-y-auto">
            <h3 className="font-bold mb-2">Notifications</h3>
            <ul className="space-y-2">
            {notifications.length === 0 ? (
                <li className="text-gray-600 italic text-center">No notifications</li>
            ) : (
                notifications.map((n, i) => (
                <li key={i} className="bg-gray-600 p-2 rounded">
                    {n.type === "stock" && (
                    <p>⚠️ Stock low: {n.product} (remaining {n.stock})</p>
                    )}
                    {n.type === "order" && (
                    <p>🛒 New order placed: #{n.orderId}</p>
                    )}
                </li>
                ))
            )}
            </ul>
        </div>
    );

}