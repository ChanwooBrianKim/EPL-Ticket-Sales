import React, { useEffect, useState } from 'react';

interface DecodedToken {
  username: string;
}

// Function to decode JWT token
function decodeToken(token: string): DecodedToken | null {
  try {
    const payload = JSON.parse(atob(token.split('.')[1])); // Decode JWT token payload
    return payload;
  } catch (error) {
    return null;
  }
}

const Profile: React.FC = () => {
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

export default Profile;
