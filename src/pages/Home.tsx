import React from 'react';
import { Container, Row, Col, Button, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <Container className="py-5">
      {/* Introduction Section */}
      <Row className="mb-5 text-center">
        <Col>
          <h1>Welcome to Our Shopping Platform!</h1>
          <p>We offer the best products at unbeatable prices, with fast shipping and exceptional customer service.</p>
          <Link to="/store">
            <Button variant="primary" size="lg" className="mt-3">Explore Our Store</Button>
          </Link>
        </Col>
      </Row>

      {/* What We Offer Section */}
      <Row className="mb-5 text-center">
        <Col md={4}>
          <Card className="shadow-sm">
            <Card.Body>
              <h4>Wide Product Range</h4>
              <p>From electronics to fashion, find everything you need in one place.</p>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4}>
          <Card className="shadow-sm">
            <Card.Body>
              <h4>Fast & Free Delivery</h4>
              <p>Enjoy fast, free shipping on all orders, no matter the size!</p>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4}>
          <Card className="shadow-sm">
            <Card.Body>
              <h4>Best Prices Guaranteed</h4>
              <p>We offer unbeatable prices on high-quality products.</p>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Call to Action Section */}
      <Row className="text-center">
        <Col>
          <h2>Start Shopping Now!</h2>
          <p>Browse our store and discover amazing deals on products you love.</p>
          <Link to="/store">
            <Button variant="secondary" size="lg" className="me-3">Go to Store</Button>
          </Link>
          <Link to="/about">
            <Button variant="outline-secondary" size="lg">Learn More About Us</Button>
          </Link>
        </Col>
      </Row>
    </Container>
  );
}
