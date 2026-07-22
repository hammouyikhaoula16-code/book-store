import React from 'react';
import PersonIcon from '@mui/icons-material/Person';
import PaymentIcon from '@mui/icons-material/Payment';
import ReportProblemIcon from '@mui/icons-material/ReportProblem';
import LogoutIcon from '@mui/icons-material/Logout';
import { useNavigate } from 'react-router-dom';

function SettingsBar({ onClose, onLogout }) {
  const navigate = useNavigate();

  const handleNavigate = (tab) => {
    if (typeof onClose === 'function') {
      onClose();
    }
    navigate('/settings', { state: { tab } });
  };

  const handleLogout = () => {
    if (typeof onLogout === 'function') {
      onLogout();
    }

    if (typeof onClose === 'function') {
      onClose();
    }

    navigate('/');
  };

  return (
    <div className="w-64 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800/80 rounded-2xl p-2 shadow-xl dark:shadow-2xl backdrop-blur-xl text-slate-800 dark:text-slate-200 transition-colors duration-300">

      <div className="px-4 py-2.5 text-xs font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-wider border-b border-slate-100 dark:border-slate-800/60 mb-1">
        Account Settings
      </div>

      <div className="space-y-0.5">
        <button
          type="button"
          onClick={() => handleNavigate('personal')}
          className="w-full flex items-center space-x-3 px-3 py-2.5 text-sm font-medium rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800/60 text-slate-700 dark:text-slate-300 hover:text-violet-600 dark:hover:text-violet-400 transition cursor-pointer text-left"
        >
          <PersonIcon sx={{ fontSize: 18 }} className="text-slate-400 dark:text-slate-500" />
          <span>Edit Personal Info</span>
        </button>

        <button
          type="button"
          onClick={() => handleNavigate('payment')}
          className="w-full flex items-center space-x-3 px-3 py-2.5 text-sm font-medium rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800/60 text-slate-700 dark:text-slate-300 hover:text-violet-600 dark:hover:text-violet-400 transition cursor-pointer text-left"
        >
          <PaymentIcon sx={{ fontSize: 18 }} className="text-slate-400 dark:text-slate-500" />
          <span>Edit Payment Info</span>
        </button>

        <button
          type="button"
          onClick={() => handleNavigate('report')}
          className="w-full flex items-center space-x-3 px-3 py-2.5 text-sm font-medium rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800/60 text-slate-700 dark:text-slate-300 hover:text-violet-600 dark:hover:text-violet-400 transition cursor-pointer text-left"
        >
          <ReportProblemIcon sx={{ fontSize: 18 }} className="text-slate-400 dark:text-slate-500" />
          <span>Report a Problem</span>
        </button>

        <hr className="border-slate-100 dark:border-slate-800/60 my-1" />

        <button
          type="button"
          onClick={handleLogout}
          className="w-full flex items-center space-x-3 px-3 py-2.5 text-sm font-medium rounded-xl text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-500/10 transition cursor-pointer text-left"
        >
          <LogoutIcon sx={{ fontSize: 18 }} />
          <span>Log Out</span>
        </button>
      </div>

    </div>
  );
}

export default SettingsBar;