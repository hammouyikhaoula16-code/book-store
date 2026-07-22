import express from 'express';
import protect from '../middleware/authMiddleware.js';
import {
  registerSendCode,
  registerUser,
  loginUser,
  forgotPasswordSendCode,
  resetPassword,
  securitySendCode,
  updateProfile,
  updateEmail,
  updatePassword
} from '../controllers/authController.js';

const router = express.Router();

router.post('/register/send-code', registerSendCode);
router.post('/register', registerUser);
router.post('/login', loginUser);
router.post('/forgot-password/send-code', forgotPasswordSendCode);
router.post('/forgot-password/reset', resetPassword);

// Protected Routes
router.post('/security/send-code', protect, securitySendCode);
router.put('/profile', protect, updateProfile);
router.put('/email', protect, updateEmail);
router.put('/password', protect, updatePassword);

export default router;