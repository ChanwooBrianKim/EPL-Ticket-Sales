import React, { useState } from 'react';
import axios from 'axios';

const RegisterForm = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post('/api/auth/register', { name, email, password });
      const token = response.data.token;
      localStorage.setItem('authToken', token);
    } catch (err) {
      if ((err as any).response) {
        // Server responded with a status other than 2xx
        console.error('Error response:', (err as any).response.data);
        setError((err as any).response.data.msg || 'Registration failed. Please try again.');
      } else if ((err as any).request) {
        // No response was received
        console.error('Error request:', (err as any).request);
        setError('No response from server. Please try again later.');
      } else {
        // Something happened while setting up the request
        console.error('Error message:', (err as any).message);
        setError('Registration failed. Please try again.');
      }
    }
  };
  
  return (
    <form onSubmit={handleRegister}>
      <div>
        <label>Name</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </div>
      <div>
        <label>Email</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>
      <div>
        <label>Password</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>
      {error && <p>{error}</p>}
      <button type="submit">Register</button>
    </form>
  );
};

export default RegisterForm;
