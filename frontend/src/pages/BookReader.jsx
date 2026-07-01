import React, { useState, useMemo } from 'react';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import AutoStoriesIcon from '@mui/icons-material/AutoStories';
import ArticleIcon from '@mui/icons-material/Article';

const longBookText = `        >Lorem ipsum dolor sit amet consectetur adipisicing elit. Illum adipisci exercitationem harum necessitatibus non veritatis quisquam qui corrupti animi eveniet est quis magnam sunt sit deserunt, illo voluptas aspernatur pariatur!
        >Lorem ipsum dolor sit amet consectetur adipisicing elit. Illum adipisci exercitationem harum necessitatibus non veritatis quisquam qui corrupti animi eveniet est quis magnam sunt sit deserunt, illo voluptas aspernatur pariatur!
        >Lorem ipsum dolor sit amet consectetur adipisicing elit. Illum adipisci exercitationem harum necessitatibus non veritatis quisquam qui corrupti animi eveniet est quis magnam sunt sit deserunt, illo voluptas aspernatur pariatur!
        
                >Lorem ipsum dolor sit amet consectetur adipisicing elit. Illum adipisci exercitationem harum necessitatibus non veritatis quisquam qui corrupti animi eveniet est quis magnam sunt sit deserunt, illo voluptas aspernatur pariatur!
        >Lorem ipsum dolor sit amet consectetur adipisicing elit. Illum adipisci exercitationem harum necessitatibus non veritatis quisquam qui corrupti animi eveniet est quis magnam sunt sit deserunt, illo voluptas aspernatur pariatur!
        >Lorem ipsum dolor sit amet consectetur adipisicing elit. Illum adipisci exercitationem harum necessitatibus non veritatis quisquam qui corrupti animi eveniet est quis magnam sunt sit deserunt, illo voluptas aspernatur pariatur!
        >Lorem ipsum dolor sit amet consectetur adipisicing elit. Illum adipisci exercitationem harum necessitatibus non veritatis quisquam qui corrupti animi eveniet est quis magnam sunt sit deserunt, illo voluptas aspernatur pariatur!
>Lorem ipsum dolor sit amet consectetur adipisicing elit. Illum adipisci exercitationem harum necessitatibus non veritatis quisquam qui corrupti animi eveniet est quis magnam sunt sit deserunt, illo voluptas aspernatur pariatur!
`;

