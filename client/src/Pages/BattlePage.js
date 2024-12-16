import React from 'react'
import Navbar from '../Components/Navbar/Navbar'
import Battle from '../Components/Battle/Battle'
import HelpPopup from '../Components/Help/HelpPopup'

const BattlePage = () => {
  return (
    <div className='overflow-x-hidden'>
        <Navbar/>
        <Battle/>
        <HelpPopup/>

    </div>
  )
}

export default BattlePage
