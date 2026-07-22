import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import nodemailer from 'nodemailer';
import db from '../config/db.js';

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: parseInt(process.env.SMTP_PORT || '587'),
  secure: false,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

// Helper: Send verification code via email
export const sendVerificationCode = async (email, purpose) => {
  const code = Math.floor(100000 + Math.random() * 900000).toString();
  const expiresAt = new Date(Date.now() + 15 * 60 * 1000);

  await db.query('DELETE FROM email_verifications WHERE email = ? AND purpose = ?', [email, purpose]);
  await db.query(
    'INSERT INTO email_verifications (email, code, purpose, expires_at) VALUES (?, ?, ?, ?)',
    [email, code, purpose, expiresAt]
  );

  const mailOptions = {
    from: `"Digital Library" <${process.env.SMTP_USER}>`,
    to: email,
    subject: `[Library Security] Your Verification Code`,
    html: `
      <div style="font-family: sans-serif; padding: 20px; max-width: 500px; border: 1px solid #e2e8f0; border-radius: 12px;">
        <h2 style="color: #4f46e5;">Verify Your Identity</h2>
        <p>You requested a code for: <strong>${purpose.replace('_', ' ')}</strong></p>
        <div style="background: #f1f5f9; padding: 16px; font-size: 24px; font-weight: bold; letter-spacing: 4px; text-align: center; color: #1e1b4b; margin: 20px 0; border-radius: 8px;">
          ${code}
        </div>
        <p style="font-size: 12px; color: #64748b;">This code expires in 15 minutes. If you didn't request this, you can ignore this email safely.</p>
      </div>
    `
  };

  await transporter.sendMail(mailOptions);
};

// Helper: Validate code
export const verifyCodeToken = async (email, code, purpose) => {
  const [records] = await db.query(
    'SELECT * FROM email_verifications WHERE email = ? AND code = ? AND purpose = ? AND expires_at > NOW()',
    [email, code, purpose]
  );
  if (records.length === 0) return false;

  await db.query('DELETE FROM email_verifications WHERE id = ?', [records[0].id]);
  return true;
};

