import React, { useState } from 'react';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';

function SearchBar() {
  const [activeCategory, setActiveCategory] = useState(null);

  const toggleCategory = (categoryName) => {
    if (activeCategory === categoryName) {
      setActiveCategory(null);
    } else {
      setActiveCategory(categoryName);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white dark:bg-slate-900 text-slate-800 dark:text-white rounded-2xl shadow-sm dark:shadow-xl border border-slate-100 dark:border-slate-800 transition-colors duration-300">
      <h1 className="text-2xl font-bold text-center mb-6 tracking-wide bg-gradient-to-r from-violet-600 to-indigo-600 dark:from-violet-400 dark:to-indigo-400 bg-clip-text text-transparent">
        Popular Books
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

        
        <div className="space-y-4">
      
          <div>
            <button
              onClick={() => toggleCategory('fantasy')}
              className="w-full flex items-center justify-between p-3 bg-slate-50 dark:bg-slate-800/50 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-800 dark:text-slate-200 rounded-xl border border-slate-200 dark:border-slate-700/30 transition-all cursor-pointer"
            >
              <span className="font-medium">Fantasy</span>
              {activeCategory === 'fantasy' ? <ExpandLessIcon className="text-violet-500" /> : <ExpandMoreIcon className="text-slate-400" />}
            </button>
            {activeCategory === 'fantasy' && (
              <ul className="mt-2 ml-4 pl-4 border-l-2 border-violet-500/40 space-y-2 text-sm text-slate-600 dark:text-slate-400">
                <li><a href="#" className="hover:text-violet-600 dark:hover:text-violet-400 transition">The Lord of the Rings</a></li>
                <li><a href="#" className="hover:text-violet-600 dark:hover:text-violet-400 transition">Harry Potter and the Sorcerer's Stone</a></li>
                <li><a href="#" className="hover:text-violet-600 dark:hover:text-violet-400 transition">A Game of Thrones</a></li>
              </ul>
            )}
          </div>

       
          <div>
            <button
              onClick={() => toggleCategory('mystery')}
              className="w-full flex items-center justify-between p-3 bg-slate-50 dark:bg-slate-800/50 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-800 dark:text-slate-200 rounded-xl border border-slate-200 dark:border-slate-700/30 transition-all cursor-pointer"
            >
              <span className="font-medium">Mystery/Crime</span>
              {activeCategory === 'mystery' ? <ExpandLessIcon className="text-violet-500" /> : <ExpandMoreIcon className="text-slate-400" />}
            </button>
            {activeCategory === 'mystery' && (
              <ul className="mt-2 ml-4 pl-4 border-l-2 border-violet-500/40 space-y-2 text-sm text-slate-600 dark:text-slate-400">
                <li><a href="#" className="hover:text-violet-600 dark:hover:text-violet-400 transition">And Then There Were None</a></li>
                <li><a href="#" className="hover:text-violet-600 dark:hover:text-violet-400 transition">The Girl with the Dragon Tattoo</a></li>
                <li><a href="#" className="hover:text-violet-600 dark:hover:text-violet-400 transition">Gone Girl</a></li>
              </ul>
            )}
          </div>

          <div>
            <button
              onClick={() => toggleCategory('romance')}
              className="w-full flex items-center justify-between p-3 bg-slate-50 dark:bg-slate-800/50 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-800 dark:text-slate-200 rounded-xl border border-slate-200 dark:border-slate-700/30 transition-all cursor-pointer"
            >
              <span className="font-medium">Romance</span>
              {activeCategory === 'romance' ? <ExpandLessIcon className="text-violet-500" /> : <ExpandMoreIcon className="text-slate-400" />}
            </button>
            {activeCategory === 'romance' && (
              <ul className="mt-2 ml-4 pl-4 border-l-2 border-violet-500/40 space-y-2 text-sm text-slate-600 dark:text-slate-400">
                <li><a href="#" className="hover:text-violet-600 dark:hover:text-violet-400 transition">Outlander</a></li>
                <li><a href="#" className="hover:text-violet-600 dark:hover:text-violet-400 transition">The Notebook</a></li>
              </ul>
            )}
          </div>
        </div>

     
        <div className="space-y-4">
       
          <div>
            <button
              onClick={() => toggleCategory('biography')}
              className="w-full flex items-center justify-between p-3 bg-slate-50 dark:bg-slate-800/50 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-800 dark:text-slate-200 rounded-xl border border-slate-200 dark:border-slate-700/30 transition-all cursor-pointer"
            >
              <span className="font-medium">Biography & Autobiography</span>
              {activeCategory === 'biography' ? <ExpandLessIcon className="text-violet-500" /> : <ExpandMoreIcon className="text-slate-400" />}
            </button>
            {activeCategory === 'biography' && (
              <ul className="mt-2 ml-4 pl-4 border-l-2 border-violet-500/40 space-y-2 text-sm text-slate-600 dark:text-slate-400">
                <li><a href="#" className="hover:text-violet-600 dark:hover:text-violet-400 transition">The Diary of a Young Girl</a></li>
                <li><a href="#" className="hover:text-violet-600 dark:hover:text-violet-400 transition">Long Walk to Freedom</a></li>
                <li><a href="#" className="hover:text-violet-600 dark:hover:text-violet-400 transition">Steve Jobs</a></li>
              </ul>
            )}
          </div>

        
          <div>
            <button
              onClick={() => toggleCategory('selfhelp')}
              className="w-full flex items-center justify-between p-3 bg-slate-50 dark:bg-slate-800/50 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-800 dark:text-slate-200 rounded-xl border border-slate-200 dark:border-slate-700/30 transition-all cursor-pointer"
            >
              <span className="font-medium">Self-Help</span>
              {activeCategory === 'selfhelp' ? <ExpandLessIcon className="text-violet-500" /> : <ExpandMoreIcon className="text-slate-400" />}
            </button>
            {activeCategory === 'selfhelp' && (
              <ul className="mt-2 ml-4 pl-4 border-l-2 border-violet-500/40 space-y-2 text-sm text-slate-600 dark:text-slate-400">
                <li><a href="#" className="hover:text-violet-600 dark:hover:text-violet-400 transition">Atomic Habits</a></li>
                <li><a href="#" className="hover:text-violet-600 dark:hover:text-violet-400 transition">Think and Grow Rich</a></li>
                <li><a href="#" className="hover:text-violet-600 dark:hover:text-violet-400 transition">The 7 Habits of Highly Effective People</a></li>
              </ul>
            )}
          </div>


          <div>
            <button
              onClick={() => toggleCategory('truecrime')}
              className="w-full flex items-center justify-between p-3 bg-slate-50 dark:bg-slate-800/50 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-800 dark:text-slate-200 rounded-xl border border-slate-200 dark:border-slate-700/30 transition-all cursor-pointer"
            >
              <span className="font-medium">True Crime</span>
              {activeCategory === 'truecrime' ? <ExpandLessIcon className="text-violet-500" /> : <ExpandMoreIcon className="text-slate-400" />}
            </button>
            {activeCategory === 'truecrime' && (
              <ul className="mt-2 ml-4 pl-4 border-l-2 border-violet-500/40 space-y-2 text-sm text-slate-600 dark:text-slate-400">
                <li><a href="#" className="hover:text-violet-600 dark:hover:text-violet-400 transition">In Cold Blood</a></li>
                <li><a href="#" className="hover:text-violet-600 dark:hover:text-violet-400 transition">Killers of the Flower Moon</a></li>
                <li><a href="#" className="hover:text-violet-600 dark:hover:text-violet-400 transition">I'll Be Gone in the Dark</a></li>
              </ul>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}

export default SearchBar;