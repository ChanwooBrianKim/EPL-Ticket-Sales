import React, { useState } from 'react';
import axios from 'axios';

export function ProductUploadForm() {
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    description: '',
    stockQuantity: '',
    imgUrl: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post('/api/products', formData); // Send data to backend API
      console.log('Product created successfully:', response.data);
    } catch (error) {
      console.error('Failed to create product:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Product Name:</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
        />
      </div>

      <div>
        <label>Price:</label>
        <input
          type="number"
          name="price"
          value={formData.price}
          onChange={handleChange}
          required
        />
      </div>

      <div>
        <label>Description:</label>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          required
        />
      </div>

      <div>
        <label>Stock Quantity:</label>
        <input
          type="number"
          name="stockQuantity"
          value={formData.stockQuantity}
          onChange={handleChange}
          required
        />
      </div>

      <div>
        <label>Image URL:</label>
        <input
          type="text"
          name="imgUrl"
          value={formData.imgUrl}
          onChange={handleChange}
          required
        />
      </div>

      <button type="submit">Upload Product</button>
    </form>
  );
}
