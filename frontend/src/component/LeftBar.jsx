import React from 'react';
import PersonIcon from '@mui/icons-material/Person';
import EmailIcon from '@mui/icons-material/Email';
import LockIcon from '@mui/icons-material/Lock';
import PaymentIcon from '@mui/icons-material/Payment';
import LogoutIcon from '@mui/icons-material/Logout';

function LeftBar({ activeTab, onTabChange, onLogout }) {
  
  const menuItems = [
    { id: 'personal', label: 'Edit Personal Info', icon: <PersonIcon sx={{ fontSize: 18 }} /> },
    { id: 'email', label: 'Edit Email', icon: <EmailIcon sx={{ fontSize: 18 }} /> },
    { id: 'password', label: 'Edit Password', icon: <LockIcon sx={{ fontSize: 18 }} /> },
    { id: 'payment', label: 'Edit Payment Info', icon: <PaymentIcon sx={{ fontSize: 18 }} /> },
  ];

  return (
    <div className="w-full md:w-64 bg-slate-900/60 backdrop-blur border border-slate-800/80 rounded-3xl p-4 flex flex-col justify-between h-fit md:min-h-[500px] text-white shadow-xl">
      
     
      <div className="space-y-1.5">
        <div className="px-3 py-2 text-xs font-semibold text-slate-500 uppercase tracking-wider border-b border-slate-800/60 mb-3">
          Settings Menu
        </div>
        
        {menuItems.map((item) => {
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => onTabChange(item.id)}
              className={`w-full flex items-center space-x-3 px-4 py-3 text-sm font-medium rounded-2xl transition-all cursor-pointer border text-left ${
                isActive
                  ? 'bg-gradient-to-r from-violet-600/20 to-indigo-600/20 text-violet-400 border-violet-500/40 shadow-inner'
                  : 'bg-transparent text-slate-400 border-transparent hover:bg-slate-800/50 hover:text-slate-200'
              }`}
            >
              <div className={isActive ? 'text-violet-400' : 'text-slate-500 group-hover:text-slate-400'}>
                {item.icon}
              </div>
              <span>{item.label}</span>
            </button>
          );
        })}
      </div>

     
      <div className="pt-4 mt-4 border-t border-slate-800/60">
        <button
          onClick={onLogout}
          className="w-full flex items-center space-x-3 px-4 py-3 text-sm font-medium rounded-2xl text-red-400 bg-transparent hover:bg-red-500/10 transition-all border border-transparent cursor-pointer text-left"
        >
          <LogoutIcon sx={{ fontSize: 18 }} />
          <span>Log Out</span>
        </button>
      </div>

    </div>
  );
}

export default LeftBar;