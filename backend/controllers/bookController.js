import db from '../config/db.js';

export const getAllBooks = async (req, res) => {
  try {
    const [rows] = await db.query(
      'SELECT id, title, authors, cover_url, publish_year, pages, description FROM books'
    );
    res.json(rows);
  } catch (error) {
    console.error('Error fetching library:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

export const getBookById = async (req, res) => {
  const { id } = req.params;
  try {
    const [rows] = await db.query('SELECT * FROM books WHERE id = ?', [id]);

    if (rows.length === 0) {
      return res.status(404).json({ message: 'Book not found' });
    }

    const book = rows[0];

    if (typeof book.content === 'string') {
      try {
        book.content = JSON.parse(book.content);
      } catch {
        book.content = { "1": book.content };
      }
    }

    res.json(book);
  } catch (error) {
    console.error('Error fetching book details:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};