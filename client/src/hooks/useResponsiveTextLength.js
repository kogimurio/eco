import { useEffect, useState } from "react";

export default function useResponsiveTextLength() {
    const [maxChars, setMaxChars] = useState(16);

    useEffect(() => {
        const updatedMaxChars = () => {
            const width = window.innerWidth;
            if (width < 400) {
                setMaxChars(12);
            }else if(width < 768) {
                setMaxChars(16);
            } else {
                setMaxChars(24)
            }
        };
        updatedMaxChars();
        window.addEventListener('resize', updatedMaxChars);
        return () => window.removeEventListener('resize', updatedMaxChars);
    }, []);

    return maxChars;
}