import express from 'express';
import Cart from '../models/Cart.js';

const router = express.Router();

// Save or update the cart
router.post('/save', async (req, res) => {
  const { userId, items } = req.body;

  if (!userId || !Array.isArray(items)) {
    return res.status(400).json({ error: 'Invalid input data' });
  }

  try {
    // Convert items array to JSON string before saving
    const [cart, created] = await Cart.upsert({
      userId,
      items: JSON.stringify(items)
    });

    res.status(created ? 201 : 200).json({ success: true, cart });
  } catch (error) {
    console.error('Error saving cart:', error);
    res.status(500).json({ error: 'Failed to save cart' });
  }
});

// Load the cart for a specific user
router.get('/:userId', async (req, res) => {
  const { userId } = req.params;

  if (!userId) {
    return res.status(400).json({ error: 'Invalid userId' });
  }

  try {
    const cart = await Cart.findOne({ where: { userId } });

    if (!cart) {
      return res.status(404).json({ error: 'Cart not found' });
    }

    // Parse the cart items and return
    const cartItems = cart.getParsedCartItems();
    res.json({ cartItems });
  } catch (error) {
    console.error('Error retrieving cart:', error);
    res.status(500).json({ error: 'Failed to retrieve cart' });
  }
});

// Add an item to the cart
router.post('/add-item', async (req, res) => {
  const { userId, item } = req.body;

  if (!userId || !item || !item.id) {
    return res.status(400).json({ error: 'Invalid input data' });
  }

  try {
    let cart = await Cart.findOne({ where: { userId } });

    if (!cart) {
      cart = await Cart.create({ userId, items: '[]' }); // Create cart if it doesn't exist
    }

    const cartItems = cart.getParsedCartItems();
    cartItems.push(item); // Add new item to the array

    cart.items = JSON.stringify(cartItems); // Convert back to JSON string
    await cart.save(); // Save the updated cart

    res.json(cart);
  } catch (error) {
    console.error('Error adding item to cart:', error);
    res.status(500).json({ error: 'Failed to add item to cart' });
  }
});

export default router;
