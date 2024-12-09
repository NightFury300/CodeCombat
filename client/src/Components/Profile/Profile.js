import React from 'react'
import Ellipse from "../../assets/Ellipse 20@1x.png"
import RectangleTop from "../../assets/Rectangle 3@1x.png"
import RectangleBottom from "../../assets/Rectangle 1@3x.png"
import ProfileCard from "./ProfileCard"
import Leaderboard from "./Leaderboard/Leaderboard"
import StatusGraph from './StatusGraph'
import {Link} from 'react-router-dom'
const Profile = () => {
  return (
    <div className='w-screen h-screen relative overflow-hidden'>
        <div className='z-10 absolute left-24 top-[12%]'>
        <ProfileCard/>
        </div>
        <div className='z-10 absolute top-[50%] left-[25%]'>
          <StatusGraph/>
        </div>
      <div className='mask relative z-1 w-screen h-screen overflow-hidden '>
        <img src={Ellipse} alt='left-ecllipse' className='absolute bottom-0 -right-1/4 w-[1228px] h-[1122px] ' />
        <img src={RectangleTop} alt='top-rectangle' className='absolute -top-[72%] -left-1/4 w-[1000px] h-[900px] ' />
        <img src={RectangleBottom} alt='bottom-rectangle' className='absolute -bottom-[90%] -left-1/4 w-[1228px] h-[1122px] ' />
      </div>
      <div className='absolute right-20 top-[15%] z-100'>
        <Leaderboard/>
      </div>
      <div className="mt-10 absolute bottom-[20%] right-40">
        <Link
          to={`/battle/`}
          className="inline-block px-14 py-6 text-white cursor-pointer bg-violet-600 rounded-full shadow-lg hover:bg-violet-700 focus:outline-none transition-colors duration-300"
        >
          Move to Battle Ground
        </Link>
      </div>
    </div>
  )
}

export default Profile