// Register - Send Code
export const registerSendCode = async (req, res) => {
  const { email } = req.body;
  if (!email) return res.status(400).json({ error: 'Email is required.' });

  try {
    const [existing] = await db.query('SELECT id FROM users WHERE email = ?', [email]);
    if (existing.length > 0) return res.status(400).json({ error: 'An account with this email already exists.' });

    await sendVerificationCode(email, 'register');
    res.json({ message: 'Verification code sent to your email address!' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to dispatch verification email.' });
  }
};

// Register - Finalize
export const registerUser = async (req, res) => {
  const { first_name, last_name, dob, email, password, code } = req.body;

  if (!first_name || !last_name || !dob || !email || !password || !code) {
    return res.status(400).json({ error: 'All fields including the verification code are required.' });
  }

  try {
    const isValid = await verifyCodeToken(email, code, 'register');
    if (!isValid) return res.status(400).json({ error: 'Invalid or expired verification code.' });

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    await db.query(
      'INSERT INTO users (first_name, last_name, dob, email, password) VALUES (?, ?, ?, ?, ?)',
      [first_name, last_name, dob, email, hashedPassword]
    );

    res.status(201).json({ message: 'User registration completed successfully!' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Database verification crash.' });
  }
};

// Login
export const loginUser = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) return res.status(400).json({ error: 'Please enter your email and password.' });

  try {
    const [users] = await db.query('SELECT * FROM users WHERE email = ?', [email]);
    if (users.length === 0) return res.status(400).json({ error: 'Invalid credentials profile.' });

    const user = users[0];
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ error: 'Invalid credentials profile.' });

    const token = jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET, { expiresIn: '24h' });

    res.json({
      token,
      user: { id: user.id, firstName: user.first_name, lastName: user.last_name, email: user.email, dob: user.dob }
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server database error during lookup.' });
  }
};

// Forgot Password - Send Code
export const forgotPasswordSendCode = async (req, res) => {
  const { email } = req.body;
  if (!email) return res.status(400).json({ error: 'Please enter your email address.' });

  try {
    const [users] = await db.query('SELECT id FROM users WHERE email = ?', [email]);
    if (users.length === 0) {
      return res.status(404).json({ error: 'No account associated with this email address.' });
    }

    await sendVerificationCode(email, 'forgot_password');
    res.json({ message: 'Recovery code sent to your email address!' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to dispatch recovery email.' });
  }
};

// Forgot Password - Reset
export const resetPassword = async (req, res) => {
  const { email, code, newPassword } = req.body;

  if (!email || !code || !newPassword) {
    return res.status(400).json({ error: 'Email, code, and new password are required.' });
  }

  if (newPassword.length < 8) {
    return res.status(400).json({ error: 'Password must be at least 8 characters long.' });
  }

  try {
    const isValid = await verifyCodeToken(email, code, 'forgot_password');
    if (!isValid) {
      return res.status(400).json({ error: 'Invalid or expired verification code.' });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newPassword, salt);

    await db.query('UPDATE users SET password = ? WHERE email = ?', [hashedPassword, email]);

    res.json({ message: 'Password reset successfully! You can now log in.' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error processing password reset.' });
  }
};

// Security - Send Code
export const securitySendCode = async (req, res) => {
  const { purpose, customEmail } = req.body;
  const targetEmail = customEmail || req.user.email;

  if (!purpose) return res.status(400).json({ message: 'Purpose is required.' });

  try {
    if (purpose === 'change_email') {
      const [existing] = await db.query('SELECT id FROM users WHERE email = ?', [targetEmail]);
      if (existing.length > 0) return res.status(400).json({ message: 'This email is already linked to another user.' });
    }

    await sendVerificationCode(targetEmail, purpose);
    res.json({ message: `Verification code sent to ${targetEmail}!` });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to dispatch security code.' });
  }
};

// Profile Update
export const updateProfile = async (req, res) => {
  const { firstName, lastName } = req.body;
  if (!firstName || !lastName) return res.status(400).json({ message: 'First name and Last name are required.' });

  try {
    await db.query('UPDATE users SET first_name = ?, last_name = ? WHERE id = ?', [firstName, lastName, req.user.id]);
    const [users] = await db.query('SELECT id, first_name, last_name, email, dob FROM users WHERE id = ?', [req.user.id]);
    res.json({ message: 'Profile updated!', user: { id: users[0].id, firstName: users[0].first_name, lastName: users[0].last_name, email: users[0].email, dob: users[0].dob } });
  } catch (err) {
    res.status(500).json({ message: 'Server error updating profile details.' });
  }
};

// Email Update
export const updateEmail = async (req, res) => {
  const { email, code } = req.body;
  if (!email || !code) return res.status(400).json({ message: 'New email and validation code are required.' });

  try {
    const isValid = await verifyCodeToken(email, code, 'change_email');
    if (!isValid) return res.status(400).json({ message: 'Invalid or expired security token.' });

    await db.query('UPDATE users SET email = ? WHERE id = ?', [email, req.user.id]);
    const [users] = await db.query('SELECT id, first_name, last_name, email, dob FROM users WHERE id = ?', [req.user.id]);

    res.json({
      message: 'Email changed successfully!',
      user: { id: users[0].id, firstName: users[0].first_name, lastName: users[0].last_name, email: users[0].email, dob: users[0].dob }
    });
  } catch (err) {
    res.status(500).json({ message: 'Server error processing email modification.' });
  }
};

// Password Update
export const updatePassword = async (req, res) => {
  const { currentPassword, newPassword, code } = req.body;
  if (!currentPassword || !newPassword || !code) return res.status(400).json({ message: 'All inputs including the security code are required.' });

  try {
    const isValid = await verifyCodeToken(req.user.email, code, 'change_password');
    if (!isValid) return res.status(400).json({ message: 'Invalid or expired verification code.' });

    const [users] = await db.query('SELECT password FROM users WHERE id = ?', [req.user.id]);
    const isMatch = await bcrypt.compare(currentPassword, users[0].password);
    if (!isMatch) return res.status(400).json({ message: 'The current password you entered is incorrect.' });

    const salt = await bcrypt.genSalt(10);
    const newHashedPassword = await bcrypt.hash(newPassword, salt);
    await db.query('UPDATE users SET password = ? WHERE id = ?', [newHashedPassword, req.user.id]);

    res.json({ message: 'Password updated successfully!' });
  } catch (err) {
    res.status(500).json({ message: 'Server error changing password.' });
  }
};