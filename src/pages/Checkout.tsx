import React, { useState } from "react";
import { Button, Form, Row, Col, ListGroup } from 'react-bootstrap';
import { useShoppingCart } from "../context/ShoppingCartContext";

export function Checkout() {
    const { cartItems, getTotalCost } = useShoppingCart();
    const [name, setName] = useState('');
    const [address, setAddress] = useState('');
    const [email, setEmail] = useState('');
    const [orderPlaced, setOrderPlaced] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        // Implement order submission logic here
        setOrderPlaced(true);
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
