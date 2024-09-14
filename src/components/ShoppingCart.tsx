import { Offcanvas, Stack, Button } from "react-bootstrap"; // Importing Offcanvas, Stack, and Button components
import { useShoppingCart } from "../context/ShoppingCartContext.js"; // Importing custom hook for shopping cart context
import { formatCurrency } from "../utilities/formatCurrency.js"; // Importing utility function for formatting currency
import { CartItem } from "./CartItem.js"; // Importing CartItem component
import storeItems from "../data/items.json"; // Importing item data from JSON file
import { Link } from "react-router-dom"; // Importing Link component from react-router-dom for navigation
import React from 'react';

// Type definition for the props of ShoppingCart component
type ShoppingCartProps = {
    isOpen: boolean; // Indicates whether the shopping cart is open
};

// ShoppingCart component definition
export function ShoppingCart({ isOpen }: ShoppingCartProps) {
    const { closeCart, cartItems } = useShoppingCart(); // Getting closeCart function and cartItems array from context

    // Calculate total cost of items in the cart
    const totalCost = cartItems.reduce((total, cartItem) => {
        const item = storeItems.find(i => i.id === cartItem.id);
        return total + (item?.price || 0) * cartItem.quantity;
    }, 0);

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
                        Total: {formatCurrency(totalCost)}
                    </div>
                    <Button
                        as={Link as any}
                        to="/checkout"
                        variant="primary"
                        className="w-100 mt-3"
                        onClick={closeCart} // Close the cart when navigating to checkout
                    >
                        Go to Checkout
                    </Button>
                </Stack>
            </Offcanvas.Body>
        </Offcanvas>
    );
}
