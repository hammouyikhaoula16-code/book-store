import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import axios from 'axios';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import AutoStoriesIcon from '@mui/icons-material/AutoStories';
import DownloadIcon from '@mui/icons-material/Download';
import { Link } from 'react-router-dom';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder'; 
import FavoriteIcon from '@mui/icons-material/Favorite';

function Home({ books, loading, currentPage, setCurrentPage, totalBooks, booksPerPage }) {
  const totalPages = Math.ceil(totalBooks / booksPerPage);
  const { connected, token } = useAuth();
  const [favBookIds, setFavBookIds] = useState([]);

  
  useEffect(() => {
    const fetchUserFavorites = async () => {
      if (!connected || !token) return;
      try {
        const response = await axios.get('http://localhost:5000/api/favorites', {
          headers: { Authorization: `Bearer ${token}` }
        });
        setFavBookIds(response.data.map(item => item.book_id));
      } catch (err) {
        console.error('Error matching favorite records:', err);
      }
    };
    fetchUserFavorites();
  }, [connected, token]);

 
  const toggleFavorite = async (book) => {
    if (!connected || !token) return;
    
    const isFavorited = favBookIds.includes(book.id);
    try {
      if (isFavorited) {
        await axios.delete(`http://localhost:5000/api/favorites/${encodeURIComponent(book.id)}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        setFavBookIds(prev => prev.filter(id => id !== book.id));
      } else {
        await axios.post('http://localhost:5000/api/favorites', {
          book_id: book.id,
          title: book.title,
          authors: book.authors,
          cover_url: book.coverUrl
        }, {
          headers: { Authorization: `Bearer ${token}` }
        });
        setFavBookIds(prev => [...prev, book.id]);
      }
    } catch (err) {
      console.error('Failed altering favorites entry:', err);
    }
  };

  return (
    <div className="p-6 sm:p-12 transition-colors duration-300">
      <div className="max-w-6xl mx-auto space-y-8">

        <div className="text-center space-y-2">
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight bg-gradient-to-r from-violet-600 to-indigo-600 dark:from-violet-400 dark:to-indigo-400 bg-clip-text text-transparent">
            {connected ? "Welcome back! What are we reading today?" : "Sign in to unlock and read books"}
          </h1>
        </div>

        {loading && (
          <div className="flex flex-col items-center justify-center py-12 space-y-3">
            <div className="w-8 h-8 border-4 border-violet-500 border-t-transparent rounded-full animate-spin"></div>
            <p className="text-sm text-slate-500 dark:text-slate-400 animate-pulse">Searching the library shelves...</p>
          </div>
        )}

        {!loading && (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {books.map(book => (
                <div
                  key={book.id}
                  className="flex gap-4 p-5 bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800/60 rounded-2xl shadow-sm dark:shadow-none hover:shadow-md dark:hover:border-slate-700/60 transition-all duration-300 group hover:-translate-y-1 relative"
                >
         
                
                  <div className="w-24 h-36 flex-shrink-0 rounded-xl overflow-hidden shadow-sm border border-slate-100 dark:border-slate-950 bg-slate-50 dark:bg-slate-950 relative">
                    <img 
                      src={book.coverUrl !== 'no cover' ? book.coverUrl : 'https://images.unsplash.com/photo-1543002588-bfa74002ed7e?auto=format&fit=crop&q=80&w=200'} 
                      alt={book.title} 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" 
                    />

                  
                    {connected && (
                      <button
                        type="button"
                        onClick={() => toggleFavorite(book)}
                        className="absolute top-2 right-2 p-1.5 bg-white/95 dark:bg-slate-950/95 rounded-full shadow-md text-red-500 border border-slate-100 dark:border-slate-800 hover:scale-110 active:scale-95 transition-all cursor-pointer z-10"
                      >
                        {favBookIds.includes(book.id) ? (
                          <FavoriteIcon sx={{ fontSize: 16 }} />
                        ) : (
                          <FavoriteBorderIcon sx={{ fontSize: 16 }} />
                        )}
                      </button>
                    )}
                  </div>

           
                  <div className="flex flex-col justify-between py-0.5 flex-grow min-w-0">
                    <div className="space-y-1">
                      <h3 className="font-bold text-slate-900 dark:text-slate-100 truncate group-hover:text-violet-600 dark:group-hover:text-violet-400 transition-colors">
                        {book.title}
                      </h3>
                      <p className="text-xs font-semibold text-violet-600 dark:text-violet-400 truncate">
                        by {book.authors}
                      </p>
                    </div>

                    <div className="space-y-1 text-slate-500 dark:text-slate-400 text-xs font-medium">
                      <div className="flex items-center gap-1.5">
                        <CalendarMonthIcon sx={{ fontSize: 14 }} />
                        <span>{book.publishYear}</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <MenuBookIcon sx={{ fontSize: 14 }} />
                        <span>{book.pages}</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 mt-3 w-full">
            
                      <div className="relative group/btn flex-1 flex">
                        <Link to={connected ? '/read' : '#'} className="w-full flex">
                          <button
                            disabled={!connected}
                            type="button"
                            className="w-full flex items-center justify-center space-x-1.5 px-3 py-2 bg-gradient-to-r from-violet-600 to-indigo-600 text-white text-xs font-semibold rounded-xl shadow-sm transition-all
                              enabled:hover:from-violet-500 enabled:hover:to-indigo-500 enabled:active:scale-[0.97] enabled:cursor-pointer
                              disabled:opacity-30 disabled:from-slate-200 disabled:to-slate-300 dark:disabled:from-slate-800 dark:disabled:to-slate-800 disabled:text-slate-400 dark:disabled:text-slate-500 disabled:cursor-not-allowed disabled:shadow-none"
                          >
                            <AutoStoriesIcon sx={{ fontSize: 14 }} />
                            <span>Read</span>
                          </button>
                        </Link>
                        {!connected && (
                          <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 scale-75 opacity-0 group-hover/btn:scale-100 group-hover/btn:opacity-100 transition-all duration-200 pointer-events-none z-50 bg-slate-900 dark:bg-violet-600 text-white text-[10px] font-bold px-2.5 py-1.5 rounded-md shadow-lg whitespace-nowrap">
                            Sign in to read books
                            <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-slate-900 dark:border-t-violet-600" />
                          </div>
                        )}
                      </div>

                      <div className="relative group/btn flex-1 flex">
                        <button
                          disabled={!connected}
                          type="button"
                          onClick={() => console.log('Starting download...')}
                          className="w-full flex items-center justify-center space-x-1.5 px-3 py-2 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 text-xs font-semibold rounded-xl transition-all
                            enabled:hover:border-violet-500/50 enabled:hover:text-violet-600 dark:enabled:hover:text-violet-400 enabled:cursor-pointer enabled:active:scale-[0.97]
                            disabled:opacity-30 disabled:bg-slate-100 dark:disabled:bg-slate-950 disabled:border-slate-200 dark:disabled:border-slate-800/40 disabled:text-slate-400 dark:disabled:text-slate-600 disabled:cursor-not-allowed"
                        >
                          <DownloadIcon sx={{ fontSize: 14 }} />
                          <span>Download</span>
                        </button>
                        {!connected && (
                          <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 scale-75 opacity-0 group-hover/btn:scale-100 group-hover/btn:opacity-100 transition-all duration-200 pointer-events-none z-50 bg-slate-900 dark:bg-violet-600 text-white text-[10px] font-bold px-2.5 py-1.5 rounded-md shadow-lg whitespace-nowrap">
                            Sign in to download
                            <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-slate-900 dark:border-t-violet-600" />
                          </div>
                        )}
                      </div>

                    </div>
                  </div>
                </div>
              ))}
            </div>

            {totalBooks > 0 && (
              <div className="flex items-center justify-center space-x-6 pt-8">
                <button
                  disabled={currentPage === 1}
                  onClick={() => setCurrentPage(prev => prev - 1)}
                  className="flex items-center space-x-1 px-4 py-2 text-sm font-medium bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-800 rounded-xl disabled:opacity-30 disabled:pointer-events-none hover:bg-slate-50 dark:hover:bg-slate-800/50 transition cursor-pointer shadow-sm"
                >
                  <ArrowBackIosIcon sx={{ fontSize: 10 }} />
                  <span>Prev</span>
                </button>

                <span className="text-xs font-bold uppercase tracking-widest text-slate-400 dark:text-slate-500">
                  Page {currentPage} of {totalPages || 1}
                </span>

                <button
                  disabled={currentPage >= totalPages}
                  onClick={() => setCurrentPage(prev => prev + 1)}
                  className="flex items-center space-x-1 px-4 py-2 text-sm font-medium bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-800 rounded-xl disabled:opacity-30 disabled:pointer-events-none hover:bg-slate-50 dark:hover:bg-slate-800/50 transition cursor-pointer shadow-sm"
                >
                  <span>Next</span>
                  <ArrowForwardIosIcon sx={{ fontSize: 10 }} />
                </button>
              </div>
            )}
          </>
        )}

      </div>
    </div>
  );
}

export default Home;