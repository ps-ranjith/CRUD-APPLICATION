const express = require('express');
const router = express.Router();
const User = require('../models/user');

// Create a new user
router.post('/', async (req, res) => {
  console.log(req.body); // 👈 Debugging help
  try {
    const user = await User.create(req.body);
    return res.status(201).json(user);
  } catch (err) {
    return res.status(400).json({ error: err.message });
  }
});


// Get all users
router.get('/', async (req, res) => {
  try {
    const users = await User.find();
    return res.json(users);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
});

// Get a specific user by ID
router.get('/:id', async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ error: 'User not found' });
    return res.json(user);
  } catch (err) {
    return res.status(400).json({ error: 'Invalid user ID' });
  }
});

// Update a user by ID
router.put('/:id', async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!user) return res.status(404).json({ error: 'User not found' });
    return res.json(user);
  } catch (err) {
    return res.status(400).json({ error: err.message });
  }
});

// Delete a user by ID
router.delete('/:id', async (req, res) => {
  try {
    const result = await User.findByIdAndDelete(req.params.id);
    if (!result) return res.status(404).json({ error: 'User not found' });
    return res.json({ message: 'User deleted successfully' });
  } catch (err) {
    return res.status(400).json({ error: 'Invalid user ID' });
  }
});

module.exports = router;
