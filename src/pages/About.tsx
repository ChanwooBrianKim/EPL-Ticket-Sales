import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';

// About page component
export function About() {
  return (
    <Container>
      <Row className="justify-content-center my-5">
        <Col md={8}>
          <Card>
            <Card.Body>
              <h1>About the Shopping Cart App</h1>
              <p>
                Welcome to the Shopping Cart App! This application is designed to provide an intuitive and streamlined 
                shopping experience for users. With features like browsing products, managing a cart, and completing 
                purchases, we aim to make the online shopping process easy and accessible for everyone.
              </p>
              <h3>Key Features</h3>
              <ul>
                <li><strong>Product Browsing:</strong> Easily browse and search for items in the store.</li>
                <li><strong>Shopping Cart:</strong> Add, remove, and update item quantities in the cart with real-time price updates.</li>
                <li><strong>Checkout:</strong> Seamless and secure checkout process for completing your purchase.</li>
                <li><strong>User Profile:</strong> View past orders and manage your profile settings.</li>
                <li><strong>Admin Management:</strong> Admins can manage products and view order summaries.</li>
              </ul>
              <h3>Technologies Used</h3>
              <p>
                This app is built using modern technologies to ensure fast, secure, and scalable performance. 
                Here are the key technologies used:
              </p>
              <ul>
                <li><strong>Frontend:</strong> React, TypeScript, and React Bootstrap for a responsive user interface.</li>
                <li><strong>Backend:</strong> Node.js, Express, and PostgreSQL for secure data management and APIs.</li>
                <li><strong>Authentication:</strong> JWT for secure user login and session management.</li>
                <li><strong>DevOps:</strong> Vite for fast builds and development, with npm for package management.</li>
              </ul>
              <h3>Our Vision</h3>
              <p>
                Our goal is to provide an all-in-one shopping experience that feels intuitive and engaging. 
                Whether you’re browsing products or managing your profile, we strive to make each interaction simple 
                and efficient. We’re continually working on new features to improve the user experience, including 
                adding analytics, improving performance, and supporting more payment methods.
              </p>
              <p>
                Thank you for using the Shopping Cart App! We hope you have a pleasant shopping experience.
              </p>
              <h3>Future Enhancements</h3>
              <p>
                We're working on exciting new features, including:
              </p>
              <ul>
                <li>🔒 User authentication with secure password resets</li>
                <li>📊 Order tracking and delivery status updates</li>
                <li>🌐 Multi-language support for a global audience</li>
                <li>📱 Mobile-friendly interface</li>
              </ul>
              <p>Stay tuned for more updates!</p>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default About;
