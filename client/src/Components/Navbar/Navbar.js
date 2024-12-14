import React from 'react'
import { Link, useNavigate } from 'react-router-dom'; // Import Link and useNavigate for routing
import { useUser } from '../../Contexts/UserContext';

const Navbar = () => {
  const navigate = useNavigate(); // Initialize the useNavigate hook for redirection
  const {logout}=useUser();
  // Logout function to clear session and redirect to login page
  const logout_ = () => {
    // Clear any session data (e.g., remove from localStorage or sessionStorage)
    logout()
    // Redirect to the login page
    navigate('/');
  };

  return (
    <div className='w-screen h-16 bg-[#8543F6] text-white flex items-center justify-around p-4 z-100'>
      {/* Home Link */}
      <Link to="/" className="text-white hover:text-gray-300">Home</Link>
      <Link to="/profile" className="text-white hover:text-gray-300">Profile</Link>

      {/* Practice Link */}
      <Link to="/practice" className="text-white hover:text-gray-300">Practice</Link>

      {/* Battle Ground Link */}
      <Link to="/battle" className="text-white hover:text-gray-300">Battle Ground</Link>

      {/* Logout Button */}
      <button
        onClick={logout_}
        className="text-white hover:text-gray-300"
      >
        Logout
      </button>
    </div>
  );
};

export default Navbar;
