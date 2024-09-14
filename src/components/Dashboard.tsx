import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Dashboard = () => {
  const [data, setData] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    // Get the token from local storage
    const token = localStorage.getItem('authToken');

    // Make an authenticated request to the backend
    axios.get('/api/protected-route', {
      headers: {
        Authorization: `Bearer ${token}`,  // Attach the token in the Authorization header
      },
    })
    .then(response => {
      setData(response.data);
    })
    .catch(error => {
      setError('Failed to load protected data');
      console.error('Error accessing protected route:', error);
    });
  }, []);  // Empty dependency array ensures this runs once on component mount

  if (error) return <div>{error}</div>;

  return (
    <div>
      <h1>Dashboard</h1>
      {data ? <p>Protected data: {JSON.stringify(data)}</p> : <p>Loading...</p>}
    </div>
  );
};

export default Dashboard;
