// import React from 'react';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom"; // Importing Routes and Route components for defining routes
import { Container } from "react-bootstrap"; // Importing Container component for layout
import Home from "./pages/Home.js"; // Importing Home page component (default export)
import { Store } from "./pages/Store.js"; // Importing Store page component (named export)
import { About } from "./pages/About.js"; // Importing About page component (named export)
import { Navbar } from "./components/Navbar.js"; // Importing Navbar component
import { ShoppingCartProvider } from "./context/ShoppingCartContext.js"; // Importing ShoppingCartProvider to manage shopping cart state
import { Checkout } from "./pages/Checkout.js"; // Importing Checkout page component
import { OrderSummary } from "./pages/OrderSummary.js"; // Importing OrderSummary page component
import { AdminPage } from './pages/AdminPage.js'; // Importing AdminPage component
import { Profile } from './pages/Profile.js' // Importing Profile component
import { AuthProvider } from "./context/AuthContext";  // Wrap with AuthProvider

import LoginForm from "./components/LoginForm.js"; // Importing LoginForm component
import RegisterForm from "./components/RegisterForm.js"; // Importing RegisterForm component

function App() {
  return (
    <AuthProvider>
      <ShoppingCartProvider>
        <Navbar />
        <Container className="mb-4">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/store" element={<Store />} />
            <Route path="/about" element={<About />} />
            <Route path="/login" element={<LoginForm />} />
            <Route path="/register" element={<RegisterForm />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/order-summary" element={<OrderSummary />} />
            <Route path="/admin" element={<AdminPage />} />
            <Route path="/profile" element={<Profile />} />
          </Routes>
        </Container>
      </ShoppingCartProvider>
    </AuthProvider>
  );
}

export default App;
