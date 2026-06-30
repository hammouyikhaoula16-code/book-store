import React from 'react';
import PersonIcon from '@mui/icons-material/Person';
import PaymentIcon from '@mui/icons-material/Payment';
import ReportProblemIcon from '@mui/icons-material/ReportProblem';
import LogoutIcon from '@mui/icons-material/Logout';
import { Link } from 'react-router-dom';


function SettingsBar({ onClose, onLogout }) {
  
  const handleAction = (callback) => {
    callback();
    onClose();
  };

  return (
    <div className="w-64 bg-slate-900 border border-slate-800/80 rounded-2xl p-2 shadow-2xl backdrop-blur-xl text-slate-200">
     
      <div className="px-4 py-2.5 text-xs font-semibold text-slate-500 uppercase tracking-wider border-b border-slate-800/60 mb-1">
        Account Settings
      </div>

      
      <div className="space-y-0.5">
     <Link to="/settings" onClick={onClose} className="block w-full">
          <button 
            type="button"
            className="w-full flex items-center space-x-3 px-3 py-2.5 text-sm font-medium rounded-xl hover:bg-slate-800/60 hover:text-violet-400 transition cursor-pointer text-left"
          >
            <PersonIcon sx={{ fontSize: 18 }} className="text-slate-500" />
            <span>Edit Personal Info</span>
          </button>
        </Link>

        <Link to="/settings" onClick={onClose} className="block w-full">
          <button 
            type="button"
            className="w-full flex items-center space-x-3 px-3 py-2.5 text-sm font-medium rounded-xl hover:bg-slate-800/60 hover:text-violet-400 transition cursor-pointer text-left"
          >
            <PaymentIcon sx={{ fontSize: 18 }} className="text-slate-500" />
            <span>Edit Payment Info</span>
          </button>
        </Link>

        
        <Link to="/settings" onClick={onClose} className="block w-full">
          <button 
            type="button"
            className="w-full flex items-center space-x-3 px-3 py-2.5 text-sm font-medium rounded-xl hover:bg-slate-800/60 hover:text-violet-400 transition cursor-pointer text-left"
          >
            <ReportProblemIcon sx={{ fontSize: 18 }} className="text-slate-500" />
            <span>Report a Problem</span>
          </button>
        </Link>

        <hr className="border-slate-800/60 my-1" />

        <button 
          onClick={() => handleAction(onLogout)}
          className="w-full flex items-center space-x-3 px-3 py-2.5 text-sm font-medium rounded-xl hover:bg-red-500/10 text-red-400 transition cursor-pointer text-left"
        >
          <LogoutIcon sx={{ fontSize: 18 }} />
          <span>Log Out</span>
        </button>
      </div>

    </div>
  );
}

export default SettingsBar;