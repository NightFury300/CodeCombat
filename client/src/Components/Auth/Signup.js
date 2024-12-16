import React, { useState } from 'react';
import Auth from "../../assets/Auth.png";
import { FaGoogle } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { GoogleLogin } from '@react-oauth/google';
import { useUser } from '../../Contexts/UserContext';

const Signup = () => {
  const { login } = useUser();
  const [userData, setUserData] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({});
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Validation function
  const validate = () => {
    let tempErrors = {};
    if (!userData.username.trim()) tempErrors.username = "Username is required";
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!userData.email) {
      tempErrors.email = "Email is required";
    } else if (!emailPattern.test(userData.email)) {
      tempErrors.email = "Email is not valid";
    }
    if (!userData.password) {
      tempErrors.password = "Password is required";
    } else if (userData.password.length < 8) {
      tempErrors.password = "Password must be at least 8 characters";
    }

    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  // Handle input field change
  const handleChange = (e) => {
    setUserData((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  // Handle checkbox for agreeing to terms
  const handleCheckbox = () => setAgreeTerms(!agreeTerms);

  // Submit form to backend
  const submitForm = async (e) => {
    e.preventDefault();     
    if (validate()) {
      setLoading(true); // Start loading state
      try {
        const response = await axios.post('http://localhost:5000/auth/signup', userData);
        if (response.status === 201) {
          login(response.data); // Set user context
          navigate('/login'); // Redirect to login page
        }
      } catch (error) {
        const errorMessage = error.response?.data?.message || 'Something went wrong, please try again';
        setErrors({ backend: errorMessage });
        console.error('Signup error:', errorMessage);
      } finally {
        setLoading(false); // End loading state
      }
    }
  };

  const handleGoogleLogin = async (response) => {
    if (response.error) {
      alert('Google login failed, please try again.');
      return;
    }

    const idToken = response.credential; // Google ID token
    try {
      const res = await axios.post('http://localhost:5000/auth/google', { idToken });
      login(res.data); // Set user context
      navigate('/profile'); // Redirect to profile page
    } catch (error) {
      console.error('Google login failed:', error);
      alert('Login failed, please try again.');
    }
  };

  return (
    <section className='flex gap-20 h-screen w-screen items-center justify-center'>
      <div className='bg-gray-100 h-[80vh] w-1/3'>
        <img src={Auth} alt='Auth' className='h-[full] w-full object-cover' />
      </div>
      <div className='h-[750px] w-[900px] bg-[#8543f628] flex items-center justify-center flex-col gap-2 p-2 rounded-md'>
        <p className='text-3xl font-semibold'>Signup</p>
        <form className='flex flex-col gap-8 w-full p-10' onSubmit={submitForm}>
          <div className='flex flex-col gap-2'>
            <input
              type='text'
              id="username"
              placeholder='Username'
              className='h-16 w-full rounded-md p-5'
              value={userData.username}
              onChange={handleChange}
            />
            {errors.username && <p className="text-red-500">{errors.username}</p>}

            <input
              type='email'
              id="email"
              placeholder='Email'
              className='h-16 w-full rounded-md p-5'
              value={userData.email}
              onChange={handleChange}
            />
            {errors.email && <p className="text-red-500">{errors.email}</p>}

            <input
              type='password'
              id='password'
              placeholder='Password'
              className='h-16 w-full rounded-md p-5'
              value={userData.password}
              onChange={handleChange}
            />
            {errors.password && <p className="text-red-500">{errors.password}</p>}
            {errors.backend && <p className="text-red-500">{errors.backend}</p>}
          </div>
          <span className='flex gap-2 items-center'>
            <input
              type='checkbox'
              className='border-gray-400'
              checked={agreeTerms}
              onChange={handleCheckbox}
            />
            <p className='text-gray-400'>Agree to terms and conditions</p>
          </span>
          <div className='flex flex-col gap-2'>
            <button
              type='submit'
              className='h-16 w-full flex items-center justify-center text-white bg-[#8543f6] font-semibold text-lg rounded-md'
              disabled={!agreeTerms || loading}
            >
              {loading ? 'Signing Up...' : 'Signup'}
            </button>
            <div className='w-full flex justify-between px-5 text-gray-400'>
              <Link to="/login">Login</Link>
              <p>Forgot Password</p>
            </div>
          </div>
        </form>
        <p>or</p>
        <div className='flex items-center justify-center w-[80%]'>
          <GoogleLogin
            onSuccess={handleGoogleLogin}
            onError={(error) => console.error('Google Login Error:', error)}
            useOneTap={true}
            theme="outline"
            shape="pill"
            width="100%"
          />
        </div>
      </div>
    </section>
  );
};

export default Signup;
