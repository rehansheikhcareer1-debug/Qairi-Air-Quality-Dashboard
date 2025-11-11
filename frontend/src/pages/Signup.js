import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';

const Signup = () => {
  const navigate = useNavigate();
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

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Form submitted!');
    setLoading(true);
    setError('');

    console.log('Form data:', formData);
    console.log('Password match check:', formData.password, formData.password2);

    if (formData.password !== formData.password2) {
      setError("Passwords don't match!");
      setLoading(false);
      return;
    }

    try {
      console.log('Sending signup request with data:', formData);
      
      const response = await axios.post('http://localhost:8000/api/auth/register/', formData, {
        headers: {
          'Content-Type': 'application/json',
        }
      });

      console.log('Response:', response);
      const data = response.data;
      console.log('Response data:', data);

      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data.user));
      navigate('/');
    } catch (err) {
      console.error('Signup error:', err);
      console.error('Error response:', err.response);
      
      if (err.response) {
        // Server responded with error
        const errorData = err.response.data;
        setError(errorData.message || Object.values(errorData).flat().join(', '));
      } else if (err.request) {
        // Request made but no response
        setError('No response from server. Please check if Django server is running on port 8000.');
      } else {
        // Something else happened
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

      {/* Signup Card */}
      <div className="relative z-10 w-full max-w-2xl">
        <div 
          className="glass rounded-2xl p-8 border-2 shadow-2xl"
          style={{
            borderColor: 'rgba(147, 51, 234, 0.3)',
            boxShadow: '0 20px 60px rgba(0, 0, 0, 0.5), 0 0 40px rgba(147, 51, 234, 0.2)'
          }}
        >
          {/* Header */}
          <div className="text-center mb-8">
            <div className="inline-block mb-4">
              <div className="w-20 h-20 bg-gradient-to-br from-purple-500 to-pink-600 rounded-full flex items-center justify-center text-4xl shadow-lg">
                ✨
              </div>
            </div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent mb-2">
              Create Your Account
            </h1>
            <p className="text-gray-400">Join us and start monitoring air quality</p>
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
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
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
                  className="w-full bg-white/10 text-white px-4 py-3 rounded-lg border border-white/20 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-purple-400/50 transition-all placeholder-gray-500"
                  placeholder="Choose a username"
                />
              </div>

              <div>
                <label className="text-gray-300 text-sm font-semibold mb-2 block flex items-center gap-2">
                  <span>📧</span> Email
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full bg-white/10 text-white px-4 py-3 rounded-lg border border-white/20 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-purple-400/50 transition-all placeholder-gray-500"
                  placeholder="your@email.com"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <label className="text-gray-300 text-sm font-semibold mb-2 block flex items-center gap-2">
                  <span>👨</span> First Name
                </label>
                <input
                  type="text"
                  name="first_name"
                  value={formData.first_name}
                  onChange={handleChange}
                  className="w-full bg-white/10 text-white px-4 py-3 rounded-lg border border-white/20 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-purple-400/50 transition-all placeholder-gray-500"
                  placeholder="First name"
                />
              </div>

              <div>
                <label className="text-gray-300 text-sm font-semibold mb-2 block flex items-center gap-2">
                  <span>👤</span> Last Name
                </label>
                <input
                  type="text"
                  name="last_name"
                  value={formData.last_name}
                  onChange={handleChange}
                  className="w-full bg-white/10 text-white px-4 py-3 rounded-lg border border-white/20 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-purple-400/50 transition-all placeholder-gray-500"
                  placeholder="Last name"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
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
                  className="w-full bg-white/10 text-white px-4 py-3 rounded-lg border border-white/20 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-purple-400/50 transition-all placeholder-gray-500"
                  placeholder="Min 6 characters"
                />
              </div>

              <div>
                <label className="text-gray-300 text-sm font-semibold mb-2 block flex items-center gap-2">
                  <span>🔐</span> Confirm Password
                </label>
                <input
                  type="password"
                  name="password2"
                  value={formData.password2}
                  onChange={handleChange}
                  required
                  minLength={6}
                  className="w-full bg-white/10 text-white px-4 py-3 rounded-lg border border-white/20 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-purple-400/50 transition-all placeholder-gray-500"
                  placeholder="Confirm password"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-purple-500 to-pink-600 px-6 py-4 rounded-lg text-white font-bold text-lg hover:shadow-xl hover:shadow-purple-500/30 hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <span className="animate-spin">⏳</span>
                  Creating Account...
                </>
              ) : (
                <>
                  <span>🚀</span>
                  Sign Up
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
              to="/login"
              className="block text-purple-400 hover:text-purple-300 font-semibold transition-all"
            >
              Already have an account? <span className="underline">Login</span>
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

export default Signup;
