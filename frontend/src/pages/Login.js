import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await axios.post('http://localhost:8000/api/auth/login/', formData, {
        headers: {
          'Content-Type': 'application/json',
        }
      });

      const data = response.data;
      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data.user));
      navigate('/');
    } catch (err) {
      console.error('Login error:', err);
      
      if (err.response) {
        const errorData = err.response.data;
        setError(errorData.message || Object.values(errorData).flat().join(', '));
      } else if (err.request) {
        setError('No response from server. Please check if Django server is running.');
      } else {
        setError('Network error: ' + err.message);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen relative flex items-center justify-center p-6">
      {/* Background */}
      <div className="fixed inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900"></div>
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1614730321146-b6fa6a46bcb4?w=1920')] bg-cover bg-center opacity-20"></div>
      </div>

      {/* Login Card */}
      <div className="relative z-10 w-full max-w-md">
        <div 
          className="glass rounded-2xl p-8 border-2 shadow-2xl"
          style={{
            borderColor: 'rgba(59, 130, 246, 0.3)',
            boxShadow: '0 20px 60px rgba(0, 0, 0, 0.5), 0 0 40px rgba(59, 130, 246, 0.2)'
          }}
        >
          {/* Header */}
          <div className="text-center mb-8">
            <div className="inline-block mb-4">
              <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-4xl shadow-lg">
                🔐
              </div>
            </div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent mb-2">
              Welcome Back!
            </h1>
            <p className="text-gray-400">Login to access your account</p>
          </div>

          {/* Error Message */}
          {error && (
            <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-3 text-red-400 text-sm mb-6 flex items-center gap-2">
              <span>⚠️</span>
              {error}
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="text-gray-300 text-sm font-semibold mb-2 block flex items-center gap-2">
                <span>👤</span> Username
              </label>
              <input
                type="text"
                name="username"
                value={formData.username}
                onChange={handleChange}
                required
                className="w-full bg-white/10 text-white px-4 py-3 rounded-lg border border-white/20 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400/50 transition-all placeholder-gray-500"
                placeholder="Enter your username"
              />
            </div>

            <div>
              <label className="text-gray-300 text-sm font-semibold mb-2 block flex items-center gap-2">
                <span>🔒</span> Password
              </label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
                minLength={6}
                className="w-full bg-white/10 text-white px-4 py-3 rounded-lg border border-white/20 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400/50 transition-all placeholder-gray-500"
                placeholder="Enter your password"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-blue-500 to-purple-600 px-6 py-4 rounded-lg text-white font-bold text-lg hover:shadow-xl hover:shadow-blue-500/30 hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <span className="animate-spin">⏳</span>
                  Logging in...
                </>
              ) : (
                <>
                  <span>🔓</span>
                  Login
                </>
              )}
            </button>
          </form>

          {/* Footer */}
          <div className="mt-6 text-center space-y-3">
            <div className="flex items-center gap-2 justify-center">
              <div className="h-px bg-white/10 flex-1"></div>
              <span className="text-gray-500 text-sm">OR</span>
              <div className="h-px bg-white/10 flex-1"></div>
            </div>
            
            <Link 
              to="/signup"
              className="block text-blue-400 hover:text-blue-300 font-semibold transition-all"
            >
              Don't have an account? <span className="underline">Sign Up</span>
            </Link>
            
            <Link 
              to="/"
              className="block text-gray-400 hover:text-white text-sm transition-all"
            >
              ← Back to Home
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
