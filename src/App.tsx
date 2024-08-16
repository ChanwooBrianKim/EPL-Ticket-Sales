// import React from 'react';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom"; // Importing Routes and Route components for defining routes
import { Container } from "react-bootstrap"; // Importing Container component for layout
import Home from "./pages/Home"; // Importing Home page component (default export)
import { Store } from "./pages/Store"; // Importing Store page component (named export)
import { About } from "./pages/About"; // Importing About page component (named export)
import { Navbar } from "./components/Navbar"; // Importing Navbar component
import { ShoppingCartProvider } from "./context/ShoppingCartContext"; // Importing ShoppingCartProvider to manage shopping cart state
import { Checkout } from "./pages/Checkout"; // Importing Checkout page component
import { OrderSummary } from "./pages/OrderSummary"; // Importing OrderSummary page component

import LoginForm from "./components/LoginForm"; // Importing LoginForm component
import RegisterForm from "./components/RegisterForm"; // Importing RegisterForm component

function App() {
  return (
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
        </Routes>
      </Container>
    </ShoppingCartProvider>
  );
}

export default App;
