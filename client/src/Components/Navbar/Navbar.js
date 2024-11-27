import React from 'react'
import { Link, useNavigate } from 'react-router-dom'; // Import Link and useNavigate for routing

const Navbar = () => {
  const navigate = useNavigate(); // Initialize the useNavigate hook for redirection

  // Logout function to clear session and redirect to login page
  const logout = () => {
    // Clear any session data (e.g., remove from localStorage or sessionStorage)
    localStorage.removeItem('user'); // Example of clearing user data from localStorage

    // Redirect to the login page
    navigate('/login');
  };

  return (
    <div className='w-screen h-16 bg-[#8543F6] text-white flex items-center justify-around p-4 '>
      {/* Home Link */}
      <Link to="/home" className="text-white hover:text-gray-300">Home</Link>

      {/* Practice Link */}
      <Link to="/jointeam" className="text-white hover:text-gray-300">Join Team</Link>

      {/* Battle Ground Link */}
      <Link to="/battle" className="text-white hover:text-gray-300">Battle Ground</Link>

      {/* Logout Button */}
      <button
        onClick={logout}
        className="text-white hover:text-gray-300"
      >
        Logout
      </button>
    </div>
  );
};

export default Navbar;
