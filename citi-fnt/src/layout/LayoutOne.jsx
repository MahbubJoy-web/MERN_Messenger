import React from 'react'
import { Outlet } from 'react-router-dom'
import Navber from '../components/Navber'

const LayoutOne = () => {
  return (
    <>
    <div className="flex">
     <Navber/>
    <Outlet/>
    </div>
    </>
  )
}

export default LayoutOne
