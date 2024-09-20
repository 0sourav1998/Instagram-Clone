import React from 'react'
import LeftSidebar from './LeftSidebar'
import { Outlet } from 'react-router-dom'

const MainComponent = () => {
  return (
    <div className='flex'>
      <LeftSidebar/>
      <div className='flex-1'>
        <Outlet/>
      </div>
    </div>
  )
}

export default MainComponent
