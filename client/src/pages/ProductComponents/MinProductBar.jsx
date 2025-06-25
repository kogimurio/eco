import React, { useState, useEffect } from 'react';


export default function MinProductBar() {
    const item = [
        {
            title: 'Asymmetric Top with Bow',
        }
    ]
    const [itemsPerRow, setItemsPerRow] = useState(2);


    useEffect(() => {
        const handleSize = () => {
            const width = window.innerWidth;
            if (width < 768) {
                setItemsPerRow(1);
            } else {
                setItemsPerRow(2);
            }
        }
        handleSize();
        window.addEventListener("resize", handleSize);
        return () => window.removeEventListener("resize", handleSize);
    }, []);
    return (
        <div className="bg-gray-700 w-full h-20">
            <div className="flex items-center justify-between w-[90%] mx-auto py-4">
                <div>
                    <p className='text-white'>{item[0].title}</p>
                </div>
                <div>
                    <div className='flex flex-col md:flex-row items-center text-white'>
                        <div className='mr-2'>
                            <a href='*' className='text-stone-300 text-xs'>Home /</a><a href='*' className='text-stone-300 text-xs'>Clearance / </a>
                        </div>
                         <div>
                            <p className="text-xs">
                                {item[0].title}
                            </p>
                         </div>
                    </div>
                </div>
            </div>
        </div>
    )
}