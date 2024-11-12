import React, { useState } from 'react';
import Auth from "../../assets/Auth.png"

import { FaLinkedin, FaGithub, FaGoogle, FaEllipsisH } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom'; 
const Signup = () => {
  const [userData, setUserData] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({});
  const [agreeTerms, setAgreeTerms] = useState(false);

  const navigate=useNavigate();

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

  const handleChange = (e) => {
    setUserData((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const handleCheckbox = () => setAgreeTerms(!agreeTerms);

  // const submit = (e) => {
  //   e.preventDefault();
  //   if (validate()) {
  //     console.log("Form submitted:", userData);
  //     setUserData({ username: "", email: "", password: "" });
  //     setAgreeTerms(false);
  //     setErrors({});
  //   }
  // };

  const submitForm = (e) => {
    e.preventDefault();
    if (validate()) {
      // Save user data to localStorage
      localStorage.setItem('user', JSON.stringify(userData));  // Store credentials
      navigate('/login');  // Redirect to login page after successful signup
    }
  };

  return (
    <section className='flex gap-20 h-screen w-screen items-center justify-center'>
      <div className='bg-gray-100 h-[80vh] w-1/3'><img src={Auth} alt='Login' className='h-[full] w-full object-cover' /></div>
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
              disabled={!agreeTerms}
            >
              Signup
            </button>
            <div className='w-full flex justify-between px-5 text-gray-400'>
              <Link to="/signup">Register</Link> {/* Link to Login */}
              <p>Forgot Password</p>
            </div>
          </div>
        </form>
        <p className='items-center'>or</p>
        <div className='flex flex-col gap-2'>
          <div className='flex w-full gap-10 justify-around'>
            <div className='h-12 w-12 rounded-full bg-[#0077b5] flex items-center justify-center text-white'>
              <FaLinkedin size={24} />
            </div>
            <div className='h-12 w-12 rounded-full bg-[#333] flex items-center justify-center text-white'>
              <FaGithub size={24} />
            </div>
            <div className='h-12 w-12 rounded-full bg-[#DB4437] flex items-center justify-center text-white'>
              <FaGoogle size={24} />
            </div>
            <div className='h-12 w-12 rounded-full bg-slate-500 flex items-center justify-center text-white'>
              <FaEllipsisH size={24} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Signup;
