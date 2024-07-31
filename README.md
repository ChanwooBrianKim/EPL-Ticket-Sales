# 🛒 Shopping Cart App

Welcome to the Shopping Cart App! This project lets you browse items, add them to your cart, and view the total price. Let's dive in to see what it offers and how you can use it!

## ✨ Features

- **🏠 Home Page**: A simple landing page.
- **🛍️ Store Page**: Displays a list of items available for purchase.
- **ℹ️ About Page**: Provides information about the application.
- **🛒 Shopping Cart**: Users can add, remove, and update quantities of items in the cart. The total price is calculated and displayed.
- **💵 Currency Formatting**: Prices are displayed in AUD.

## 🛠️ Technologies Used

### Frontend

- **⚛️ React**: Building interactive UIs.
- **📝 TypeScript**: Type safety and better code management.
- **💅 React Bootstrap**: Styling and UI components.
- **🔄 React Router**: Routing for single-page applications.

### Backend

- **🟢 Node.js**: Backend runtime (planned for future integration).
- **🌐 Express**: Web framework for handling requests (planned for future integration).

### DevOps

- **📦 npm**: Package management.
- **⚡ Vite**: Next Generation Frontend Tooling for faster builds.

### Database

- **🗄️ MongoDB / PostgreSQL**: (Future integration for storing data).

## 🚀 Getting Started

1. **Clone the Repo**:
   ```bash
   git clone https://github.com/ChanwooBrianKim/Shopping-cart-w-TypeScript.git
   cd Shopping-cart-w-TypeScript
2. **Install Dependencies**:
   ```bash
   npm install
3. **Run the App**:
   ```bash
   npm run dev
4. **Open in Browse**:
   ```bash
   http://localhost:5173
   
## 🤔 How to Use

- **🏠 Home Page**: Navigate to the home page.
- **🛍️ Store Page**: Browse items and add them to your cart.
- **ℹ️ About Page**: Learn more about the application.
- **🛒 Shopping Cart**: View and manage items in your cart, update quantities, and see the total price.

## 📂 Project Structure

### Components
- **CartItem.tsx**: Displays an item in the shopping cart.
- **Navbar.tsx**: The navigation bar that includes links to the Home, Store, and About pages.
- **StoreItem.tsx**: Represents an item in the store, with options to add to cart, increase/decrease quantity, and remove from cart.

### Context
- **ShoppingCartContext.tsx**: Provides the shopping cart state and actions (add, remove, update quantity) to the application.

### Pages
- **Home.tsx**: The home page of the application.
- **About.tsx**: The about page of the application.
- **Store.tsx**: The store page that displays all available items.

### Utilities
- **formatCurrency.ts**: Utility function to format numbers as currency (AUD).

## 🌟 Future Enhancements
- **🔒 User Authentication**: Adding secure login.
- **📝 Order History**: Save and display past orders.
- **💻 UI Improvements**: Making the interface even more user-friendly.
- **🗄️ Backend Integration**: Connect to a database for storing items and orders.

## 🙏 Acknowledgements
- **⚛️ React**: For building interactive user interfaces.
- **📝 TypeScript**: For type safety and better code management.
- **💅 React Bootstrap**: For the beautiful UI components.
- **🔄 React Router**: For easy navigation within the app.