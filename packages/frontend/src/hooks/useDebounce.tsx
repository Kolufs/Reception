import { useState, useEffect } from "react";

const UseDebounce = (value: string, delay: number) => {
    const [debounceValue, setDebounceValue] = useState(value);
    
    useEffect(() => {
        const handler = setTimeout(() => {
        setDebounceValue(value);
        }, delay);
    
        return () => {
        clearTimeout(handler);
        };
    }, [value, delay]);
    
    return debounceValue;
}

export default UseDebounce;