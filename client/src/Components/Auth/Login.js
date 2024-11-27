import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Auth from "../../assets/Auth.png";
import { GoogleLogin } from '@react-oauth/google';
import axios from 'axios'; // Import axios for HTTP requests
import { useUser } from '../../Contexts/UserContext';

const Login = () => {
  const { login } = useUser();

  const [userData, setUserData] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({});
  const [showDialog, setShowDialog] = useState(false); // Ensure this is declared

  const navigate = useNavigate();

  // Google Sign-In Success Handler
  const handleGoogleLogin = async (response) => {
    if (response.error) {
      console.error('Google Login Error: ', response.error);
      return;
    }

    const idToken = response.credential; // Google ID token
    try {
      const res = await axios.post('http://localhost:5000/auth/google', { idToken });
      console.log('Login success:', res.data);
      
      // Store the token in sessionStorage
      sessionStorage.setItem('token', res.data.token);
      console.log(res.data)
      login(res.data); // Save user data to context

      // sessionStorage.setItem('user',response.data.username)

      navigate('/battle');
    } catch (error) {
      console.error('Error during Google login:', error);
      alert('Login failed, please try again');
    }
  };

  const validate = () => {
    let tempErrors = {};
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

  const handleChange = (e) => {
    setUserData((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const submitForm = async (e) => {
    e.preventDefault();

    // Assuming you have a validate function that returns true or false
    if (validate()) {
      try {
        // Sending the login request
        const response = await axios.post('http://localhost:5000/auth/login', userData);

        // If the response status is 200 (OK), login is successful
        if (response.status === 200) {
          // Store the token in sessionStorage
          sessionStorage.setItem('token', response.data.token);
          sessionStorage.setItem('user',response.data.username)
          sessionStorage.setItem('userId',response.data.userId)
          login(response.data); // Save user data to context

          console.log(response.data)
          // Navigate to the profile page
          navigate('/battle');
        }
      } catch (error) {
        // Handle error and display a message
        console.error(error); // This logs the exact error to help debug
        setErrors({ login: 'Something went wrong, please try again' });
        setShowDialog(true);
      }
    }
  };

  const closeDialog = () => setShowDialog(false);

  return (
    <section className='flex gap-20 h-screen w-screen items-center justify-center overflow-hidden'>
      <div className='bg-gray-100 h-[80vh] w-1/3'>
        <img src={Auth} alt='Login' className='h-[full] w-full object-cover' />
      </div>
      <div className='h-[650px] w-[900px] bg-[#8543f628] flex items-center justify-center flex-col gap-2 p-2 rounded-md'>
        <p className='text-3xl font-semibold'>Login</p>
        <form className='flex flex-col gap-8 w-full p-10' onSubmit={submitForm}>
          <div className='flex flex-col gap-2'>
            <input
              type='email'
              id='email'
              value={userData.email}
              placeholder='Email'
              className='h-16 w-full rounded-md p-5'
              onChange={handleChange}
            />
            <input
              type='password'
              id='password'
              value={userData.password}
              placeholder='Password'
              className='h-16 w-full rounded-md p-5'
              onChange={handleChange}
            />
          </div>

          <div className='flex flex-col gap-2'>
            <button
              type="submit"
              className='h-16 w-full flex items-center justify-center text-white bg-[#8543f6] font-semibold text-lg rounded-md'
            >
              Login
            </button>
            <div className='w-full flex justify-between px-5 text-gray-400'>
              <p><Link to="/signup">Register</Link></p>
              <p>Forgot Password</p>
            </div>
          </div>
        </form>

        <p className='items-center'>or</p>
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

      {showDialog && (
        <div className='fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50'>
          <div className='bg-white p-5 rounded-md shadow-lg max-w-sm w-full'>
            <h2 className='text-xl font-semibold mb-4'>Validation Errors</h2>
            <ul className='text-red-600 list-disc list-inside'>
              {Object.values(errors).map((error, index) => (
                <li key={index}>{error}</li>
              ))}
            </ul>
            <button
              onClick={closeDialog}
              className='mt-4 w-full bg-[#8543f6] text-white py-2 rounded-md'
            >
              Close
            </button>
          </div>
        </div>
      )}
    </section>
  );
};

export default Login;
