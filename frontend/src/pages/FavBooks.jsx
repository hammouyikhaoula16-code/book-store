import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { Link } from 'react-router-dom';
import axios from 'axios';
import FavoriteIcon from '@mui/icons-material/Favorite';
//import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import DeleteIcon from '@mui/icons-material/Delete'; 
function FavBooks() {
  const { token, connected } = useAuth();
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchFavorites = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/favorites', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setFavorites(response.data);
    } catch (err) {
      console.error('Failed loading layout items:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (connected) fetchFavorites();
  }, [connected]);

  const removeFavorite = async (bookId) => {
    try {
      await axios.delete(`http://localhost:5000/api/favorites/${encodeURIComponent(bookId)}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setFavorites(prev => prev.filter(item => item.book_id !== bookId));
    } catch (err) {
      console.error('Could not drop collection element:', err);
    }
  };

  if (!connected) {
    return <div className="p-12 text-center">Please sign in to access your dashboard.</div>;
  }

  return (
    <div className="p-6 sm:p-12 max-w-6xl mx-auto space-y-8">
      {/* Title Layout Section */}
      <h1 className="text-2xl font-bold flex items-center gap-2">
        <FavoriteIcon className="text-red-500" /> Your Saved Books
      </h1>

      {loading ? (
        <div>Loading your shelf...</div>
      ) : favorites.length === 0 ? (
        <div className="text-center py-12">Your favorite shelf is empty!</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {favorites.map(book => (
            <div key={book.id} className="flex gap-4 p-4 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl relative shadow-sm">
              <img src={book.cover_url} alt={book.title} className="w-20 h-28 object-cover rounded-lg flex-shrink-0" />
              <div className="flex flex-col justify-between">
                <div>
                  <h3 className="font-bold text-sm text-slate-900 dark:text-slate-100 line-clamp-2">{book.title}</h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">{book.authors}</p>
                </div>
                <button 
                  onClick={() => removeFavorite(book.book_id)}
                  className="mt-2 text-slate-400 hover:text-red-500 transition-colors flex items-center gap-1 text-xs font-medium cursor-pointer"
                >
                  <DeleteIcon sx={{ fontSize: 16 }} />
                  <span>Remove</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default FavBooks;