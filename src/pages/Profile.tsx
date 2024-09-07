import React, { useEffect, useState } from 'react';
import axios from 'axios';

export interface DecodedToken {
  username: string;
  exp: number;
}

export function decodeToken(token: string): DecodedToken | null {
  try {
    const payload = JSON.parse(atob(token.split('.')[1]));
    if (payload.exp * 1000 < Date.now()) {
      console.log('Token is expired');
      return null;
    }
    return payload;
  } catch (error) {
    console.error('Failed to decode token', error);
    return null;
  }
}

export const Profile: React.FC = () => {
  const [username, setUsername] = useState<string | null>(null);
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [message, setMessage] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('authToken');
    if (token) {
      const decoded = decodeToken(token);
      if (decoded && decoded.username) {
        setUsername(decoded.username);
      }
    }
  }, []);

  // Function to handle password change
  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post('/api/users/update-password', {
        currentPassword,
        newPassword,
      }, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('authToken')}`,
        },
      });

      setMessage('Password updated successfully');
    } catch (error) {
      setMessage('Failed to update password');
    }
  };

  return (
    <div>
      {username ? (
        <>
          <h1>Welcome, {username}</h1>

          <form onSubmit={handleChangePassword}>
            <div>
              <label>Current Password</label>
              <input
                type="password"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                required
              />
            </div>
            <div>
              <label>New Password</label>
              <input
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                required
              />
            </div>
            <button type="submit">Change Password</button>
          </form>

          {message && <p>{message}</p>}
        </>
      ) : (
        <h1>Welcome, Guest</h1>
      )}
    </div>
  );
};
