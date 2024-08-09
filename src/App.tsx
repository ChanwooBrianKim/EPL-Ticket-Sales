import { Routes, Route } from "react-router-dom"; // Importing Routes and Route components for defining routes
import { Container } from "react-bootstrap"; // Importing Container component for layout
import Home from "./pages/Home"; // Importing Home page component (default export)
import { Store } from "./pages/Store"; // Importing Store page component (named export)
import { About } from "./pages/About"; // Importing About page component (named export)
import { Navbar } from "./components/Navbar"; // Importing Navbar component
import { ShoppingCartProvider } from "./context/ShoppingCartContext"; // Importing ShoppingCartProvider to manage shopping cart state

function App() {
  return (
    // Wrapping the application in ShoppingCartProvider to provide shopping cart context to all components
    <ShoppingCartProvider>
      <Navbar />
      <Container className="mb-4">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/store" element={<Store />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </Container>
    </ShoppingCartProvider>
  );
}

export default App // Exporting App component as default