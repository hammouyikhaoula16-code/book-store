import React, { useState, useRef, useEffect } from 'react';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import AutoStoriesIcon from '@mui/icons-material/AutoStories';
import ArticleIcon from '@mui/icons-material/Article';

const longBookText = `Lorem ipsum dolor sit amet consectetur adipisicing elit. Illum adipisci exercitationem harum necessitatibus non veritatis quisquam qui corrupti animi eveniet est quis magnam sunt sit deserunt, illo voluptas aspernatur pariatur!
Lorem ipsum dolor sit amet consectetur adipisicing elit. Illum adipisci exercitationem harum necessitatibus non veritatis quisquam qui corrupti animi eveniet est quis magnam sunt sit deserunt, illo voluptas aspernatur pariatur!
Lorem ipsum dolor sit amet consectetur adipisicing elit. Illum adipisci exercitationem harum necessitatibus non veritatis quisquam qui corrupti animi eveniet est quis magnam sunt sit deserunt, illo voluptas aspernatur pariatur!
Lorem ipsum dolor sit amet consectetur adipisicing elit. Illum adipisci exercitationem harum necessitatibus non veritatis quisquam qui corrupti animi eveniet est quis magnam sunt sit deserunt, illo voluptas aspernatur pariatur!
Lorem ipsum dolor sit amet consectetur adipisicing elit. Illum adipisci exercitationem harum necessitatibus non veritatis quisquam qui corrupti animi eveniet est quis magnam sunt sit deserunt, illo voluptas aspernatur pariatur!
Lorem ipsum dolor sit amet consectetur adipisicing elit. Illum adipisci exercitationem harum necessitatibus non veritatis quisquam qui corrupti animi eveniet est quis magnam sunt sit deserunt, illo voluptas aspernatur pariatur!
Lorem ipsum dolor sit amet consectetur adipisicing elit. Illum adipisci exercitationem harum necessitatibus non veritatis quisquam qui corrupti animi eveniet est quis magnam sunt sit deserunt, illo voluptas aspernatur pariatur!
Lorem ipsum dolor sit amet consectetur adipisicing elit. Illum adipisci exercitationem harum necessitatibus non veritatis quisquam qui corrupti animi eveniet est quis magnam sunt sit deserunt, illo voluptas aspernatur pariatur!`;

