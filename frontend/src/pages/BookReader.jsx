import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import api from '../api';
import { useAuth } from '../context/AuthContext';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';

function BookReader() {
  const { id } = useParams();
  const { token, connected } = useAuth();

  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isFavorited, setIsFavorited] = useState(false);
  const [favLoading, setFavLoading] = useState(false);
  const [pages, setPages] = useState([]);
  const [currentPageIndex, setCurrentPageIndex] = useState(0);


  useEffect(() => {
    const fetchBookContent = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await api.get(`/books/${id}`);
        const bookData = response.data;
        setBook(bookData);

        let rawText = '';
        const contentObj = bookData.content;
        if (contentObj) {
          if (typeof contentObj === 'string') {
            rawText = contentObj;
          } else if (typeof contentObj === 'object') {
            rawText = contentObj["1"] || Object.values(contentObj)[0] || '';
          }
        }

        if (!rawText.trim() && bookData.description) {
          rawText = bookData.description;
        }

        const paragraphs = rawText.split('\n').filter(p => p.trim() !== '');
        const chunkedPages = [];
        const paragraphsPerSection = 3;
        for (let i = 0; i < paragraphs.length; i += paragraphsPerSection) {
          chunkedPages.push(paragraphs.slice(i, i + paragraphsPerSection).join('\n\n'));
        }

        setPages(chunkedPages.length > 0 ? chunkedPages : ["No readable content available for this book."]);
      } catch (err) {
        console.error("Failed to retrieve book content:", err);
        setError("We couldn't load this book. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchBookContent();
  }, [id]);

  useEffect(() => {
    const checkIfFavorited = async () => {
      if (!connected || !token || !id) return;
      try {
        const response = await api.get('/favorites');
        const favList = Array.isArray(response.data) ? response.data : (response.data.favorites || []);
        const isFav = favList.some(fav => String(fav.book_id || fav.id) === String(id));
        setIsFavorited(isFav);
      } catch (err) {
        console.error("Failed checking favorites status:", err);
      }
    };

    checkIfFavorited();
  }, [connected, token, id]);


  const toggleFavorite = async () => {
    if (!connected) {
      alert("Please log in to add books to your favorites.");
      return;
    }
    setFavLoading(true);
    try {
      if (isFavorited) {
        await api.delete(`/favorites/${id}`); 
        setIsFavorited(false);
      } else {
        await api.post('/favorites', {
          book_id: book.id,
          title: book.title,
          authors: book.authors,
          cover_url: book.cover_url || book.coverUrl
        });
        setIsFavorited(true);
      }
    } catch (err) {
      console.error("Failed modifying favorite list:", err);
    } finally {
      setFavLoading(false);
    }
  };



  const renderCleanParagraphs = (rawText) => {
    if (!rawText) return <p className="text-center italic text-slate-400">No content available for this section.</p>;
    const textAsString = String(rawText);

    return textAsString.split('\n').map((para, i) => {
      const cleanLine = para.replace(/^[\s>]+/, '').trim();
      if (!cleanLine) return null;
      return (
        <p key={i} className="text-slate-700 dark:text-slate-300 indent-8 mb-6 text-justify leading-relaxed text-base sm:text-lg">
          {cleanLine}
        </p>
      );
    });
  };

  if (loading) {
    return (
      <div className="min-h-[calc(100vh-64px)] w-full flex flex-col items-center justify-center bg-slate-50 dark:bg-slate-950 p-6 text-slate-800 dark:text-white transition-colors duration-300">
        <div className="w-8 h-8 border-4 border-violet-500 border-t-transparent rounded-full animate-spin"></div>
        <p className="mt-3 text-sm text-slate-500 dark:text-slate-400">Opening library details...</p>
      </div>
    );
  }

  if (error || !book) {
    return (
      <div className="min-h-[calc(100vh-64px)] w-full flex flex-col items-center justify-center bg-slate-50 dark:bg-slate-950 p-6 text-slate-800 dark:text-white transition-colors duration-300 space-y-4">
        <p className="text-red-500 font-medium">{error || "Book not found."}</p>
        <Link to="/" className="flex items-center gap-2 text-sm text-violet-600 dark:text-violet-400 hover:underline">
          <ArrowBackIcon sx={{ fontSize: 16 }} />
          Return to Library
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-white transition-colors duration-300">
      <div className="max-w-4xl mx-auto px-6 py-10 space-y-10">


        <Link
          to="/"
          className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-500 hover:text-slate-800 dark:hover:text-slate-200 transition-colors"
        >
          <ArrowBackIcon sx={{ fontSize: 16 }} />
          <span>Back to Library</span>
        </Link>


        <div className="flex flex-col md:flex-row gap-8 items-center md:items-start p-6 sm:p-8 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl shadow-sm">

          <div className="w-36 h-52 sm:w-44 sm:h-64 flex-shrink-0 rounded-2xl overflow-hidden shadow-md border border-slate-100 dark:border-slate-800 bg-slate-100 dark:bg-slate-950">
            <img
              src={book.cover_url || book.coverUrl || 'https://images.unsplash.com/photo-1543002588-bfa74002ed7e?auto=format&fit=crop&q=80&w=200'}
              alt={book.title}
              className="w-full h-full object-cover"
            />
          </div>


          <div className="flex-1 flex flex-col justify-between self-stretch text-center md:text-left space-y-6">
            <div className="space-y-3">
              <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-950 dark:text-slate-50">
                {book.title}
              </h1>
              <p className="text-sm font-semibold text-violet-600 dark:text-violet-400">
                by {book.authors || "Unknown Author"}
              </p>

              <div className="flex flex-wrap justify-center md:justify-start gap-4 text-xs font-medium text-slate-500 dark:text-slate-400 pt-2">
                <div className="flex items-center gap-1.5">
                  <CalendarMonthIcon sx={{ fontSize: 16 }} />
                  <span>Published: {book.publish_year || book.publishYear || 'N/A'}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <MenuBookIcon sx={{ fontSize: 16 }} />
                  <span>Length: {book.pages || 'N/A'} Pages</span>
                </div>
              </div>
            </div>


            <div className="pt-2">
              <button
                type="button"
                onClick={toggleFavorite}
                disabled={favLoading}
                className={`inline-flex items-center space-x-2 px-5 py-2.5 rounded-xl text-sm font-bold shadow-sm transition-all duration-300 cursor-pointer active:scale-95 disabled:opacity-50 border ${isFavorited
                    ? 'bg-rose-50 dark:bg-rose-950/20 text-rose-600 border-rose-200 dark:border-rose-900/50 hover:bg-rose-100'
                    : 'bg-white dark:bg-slate-950 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700'
                  }`}
              >
                {isFavorited ? (
                  <>
                    <FavoriteIcon className="text-rose-600" sx={{ fontSize: 18 }} />
                    <span>In Favorites</span>
                  </>
                ) : (
                  <>
                    <FavoriteBorderIcon sx={{ fontSize: 18 }} />
                    <span>Add to Favorites</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>


        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-4 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-sm">
          <div className="text-center sm:text-left">
            <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100">Jump to Section</h3>
            <p className="text-xs text-slate-400">Navigate pages smoothly using the selector</p>
          </div>

          <div className="flex items-center space-x-3 w-full sm:w-auto justify-end">
            <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 whitespace-nowrap">
              Page {currentPageIndex + 1} of {pages.length}
            </span>
            <select
              value={currentPageIndex}
              onChange={(e) => setCurrentPageIndex(Number(e.target.value))}
              className="px-3 py-2 text-xs font-semibold bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-violet-500 transition cursor-pointer"
            >
              {pages.map((_, index) => (
                <option key={index} value={index}>
                  Section {index + 1}
                </option>
              ))}
            </select>
          </div>
        </div>


        <div className="bg-[#fdfaf2] rounded-3xl border border-[#e8dfc7] p-8 sm:p-12 shadow-md dark:shadow-2xl">
          <article className="font-serif max-w-2xl mx-auto">
            {renderCleanParagraphs(pages[currentPageIndex])}
          </article>
        </div>
        <div className="flex justify-between items-center pt-4">
          <button
            type="button"
            disabled={currentPageIndex === 0}
            onClick={() => setCurrentPageIndex(prev => prev - 1)}
            className="px-5 py-2.5 text-xs font-bold bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl shadow-sm text-slate-700 dark:text-slate-300 disabled:opacity-35 disabled:pointer-events-none hover:bg-slate-100 dark:hover:bg-slate-800 transition-all cursor-pointer"
          >
            ← Previous Page
          </button>
          <button
            type="button"
            disabled={currentPageIndex === pages.length - 1}
            onClick={() => setCurrentPageIndex(prev => prev + 1)}
            className="px-5 py-2.5 text-xs font-bold bg-gradient-to-r from-violet-600 to-indigo-600 text-white rounded-xl shadow-sm disabled:opacity-35 disabled:pointer-events-none hover:from-violet-500 hover:to-indigo-500 transition-all cursor-pointer"
          >
            Next Page →
          </button>
        </div>

      </div>
    </div>
  );
}

export default BookReader;