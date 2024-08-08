import { Offcanvas, Stack } from "react-bootstrap"; // Importing Offcanvas and Stack components from react-bootstrap
import { useShoppingCart } from "../context/ShoppingCartContext"; // Importing custom hook for shopping cart context
import { formatCurrency } from "../utilities/formatCurrency"; // Importing utility function for formatting currency
import { CartItem } from "./CartItem"; // Importing CartItem component
import storeItems from "../data/items.json"; // Importing item data from JSON file

// Type definition for the props of ShoppingCart component
type ShoppingCartProps = {
    isOpen: boolean; // Indicates whether the shopping cart is open
};

// ShoppingCart component definition
export function ShoppingCart({ isOpen }: ShoppingCartProps) {
    const { closeCart, cartItems } = useShoppingCart(); // Getting closeCart function and cartItems array from context

    return (
        // Offcanvas component from react-bootstrap for the shopping cart sidebar
        <Offcanvas show={isOpen} onHide={closeCart} placement="end">
            <Offcanvas.Header closeButton>
                <Offcanvas.Title>Cart</Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
                <Stack gap={3}>
                    {/* Mapping through each item in the cartItems array and rendering CartItem component */}
                    {cartItems.map(item => (
                    <CartItem key={item.id} {...item} />
                ))}
                <div className="ms-auto fw-bold fs-5">
                    Total {formatCurrency(cartItems.reduce((total, cartItem) => {
                        const item = storeItems.find(i => i.id === 
                            cartItem.id)
                            return total + (item?.price || 0) * cartItem.quantity // Calculating total price of items in the cart
                    }, 0)
                )}
                </div>
                </Stack>
            </Offcanvas.Body>
        </Offcanvas>
    )
}