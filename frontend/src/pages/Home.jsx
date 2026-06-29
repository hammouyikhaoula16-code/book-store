import React from 'react';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

function Home({ books, loading, currentPage, setCurrentPage, totalBooks, booksPerPage }) {


  const totalPages = Math.ceil(totalBooks / booksPerPage);

  return (
    <div className="text-white p-6 sm:p-12">
      <div className="max-w-6xl mx-auto space-y-8">

        <div className="text-center space-y-2">
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight bg-gradient-to-r from-violet-400 to-indigo-400 bg-clip-text text-transparent">
            Discover Your Next Read
          </h1>
        </div>

        {loading && (
          <div className="flex flex-col items-center justify-center py-12 space-y-3">
            <div className="w-8 h-8 border-4 border-violet-500 border-t-transparent rounded-full animate-spin"></div>
            <p className="text-sm text-slate-500 animate-pulse">Searching the library shelves...</p>
          </div>
        )}


        {!loading && (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {books.map(book => (
                <div
                  key={book.id}
                  className="flex gap-4 p-4 bg-slate-900/40 backdrop-blur border border-slate-800/60 rounded-2xl hover:border-slate-700/60 hover:bg-slate-900/80 transition-all duration-300 shadow-md group hover:-translate-y-1"
                >
                  <div className="w-24 h-36 flex-shrink-0 rounded-xl overflow-hidden shadow-md border border-slate-800">
                    <img src={book.coverUrl} alt={book.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                  </div>

                  <div className="flex flex-col justify-between py-1 min-w-0">
                    <div className="space-y-1">
                      <h3 className="font-semibold text-slate-200 truncate group-hover:text-violet-400 transition-colors">{book.title}</h3>
                      <p className="text-xs text-slate-400 font-medium truncate">by {book.authors}</p>
                    </div>
                    <div className="space-y-1.5 text-slate-500 text-xs">
                      <div className="flex items-center gap-1.5"><CalendarMonthIcon sx={{ fontSize: 14 }} /><span>{book.publishYear}</span></div>
                      <div className="flex items-center gap-1.5"><MenuBookIcon sx={{ fontSize: 14 }} /><span>{book.pages}</span></div>
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
                  className="flex items-center space-x-1 px-4 py-2 text-sm font-medium bg-slate-900 border border-slate-800 rounded-xl disabled:opacity-30 disabled:pointer-events-none hover:border-slate-700 transition cursor-pointer"
                >
                  <ArrowBackIosIcon sx={{ fontSize: 12 }} />
                  <span>Prev</span>
                </button>

                <span className="text-xs font-semibold uppercase tracking-widest text-slate-500">
                  Page {currentPage} of {totalPages || 1}
                </span>

                <button
                  disabled={currentPage >= totalPages}
                  onClick={() => setCurrentPage(prev => prev + 1)}
                  className="flex items-center space-x-1 px-4 py-2 text-sm font-medium bg-slate-900 border border-slate-800 rounded-xl disabled:opacity-30 disabled:pointer-events-none hover:border-slate-700 transition cursor-pointer"
                >
                  <span>Next</span>
                  <ArrowForwardIosIcon sx={{ fontSize: 12 }} />
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