import { createContext, useContext, useState, ReactNode } from "react";

// Define the shape of the auth context
interface AuthContextProps {
  isAuthenticated: boolean;
  login: (token: string) => void;
  logout: () => void;
}

// Create the context with default values
const AuthContext = createContext<AuthContextProps>({
  isAuthenticated: false,
  login: () => {},
  logout: () => {}
});

// Custom hook to use the AuthContext
export function useAuth() {
  return useContext(AuthContext);
}

// AuthProvider component to wrap the app
export function AuthProvider({ children }: { children: ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem("authToken"));

  const login = (token: string) => {
    localStorage.setItem("authToken", token);
    setIsAuthenticated(true);  // Update the state to reflect logged-in status
  };

  const logout = () => {
    localStorage.removeItem("authToken");
    setIsAuthenticated(false);  // Update the state to reflect logged-out status
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
