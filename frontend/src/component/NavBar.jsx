import React, { useState } from 'react';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import SearchIcon from '@mui/icons-material/Search';
import FaceIcon from '@mui/icons-material/Face';
import { Link } from 'react-router-dom';
function NavBar({ onSearch }) {
  const [darkMode, setDarkMode] = useState(true);
  const [searchOpen, setSearchOpen] = useState(false);
  const [query, setQuery] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(query)
  };

  return (
    <nav className="sticky top-0 z-50 flex items-center justify-between px-6 py-3 bg-slate-900/80 backdrop-blur-md border-b border-slate-800 text-white shadow-lg">

      <div className="flex items-center space-x-2 cursor-pointer">
        <Link to='/'>
          <span className="text-xl font-extrabold tracking-wider bg-gradient-to-r from-violet-400 to-indigo-500 bg-clip-text text-transparent">
            BOOKS
          </span></Link>
      </div>

      <div className="flex items-center space-x-4">

        <form onSubmit={handleSubmit} className="relative flex items-center">
          <button
            type="button"
            onClick={() => setSearchOpen(!searchOpen)}
            className={`p-2 rounded-xl transition-all duration-300 cursor-pointer ${searchOpen
              ? 'absolute left-1 z-10 text-slate-400'
              : 'text-slate-400 hover:text-violet-400 bg-slate-800/40 hover:bg-slate-800 border border-slate-700/30'
              }`}
          >
            <SearchIcon fontSize="small" />
          </button>

          {searchOpen && (
            <input
              type="text"
              placeholder="Search books..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="w-40 sm:w-64 pl-10 pr-4 py-1.5 bg-slate-800/60 border border-slate-700/50 rounded-full text-sm text-slate-200 focus:outline-none focus:border-violet-500 focus:bg-slate-800 focus:ring-1 focus:ring-violet-500 transition-all duration-300"
              autoFocus
            />
          )}
        </form>

        <button
          onClick={() => setDarkMode(!darkMode)}
          className="p-2 text-slate-400 hover:text-violet-400 bg-slate-800/40 hover:bg-slate-800 border border-slate-700/30 rounded-xl transition-all"
        >
          {darkMode ? <Brightness7Icon fontSize="small" /> : <DarkModeIcon fontSize="small" />}
        </button>
      </div>

      <div className="flex items-center">
        <Link to="/login">
          <button className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-violet-600 to-indigo-600 text-sm font-medium rounded-xl active:scale-95 transition-all">
            <FaceIcon fontSize="small" />
            <span>Login</span>
          </button></Link>
      </div>

    </nav>
  );
}

export default NavBar;