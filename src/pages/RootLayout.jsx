import React from 'react'
import { Outlet } from 'react-router'
import SideBar from '../Components/SideBar'

const RootLayout = () => {
  return (
    <div>
        <SideBar></SideBar>
        <Outlet></Outlet>
    </div>
  )
}

export default RootLayout