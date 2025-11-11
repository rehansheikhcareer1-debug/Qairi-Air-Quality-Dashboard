import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Navbar from '../components/Navbar';

const Profile = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [profileImage, setProfileImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    email: ''
  });

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (!storedUser) {
      navigate('/login');
      return;
    }
    
    const userData = JSON.parse(storedUser);
    setUser(userData);
    setFormData({
      first_name: userData.first_name || '',
      last_name: userData.last_name || '',
      email: userData.email || ''
    });

    // Load profile image from localStorage
    const savedImage = localStorage.getItem(`profile_image_${userData.id}`);
    if (savedImage) {
      setImagePreview(savedImage);
    }
  }, [navigate]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfileImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
        // Save to localStorage
        if (user) {
          localStorage.setItem(`profile_image_${user.id}`, reader.result);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSave = () => {
    const updatedUser = {
      ...user,
      ...formData
    };
    localStorage.setItem('user', JSON.stringify(updatedUser));
    setUser(updatedUser);
    setIsEditing(false);
    
    // Show success message
    alert('Profile updated successfully!');
    
    // Reload to update navbar
    window.location.reload();
  };

  if (!user) return null;

  return (
    <div className="min-h-screen relative">
      {/* Background */}
      <div className="fixed inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900"></div>
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1614730321146-b6fa6a46bcb4?w=1920')] bg-cover bg-center opacity-20"></div>
      </div>

      <div className="relative z-20">
        <Navbar currentCountry="IN" />
        
        <div className="pt-32 px-6 pb-12">
          <div className="max-w-4xl mx-auto">
            {/* Profile Card */}
            <div className="glass rounded-2xl p-8 border-2 border-white/20 shadow-2xl">
              {/* Header */}
              <div className="flex items-center justify-between mb-8">
                <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                  My Profile
                </h1>
                <Link 
                  to="/"
                  className="text-gray-400 hover:text-white transition-all flex items-center gap-2"
                >
                  <span>←</span> Back to Home
                </Link>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {/* Profile Image Section */}
                <div className="md:col-span-1">
                  <div className="flex flex-col items-center">
                    <div className="relative group">
                      <div className="w-48 h-48 rounded-full overflow-hidden border-4 border-blue-500/50 shadow-xl">
                        {imagePreview ? (
                          <img 
                            src={imagePreview} 
                            alt="Profile" 
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="w-full h-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
                            <span className="text-white text-6xl font-bold">
                              {user.username.charAt(0).toUpperCase()}
                            </span>
                          </div>
                        )}
                      </div>
                      
                      {/* Upload Button Overlay */}
                      <label className="absolute inset-0 flex items-center justify-center bg-black/50 rounded-full opacity-0 group-hover:opacity-100 transition-all cursor-pointer">
                        <div className="text-white text-center">
                          <div className="text-3xl mb-2">📷</div>
                          <div className="text-sm font-semibold">Change Photo</div>
                        </div>
                        <input 
                          type="file" 
                          accept="image/*"
                          onChange={handleImageChange}
                          className="hidden"
                        />
                      </label>
                    </div>
                    
                    <div className="mt-4 text-center">
                      <h2 className="text-white text-2xl font-bold">{user.username}</h2>
                      <p className="text-gray-400 text-sm mt-1">Member since {new Date().getFullYear()}</p>
                    </div>
                  </div>
                </div>

                {/* Profile Details Section */}
                <div className="md:col-span-2">
                  <div className="space-y-6">
                    {/* Username */}
                    <div className="glass p-4 rounded-xl border border-white/10">
                      <label className="text-gray-400 text-sm font-semibold mb-2 block">Username</label>
                      <div className="text-white text-lg font-semibold">{user.username}</div>
                    </div>

                    {/* Email */}
                    <div className="glass p-4 rounded-xl border border-white/10">
                      <label className="text-gray-400 text-sm font-semibold mb-2 block">Email</label>
                      {isEditing ? (
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          className="w-full bg-white/10 text-white px-4 py-2 rounded-lg border border-white/20 focus:outline-none focus:ring-2 focus:ring-blue-400"
                        />
                      ) : (
                        <div className="text-white text-lg">{user.email || 'Not provided'}</div>
                      )}
                    </div>

                    {/* First Name */}
                    <div className="glass p-4 rounded-xl border border-white/10">
                      <label className="text-gray-400 text-sm font-semibold mb-2 block">First Name</label>
                      {isEditing ? (
                        <input
                          type="text"
                          name="first_name"
                          value={formData.first_name}
                          onChange={handleChange}
                          className="w-full bg-white/10 text-white px-4 py-2 rounded-lg border border-white/20 focus:outline-none focus:ring-2 focus:ring-blue-400"
                        />
                      ) : (
                        <div className="text-white text-lg">{user.first_name || 'Not provided'}</div>
                      )}
                    </div>

                    {/* Last Name */}
                    <div className="glass p-4 rounded-xl border border-white/10">
                      <label className="text-gray-400 text-sm font-semibold mb-2 block">Last Name</label>
                      {isEditing ? (
                        <input
                          type="text"
                          name="last_name"
                          value={formData.last_name}
                          onChange={handleChange}
                          className="w-full bg-white/10 text-white px-4 py-2 rounded-lg border border-white/20 focus:outline-none focus:ring-2 focus:ring-blue-400"
                        />
                      ) : (
                        <div className="text-white text-lg">{user.last_name || 'Not provided'}</div>
                      )}
                    </div>

                    {/* Action Buttons */}
                    <div className="flex gap-4">
                      {isEditing ? (
                        <>
                          <button
                            onClick={handleSave}
                            className="flex-1 bg-gradient-to-r from-green-500 to-emerald-600 px-6 py-3 rounded-lg text-white font-bold hover:shadow-xl hover:shadow-green-500/30 transition-all"
                          >
                            💾 Save Changes
                          </button>
                          <button
                            onClick={() => setIsEditing(false)}
                            className="flex-1 bg-gradient-to-r from-gray-500 to-gray-600 px-6 py-3 rounded-lg text-white font-bold hover:shadow-xl transition-all"
                          >
                            ✕ Cancel
                          </button>
                        </>
                      ) : (
                        <button
                          onClick={() => setIsEditing(true)}
                          className="flex-1 bg-gradient-to-r from-blue-500 to-purple-600 px-6 py-3 rounded-lg text-white font-bold hover:shadow-xl hover:shadow-blue-500/30 transition-all"
                        >
                          ✏️ Edit Profile
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* Stats Section */}
              <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="glass p-4 rounded-xl border border-white/10 text-center">
                  <div className="text-3xl mb-2">🌍</div>
                  <div className="text-gray-400 text-sm">Locations Searched</div>
                  <div className="text-white text-2xl font-bold mt-1">12</div>
                </div>
                <div className="glass p-4 rounded-xl border border-white/10 text-center">
                  <div className="text-3xl mb-2">📊</div>
                  <div className="text-gray-400 text-sm">AQI Checks</div>
                  <div className="text-white text-2xl font-bold mt-1">45</div>
                </div>
                <div className="glass p-4 rounded-xl border border-white/10 text-center">
                  <div className="text-3xl mb-2">⭐</div>
                  <div className="text-gray-400 text-sm">Member Level</div>
                  <div className="text-white text-2xl font-bold mt-1">Gold</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
