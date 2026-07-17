import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../api';
import { useAuth } from '../context/AuthContext';
import DeleteIcon from '@mui/icons-material/Delete';
import MenuBookIcon from '@mui/icons-material/MenuBook';

function FavBooks() {
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { connected } = useAuth();

  useEffect(() => {
    const fetchFavorites = async () => {
      if (!connected) {
        setLoading(false);
        return;
      }

      try {
        setLoading(true);

        const response = await api.get('/favorites');


        const data = Array.isArray(response.data)
          ? response.data
          : (response.data.favorites || []);

        setFavorites(data);
      } catch (err) {
        console.error('Failed loading favorite items:', err);
        setError('Could not load your favorite books. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchFavorites();
  }, [connected]);

  const removeFavorite = async (bookId) => {
    try {
      await api.delete(`/favorites/${bookId}`);

      setFavorites(prev => prev.filter(book => (book.book_id || book.id) !== bookId));
    } catch (err) {
      console.error('Failed to remove from favorites:', err);
      alert('Could not remove the book. Please try again.');
    }
  };

  if (!connected) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[50vh] text-center px-4">
        <h2 className="text-2xl font-bold mb-2">Access Denied</h2>
        <p className="text-slate-600 dark:text-slate-400 max-w-sm mb-4">
          Please log in to view and manage your saved favorite books collection.
        </p>
        <Link
          to="/login"
          className="px-6 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-medium transition"
        >
          Go to Login
        </Link>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[40vh]">
        <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center text-red-500 my-8 p-4 bg-red-50 dark:bg-red-950/20 rounded-xl max-w-md mx-auto">
        {error}
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 text-slate-800 dark:text-white transition-colors duration-300">
      <h1 className="text-3xl font-bold tracking-tight mb-8 flex items-center gap-3">
        <MenuBookIcon className="text-indigo-600 dark:text-indigo-400 h-8 w-8" />
        Your Favorite Books
      </h1>

      {favorites.length === 0 ? (
        <div className="text-center py-16 bg-white/50 dark:bg-slate-900/40 backdrop-blur border border-slate-200 dark:border-slate-800/80 rounded-3xl">
          <p className="text-slate-500 dark:text-slate-400 text-lg mb-4">Your reading list is empty.</p>
          <Link
            to="/home"
            className="inline-flex items-center justify-center px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-xl transition"
          >
            Explore Library
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {favorites.map((book) => {
            const bookId = book.book_id || book.id;
            return (
              <div
                key={bookId}
                className="group relative flex flex-col bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800/80 rounded-2xl overflow-hidden shadow-sm hover:shadow-md dark:hover:shadow-indigo-950/20 transition-all duration-300"
              >
                <div className="aspect-[3/4] overflow-hidden bg-slate-100 dark:bg-slate-950 relative">
                  <img
                    src={book.cover_url || book.coverUrl || 'https://via.placeholder.com/150x200?text=No+Cover'}
                    alt={book.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                  <button
                    onClick={() => removeFavorite(bookId)}
                    className="absolute top-3 right-3 p-2 bg-white/90 dark:bg-slate-900/90 text-red-500 hover:text-white hover:bg-red-500 dark:hover:bg-red-600 rounded-xl shadow-sm transition-all backdrop-blur"
                    title="Remove from favorites"
                  >
                    <DeleteIcon fontSize="small" />
                  </button>
                </div>

                <div className="p-4 flex flex-col flex-grow">
                  <h3 className="font-bold text-base leading-snug line-clamp-2 mb-1 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                    {book.title}
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-1 mb-4">
                    {Array.isArray(book.authors) ? book.authors.join(', ') : (book.authors || 'Unknown Author')}
                  </p>

                  <Link
                    to={`/book/${bookId}`}
                    className="mt-auto block w-full text-center py-2 bg-slate-100 hover:bg-indigo-600 dark:bg-slate-800 dark:hover:bg-indigo-600 text-slate-700 hover:text-white dark:text-slate-200 dark:hover:text-white rounded-xl text-sm font-medium transition duration-200"
                  >
                    Read Now
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default FavBooks;