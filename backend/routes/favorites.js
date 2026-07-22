import express from 'express';
import protect from '../middleware/authMiddleware.js';
import { getFavorites, addFavorite, removeFavorite } from '../controllers/favoritesController.js';

const router = express.Router();

router.get('/', protect, getFavorites);
router.post('/', protect, addFavorite);
router.delete('/:book_id', protect, removeFavorite);

export default router;