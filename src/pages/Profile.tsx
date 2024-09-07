import React, { useEffect, useState } from 'react';

export interface DecodedToken {
  username: string;
  exp: number; // Add exp for token expiration
}

export function decodeToken(token: string): DecodedToken | null {
  try {
    const payload = JSON.parse(atob(token.split('.')[1])); // Decode JWT token payload
    if (payload.exp * 1000 < Date.now()) { // Check if token is expired
      console.log("Token is expired");
      return null;
    }
    return payload;
  } catch (error) {
    console.error("Failed to decode token", error);
    return null;
  }
}

export const Profile: React.FC = () => {
  const [username, setUsername] = useState<string | null>(null);

  useEffect(() => {
    const token = localStorage.getItem('authToken');
    if (token) {
      const decoded = decodeToken(token);
      if (decoded && decoded.username) {
        setUsername(decoded.username);
      }
    }
  }, []);

  return (
    <div>
      {username ? (
        <h1>Welcome, {username}</h1>
      ) : (
        <h1>Welcome, Guest</h1>
      )}
    </div>
  );
};
