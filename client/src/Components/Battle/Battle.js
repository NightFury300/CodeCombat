import React from 'react'
import Ellipse from "../../assets/Ellipse 20@1x.png"
import RectangleTop from "../../assets/Rectangle 3@1x.png"
import RectangleBottom from "../../assets/Rectangle 1@3x.png"
import ContestCreation from './ContestCreation'
const Battle = () => {
  return (
    <div className='w-screen h-screen relative flex items-center justify-center overflow-hidden '>
      <div className='mask relative z-1 w-screen h-[screen] overflow-hidden '>
        <img src={Ellipse} alt='left-ecllipse' className='absolute bottom-0 -right-1/4 w-[1228px] h-[1122px] ' />
        <img src={RectangleTop} alt='top-rectangle' className='absolute -top-[72%] -left-1/4 w-[1000px] h-[900px] ' />
        <img src={RectangleBottom} alt='bottom-rectangle' className='absolute -bottom-[90%] -left-1/4 w-[1228px] h-[1122px] ' />
      </div>
      <div className='absolute w-3/4 h-full  left-30 top1/2 overflow-hidden rounded-lg'>
      <ContestCreation/>
      </div>
    </div>
  )
}

export default Battle
