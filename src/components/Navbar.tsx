import React, { useEffect, useState } from 'react';
import { Container, Nav, Navbar as NavbarBs, Button } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import { useShoppingCart } from '../context/ShoppingCartContext.js';

// Function to decode JWT token
function decodeToken(token: string): { username: string } | null {
    try {
        const payload = JSON.parse(atob(token.split('.')[1])); // Decoding the JWT token payload
        return payload;
    } catch (error) {
        console.error('Failed to decode token:', error);
        return null;
    }
}

export function Navbar() {
    const { openCart, cartQuantity } = useShoppingCart();
    const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem('authToken'));
    const [username, setUsername] = useState<string | null>(null);

    // useEffect to update the isAuthenticated and extract the username from token
    useEffect(() => {
        const token = localStorage.getItem('authToken');
        if (token) {
            const decoded = decodeToken(token);
            if (decoded && decoded.username) {
                setUsername(decoded.username); // Set the username in state
            }
            setIsAuthenticated(true); // User is authenticated if the token exists
        } else {
            setIsAuthenticated(false);
        }
    }, []);

    // Handle logout function
    const handleLogout = () => {
        localStorage.removeItem('authToken');
        setIsAuthenticated(false); // Update state to reflect logout
        setUsername(null); // Clear the username
        window.location.href = '/login'; // Redirect to login page
    };

    return (
        <NavbarBs sticky="top" className="bg-white shadow-sm mb-3">
            <Container>
                <Nav className="me-auto">
                    <Nav.Link to="/" as={NavLink}>
                        Home
                    </Nav.Link>
                    <Nav.Link to="/store" as={NavLink}>
                        Store
                    </Nav.Link>
                    <Nav.Link to="/about" as={NavLink}>
                        About
                    </Nav.Link>
                </Nav>

                <Nav>
                    {isAuthenticated ? (
                        <>
                            <Nav.Link to="/dashboard" as={NavLink}>
                                Dashboard
                            </Nav.Link>
                            <Nav.Link to="/checkout" as={NavLink}>
                                Checkout
                            </Nav.Link>
                            {/* Display the username here */}
                            {username && (
                                <span className="me-3">
                                    Welcome, {username}
                                </span>
                            )}
                            <Button
                                variant="outline-primary"
                                className="rounded-circle"
                                style={{ marginLeft: '10px' }}
                                onClick={handleLogout}
                            >
                                Logout
                            </Button>
                        </>
                    ) : (
                        <>
                            <Nav.Link to="/login" as={NavLink}>
                                Login
                            </Nav.Link>
                            <Nav.Link to="/register" as={NavLink}>
                                Register
                            </Nav.Link>
                        </>
                    )}
                </Nav>

                {cartQuantity > 0 && (
                    <Button
                        onClick={openCart}
                        style={{ width: '3rem', height: '3rem', position: 'relative' }}
                        variant="outline-primary"
                        className="rounded-circle"
                    >
                        <svg
                            fill="#000000"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 902.86 902.86"
                        >
                            <path
                                d="M671.504,577.829l110.485-432.609H902.86v-68H729.174L703.128,179.2L0,178.697l74.753,399.129h596.751V577.829z
                M685.766,247.188l-67.077,262.64H131.199L81.928,246.756L685.766,247.188z"
                            />
                            <path
                                d="M578.418,825.641c59.961,0,108.743-48.783,108.743-108.744s-48.782-108.742-108.743-108.742H168.717
                c-59.961,0-108.744,48.781-108.744,108.742s48.782,108.744,108.744,108.744c59.962,0,108.743-48.783,108.743-108.744
                c0-14.4-2.821-28.152-7.927-40.742h208.069c-5.107,12.59-7.928,26.342-7.928,40.742
                C469.675,776.858,518.457,825.641,578.418,825.641z M209.46,716.897c0,22.467-18.277,40.744-40.743,40.744
                c-22.466,0-40.744-18.277-40.744-40.744c0-22.465,18.277-40.742,40.744-40.742C191.183,676.155,209.46,694.432,209.46,716.897z
                M619.162,716.897c0,22.467-18.277,40.744-40.743,40.744s-40.743-18.277-40.743-40.744c0-22.465,18.277-40.742,40.743-40.742
                S619.162,694.432,619.162,716.897z"
                            />
                        </svg>
                        <div
                            className="rounded-circle bg-danger d-flex justify-content-center align-items-center"
                            style={{
                                color: 'white',
                                width: '1.5rem',
                                height: '1.5rem',
                                position: 'absolute',
                                bottom: 0,
                                right: 0,
                                transform: 'translate(25%, 25%)',
                            }}
                        >
                            {cartQuantity}
                        </div>
                    </Button>
                )}
            </Container>
        </NavbarBs>
    );
}