function BookReader() {
  const [isOpen, setIsOpen] = useState(false);
  const [currentPageIndex, setCurrentPageIndex] = useState(0);
  const [viewMode, setViewMode] = useState('book');

  const bookSpreads = useMemo(() => {
    const WORDS_PER_PAGE = 60;

    const words = longBookText.replace(/\s+/g, ' ').trim().split(' ');
    const pages = [];

    for (let i = 0; i < words.length; i += WORDS_PER_PAGE) {
      const pageText = words.slice(i, i + WORDS_PER_PAGE).join(' ');
      pages.push(pageText);
    }

    const spreads = [];
    for (let i = 0; i < pages.length; i += 2) {
      spreads.push({
        left: pages[i] || "End of text layout.",
        right: pages[i + 1] || ""
      });
    }

    return spreads;
  }, []);

  const handleNextPage = () => {
    if (currentPageIndex < bookSpreads.length - 1) {
      setCurrentPageIndex(prev => prev + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPageIndex > 0) {
      setCurrentPageIndex(prev => prev - 1);
    }
  };

  return (
    <div className="min-h-[calc(100vh-64px)] w-full flex flex-col items-center justify-center bg-slate-950 p-6 overflow-hidden select-none text-white">

      <div className="mb-6 flex bg-slate-900 p-1 border border-slate-800 rounded-2xl shadow-lg">
        <button
          type="button"
          onClick={() => setViewMode('book')}
          className={`flex items-center space-x-2 px-4 py-2 text-xs font-semibold rounded-xl transition-all cursor-pointer ${viewMode === 'book' ? 'bg-gradient-to-r from-violet-600 to-indigo-600 text-white shadow-md' : 'text-slate-400'
            }`}
        >          <AutoStoriesIcon sx={{ fontSize: 16 }} />
          <span>3D Book Mode</span>
        </button>

        <button
          type="button"
          onClick={() => setViewMode('normal')}
          className={`flex items-center space-x-2 px-4 py-2 text-xs font-semibold rounded-xl transition-all cursor-pointer ${viewMode === 'normal' ? 'bg-gradient-to-r from-violet-600 to-indigo-600 text-white shadow-md' : 'text-slate-400'
            }`}
        >
          <ArticleIcon sx={{ fontSize: 16 }} />
          <span>Normal Mode</span>
        </button>
      </div>

      <div className="mb-6 text-center">
        <p className="text-xs text-violet-400 font-medium uppercase tracking-wider">
          {viewMode === 'book' && !isOpen && "✨ Click cover to open"}
          {viewMode === 'book' && isOpen && `📖 Spread ${currentPageIndex + 1} of ${bookSpreads.length}`}
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
            className={`absolute inset-0 rounded-r-2xl bg-gradient-to-r from-red-950 to-red-900 border-l-8 border-amber-600 cursor-pointer flex flex-col justify-between p-8 transform origin-left transition-transform duration-1000 ${isOpen ? '-rotate-y-180 opacity-0 pointer-events-none' : 'rotate-y-0 z-30'
              }`}
          >
            <div className="absolute inset-3 border border-amber-500/30 rounded-lg flex flex-col justify-between p-6">
              <div className="text-center space-y-2 mt-8">
                <h1 className="text-2xl font-serif font-extrabold text-amber-100 tracking-wider">LOREM IPSUM</h1>
                <p className="text-xs italic text-amber-400 font-serif">Standard Edition</p>
              </div>
              <div className="flex justify-center text-amber-500/50"><MenuBookIcon sx={{ fontSize: 32 }} /></div>
            </div>
          </div>

          <div className={`absolute inset-0 bg-[#f4ebd0] rounded-2xl border-2 border-[#e6d9b8] shadow-2xl flex text-slate-900 overflow-hidden transform transition-all duration-1000 ${isOpen ? 'scale-100 opacity-100 z-10' : 'scale-90 opacity-0 pointer-events-none'}`}>
            <div className="absolute top-0 bottom-0 left-1/2 -translate-x-1/2 w-8 bg-gradient-to-r from-black/20 via-black/5 to-black/20 z-20 pointer-events-none" />

            <div className="w-1/2 h-full p-6 sm:p-8 flex flex-col justify-between bg-gradient-to-r from-[#fcf7e8] to-[#f4ebd0]">
              <div className="font-serif text-sm sm:text-base leading-relaxed text-justify h-[88%] overflow-hidden">
                {bookSpreads[currentPageIndex]?.left}
              </div>
              <span className="text-xs font-serif text-slate-400 font-bold">{(currentPageIndex * 2) + 1}</span>
            </div>

            <div className="w-1/2 h-full p-6 sm:p-8 flex flex-col justify-between bg-gradient-to-r from-[#f4ebd0] to-[#fcf7e8]">
              <div className="font-serif text-sm sm:text-base leading-relaxed text-justify h-[88%] overflow-hidden">
                {bookSpreads[currentPageIndex]?.right}
              </div>
              <span className="text-xs font-serif text-slate-400 font-bold self-end">{(currentPageIndex * 2) + 2}</span>
            </div>
          </div>
        </div>
      ) : (
        <div className="w-full max-w-2xl bg-[#fdfaf2] rounded-3xl border border-[#e8dfc7] text-slate-900 p-8 sm:p-12 h-[65vh] overflow-y-auto">
          <div className="font-serif text-base sm:text-lg leading-relaxed text-justify space-y-4">
            {longBookText.split('\n').map((para, i) => (
              <p key={i} className="indent-8">{para}</p>
            ))}
          </div>
        </div>
      )}

      {viewMode === 'book' && isOpen && (
        <div className="flex items-center space-x-6 mt-10">
          <button
            type="button"
            disabled={currentPageIndex === 0}
            onClick={handlePrevPage}
            className="p-3 bg-slate-900 border border-slate-800 rounded-full hover:border-violet-500 hover:text-violet-400 disabled:opacity-30 cursor-pointer text-white"
          >
            <ChevronLeftIcon />
          </button>
          <button type="button" onClick={() => { setIsOpen(false); setCurrentPageIndex(0); }} className="px-5 py-2 bg-slate-900 border border-slate-800 hover:text-red-400 text-xs font-semibold rounded-xl transition cursor-pointer">Close</button>
          <button
            type="button"
            disabled={currentPageIndex === bookSpreads.length - 1}
            onClick={handleNextPage}
            className="p-3 bg-slate-900 border border-slate-800 rounded-full hover:border-violet-500 hover:text-violet-400 disabled:opacity-30 cursor-pointer text-white"
          >
            <ChevronRightIcon />
          </button>
        </div>
      )}
    </div>
  );
}

export default BookReader;