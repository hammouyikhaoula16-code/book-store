import React, { useState } from 'react';
import LockIcon from '@mui/icons-material/Lock';
import EmailIcon from '@mui/icons-material/Email';
import KeyIcon from '@mui/icons-material/Key';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { Link, useNavigate } from 'react-router-dom';
import api from '../api';

function RecoverPassword() {
  const navigate = useNavigate();

  const [step, setStep] = useState('request');

  const [email, setEmail] = useState('');
  const [code, setCode] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSendCode = async (e) => {
    e.preventDefault();
    setError('');

    const trimmedEmail = email.trim().toLowerCase();
    if (!trimmedEmail) {
      setError('Please enter your email address.');
      return;
    }

    setLoading(true);

    try {
      await api.post('/auth/forgot-password/send-code', { 
        email: trimmedEmail 
      });

      setStep('reset');
    } catch (err) {
      setError(
        err.response?.data?.error || 
        err.response?.data?.message || 
        'No account associated with this email address or failed to send email.'
      );
    } finally {
      setLoading(false);
    }
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();
    setError('');

    if (!code.trim() || !newPassword || !confirmPassword) {
      setError('Please fill in all required fields.');
      return;
    }

    if (newPassword !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    if (newPassword.length < 8) {
      setError('Password must be at least 8 characters long.');
      return;
    }

    setLoading(true);

    try {
      await api.post('/auth/forgot-password/reset', {
        email: email.trim().toLowerCase(),
        code: code.trim(),
        newPassword,
      });
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      setStep('success');
    } catch (err) {
      setError(
        err.response?.data?.error || 
        err.response?.data?.message || 
        'Invalid or expired verification code.'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex items-center justify-center p-4 transition-colors duration-300">
      <div className="w-full max-w-md bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800/80 rounded-3xl p-6 sm:p-8 shadow-xl dark:shadow-2xl backdrop-blur-xl text-slate-800 dark:text-slate-200">
        
        <Link
          to="/login"
          className="inline-flex items-center space-x-2 text-xs font-semibold text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors mb-6"
        >
          <ArrowBackIcon sx={{ fontSize: 16 }} />
          <span>Back to Login</span>
        </Link>

        <div className="mb-6">
          <div className="w-12 h-12 rounded-2xl bg-violet-600/10 dark:bg-violet-600/20 text-violet-600 dark:text-violet-400 flex items-center justify-center mb-4">
            {step === 'request' && <EmailIcon />}
            {step === 'reset' && <KeyIcon />}
            {step === 'success' && <CheckCircleIcon className="text-emerald-500" />}
          </div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white">
            {step === 'request' && 'Recover Password'}
            {step === 'reset' && 'Reset Your Password'}
            {step === 'success' && 'Password Updated'}
          </h1>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
            {step === 'request' && "Enter your email address. We'll verify your account and send a 6-digit recovery code."}
            {step === 'reset' && `We sent a verification code to ${email}. Enter it below along with your new password.`}
            {step === 'success' && 'Your password has been changed successfully. You can now log in.'}
          </p>
        </div>

        {error && (
          <div className="mb-4 p-3 rounded-xl text-xs font-medium bg-red-50 dark:bg-red-500/10 text-red-600 dark:text-red-400 border border-red-200 dark:border-red-500/20">
            {error}
          </div>
        )}

        {step === 'request' && (
          <form onSubmit={handleSendCode} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-2">
                Email Address
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                  <EmailIcon sx={{ fontSize: 18 }} />
                </div>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if (error) setError('');
                  }}
                  placeholder="name@company.com"
                  className="w-full pl-10 pr-4 py-2.5 bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700/60 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-violet-500/50 focus:border-violet-500 text-slate-800 dark:text-slate-200 transition-all"
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 px-4 bg-violet-600 hover:bg-violet-700 text-white font-medium text-sm rounded-xl shadow-lg shadow-violet-600/20 transition-all cursor-pointer disabled:opacity-50"
            >
              {loading ? 'Sending Code...' : 'Send Recovery Code'}
            </button>
          </form>
        )}
        {step === 'reset' && (
          <form onSubmit={handleResetPassword} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-2">
                Verification Code
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                  <KeyIcon sx={{ fontSize: 18 }} />
                </div>
                <input
                  type="text"
                  value={code}
                  onChange={(e) => {
                    setCode(e.target.value);
                    if (error) setError('');
                  }}
                  placeholder="Enter 6-digit code"
                  className="w-full pl-10 pr-4 py-2.5 bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700/60 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-violet-500/50 focus:border-violet-500 text-slate-800 dark:text-slate-200 transition-all"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-2">
                New Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                  <LockIcon sx={{ fontSize: 18 }} />
                </div>
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-10 pr-10 py-2.5 bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700/60 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-violet-500/50 focus:border-violet-500 text-slate-800 dark:text-slate-200 transition-all"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
                >
                  {showPassword ? <VisibilityOffIcon sx={{ fontSize: 18 }} /> : <VisibilityIcon sx={{ fontSize: 18 }} />}
                </button>
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-2">
                Confirm New Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                  <LockIcon sx={{ fontSize: 18 }} />
                </div>
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-10 pr-4 py-2.5 bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700/60 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-violet-500/50 focus:border-violet-500 text-slate-800 dark:text-slate-200 transition-all"
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 px-4 bg-violet-600 hover:bg-violet-700 text-white font-medium text-sm rounded-xl shadow-lg shadow-violet-600/20 transition-all cursor-pointer disabled:opacity-50"
            >
              {loading ? 'Resetting Password...' : 'Reset Password'}
            </button>
          </form>
        )}

        {step === 'success' && (
          <div className="space-y-4">
            <button
              type="button"
              onClick={() => navigate('/login')}
              className="w-full py-3 px-4 bg-violet-600 hover:bg-violet-700 text-white font-medium text-sm rounded-xl shadow-lg shadow-violet-600/20 transition-all cursor-pointer"
            >
              Proceed to Login
            </button>
          </div>
        )}

      </div>
    </div>
  );
}

export default RecoverPassword;