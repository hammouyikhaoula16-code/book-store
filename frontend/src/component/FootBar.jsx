import React from 'react';
import InstagramIcon from '@mui/icons-material/Instagram';
import RedditIcon from '@mui/icons-material/Reddit';
import PhoneIcon from '@mui/icons-material/Phone';
import EmailIcon from '@mui/icons-material/Email';

function FootBar() {
  return (
    <footer className="w-full bg-white dark:bg-slate-950 text-slate-600 dark:text-slate-400 border-t border-slate-200 dark:border-slate-900 px-6 py-4 transition-colors duration-300">
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">


        <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs">
          <span className="font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-wider">Contact:</span>

          <a href="tel:XXXXXXXX" className="flex items-center space-x-1 text-slate-700 dark:text-slate-300 hover:text-violet-600 dark:hover:text-violet-400 transition-colors">
            <PhoneIcon sx={{ fontSize: 16 }} />
            <span>XXXXXXXX</span>
          </a>

          <a href="mailto:XXXXX@mail.com" className="flex items-center space-x-1 text-slate-700 dark:text-slate-300 hover:text-violet-600 dark:hover:text-violet-400 transition-colors">
            <EmailIcon sx={{ fontSize: 16 }} />
            <span>XXXXX@mail.com</span>
          </a>


          <div className="flex items-center space-x-3 pl-2 border-l border-slate-200 dark:border-slate-800">
            <a href="#" aria-label="Instagram" className="hover:text-pink-500 transition-colors text-slate-500 dark:text-slate-400">
              <InstagramIcon sx={{ fontSize: 18 }} />
            </a>
            <a href="#" aria-label="Reddit" className="hover:text-orange-500 transition-colors text-slate-500 dark:text-slate-400">
              <RedditIcon sx={{ fontSize: 18 }} />
            </a>
          </div>
        </div>


        <div className="flex items-center space-x-3 text-xs">
          <span className="text-slate-400 dark:text-slate-500 italic hidden md:inline">Come visit our store:</span>

          <div className="relative h-8 w-24 overflow-hidden rounded-lg border border-slate-200 dark:border-slate-800 shadow-sm dark:shadow-none group cursor-pointer">
            <img
              src="https://maps.geoapify.com/v1/staticmap?style=osm-bright&width=600&height=400&center=lonlat:-122.304378,47.526022&zoom=14&apiKey=d5b35acebe894d50b007203ffa84569e"
              alt="Store Map"
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
            />
          </div>
        </div>

      </div>
    </footer>
  );
}

export default FootBar;