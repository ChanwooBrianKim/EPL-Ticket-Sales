// import React, { useState } from 'react';
// import axios from 'axios';

// export function ProductUploadForm() {
//   const [formData, setFormData] = useState({
//     name: '',
//     price: '',
//     description: '',
//     stockQuantity: '',
//     imgUrl: '',
//   });
//   const [loading, setLoading] = useState(false); // For loading state
//   const [successMessage, setSuccessMessage] = useState('');
//   const [errorMessage, setErrorMessage] = useState('');

//   // Handle input change
//   const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
//     const { name, value } = e.target;
//     setFormData((prevData) => ({
//       ...prevData,
//       [name]: value,
//     }));
//   };

//   // Validate the form (optional: add more validation if necessary)
//   const validateForm = () => {
//     const { name, price, description, stockQuantity } = formData;
//     if (!name || !price || !description || !stockQuantity) {
//       setErrorMessage('Please fill out all required fields.');
//       return false;
//     }
//     if (parseFloat(price) <= 0 || parseInt(stockQuantity) < 0) {
//       setErrorMessage('Price and stock quantity must be positive values.');
//       return false;
//     }
//     return true;
//   };

//   // Handle form submit
//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     if (!validateForm()) return; // Validate form before submission

//     setLoading(true); // Start loading
//     setErrorMessage(''); // Clear error
//     setSuccessMessage(''); // Clear success message

//     try {
//       const response = await axios.post('/api/products', formData); // Send data to backend API
//       setSuccessMessage('Product created successfully!'); // Set success message
//       setFormData({ name: '', price: '', description: '', stockQuantity: '', imgUrl: '' }); // Clear form
//     } catch (error) {
//       console.error('Failed to create product:', error);
//       setErrorMessage('Failed to create product. Please try again.');
//     } finally {
//       setLoading(false); // End loading
//     }
//   };

//   return (
//     <form onSubmit={handleSubmit}>
//       <h2>Add New Product</h2>

//       {/* Error message */}
//       {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}

//       {/* Success message */}
//       {successMessage && <p style={{ color: 'green' }}>{successMessage}</p>}

//       <div>
//         <label>Product Name:</label>
//         <input
//           type="text"
//           name="name"
//           value={formData.name}
//           onChange={handleChange}
//           required
//         />
//       </div>

//       <div>
//         <label>Price (AUD):</label>
//         <input
//           type="number"
//           name="price"
//           value={formData.price}
//           onChange={handleChange}
//           required
//         />
//       </div>

//       <div>
//         <label>Description:</label>
//         <textarea
//           name="description"
//           value={formData.description}
//           onChange={handleChange}
//           required
//         />
//       </div>

//       <div>
//         <label>Stock Quantity:</label>
//         <input
//           type="number"
//           name="stockQuantity"
//           value={formData.stockQuantity}
//           onChange={handleChange}
//           required
//         />
//       </div>

//       <div>
//         <label>Image URL (optional):</label>
//         <input
//           type="text"
//           name="imgUrl"
//           value={formData.imgUrl}
//           onChange={handleChange}
//         />
//       </div>

//       <button type="submit" disabled={loading}>
//         {loading ? 'Uploading...' : 'Upload Product'}
//       </button>
//     </form>
//   );
// }
