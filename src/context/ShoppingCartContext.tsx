import { useContext, createContext, ReactNode, useState, useEffect } from "react";
import { ShoppingCart } from "../components/ShoppingCart.js";
import axios from "axios";

// Type definition for ShoppingCartProvider props
type ShoppingCartProviderProps = {
  children: ReactNode;
};

// Type definition for CartItem
type CartItem = {
  id: number;
  quantity: number;
  name: string;
  price: number;
};

// Type definition for ShoppingCartContext properties
type ShoppingCartContextProps = {
  isOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
  getItemQuantity: (id: number) => number;
  increaseCartQuantity: (id: number, name: string, price: number) => void;
  decreaseCartQuantity: (id: number) => void;
  removeFromCart: (id: number) => void;
  cartQuantity: number;
  cartItems: CartItem[];
  getTotalCost: () => number;
};

// Create a context for the shopping cart
const ShoppingCartContext = createContext({} as ShoppingCartContextProps);

// Custom hook to use the ShoppingCartContext
export function useShoppingCart() {
  return useContext(ShoppingCartContext);
}

// Function to manually decode the JWT token
interface DecodedToken {
  username?: string;
  userId?: number;
  exp?: number;
}

function decodeToken(token: string): DecodedToken | null {
  try {
    const payloadBase64 = token.split(".")[1]; // Get the payload part of the JWT
    const decodedPayload = atob(payloadBase64); // Decode from base64
    const payload = JSON.parse(decodedPayload); // Parse the decoded string into a JSON object

    // Optional: Check if token is expired
    if (payload.exp && payload.exp * 1000 < Date.now()) {
      console.error("Token is expired");
      return null;
    }

    return payload;
  } catch (error) {
    console.error("Failed to decode token:", error);
    return null;
  }
}

// ShoppingCartProvider component
export function ShoppingCartProvider({ children }: ShoppingCartProviderProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [cartItems, setCartItems] = useState<CartItem[]>([]); // State to store cart items
  const [userId, setUserId] = useState<number | null>(null); // State to store userId

  // Decode JWT token and set userId on component mount
  useEffect(() => {
    const token = localStorage.getItem("authToken");
    if (token) {
      const decoded = decodeToken(token);
      if (decoded && decoded.userId) {
        setUserId(decoded.userId); // Set userId from the decoded token
      }
    }
  }, []);

  // Load cart from the backend when the userId is available
  useEffect(() => {
    const loadCartFromBackend = async () => {
      if (!userId) return;
      try {
        const response = await axios.get(`/api/cart/${userId}`); // Replace with your backend endpoint
        setCartItems(response.data.cartItems);
      } catch (error) {
        console.error("Error loading cart from backend", error);
      }
    };
    loadCartFromBackend();
  }, [userId]);

  // Function to open the cart
  const openCart = () => setIsOpen(true);

  // Function to close the cart
  const closeCart = () => setIsOpen(false);

  // Function to get the quantity of a specific item in the cart
  function getItemQuantity(id: number) {
    return cartItems.find((item) => item.id === id)?.quantity || 0;
  }

  // Function to increase the quantity of a specific item in the cart
  function increaseCartQuantity(id: number, name: string, price: number) {
    setCartItems((currItems) => {
      const existingItem = currItems.find((item) => item.id === id);
      if (!existingItem) {
        return [...currItems, { id, quantity: 1, name, price }];
      } else {
        return currItems.map((item) =>
          item.id === id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
    });
    saveCartToBackend(); // Save the cart to the backend
  }

  // Function to decrease the quantity of a specific item in the cart
  function decreaseCartQuantity(id: number) {
    setCartItems((currItems) => {
      const existingItem = currItems.find((item) => item.id === id);
      if (existingItem?.quantity === 1) {
        return currItems.filter((item) => item.id !== id);
      } else {
        return currItems.map((item) =>
          item.id === id ? { ...item, quantity: item.quantity - 1 } : item
        );
      }
    });
    saveCartToBackend(); // Save the cart to the backend
  }

  // Function to remove an item from the cart
  function removeFromCart(id: number) {
    setCartItems((currItems) => currItems.filter((item) => item.id !== id));
    saveCartToBackend(); // Save the cart to the backend
  }

  // Calculate total cost
  const getTotalCost = () => {
    return cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  // Function to save the cart to the backend
  const saveCartToBackend = async () => {
    if (!userId) return;
    try {
      await axios.post(`/api/cart/save`, { userId, cartItems });
    } catch (error) {
      console.error("Error saving cart to backend", error);
    }
  };

  return (
    <ShoppingCartContext.Provider
      value={{
        isOpen,
        openCart,
        closeCart,
        getItemQuantity,
        increaseCartQuantity,
        decreaseCartQuantity,
        removeFromCart,
        cartItems,
        cartQuantity: cartItems.reduce(
          (quantity, item) => item.quantity + quantity,
          0
        ),
        getTotalCost,
      }}
    >
      {children}
      <ShoppingCart isOpen={isOpen} />
    </ShoppingCartContext.Provider>
  );
}
