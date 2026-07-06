import React, { useState } from 'react';
import LeftBar from '../component/LeftBar';
import PersonIcon from '@mui/icons-material/Person';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import EmailIcon from '@mui/icons-material/Email';
import EditIcon from '@mui/icons-material/Edit';

function PersonalInfo() {
  const [activeTab, setActiveTab] = useState('personal');

  const renderFields = () => {
    switch (activeTab) {
      case 'personal':
        return (
          <>
            <div className="border-b border-slate-200 dark:border-slate-800 pb-4 mb-6">
              <h2 className="text-xl font-bold tracking-tight text-slate-900 dark:text-slate-100">Personal Information</h2>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">View and update your personal account details.</p>
            </div>
            <div className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">First Name</label>
                  <div className="relative">
                    <PersonIcon className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 dark:text-slate-500" sx={{ fontSize: 18 }} />
                    <input type="text" placeholder="John" className="w-full pl-12 pr-4 py-3 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800/60 focus:border-violet-500 rounded-2xl text-sm text-slate-800 dark:text-white focus:outline-none transition-all placeholder-slate-400 dark:placeholder-slate-600" />
                  </div>
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">Last Name</label>
                  <div className="relative">
                    <PersonIcon className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 dark:text-slate-500" sx={{ fontSize: 18 }} />
                    <input type="text" placeholder="Doe" className="w-full pl-12 pr-4 py-3 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800/60 focus:border-violet-500 rounded-2xl text-sm text-slate-800 dark:text-white focus:outline-none transition-all placeholder-slate-400 dark:placeholder-slate-600" />
                  </div>
                </div>
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">Date of Birth</label>
                <div className="relative">
                  <CalendarMonthIcon className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 dark:text-slate-600" sx={{ fontSize: 18 }} />
                  <input type="date" disabled className="w-full pl-12 pr-4 py-3 bg-slate-100 dark:bg-slate-950/50 border border-slate-200 dark:border-slate-900 rounded-2xl text-sm text-slate-400 dark:text-slate-500 cursor-not-allowed opacity-70 dark:scheme-dark" />
                </div>
              </div>
              <div className="flex justify-end pt-2">
                <button type="submit" className="flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 active:scale-[0.98] transition-all text-sm font-semibold rounded-2xl text-white shadow-md dark:shadow-lg cursor-pointer">
                  <EditIcon sx={{ fontSize: 16 }} />
                  <span>Change Info</span>
                </button>
              </div>
            </div>
          </>
        );

      case 'email':
        return (
          <>
            <div className="border-b border-slate-200 dark:border-slate-800 pb-4 mb-6">
              <h2 className="text-xl font-bold tracking-tight text-slate-900 dark:text-slate-100">Change Email Address</h2>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Update your primary communication email address.</p>
            </div>
            <div className="space-y-4">
              <p className="text-xs text-slate-500 dark:text-slate-400">Current Email: <span className="font-medium text-slate-800 dark:text-slate-200">xxx@xxx.xx</span></p>
              <div className="relative">
                <EmailIcon className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 dark:text-slate-500" sx={{ fontSize: 18 }} />
                <input type="email" placeholder="New Email Address" className="w-full pl-12 pr-4 py-3 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800/60 focus:border-violet-500 rounded-2xl text-sm text-slate-800 dark:text-white focus:outline-none transition-all placeholder-slate-400 dark:placeholder-slate-600" />
              </div>
              <button className="px-6 py-3 bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 active:scale-[0.98] transition-all text-sm font-semibold rounded-2xl text-white shadow-md cursor-pointer">Update Email</button>
            </div>
          </>
        );

      case 'password':
        return (
          <>
            <div className="border-b border-slate-200 dark:border-slate-800 pb-4 mb-6">
              <h2 className="text-xl font-bold tracking-tight text-slate-900 dark:text-slate-100">Update Password</h2>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Ensure your library account is using a secure password.</p>
            </div>
            <div className="space-y-4">
              <input type="password" placeholder="Current Password" className="w-full p-3 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl text-sm text-slate-800 dark:text-white focus:outline-none focus:border-violet-500 transition-all placeholder-slate-400 dark:placeholder-slate-600" />
              <input type="password" placeholder="New Password" className="w-full p-3 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl text-sm text-slate-800 dark:text-white focus:outline-none focus:border-violet-500 transition-all placeholder-slate-400 dark:placeholder-slate-600" />
              <button className="px-6 py-3 bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 active:scale-[0.98] transition-all text-sm font-semibold rounded-2xl text-white shadow-md cursor-pointer">Change Password</button>
            </div>
          </>
        );

      case 'payment':
        return (
          <div className="text-center py-12">
            <h2 className="text-xl font-bold text-slate-800 dark:text-slate-200 mb-2">Saved Payment Methods</h2>
            <p className="text-sm text-slate-400 dark:text-slate-500">No payment cards linked to this account yet.</p>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-6 sm:p-12 flex flex-col md:flex-row gap-8 text-slate-800 dark:text-white transition-colors duration-300">
      
      <div className="flex-shrink-0">
        <LeftBar 
          activeTab={activeTab} 
          onTabChange={setActiveTab} 
          onLogout={() => alert("Logging out...")} 
        />
      </div>

      <form 
        onSubmit={(e) => e.preventDefault()} 
        className="grow bg-white/70 dark:bg-slate-900/40 backdrop-blur-md border border-slate-200 dark:border-slate-800/80 rounded-3xl p-6 sm:p-8 shadow-sm dark:shadow-xl min-h-[400px] transition-all duration-300"
      >
        {renderFields()}
      </form>

    </div>
  );
}

export default PersonalInfo;