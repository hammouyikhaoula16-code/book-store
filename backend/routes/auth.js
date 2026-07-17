import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import db from '../config/db.js';

const router = express.Router();


router.post('/register', async (req, res) => {
  const { first_name, last_name, dob, email, password } = req.body;

  if (!first_name || !last_name || !dob || !email || !password) {
    return res.status(400).json({ error: 'Please provide all required registration fields.' });
  }

  try {
    const [existingUser] = await db.query('SELECT id FROM users WHERE email = ?', [email]);
    if (existingUser.length > 0) {
      return res.status(400).json({ error: 'An account with this email address already exists.' });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    await db.query(
      'INSERT INTO users (first_name, last_name, dob, email, password) VALUES (?, ?, ?, ?, ?)',
      [first_name, last_name, dob, email, hashedPassword]
    );

    res.status(201).json({ message: 'User registration completed successfully!' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server database error during registration.' });
  }
});


router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: 'Please enter your email and password.' });
  }

  try {
    const [users] = await db.query('SELECT * FROM users WHERE email = ?', [email]);
    if (users.length === 0) {
      return res.status(400).json({ error: 'Invalid credentials profile.' });
    }

    const user = users[0];

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ error: 'Invalid credentials profile.' });
    }

    const token = jwt.sign(
      { id: user.id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: '24h' }
    );

    res.json({
      token,
      user: {
        id: user.id,
        firstName: user.first_name,
        lastName: user.last_name,
        email: user.email
      }
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server database error during login lookup.' });
  }
});

export default router;