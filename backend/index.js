import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import authRoutes from './routes/auth.js';
import favoritesRoutes from './routes/favorites.js';

dotenv.config();

const app = express();

app.use(cors({ origin: 'http://localhost:5173' })); 
app.use(express.json());


app.use('/api/auth', authRoutes);
app.use('/api/favorites', favoritesRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server database executing on port ${PORT}`);
});