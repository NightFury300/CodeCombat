import React from 'react';
import Ellipse from "../../assets/Ellipse 20@1x.png";
import RectangleTop from "../../assets/Rectangle 3@1x.png";
import RectangleBottom from "../../assets/Rectangle 1@3x.png";
import ContestCreation from './ContestCreation';

const Battle = () => {
  return (
    <div className='w-screen h-screen relative flex items-center justify-center overflow-hidden'>
      {/* Background images */}
      <div className='absolute w-full h-full overflow-hidden'>
        <img
          src={Ellipse}
          alt='left-ecllipse'
          className='absolute bottom-0 -right-1/4 w-[1228px] h-[1122px] z-0'
        />
        <img
          src={RectangleTop}
          alt='top-rectangle'
          className='absolute -top-[72%] -left-1/4 w-[1000px] h-[900px] z-0'
        />
        <img
          src={RectangleBottom}
          alt='bottom-rectangle'
          className='absolute -bottom-[90%] -left-1/4 w-[1228px] h-[1122px] z-0'
        />
      </div>

      {/* Contest Creation */}
      <div className='relative z-10 w-3/4 p-4 '>
        <ContestCreation />
      </div>
    </div>
  );
};

export default Battle;
