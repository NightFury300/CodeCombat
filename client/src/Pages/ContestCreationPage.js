import React, { useState } from 'react';
import axios from 'axios';

const ContestCreationPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    startTime: '',
    endTime: '',
  });

  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loginData, setLoginData] = useState({
    email: '',
    password: '',
  });

  const [showLoginModal, setShowLoginModal] = useState(true);

  const handleLoginChange = (e) => {
    const { name, value } = e.target;
    setLoginData({
      ...loginData,
      [name]: value,
    });
  };

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
  
    // Hardcoded credentials
    const correctEmail = 'shikar@gmail.com';
    const correctPassword = 'QWERY@123';
  
    try {
      // Validate entered email and password
      if (loginData.email === correctEmail && loginData.password === correctPassword) {
        // Simulate successful login
        setIsLoggedIn(true);
        setShowLoginModal(false);
        setError(null);
      } else {
        throw new Error('Invalid credentials');
      }
    } catch (err) {
      setError('Invalid credentials. Please try again.');
    }
  };
  

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/contest/create', formData);
      setSuccessMessage('Contest created successfully!');
      setError(null);
      setFormData({
        name: '',
        description: '',
      });
    } catch (err) {
      setError('Failed to create contest. Please try again.');
      setSuccessMessage('');
    }
  };

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-violet-100 flex items-center justify-center">
        <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
          <h1 className="text-3xl font-semibold text-violet-600 mb-4 text-center">Login</h1>
          {error && <div className="text-red-600 text-center mb-4">{error}</div>}
          <form onSubmit={handleLoginSubmit}>
            <div className="mb-4">
              <label htmlFor="email" className="block text-violet-700 font-medium">Email:</label>
              <input
                type="email"
                id="email"
                name="email"
                value={loginData.email}
                onChange={handleLoginChange}
                required
                className="w-full p-3 border-2 border-violet-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-500"
              />
            </div>

            <div className="mb-4">
              <label htmlFor="password" className="block text-violet-700 font-medium">Password:</label>
              <input
                type="password"
                id="password"
                name="password"
                value={loginData.password}
                onChange={handleLoginChange}
                required
                className="w-full p-3 border-2 border-violet-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-500"
              />
            </div>

            <div className="text-center">
              <button
                type="submit"
                className="w-full py-3 bg-yellow-500 text-white font-semibold rounded-lg hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-yellow-400"
              >
                Login
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-violet-100 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h1 className="text-3xl font-semibold text-violet-600 mb-4 text-center">Create a New Contest</h1>
        
        {successMessage && <div className="text-green-600 text-center mb-4">{successMessage}</div>}
        {error && <div className="text-red-600 text-center mb-4">{error}</div>}
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="name" className="block text-violet-700 font-medium">Contest Name:</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full p-3 border-2 border-violet-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-500"
            />
          </div>
          
          <div>
            <label htmlFor="description" className="block text-violet-700 font-medium">Description:</label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              required
              className="w-full p-3 border-2 border-violet-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-500"
              rows="4"
            />
          </div>
          
        

          <div className="text-center">
            <button
              type="submit"
              className="w-full py-3 bg-yellow-500 text-white font-semibold rounded-lg hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-yellow-400"
            >
              Create Contest
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ContestCreationPage;
