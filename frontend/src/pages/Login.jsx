import React from 'react';
import { Link } from 'react-router-dom';
import EmailIcon from '@mui/icons-material/Email';
import LockIcon from '@mui/icons-material/Lock';

function Login({ connected, setConnected }) {
  return (
    <div className="min-h-[calc(100vh-64px)] w-full flex flex-col md:flex-row bg-slate-950 text-white">


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

        <div className="space-y-3 z-10">
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight leading-tight">
            Welcome back!
          </h1>
          <p className="text-sm text-slate-300 max-w-sm">
            Log in to access your customized reading lists, saved bookmarks, and historical collection dashboard.
          </p>
        </div>
      </div>


      <div className="w-full md:w-1/2 flex items-center justify-center p-8 sm:p-12 bg-slate-950">
        <div className="w-full max-w-md space-y-8">

          <div className="space-y-2">
            <h2 className="text-2xl font-bold tracking-tight">Sign In</h2>
            <p className="text-xs text-slate-400">Please enter your account details below.</p>
          </div>

          <form onSubmit={(e) => e.preventDefault()} className="space-y-5">

            <div className="space-y-1.5">
              <label className="text-xs font-semibold uppercase tracking-wider text-slate-400">Email Address</label>
              <div className="relative">
                <EmailIcon className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" sx={{ fontSize: 18 }} />
                <input
                  type="email"
                  placeholder="name@xxxxx.xxx"
                  className="w-full pl-12 pr-4 py-3 bg-slate-900 border border-slate-800 focus:border-violet-500 focus:ring-1 focus:ring-violet-500 rounded-2xl text-sm text-white focus:outline-none transition-all placeholder-slate-600"
                />
              </div>
            </div>


            <div className="space-y-1.5">
              <div className="flex justify-between items-center">
                <label className="text-xs font-semibold uppercase tracking-wider text-slate-400">Password</label>
                <a href="#" className="text-xs font-medium text-violet-400 hover:text-violet-300 transition-colors">
                  Forgot password?
                </a>
              </div>
              <div className="relative">
                <LockIcon className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" sx={{ fontSize: 18 }} />
                <input
                  type="password"
                  placeholder="••••••••"
                  className="w-full pl-12 pr-4 py-3 bg-slate-900 border border-slate-800 focus:border-violet-500 focus:ring-1 focus:ring-violet-500 rounded-2xl text-sm text-white focus:outline-none transition-all placeholder-slate-600"
                />
              </div>
            </div>

            <Link to='/'>

              <button
                onClick={() => (setConnected(true))}
                type="submit"
                className="w-full py-3 mt-2 bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 text-sm font-semibold rounded-2xl shadow-lg active:scale-[0.99] transition-all cursor-pointer text-white"
              >
                Sign In
              </button></Link>
          </form>


          <p className="text-center text-sm text-slate-400">
            Don't have an account yet?
            <Link to="/register" className="font-semibold text-violet-400 hover:text-violet-300 transition-colors">
              Please join us
            </Link>
          </p>

        </div>
      </div>

    </div>
  );
}

export default Login;