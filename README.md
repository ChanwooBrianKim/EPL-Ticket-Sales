# 🛒 Shopping Cart App

Welcome to the Shopping Cart App! This project allows users to browse items, add them to a shopping cart, and view the total price. Additionally, the app manages cart data in the backend and keeps the user's cart synced across sessions. Let's explore the app and see what it offers

## ✨ Features

- **🏠 Home Page**: A simple landing page.
- **🛍️ Store Page**: Displays a list of items available for purchase.
- **ℹ️ About Page**: Provides information about the application.
- **🛒 Shopping Cart**: Users can add, remove, and update quantities of items in the cart. The total price is calculated and displayed.
- **💾 Persistent Cart**: The shopping cart is synced with the backend, ensuring cart data is saved even after page refreshes or user logouts.
- **💵 Currency Formatting**: Prices are displayed in AUD.
- **🔐 User Authentication**: Secure login and user management.
- **📜 Order History**: (Upcoming) Users can view their past orders and order details.

## 🛠️ Technologies Used

### Frontend

- **⚛️ React**: Building interactive UIs.
- **📝 TypeScript**: Type safety and better code management.
- **💅 React Bootstrap**: Styling and UI components.
- **🔄 React Router**: Routing for single-page applications.

### Backend

- **🟢 Node.js**: Backend runtime (planned for future integration).
- **🌐 Express**: Web framework for handling requests (planned for future integration).
- **🗄️ PostgreSQL**: Database used for storing user data, orders, and cart information.
- **🔑 JWT Authentication**: Secure user authentication with JSON Web Tokens (JWT).

### DevOps

- **📦 npm**: Package management.
- **⚡ Vite**: Next Generation Frontend Tooling for faster builds.

### Database

- **🗄️ PostgreSQL**: Used to persist shopping cart items, user data, and order history.

## 🚀 Getting Started

1. **Clone the Repo**:
   ```bash
   git clone https://github.com/ChanwooBrianKim/Shopping-cart-w-TypeScript.git
   cd Shopping-cart-w-TypeScript
2. **Install Dependencies**:
   ```bash
   npm install
3. **Set Up Environment Variables**: Create a .env file at the root directory for backend configuration. Add the following values
   ```bash
   PORT=3000
   DB_USER=yourDatabaseUsername
   DB_PASSWORD=yourDatabasePassword
   DB_NAME=yourDatabaseName
   DB_HOST=localhost
   JWT_SECRET=yourJWTSecret
4. **Run Database Migrations**:Run the following command to set up the PostgreSQL database schema
   ```bash
   npx sequelize-cli db:migrate

5. **Start the Backend Server**:
   ```bash
   npm run server

6. **Run the Frontend**:
   ```bash
   npm run dev

7. **Open in Browser**: Go to http://localhost:5173 to access the app.
   
## 🤔 How to Use

- **🏠 Home Page**: Navigate to the home page.
- **🛍️ Store Page**: Browse items and add them to your cart.
- **ℹ️ About Page**: Learn more about the application.
- **🛒 Shopping Cart**: View and manage the items in your cart. Increase or decrease quantities or remove items entirely. The total price updates automatically.
- **👤 Profile Page**: Manage user account details and view order history.
- **🛠️ Admin Page**: Admins can access this page to manage the store inventory and view order summaries.

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
- **decodeToken.ts**: Utility function to decode JWT tokens for user authentication.

### Migrations
- **Migrations**: Database migration scripts to create tables for users, orders, and shopping cart items.

## 🌟 Future Enhancements
- **🔒 User Authentication**: Adding secure login.
- **📝 Order History**: Save and display past orders.
- **🖼️ Product Images**: Display product images in the store and shopping cart.
- **💻 UI Improvements**: Making the interface even more user-friendly.
- **🗄️ Backend Integration**: Connect to a database for storing items and orders.

## 🙏 Acknowledgements
- **⚛️ React**: For building interactive user interfaces.
- **📝 TypeScript**: For type safety and better code management.
- **💅 React Bootstrap**: For the beautiful UI components.
- **🔄 React Router**: For easy navigation within the app.