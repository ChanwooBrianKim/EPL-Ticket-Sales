import React, { useEffect, useState } from 'react';
import { ListGroup, Container, Row, Col, Card } from 'react-bootstrap';
import { useShoppingCart } from '../context/ShoppingCartContext'; // Assuming you are using the context to manage cart details
import axios from 'axios';

interface OrderItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
}

interface OrderDetails {
  id: number;
  items: OrderItem[];
  total: number;
  orderStatus: string;
  createdAt: string;
}

export function OrderSummary() {
  const [orderDetails, setOrderDetails] = useState<OrderDetails | null>(null);
  const { cartItems } = useShoppingCart(); // Assuming the order is linked to the shopping cart context

  useEffect(() => {
    // Fetch order details from the server
    const fetchOrderDetails = async () => {
      try {
        const response = await axios.get('/api/orders/latest'); // Adjust this endpoint as per your API
        setOrderDetails(response.data);
      } catch (error) {
        console.error('Failed to fetch order details:', error);
      }
    };

    fetchOrderDetails();
  }, []);

  if (!orderDetails) {
    return <div>Loading order summary...</div>;
  }

  return (
    <Container className="my-5">
      <Row className="justify-content-center">
        <Col md={8}>
          <Card>
            <Card.Body>
              <h1>Order Summary</h1>
              <p>Your order has been placed successfully!</p>

              <h4>Order ID: {orderDetails.id}</h4>
              <h5>Status: {orderDetails.orderStatus}</h5>
              <h6>Order Date: {new Date(orderDetails.createdAt).toLocaleString()}</h6>

              <ListGroup variant="flush" className="my-4">
                {orderDetails.items.map((item) => (
                  <ListGroup.Item key={item.id}>
                    <Row>
                      <Col md={6}>
                        <strong>{item.name}</strong> (x{item.quantity})
                      </Col>
                      <Col md={6} className="text-right">
                        ${item.price.toFixed(2)}
                      </Col>
                    </Row>
                  </ListGroup.Item>
                ))}
              </ListGroup>

              <h4>Total: ${orderDetails.total.toFixed(2)}</h4>

              <p>Thank you for shopping with us!</p>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default OrderSummary;
