import React from 'react'
import Profile from '../Components/Profile/Profile'
import Navbar from '../Components/Navbar/Navbar'
import HelpPopup from '../Components/Help/HelpPopup'
const ProfilePage = () => {
  return (
    <div className='overflow-hidden bg-gray-900'>
      <Navbar/>
      <Profile/>
      <HelpPopup/>

    </div>
  )
}

export default ProfilePage
