import React, { useState } from 'react';

const AuthModal = ({ isOpen, onClose, mode, onSuccess }) => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    password2: '',
    first_name: '',
    last_name: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [isLogin, setIsLogin] = useState(mode === 'login');

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
      const endpoint = isLogin ? '/api/auth/login/' : '/api/auth/register/';
      const payload = isLogin 
        ? { username: formData.username, password: formData.password }
        : formData;

      const response = await fetch(`http://localhost:8000${endpoint}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload)
      });

      const data = await response.json();

      if (response.ok) {
        // Save token to localStorage
        localStorage.setItem('token', data.token);
        localStorage.setItem('user', JSON.stringify(data.user));
        
        if (onSuccess) {
          onSuccess(data.user);
        }
        onClose();
      } else {
        setError(data.message || Object.values(data).flat().join(', '));
      }
    } catch (err) {
      setError('Network error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[10000] bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
      <div className="glass max-w-md w-full rounded-2xl border-2 border-blue-500/30 overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-500/20 to-purple-500/20 p-6 border-b border-white/10">
          <div className="flex items-center justify-between">
            <h2 className="text-white text-2xl font-bold flex items-center gap-3">
              <span className="text-4xl">{isLogin ? '🔐' : '✨'}</span>
              {isLogin ? 'Welcome Back!' : 'Create Account'}
            </h2>
            <button 
              onClick={onClose}
              className="text-white hover:text-red-400 text-2xl px-3 py-1 hover:bg-red-500/10 rounded-lg transition-all"
            >
              ✕
            </button>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {error && (
            <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-3 text-red-400 text-sm">
              {error}
            </div>
          )}

          <div>
            <label className="text-gray-300 text-sm font-semibold mb-2 block">Username</label>
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              required
              className="w-full bg-white/10 text-white px-4 py-3 rounded-lg border border-white/20 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400/50 transition-all"
              placeholder="Enter your username"
            />
          </div>

          {!isLogin && (
            <>
              <div>
                <label className="text-gray-300 text-sm font-semibold mb-2 block">Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full bg-white/10 text-white px-4 py-3 rounded-lg border border-white/20 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400/50 transition-all"
                  placeholder="Enter your email"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-gray-300 text-sm font-semibold mb-2 block">First Name</label>
                  <input
                    type="text"
                    name="first_name"
                    value={formData.first_name}
                    onChange={handleChange}
                    className="w-full bg-white/10 text-white px-4 py-3 rounded-lg border border-white/20 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400/50 transition-all"
                    placeholder="First name"
                  />
                </div>
                <div>
                  <label className="text-gray-300 text-sm font-semibold mb-2 block">Last Name</label>
                  <input
                    type="text"
                    name="last_name"
                    value={formData.last_name}
                    onChange={handleChange}
                    className="w-full bg-white/10 text-white px-4 py-3 rounded-lg border border-white/20 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400/50 transition-all"
                    placeholder="Last name"
                  />
                </div>
              </div>
            </>
          )}

          <div>
            <label className="text-gray-300 text-sm font-semibold mb-2 block">Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              minLength={6}
              className="w-full bg-white/10 text-white px-4 py-3 rounded-lg border border-white/20 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400/50 transition-all"
              placeholder="Enter your password"
            />
          </div>

          {!isLogin && (
            <div>
              <label className="text-gray-300 text-sm font-semibold mb-2 block">Confirm Password</label>
              <input
                type="password"
                name="password2"
                value={formData.password2}
                onChange={handleChange}
                required
                minLength={6}
                className="w-full bg-white/10 text-white px-4 py-3 rounded-lg border border-white/20 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400/50 transition-all"
                placeholder="Confirm your password"
              />
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-blue-500 to-purple-600 px-6 py-3 rounded-lg text-white font-bold hover:shadow-xl hover:shadow-blue-500/30 hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center justify-center gap-2"
          >
            {loading ? (
              <>
                <span className="animate-spin">⏳</span>
                Processing...
              </>
            ) : (
              <>
                <span>{isLogin ? '🔓' : '🚀'}</span>
                {isLogin ? 'Login' : 'Sign Up'}
              </>
            )}
          </button>

          <div className="text-center pt-4 border-t border-white/10">
            <button
              type="button"
              onClick={() => {
                setIsLogin(!isLogin);
                setError('');
                setFormData({
                  username: '',
                  email: '',
                  password: '',
                  password2: '',
                  first_name: '',
                  last_name: ''
                });
              }}
              className="text-blue-400 hover:text-blue-300 text-sm font-semibold"
            >
              {isLogin ? "Don't have an account? Sign Up" : 'Already have an account? Login'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AuthModal;
