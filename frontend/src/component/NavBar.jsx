import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import LightModeIcon from '@mui/icons-material/LightMode';
import SearchIcon from '@mui/icons-material/Search';
import FaceIcon from '@mui/icons-material/Face';
import { Link } from 'react-router-dom';
import SettingsIcon from '@mui/icons-material/Settings';
import SettingsBar from './SettingsBar';
import FavoriteIcon from '@mui/icons-material/Favorite';
function NavBar({ onSearch, darkMode, toggleDarkMode }) {
  const { connected, logout } = useAuth();
  const [searchOpen, setSearchOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [settingsOpen, setSettingsOpen] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(query);
  };

  return (
    <div className='relative'>

      <nav className="sticky top-0 z-50 flex items-center justify-between px-6 py-3 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 text-slate-800 dark:text-white shadow-sm dark:shadow-lg transition-colors duration-300">


        <div className="flex items-center space-x-2 cursor-pointer">
          <Link to='/'>
            <span className="text-xl font-extrabold tracking-wider bg-gradient-to-r from-violet-600 to-indigo-600 dark:from-violet-400 dark:to-indigo-500 bg-clip-text text-transparent">
              BOOKS
            </span>
          </Link>
        </div>


        <div className="flex items-center space-x-4">

          {connected && (
            <Link
              to="/favorites"
              className="p-2 text-slate-500 dark:text-slate-400 hover:text-red-500 dark:hover:text-red-400 bg-slate-100 dark:bg-slate-800/40 hover:bg-slate-200 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-700/30 rounded-xl transition-all duration-300 flex items-center gap-1 text-xs font-semibold shadow-sm"
            >
              <FavoriteIcon fontSize="small" className="text-red-500 animate-pulse" />
              <span className="hidden sm:inline">My Favorites</span>
            </Link>
          )}
          <form onSubmit={handleSubmit} className="relative flex items-center">
            <button
              type="button"
              onClick={() => setSearchOpen(!searchOpen)}
              className={`p-2 rounded-xl transition-all duration-300 cursor-pointer ${searchOpen
                ? 'absolute left-1 z-10 text-slate-400 dark:text-slate-500'
                : 'text-slate-500 dark:text-slate-400 hover:text-violet-600 dark:hover:text-violet-400 bg-slate-100 dark:bg-slate-800/40 hover:bg-slate-200 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-700/30'
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
                className="w-40 sm:w-64 pl-10 pr-4 py-1.5 bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/50 rounded-full text-sm text-slate-800 dark:text-slate-200 focus:outline-none focus:border-violet-500 focus:bg-white dark:focus:bg-slate-800 focus:ring-1 focus:ring-violet-500 transition-all duration-300"
                autoFocus
              />
            )}
          </form>


          <button
            type="button"
            onClick={toggleDarkMode}
            className="p-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-900 transition-all cursor-pointer shadow-sm active:scale-95"
          >
            {darkMode ? (
              <div className="flex items-center text-xs font-semibold">
                <LightModeIcon sx={{ fontSize: 16, color: '#f59e0b' }} />
              </div>
            ) : (
              <div className="flex items-center text-xs font-semibold">
                <DarkModeIcon sx={{ fontSize: 16, color: '#6366f1' }} />
              </div>
            )}
          </button>
        </div>


        {connected ? (
          <div className="flex items-center">
            <button
              onClick={() => setSettingsOpen(!settingsOpen)}
              className="flex items-center space-x-2 px-4 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700/60 text-slate-700 dark:text-slate-200 text-sm font-medium rounded-xl hover:border-violet-500 dark:hover:border-violet-500 hover:text-violet-600 dark:hover:text-violet-400 transition-all cursor-pointer"
            >
              <SettingsIcon fontSize="small" className={settingsOpen ? "rotate-45 transition-transform" : "transition-transform"} />
              <span>Settings</span>
            </button>
          </div>
        ) : (
          <div className="flex items-center">
            <Link to="/login">
              <button className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r cursor-pointer from-violet-600 to-indigo-600 text-white text-sm font-medium rounded-xl active:scale-95 transition-all shadow-sm">
                <FaceIcon fontSize="small" />
                <span>Login</span>
              </button>
            </Link>
          </div>
        )}

      </nav>


      {connected && settingsOpen && (
        <div className="absolute right-6 top-16 z-50 animate-in fade-in slide-in-from-top-2 duration-200">

          <SettingsBar onClose={() => setSettingsOpen(false)} onLogout={logout} />
        </div>
      )}
    </div>
  );
}

export default NavBar;