import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import db from '../config/db.js';

const router = express.Router();


const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1]; 

  if (!token) {
    return res.status(401).json({ message: 'Access denied. No token provided.' });
  }

  try {
    const verified = jwt.verify(token, process.env.JWT_SECRET);
    req.user = verified; 
    next();
  } catch (err) {
    return res.status(403).json({ message: 'Invalid or expired token.' });
  }
};


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
        email: user.email,
        dob: user.dob 
      }
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server database error during login lookup.' });
  }
});


router.put('/profile', authenticateToken, async (req, res) => {
  const { firstName, lastName } = req.body;
  const userId = req.user.id;

  if (!firstName || !lastName) {
    return res.status(400).json({ message: 'First name and Last name are required.' });
  }

  try {
    await db.query(
      'UPDATE users SET first_name = ?, last_name = ? WHERE id = ?',
      [firstName, lastName, userId]
    );

   
    const [users] = await db.query('SELECT id, first_name, last_name, email, dob FROM users WHERE id = ?', [userId]);
    const updatedUser = users[0];

    res.json({
      message: 'Profile updated successfully!',
      user: {
        id: updatedUser.id,
        firstName: updatedUser.first_name,
        lastName: updatedUser.last_name,
        email: updatedUser.email,
        dob: updatedUser.dob
      }
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error updating profile details.' });
  }
});


router.put('/email', authenticateToken, async (req, res) => {
  const { email } = req.body;
  const userId = req.user.id;

  if (!email) {
    return res.status(400).json({ message: 'A valid new email address is required.' });
  }

  try {
    
    const [existing] = await db.query('SELECT id FROM users WHERE email = ? AND id != ?', [email, userId]);
    if (existing.length > 0) {
      return res.status(400).json({ message: 'This email address is already in use by another user.' });
    }

    await db.query('UPDATE users SET email = ? WHERE id = ?', [email, userId]);

   
    const [users] = await db.query('SELECT id, first_name, last_name, email, dob FROM users WHERE id = ?', [userId]);
    const updatedUser = users[0];

    res.json({
      message: 'Email address updated successfully!',
      user: {
        id: updatedUser.id,
        firstName: updatedUser.first_name,
        lastName: updatedUser.last_name,
        email: updatedUser.email,
        dob: updatedUser.dob
      }
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error updating email address.' });
  }
});


router.put('/password', authenticateToken, async (req, res) => {
  const { currentPassword, newPassword } = req.body;
  const userId = req.user.id;

  if (!currentPassword || !newPassword) {
    return res.status(400).json({ message: 'Both current and new password entries are required.' });
  }

  try {
    const [users] = await db.query('SELECT password FROM users WHERE id = ?', [userId]);
    if (users.length === 0) {
      return res.status(404).json({ message: 'User profile not found.' });
    }

    const isMatch = await bcrypt.compare(currentPassword, users[0].password);
    if (!isMatch) {
      return res.status(400).json({ message: 'The current password you entered is incorrect.' });
    }

    const salt = await bcrypt.genSalt(10);
    const newHashedPassword = await bcrypt.hash(newPassword, salt);

    await db.query('UPDATE users SET password = ? WHERE id = ?', [newHashedPassword, userId]);

    res.json({ message: 'Password updated successfully!' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error changing profile password.' });
  }
});

export default router;