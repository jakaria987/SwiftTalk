import React from 'react'
import { Outlet } from 'react-router'
import SideBar from "../Components/sidebar";


const RootLayout = () => {
  return (
    <div className='ml-[220px] p-6'>
        <SideBar></SideBar>
        <Outlet></Outlet>
    </div>
  )
}

export default RootLayout