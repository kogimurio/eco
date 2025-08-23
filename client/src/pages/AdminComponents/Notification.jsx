import React from 'react';
import { useNotification } from '../../context/NotificationContext';


export default function Notifications() {
    const { notifications, markAsRead } = useNotification();



    return (
        <div className="grid grid-cols-1 bg-gray-800 text-white p-4 rounded-lg shadow-lg mt-8  w-[100%] md:w-[60%] mx-auto max-h-96 overflow-y-auto">
            <div>
                <h3 className="font-bold mb-2 text-center">Notifications</h3>
            </div>
            <div>
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
            
        </div>
    );

}