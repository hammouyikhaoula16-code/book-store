import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import EmailIcon from '@mui/icons-material/Email';
import LockIcon from '@mui/icons-material/Lock';
import PersonIcon from '@mui/icons-material/Person';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import KeyIcon from '@mui/icons-material/Key';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function CreateAcc() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    dob: '',
    email: '',
    password: '',
  });
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  
  const [showVerification, setShowVerification] = useState(false);
  const [verificationCode, setVerificationCode] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (formData.password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    setLoading(true);
    try {
      await axios.post('http://localhost:5000/api/auth/register/send-code', {
        email: formData.email
      });
      
      setShowVerification(true);
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to dispatch verification email. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyAndRegister = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await axios.post('http://localhost:5000/api/auth/register', {
        first_name: formData.firstName,
        last_name: formData.lastName,
        dob: formData.dob,
        email: formData.email,
        password: formData.password,
        code: verificationCode 
      });

      navigate('/login');
    } catch (err) {
      setError(err.response?.data?.error || 'Invalid or expired verification code.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[calc(100vh-64px)] w-full flex flex-col md:flex-row bg-white dark:bg-slate-950 text-slate-800 dark:text-white transition-colors duration-300">

      <div
        className="w-full md:w-1/2 flex flex-col justify-between p-8 md:p-12 bg-cover bg-center relative min-h-[300px] md:min-h-0"
        style={{
          backgroundImage: `linear-gradient(to bottom, rgba(15, 23, 42, 0.3), rgba(15, 23, 42, 0.85)), url("https://images.unsplash.com/photo-1507842217343-583bb7270b66?q=80&w=1200&auto=format&fit=crop")`
        }}
      >
        <div className="flex items-center space-x-2">
          <span className="text-xl font-extrabold tracking-wider bg-gradient-to-r from-violet-400 to-indigo-400 bg-clip-text text-transparent">
            BOOKS
          </span>
        </div>

        <div className="space-y-3 z-10 text-white">
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight leading-tight">
            Welcome!
          </h1>
          <p className="text-sm text-slate-300 max-w-sm">
            Create an account to be a part of our community to read and download all your favorite books.
          </p>
        </div>
      </div>

      <div className="w-full md:w-1/2 flex items-center justify-center p-8 sm:p-12 bg-white dark:bg-slate-950 transition-colors duration-300">
        <div className="w-full max-w-md space-y-6">

          <div className="space-y-1">
            <h2 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
              {showVerification ? 'Verify your email' : 'Register'}
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              {showVerification 
                ? `We sent a 6-digit code to ${formData.email}` 
                : 'Please enter your information below to get started.'}
            </p>
          </div>

          {error && (
            <div className="p-3 text-xs font-semibold text-red-600 bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-900/50 rounded-xl">
              {error}
            </div>
          )}

          {!showVerification ? (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">First Name</label>
                  <div className="relative">
                    <PersonIcon className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 dark:text-slate-500" sx={{ fontSize: 18 }} />
                    <input
                      type="text"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleChange}
                      placeholder="First Name"
                      className="w-full pl-12 pr-4 py-3 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 focus:border-violet-500 focus:ring-1 focus:ring-violet-500 rounded-2xl text-sm text-slate-800 dark:text-white focus:outline-none transition-all placeholder-slate-400 dark:placeholder-slate-600"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">Last Name</label>
                  <div className="relative">
                    <PersonIcon className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 dark:text-slate-500" sx={{ fontSize: 18 }} />
                    <input
                      type="text"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleChange}
                      placeholder="Last Name"
                      className="w-full pl-12 pr-4 py-3 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 focus:border-violet-500 focus:ring-1 focus:ring-violet-500 rounded-2xl text-sm text-slate-800 dark:text-white focus:outline-none transition-all placeholder-slate-400 dark:placeholder-slate-600"
                      required
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">Date of Birth</label>
                <div className="relative">
                  <CalendarMonthIcon className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 dark:text-slate-500 z-10" sx={{ fontSize: 18 }} />
                  <input
                    type="date"
                    name="dob"
                    value={formData.dob}
                    onChange={handleChange}
                    className="w-full pl-12 pr-4 py-3 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 focus:border-violet-500 focus:ring-1 focus:ring-violet-500 rounded-2xl text-sm text-slate-800 dark:text-white focus:outline-none transition-all dark:scheme-dark cursor-pointer placeholder-slate-400 dark:placeholder-slate-600"
                    required
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">Email Address</label>
                <div className="relative">
                  <EmailIcon className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 dark:text-slate-500" sx={{ fontSize: 18 }} />
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="name@example.com"
                    className="w-full pl-12 pr-4 py-3 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 focus:border-violet-500 focus:ring-1 focus:ring-violet-500 rounded-2xl text-sm text-slate-800 dark:text-white focus:outline-none transition-all placeholder-slate-400 dark:placeholder-slate-600"
                    required
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">Password</label>
                <div className="relative">
                  <LockIcon className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 dark:text-slate-500" sx={{ fontSize: 18 }} />
                  <input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="••••••••"
                    className="w-full pl-12 pr-4 py-3 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 focus:border-violet-500 focus:ring-1 focus:ring-violet-500 rounded-2xl text-sm text-slate-800 dark:text-white focus:outline-none transition-all placeholder-slate-400 dark:placeholder-slate-600"
                    required
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">Confirm Password</label>
                <div className="relative">
                  <LockIcon className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 dark:text-slate-500" sx={{ fontSize: 18 }} />
                  <input
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full pl-12 pr-4 py-3 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 focus:border-violet-500 focus:ring-1 focus:ring-violet-500 rounded-2xl text-sm text-slate-800 dark:text-white focus:outline-none transition-all placeholder-slate-400 dark:placeholder-slate-600"
                    required
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 mt-4 bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 text-sm font-semibold rounded-2xl shadow-md dark:shadow-lg active:scale-[0.99] transition-all cursor-pointer text-white disabled:opacity-50"
              >
                {loading ? 'Sending Code...' : 'Sign Up'}
              </button>
            </form>
          ) : (
            <form onSubmit={handleVerifyAndRegister} className="space-y-6 text-center py-4">
              <div className="w-12 h-12 bg-violet-100 dark:bg-violet-950/50 text-violet-600 dark:text-violet-400 rounded-full flex items-center justify-center mx-auto shadow-sm">
                <KeyIcon sx={{ fontSize: 24 }} />
              </div>
              
              <div className="space-y-2">
                <input
                  type="text"
                  maxLength={6}
                  placeholder="000000"
                  value={verificationCode}
                  onChange={(e) => setVerificationCode(e.target.value.replace(/\D/g, ''))}
                  className="w-full text-center tracking-[12px] text-xl font-bold py-3 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl focus:outline-none focus:border-violet-500 text-slate-800 dark:text-white focus:ring-1 focus:ring-violet-500"
                  required
                />
              </div>

              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={() => setShowVerification(false)}
                  className="flex-1 py-3 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 rounded-2xl text-xs font-bold transition cursor-pointer"
                >
                  Back
                </button>
                <button
                  type="submit"
                  disabled={verificationCode.length !== 6 || loading}
                  className="flex-1 py-3 bg-gradient-to-r from-violet-600 to-indigo-600 text-white rounded-2xl text-xs font-bold shadow-md disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
                >
                  {loading ? 'Verifying...' : 'Complete Registration'}
                </button>
              </div>
            </form>
          )}

          <p className="text-center text-sm text-slate-500 dark:text-slate-400 pt-2">
            Already have an account?{' '}
            <Link to="/login" className="font-semibold text-violet-600 dark:text-violet-400 hover:text-violet-500 dark:hover:text-violet-300 transition-colors">
              Sign In here
            </Link>
          </p>

        </div>
      </div>

    </div>
  );
}

export default CreateAcc;