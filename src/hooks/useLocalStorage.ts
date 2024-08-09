import { useState, useEffect } from "react"; // Importing useState and useEffect hooks from React

// Custom hook useLocalStorage definition
export function useLocalStorage<T>(key: string, initialValue: T | (() => T)) {
    // useState to manage the stored value, with an initial value determined by a function
    const [value, setValue] = useState<T>(() => {
        // Attempt to retrieve the value from localStorage by the provided key
        const jsonValue = localStorage.getItem(key);
        if (jsonValue != null) return JSON.parse(jsonValue); // If a value exists, parse and return it

        // If no value exists in localStorage and initialValue is a function, call it to get the initial value
        if (typeof initialValue === "function") {
            return (initialValue as () => T)();
        } else {
            return initialValue; // Otherwise, return the initial value directly
        }
    });

    // useEffect to update localStorage whenever the key or value changes
    useEffect(() => {
        localStorage.setItem(key, JSON.stringify(value)); // Store the value in localStorage as a JSON string
    }, [key, value]); // Dependencies: effect runs whenever key or value changes

    // Return the current value and the function to update it (as a tuple)
    return [value, setValue] as [typeof value, typeof setValue];
}
