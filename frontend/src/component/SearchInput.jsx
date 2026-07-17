import React, { useState } from 'react';
import SearchIcon from '@mui/icons-material/Search';

function SearchInput({ onSend }) {
  const [input, setInput] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSend(input);
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-xl mx-auto flex items-center gap-3">
      <div className="relative flex-grow">

        <SearchIcon className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 dark:text-slate-500" fontSize="small" />

        <input
          type="text"
          placeholder="Search by title or author..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="w-full pl-12 pr-4 py-3 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 focus:border-violet-500 focus:ring-1 focus:ring-violet-500 rounded-2xl text-sm focus:outline-none transition-all placeholder-slate-400 dark:placeholder-slate-500 text-slate-800 dark:text-white"
        />
      </div>

      <button
        type="submit"
        className="px-6 py-3 bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 text-sm font-semibold rounded-2xl shadow-sm dark:shadow-lg active:scale-95 transition-all cursor-pointer text-white"
      >
        Search
      </button>
    </form>
  );
}

export default SearchInput;