import express from 'express';
import Cart  from '../models/cart.js';
import User from '../models/User.js';
const router = express.Router();

// Save or update the cart
router.post('/save', async (req, res) => {
    const { userId, items } = req.body;
    try {
        await Cart.upsert({ userId, items }); // Save cart for the user
        res.status(201).json({ success: true });
    } catch (error) {
        res.status(500).json({ error: 'Failed to save cart' });
    }
});

// Load the cart for a specific user
router.get('/:userId', async (req, res) => {
    try {
      const cart = await Cart.findOne({ where: { userId: req.params.userId } });
  
      if (!cart) {
        return res.status(404).json({ error: 'Cart not found' });
      }
  
      const cartItems = cart.getParsedCartItems(); // Parse JSON string back into array
      res.json({ cartItems });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Failed to retrieve cart' });
    }
  });

  // Add an item to the cart
  router.post('/add-item', async (req, res) => {
    const { userId, item } = req.body; // Get userId and item from request body
  
    try {
      let cart = await Cart.findOne({ where: { userId } });
  
      if (!cart) {
        cart = await Cart.create({ userId, items: '[]' }); // Create cart if it doesn't exist
      }
  
      const cartItems = cart.getParsedCartItems(); // Parse existing items
      cartItems.push(item); // Add new item to array
      cart.items = JSON.stringify(cartItems); // Convert back to JSON string
  
      await cart.save(); // Save the updated cart
      res.json(cart);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Failed to add item to cart' });
    }
  });