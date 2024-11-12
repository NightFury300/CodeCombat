import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'; // Import useNavigate
import Auth from "../../assets/Auth.png"
import { FaLinkedin, FaGithub, FaGoogle, FaEllipsisH } from 'react-icons/fa'; // Import icons

const Login = () => {
  const [userData, setUserData] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({});
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [showDialog, setShowDialog] = useState(false);

  // Initialize useNavigate hook
  const navigate = useNavigate();

  // Validation function
  const validate = () => {
    let tempErrors = {};

    // Email validation
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!userData.email) {
      tempErrors.email = "Email is required";
    } else if (!emailPattern.test(userData.email)) {
      tempErrors.email = "Email is not valid";
    }

    // Password validation
    if (!userData.password) {
      tempErrors.password = "Password is required";
    } else if (userData.password.length < 8) {
      tempErrors.password = "Password must be at least 8 characters";
    }

    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0; // No errors, form is valid
  };

  const handleChange = (e) => {
    setUserData((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const handleCheckbox = () => {
    setAgreeTerms(!agreeTerms);
  };

  // const submitForm = (e) => {
  //   e.preventDefault();

  //   if (validate() && agreeTerms) {
  //     console.log("Form submitted:", userData);
      
  //     navigate('/profile'); 

  //     setUserData({ email: "", password: "" });
  //     setErrors({});
  //   } else {
  //     setShowDialog(true);
  //   }
  // };

  const submitForm = (e) => {
    e.preventDefault();
    if (validate()) {
      const storedUser = JSON.parse(localStorage.getItem('user'));

      if (storedUser && storedUser.email === userData.email && storedUser.password === userData.password) {
        navigate('/profile');
      } else {
        setErrors({ ...errors, login: 'Invalid email or password' });
      }
    }
  };

  const closeDialog = () => setShowDialog(false);

  return (
    <section className='flex gap-20 h-screen w-screen items-center justify-center'>
      <div className='bg-gray-100 h-[80vh] w-1/3'><img src={Auth} alt='Login' className='h-[full] w-full object-cover' /></div>
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

      {/* Dialog Box for Validation Errors */}
      {showDialog && (
        <div className='fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50'>
          <div className='bg-white p-5 rounded-md shadow-lg max-w-sm w-full'>
            <h2 className='text-xl font-semibold mb-4'>Validation Errors</h2>
            <ul className='text-red-600 list-disc list-inside'>
              {Object.values(errors).map((error, index) => (
                <li key={index}>{error}</li>
              ))}
              {!agreeTerms && <li>You must agree to the terms and conditions</li>}
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