function BookReader() {
  const [isOpen, setIsOpen] = useState(false);
  const [currentPageIndex, setCurrentPageIndex] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [viewMode, setViewMode] = useState('book');

  const textContainerRef = useRef(null);

  useEffect(() => {
    if (viewMode === 'book' && isOpen && textContainerRef.current) {
      const scrollWidth = textContainerRef.current.scrollWidth;
      const clientWidth = textContainerRef.current.clientWidth;

      const totalSpreads = Math.ceil(scrollWidth / clientWidth) || 1;
      setTotalPages(totalSpreads);
    }
  }, [viewMode, isOpen]);

  const handleNextPage = () => {
    if (currentPageIndex < totalPages - 1) {
      setCurrentPageIndex(prev => prev + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPageIndex > 0) {
      setCurrentPageIndex(prev => prev - 1);
    }
  };

  const renderCleanParagraphs = (rawText) => {
    return rawText.split('\n').map((para, i) => {
      const cleanLine = para.replace(/^[\s>]+/, '').trim();
      if (!cleanLine) return null;
      return (
        <p key={i} className="indent-8 mb-4 break-inside-avoid-column">
          {cleanLine}
        </p>
      );
    });
  };

  return (
    <div className="min-h-[calc(100vh-64px)] w-full flex flex-col items-center justify-center bg-slate-50 dark:bg-slate-950 p-6 overflow-hidden select-none text-slate-800 dark:text-white transition-colors duration-300">

      <div className="mb-6 flex bg-white dark:bg-slate-900 p-1 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-sm dark:shadow-lg transition-colors duration-300">
        <button
          type="button"
          onClick={() => { setViewMode('book'); setCurrentPageIndex(0); }}
          className={`flex items-center space-x-2 px-4 py-2 text-xs font-semibold rounded-xl transition-all cursor-pointer ${
            viewMode === 'book' 
              ? 'bg-gradient-to-r from-violet-600 to-indigo-600 text-white shadow-md' 
              : 'text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200'
          }`}
        >
          <AutoStoriesIcon sx={{ fontSize: 16 }} />
          <span>3D Book Mode</span>
        </button>

        <button
          type="button"
          onClick={() => setViewMode('normal')}
          className={`flex items-center space-x-2 px-4 py-2 text-xs font-semibold rounded-xl transition-all cursor-pointer ${
            viewMode === 'normal' 
              ? 'bg-gradient-to-r from-violet-600 to-indigo-600 text-white shadow-md' 
              : 'text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200'
          }`}
        >
          <ArticleIcon sx={{ fontSize: 16 }} />
          <span>Normal Mode</span>
        </button>
      </div>

      <div className="mb-6 text-center">
        <p className="text-xs text-violet-600 dark:text-violet-400 font-semibold uppercase tracking-wider">
          {viewMode === 'book' && !isOpen && "✨ Click cover to open"}
          {viewMode === 'book' && isOpen && `📖 Spread ${currentPageIndex + 1} of ${totalPages}`}
          {viewMode === 'normal' && "📱 Scroll View"}
        </p>
      </div>

      {viewMode === 'book' ? (
        <div
          className="relative perspective-1000 transition-all duration-1000"
          style={{
            width: isOpen ? 'min(90vw, 850px)' : 'min(75vw, 380px)',
            height: 'min(70vh, 520px)',
          }}
        >
          <div
            onClick={() => setIsOpen(true)}
            className={`absolute inset-0 rounded-r-2xl bg-gradient-to-r from-red-950 to-red-900 border-l-8 border-amber-600 cursor-pointer flex flex-col justify-between p-8 transform origin-left transition-transform duration-1000 ${
              isOpen ? '-rotate-y-180 opacity-0 pointer-events-none' : 'rotate-y-0 z-30 shadow-xl'
            }`}
          >
            <div className="absolute inset-3 border border-amber-500/30 rounded-lg flex flex-col justify-between p-6">
              <div className="text-center space-y-2 mt-8">
                <h1 className="text-2xl font-serif font-extrabold text-amber-100 tracking-wider">BOOK</h1>
                <p className="text-xs italic text-amber-400 font-serif">Standard Edition</p>
              </div>
              <div className="flex justify-center text-amber-500/50"><MenuBookIcon sx={{ fontSize: 32 }} /></div>
            </div>
          </div>
          <div className={`absolute inset-0 bg-[#f4ebd0] rounded-2xl border-2 border-[#e6d9b8] shadow-2xl flex text-slate-900 overflow-hidden transform transition-all duration-1000 ${
            isOpen ? 'scale-100 opacity-100 z-10' : 'scale-90 opacity-0 pointer-events-none'
          }`}>
            <div className="absolute top-0 bottom-0 left-1/2 -translate-x-1/2 w-10 bg-gradient-to-r from-black/15 via-transparent to-black/15 z-20 pointer-events-none" />
            <div className="absolute top-0 bottom-0 left-1/2 -translate-x-[1px] w-[2px] bg-amber-900/10 z-20 pointer-events-none" />

            <div
              ref={textContainerRef}
              style={{ transform: `translateX(-${currentPageIndex * 100}%)` }}
              className="w-full h-full flex transition-transform duration-500 ease-in-out font-serif text-sm sm:text-base leading-relaxed"
            >
              <div className="w-full h-full min-w-full columns-2 gap-16 p-8 sm:p-12 text-justify overflow-visible">
                {renderCleanParagraphs(longBookText)}
              </div>
            </div>

            <div className="absolute bottom-4 left-6 text-xs text-slate-500/80 font-bold z-30">{(currentPageIndex * 2) + 1}</div>
            <div className="absolute bottom-4 right-6 text-xs text-slate-500/80 font-bold z-30">{(currentPageIndex * 2) + 2}</div>
          </div>
        </div>
      ) : (
 
        <div className="w-full max-w-2xl bg-[#fdfaf2] rounded-3xl border border-[#e8dfc7] text-slate-900 p-8 sm:p-12 h-[65vh] overflow-y-auto shadow-sm dark:shadow-xl transition-shadow">
          <div className="font-serif text-base sm:text-lg leading-relaxed text-justify">
            {renderCleanParagraphs(longBookText)}
          </div>
        </div>
      )}

      {viewMode === 'book' && isOpen && (
        <div className="flex items-center space-x-6 mt-10">
          <button
            type="button"
            disabled={currentPageIndex === 0}
            onClick={handlePrevPage}
            className="p-3 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-full text-slate-700 dark:text-white hover:border-violet-500 dark:hover:border-violet-500 hover:text-violet-600 dark:hover:text-violet-400 shadow-sm disabled:opacity-30 cursor-pointer transition-all"
          >
            <ChevronLeftIcon />
          </button>
          
          <button
            type="button"
            onClick={() => { setIsOpen(false); setCurrentPageIndex(0); }}
            className="px-5 py-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:text-red-600 dark:hover:text-red-400 shadow-sm text-xs font-semibold rounded-xl transition cursor-pointer"
          >
            Close
          </button>
          
          <button
            type="button"
            disabled={currentPageIndex === totalPages - 1}
            onClick={handleNextPage}
            className="p-3 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-white hover:border-violet-500 dark:hover:border-violet-500 hover:text-violet-600 dark:hover:text-violet-400 shadow-sm disabled:opacity-30 cursor-pointer transition-all"
          >
            <ChevronRightIcon />
          </button>
        </div>
      )}
    </div>
  );
}

export default BookReader;