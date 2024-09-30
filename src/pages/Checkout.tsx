import React, { useState, useEffect } from 'react';
import { useShoppingCart } from "../context/ShoppingCartContext";
import { ListGroup, Form, Row, Col, Button, Spinner } from 'react-bootstrap';
import axios from 'axios';

// Checkout page component
export function Checkout() {
    const { cartItems, getTotalCost } = useShoppingCart();
    const [name, setName] = useState('');
    const [address, setAddress] = useState('');
    const [email, setEmail] = useState('');
    const [orderPlaced, setOrderPlaced] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [userId, setUserId] = useState<number | null>(null); // You can get this from context or JWT

    // Example to retrieve userId from localStorage or context
    useEffect(() => {
        const token = localStorage.getItem('authToken');
        if (token) {
            const decodedToken = JSON.parse(atob(token.split('.')[1]));
            setUserId(decodedToken.userId);
        }
    }, []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setErrorMessage('');
    
        console.log("Cart Items:", cartItems); // Add this line to debug
        console.log("Cart Items Length:", cartItems.length); // Debug cartItems length
    
        // Ensure all fields are filled and the cart has items
        if (!name || !address || !email || !Array.isArray(cartItems) || cartItems.length === 0 || !userId) {
            setErrorMessage('All fields are required and the cart cannot be empty.');
            setIsLoading(false);
            return;
        }
    
        try {
            // Order details
            const orderData = {
                userId, 
                name,
                address,
                email,
                items: cartItems,
                total: getTotalCost(),
            };
    
            // Send order data to the backend
            const response = await axios.post('/api/orders', orderData);
    
            // If successful, mark the order as placed
            if (response.status === 201) {
                setOrderPlaced(true);
            }
        } catch (error: any) {
            console.error('Error placing order:', error.response || error.message);
            setErrorMessage(error.response?.data?.error || 'Failed to place order. Please try again.');
        } finally {
            setIsLoading(false); // Always stop loading regardless of success or failure
        }
    };
    
    if (orderPlaced) {
        return (
            <div>
                <h2>Thank you for your order, {name}!</h2>
                <p>You will receive a confirmation email shortly at {email}.</p>
                <p>Your items will be shipped to: {address}.</p>
            </div>
        );
    }

    return (
        <div>
            <h1>Checkout</h1>
            <ListGroup>
                {cartItems.map((item, idx) => (
                    <ListGroup.Item key={idx}>
                        {item.name} - {item.quantity} x ${item.price.toFixed(2)}
                    </ListGroup.Item>
                ))}
            </ListGroup>
            <h3>Total: ${getTotalCost().toFixed(2)}</h3>

            {errorMessage && <div style={{ color: 'red', marginTop: '10px' }}>{errorMessage}</div>}

            <Form onSubmit={handleSubmit} style={{ marginTop: '20px' }}>
                <Row>
                    <Col md={6}>
                        <Form.Group controlId="formName">
                            <Form.Label>Name</Form.Label>
                            <Form.Control
                                type="text"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                required
                            />
                        </Form.Group>
                    </Col>
                </Row>
                <Row>
                    <Col md={6}>
                        <Form.Group controlId="formAddress">
                            <Form.Label>Address</Form.Label>
                            <Form.Control
                                type="text"
                                value={address}
                                onChange={(e) => setAddress(e.target.value)}
                                required
                            />
                        </Form.Group>
                    </Col>
                </Row>
                <Row>
                    <Col md={6}>
                        <Form.Group controlId="formEmail">
                            <Form.Label>Email</Form.Label>
                            <Form.Control
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </Form.Group>
                    </Col>
                </Row>
                <Button type="submit" disabled={isLoading} style={{ marginTop: '20px' }}>
                    {isLoading ? <Spinner animation="border" size="sm" /> : 'Place Order'}
                </Button>
            </Form>
        </div>
    );
}
