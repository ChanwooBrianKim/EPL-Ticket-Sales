import { useState } from 'react';
import { useShoppingCart } from "../context/ShoppingCartContext";
import { ListGroup, Form, Row, Col, Button } from 'react-bootstrap';
import axios from 'axios';

export function Checkout() {
    const { cartItems, getTotalCost } = useShoppingCart();
    const [name, setName] = useState('');
    const [address, setAddress] = useState('');
    const [email, setEmail] = useState('');
    const [orderPlaced, setOrderPlaced] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            // Order details
            const orderData = {
                name,
                address,
                email,
                items: cartItems,
                total: getTotalCost()
            };

            // Send order data to the backend
            const response = await axios.post('/api/orders', orderData);

            // If successful, mark the order as placed
            if (response.status === 201) {
                setOrderPlaced(true);
            }
        } catch (error) {
            console.error('Error placing order:', error);
            setErrorMessage('Failed to place order. Please try again.');
        }
    };

    if (orderPlaced) {
        return <div>Thank you for your order! You will receive a confirmation email shortly.</div>;
    }

    return (
        <div>
            <h1>Checkout</h1>
            <ListGroup>
                {cartItems.map((item, idx) => (
                    <ListGroup.Item key={idx}>
                        {item.name} - {item.quantity} x ${item.price}
                    </ListGroup.Item>
                ))}
            </ListGroup>
            <h3>Total: ${getTotalCost()}</h3>

            {errorMessage && <div style={{ color: 'red' }}>{errorMessage}</div>}

            <Form onSubmit={handleSubmit}>
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
                <Button type="submit">Place Order</Button>
            </Form>
        </div>
    );
}
