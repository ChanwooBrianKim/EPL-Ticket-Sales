import { useContext, createContext, ReactNode, useState } from "react"; // Importing useContext, createContext, ReactNode, and useState functions from react
import { ShoppingCart } from "../components/ShoppingCart"; // Importing ShoppingCart component
import { useLocalStorage } from "../hooks/useLocalStorage"; // Importing custom hook for local storage

// Type definition for the props of ShoppingCartProvider component
type ShoppingCartProviderProps = {
    children: ReactNode // ReactNode type for children prop to support any valid React child
}

// Type definition for items in the shopping cart
type CartItem = {
    id: number;
    quantity: number;
    name: string;
    price: number;
};

// Type definition for the ShoppingCartContext properties
type ShoppingCartContextProps = {
    isOpen: boolean
    openCart: () => void
    closeCart: () => void
    getItemQuantity: (id: number) => number
    increaseCartQuantity: (id: number) => void
    decreaseCartQuantity: (id: number) => void
    removeFromCart: (id: number) => void
    cartQuantity: number
    cartItems: CartItem[]
    getTotalCost: number
}

// Creating a context for the shopping cart
const ShoppingCartContext = createContext({} as ShoppingCartContextProps)

// Custom hook to use the shopping cart context
export function useShoppingCart() {
    return useContext(ShoppingCartContext);
}

// ShoppingCartProvider component to provide the shopping cart context to its children
export function ShoppingCartProvider({ children }: ShoppingCartProviderProps) {
    const [isOpen, setIsOpen] = useState(false)
    const [cartItems, setCartItems] = useLocalStorage<CartItem[]>(
        "Shopping-cart", 
        []) // State to track items in the shopping cart using localStorage
    // Calculate total quantity of items in the cart
    const cartQuantity = cartItems.reduce((quantity, item) => item.quantity + quantity, 0)

    // Function to open the cart
    const openCart = () => setIsOpen(true);

    // Function to close the cart
    const closeCart = () => setIsOpen(false);

    // Function to get the quantity of a specific item in the cart
    function getItemQuantity(id: number) {
        return cartItems.find(item => item.id === id)?.quantity || 0;
    }

    // Function to increase the quantity of a specific item in the cart
    function increaseCartQuantity(id: number) {
        setCartItems(currItems => {
            if (currItems.find(item => item.id === id) == null) {
                return [...currItems, { id, quantity: 1, name: "", price: 0 }]
            } else {
                return currItems.map(item => {
                    if (item.id === id) {
                        return { ...item, quantity: item.quantity + 1 }
                    } else {
                        return item
                    }
                })
            }
        })
    }

    // Function to decrease the quantity of a specific item in the cart
    function decreaseCartQuantity(id: number) {
        setCartItems(currItems => {
            if (currItems.find(item => item.id === id)?.quantity === 1) {
                return currItems.filter(item => item.id !== id)
            } else {
                return currItems.map(item => {
                    if (item.id === id) {
                        return { ...item, quantity: item.quantity - 1 }
                    } else {
                        return item
                    }
                })
            }
        })
    }

    // Function to remove an item from the cart
    function removeFromCart(id: number) {
        setCartItems(currItems => {
            return currItems.filter(item => item.id !== id)
        })
    }

    return (
        // Providing the shopping cart context to its children
        <ShoppingCartContext.Provider value={{
            isOpen,
            openCart,
            closeCart,
            getItemQuantity,
            increaseCartQuantity,
            decreaseCartQuantity,
            removeFromCart,
            cartItems,
            cartQuantity,
            getTotalCost: 0
        }}>
            {children}
            <ShoppingCart isOpen={isOpen} />
        </ShoppingCartContext.Provider>
    )
}
