import db from '../config/db.js';

export const getFavorites = async (req, res) => {
  try {
    const [favs] = await db.query('SELECT * FROM favorites WHERE user_id = ?', [req.user.id]);
    res.json(favs);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error pulling favorites record library data.' });
  }
};

export const addFavorite = async (req, res) => {
  const { book_id, title, authors, cover_url } = req.body;

  try {
    await db.query(
      'INSERT INTO favorites (user_id, book_id, title, authors, cover_url) VALUES (?, ?, ?, ?, ?) ON DUPLICATE KEY UPDATE title=title',
      [req.user.id, book_id, title, authors, cover_url]
    );
    res.status(201).json({ message: 'Book saved successfully to collection!' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed saving book collection entry.' });
  }
};

export const removeFavorite = async (req, res) => {
  try {
    await db.query('DELETE FROM favorites WHERE user_id = ? AND book_id = ?', [req.user.id, req.params.book_id]);
    res.json({ message: 'Book removed from favorites list.' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed dropping book collection entry.' });
  }
};