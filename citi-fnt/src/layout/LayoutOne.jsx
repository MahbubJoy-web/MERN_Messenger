import React, { useEffect } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import Navber from '../components/Navber'
import { useSelector } from 'react-redux'

const LayoutOne = () => {
  const userInfo = useSelector(state=>state.mySlice.value)
  const navigate = useNavigate()

  useEffect(()=>{
    if(userInfo === null) {
      navigate('/login')
    } 
  })
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
