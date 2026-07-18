import React, { useState, useEffect } from 'react';
import LeftBar from '../component/LeftBar';
import { useAuth } from '../context/AuthContext';
import api from '../api'; 
import PersonIcon from '@mui/icons-material/Person';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import EmailIcon from '@mui/icons-material/Email';
import EditIcon from '@mui/icons-material/Edit';

function PersonalInfo() {
  const { logout, user, login } = useAuth(); 
  const [activeTab, setActiveTab] = useState('personal');
  
  
  const [personalForm, setPersonalForm] = useState({ firstName: '', lastName: '', dob: '' });
  const [emailForm, setEmailForm] = useState({ email: '' });
  const [passwordForm, setPasswordForm] = useState({ currentPassword: '', newPassword: '' });
  
  
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ text: '', isError: false });

  
  useEffect(() => {
    if (user) {
      setPersonalForm({
        firstName: user.firstName || '',
        lastName: user.lastName || '',
        dob: user.dob ? user.dob.split('T')[0] : '' 
      });
      setEmailForm({ email: user.email || '' });
    }
  }, [user]);

 
  const triggerNotification = (text, isError = false) => {
    setMessage({ text, isError });
    setTimeout(() => setMessage({ text: '', isError: false }), 4000);
  };

  
  const handleUpdatePersonal = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      
      const response = await api.put('/auth/profile', {
        firstName: personalForm.firstName,
        lastName: personalForm.lastName
      });
      
      if (login && response.data.user) {
        login(response.data.token || localStorage.getItem('token'), response.data.user);
      }
      triggerNotification('Personal info updated successfully!');
    } catch (err) {
      console.error(err);
      triggerNotification(err.response?.data?.error || 'Failed updating personal data.', true);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateEmail = async (e) => {
    e.preventDefault();
    if (!emailForm.email) return;
    setLoading(true);
    try {
      
      const response = await api.put('/auth/email', { email: emailForm.email });
      if (login && response.data.user) {
        login(response.data.token || localStorage.getItem('token'), response.data.user);
      }
      triggerNotification('Email address changed successfully!');
    } catch (err) {
      console.error(err);
      triggerNotification(err.response?.data?.message || err.response?.data?.error || 'Failed updating email address.', true);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdatePassword = async (e) => {
    e.preventDefault();
    if (!passwordForm.currentPassword || !passwordForm.newPassword) {
      triggerNotification('Please fill in both password fields.', true);
      return;
    }
    setLoading(true);
    try {
     
      await api.put('/auth/password', {
        currentPassword: passwordForm.currentPassword,
        newPassword: passwordForm.newPassword
      });
      setPasswordForm({ currentPassword: '', newPassword: '' });
      triggerNotification('Password updated successfully!');
    } catch (err) {
      console.error(err);
      triggerNotification(err.response?.data?.message || 'Incorrect existing credentials entry.', true);
    } finally {
      setLoading(false);
    }
  };

  const renderFields = () => {
    switch (activeTab) {
      case 'personal':
        return (
          <div className="space-y-6">
            <div className="border-b border-slate-200 dark:border-slate-800 pb-4">
              <h2 className="text-xl font-bold tracking-tight text-slate-900 dark:text-slate-100">Personal Information</h2>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">View and update your personal account details.</p>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">First Name</label>
                <div className="relative">
                  <PersonIcon className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 dark:text-slate-500" sx={{ fontSize: 18 }} />
                  <input 
                    type="text" 
                    placeholder="First Name" 
                    value={personalForm.firstName}
                    onChange={(e) => setPersonalForm({ ...personalForm, firstName: e.target.value })}
                    className="w-full pl-12 pr-4 py-3 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800/60 focus:border-violet-500 rounded-2xl text-sm text-slate-800 dark:text-white focus:outline-none transition-all placeholder-slate-400 dark:placeholder-slate-600" 
                  />
                </div>
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">Last Name</label>
                <div className="relative">
                  <PersonIcon className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 dark:text-slate-500" sx={{ fontSize: 18 }} />
                  <input 
                    type="text" 
                    placeholder="Last Name" 
                    value={personalForm.lastName}
                    onChange={(e) => setPersonalForm({ ...personalForm, lastName: e.target.value })}
                    className="w-full pl-12 pr-4 py-3 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800/60 focus:border-violet-500 rounded-2xl text-sm text-slate-800 dark:text-white focus:outline-none transition-all placeholder-slate-400 dark:placeholder-slate-600" 
                  />
                </div>
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">Date of Birth</label>
              <div className="relative">
                <CalendarMonthIcon className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 dark:text-slate-600" sx={{ fontSize: 18 }} />
                <input 
                  type="date" 
                  disabled 
                  value={personalForm.dob}
                  className="w-full pl-12 pr-4 py-3 bg-slate-100 dark:bg-slate-950/50 border border-slate-200 dark:border-slate-900 rounded-2xl text-sm text-slate-400 dark:text-slate-500 cursor-not-allowed opacity-70 dark:scheme-dark" 
                />
              </div>
            </div>

            <div className="flex justify-end pt-2">
              <button 
                type="button" 
                onClick={handleUpdatePersonal}
                disabled={loading}
                className="flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 active:scale-[0.98] transition-all text-sm font-semibold rounded-2xl text-white shadow-md dark:shadow-lg disabled:opacity-50 cursor-pointer"
              >
                <EditIcon sx={{ fontSize: 16 }} />
                <span>{loading ? 'Saving...' : 'Change Info'}</span>
              </button>
            </div>
          </div>
        );

      case 'email':
        return (
          <div className="space-y-4">
            <div className="border-b border-slate-200 dark:border-slate-800 pb-4 mb-2">
              <h2 className="text-xl font-bold tracking-tight text-slate-900 dark:text-slate-100">Change Email Address</h2>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Update your primary communication email address.</p>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Current Email: <span className="font-medium text-slate-800 dark:text-slate-200">{user?.email || 'N/A'}</span>
            </p>
            <div className="relative">
              <EmailIcon className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 dark:text-slate-500" sx={{ fontSize: 18 }} />
              <input 
                type="email" 
                placeholder="New Email Address" 
                value={emailForm.email}
                onChange={(e) => setEmailForm({ email: e.target.value })}
                className="w-full pl-12 pr-4 py-3 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800/60 focus:border-violet-500 rounded-2xl text-sm text-slate-800 dark:text-white focus:outline-none transition-all placeholder-slate-400 dark:placeholder-slate-600" 
              />
            </div>
            <button 
              type="button"
              onClick={handleUpdateEmail}
              disabled={loading}
              className="px-6 py-3 bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 active:scale-[0.98] transition-all text-sm font-semibold rounded-2xl text-white shadow-md disabled:opacity-50 cursor-pointer"
            >
              {loading ? 'Updating...' : 'Update Email'}
            </button>
          </div>
        );

      case 'password':
        return (
          <div className="space-y-4">
            <div className="border-b border-slate-200 dark:border-slate-800 pb-4 mb-2">
              <h2 className="text-xl font-bold tracking-tight text-slate-900 dark:text-slate-100">Update Password</h2>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Ensure your library account is using a secure password.</p>
            </div>
            <input 
              type="password" 
              placeholder="Current Password" 
              value={passwordForm.currentPassword}
              onChange={(e) => setPasswordForm({ ...passwordForm, currentPassword: e.target.value })}
              className="w-full p-3 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl text-sm text-slate-800 dark:text-white focus:outline-none focus:border-violet-500 transition-all placeholder-slate-400 dark:placeholder-slate-600" 
            />
            <input 
              type="password" 
              placeholder="New Password" 
              value={passwordForm.newPassword}
              onChange={(e) => setPasswordForm({ ...passwordForm, newPassword: e.target.value })}
              className="w-full p-3 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl text-sm text-slate-800 dark:text-white focus:outline-none focus:border-violet-500 transition-all placeholder-slate-400 dark:placeholder-slate-600" 
            />
            <button 
              type="button"
              onClick={handleUpdatePassword}
              disabled={loading}
              className="px-6 py-3 bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 active:scale-[0.98] transition-all text-sm font-semibold rounded-2xl text-white shadow-md disabled:opacity-50 cursor-pointer"
            >
              {loading ? 'Changing...' : 'Change Password'}
            </button>
          </div>
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
          onTabChange={(tab) => {
            setActiveTab(tab);
            setMessage({ text: '', isError: false }); 
          }}
          onLogout={logout}
        />
      </div>

      <form
        onSubmit={(e) => e.preventDefault()}
        className="grow bg-white/70 dark:bg-slate-900/40 backdrop-blur-md border border-slate-200 dark:border-slate-800/80 rounded-3xl p-6 sm:p-8 shadow-sm dark:shadow-xl min-h-[400px] transition-all duration-300 relative"
      >
        
        {message.text && (
          <div className={`mb-4 p-3 text-xs font-semibold rounded-xl text-center transition-all ${
            message.isError 
              ? 'bg-red-50 text-red-600 border border-red-200 dark:bg-red-950/20 dark:text-red-400 dark:border-red-900/50' 
              : 'bg-emerald-50 text-emerald-600 border border-emerald-200 dark:bg-emerald-950/20 dark:text-emerald-400 dark:border-emerald-900/50'
          }`}>
            {message.text}
          </div>
        )}

        {renderFields()}
      </form>

    </div>
  );
}

export default PersonalInfo;