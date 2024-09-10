import { useContext, createContext, ReactNode, useState, useEffect } from "react"; 
import axios from "axios";
import { ShoppingCart } from "../components/ShoppingCart"; 

// Type definition for the props of ShoppingCartProvider component
type ShoppingCartProviderProps = {
  children: ReactNode
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
  increaseCartQuantity: (id: number, name: string, price: number) => void
  decreaseCartQuantity: (id: number) => void
  removeFromCart: (id: number) => void
  cartQuantity: number
  cartItems: CartItem[]
  getTotalCost: () => number
}

const ShoppingCartContext = createContext({} as ShoppingCartContextProps)

// Custom hook to use the shopping cart context
export function useShoppingCart() {
  return useContext(ShoppingCartContext);
}

// ShoppingCartProvider component to provide the shopping cart context to its children
export function ShoppingCartProvider({ children }: ShoppingCartProviderProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  
  // Fetch cart items from the database on component mount
  useEffect(() => {
    async function fetchCartItems() {
      try {
        const response = await axios.get('/api/cart');  // Get cart from backend
        setCartItems(response.data);
      } catch (error) {
        console.error("Error fetching cart items", error);
      }
    }
    
    fetchCartItems();
  }, []);

  const cartQuantity = cartItems.reduce((quantity, item) => item.quantity + quantity, 0);

  const openCart = () => setIsOpen(true);
  const closeCart = () => setIsOpen(false);

  // Function to increase the quantity of a specific item in the cart
  async function increaseCartQuantity(id: number, name: string, price: number) {
    try {
      const response = await axios.post('/api/cart/add', { id, name, price });  // Add to cart in backend
      setCartItems(response.data);  // Update the local cart with the server's response
    } catch (error) {
      console.error("Error adding item to cart", error);
    }
  }

  // Function to decrease the quantity of a specific item in the cart
  async function decreaseCartQuantity(id: number) {
    try {
      const response = await axios.post('/api/cart/decrease', { id });  // Decrease quantity in backend
      setCartItems(response.data);  // Update the local cart with the server's response
    } catch (error) {
      console.error("Error decreasing item in cart", error);
    }
  }

  // Function to remove an item from the cart
  async function removeFromCart(id: number) {
    try {
      const response = await axios.post('/api/cart/remove', { id });  // Remove item in backend
      setCartItems(response.data);  // Update the local cart with the server's response
    } catch (error) {
      console.error("Error removing item from cart", error);
    }
  }

  const getTotalCost = () => {
    return cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  return (
    <ShoppingCartContext.Provider value={{
      isOpen,
      openCart,
      closeCart,
      getItemQuantity: (id) => cartItems.find(item => item.id === id)?.quantity || 0,
      increaseCartQuantity,
      decreaseCartQuantity,
      removeFromCart,
      cartItems,
      cartQuantity,
      getTotalCost
    }}>
      {children}
      <ShoppingCart isOpen={isOpen} />
    </ShoppingCartContext.Provider>
  );
}
