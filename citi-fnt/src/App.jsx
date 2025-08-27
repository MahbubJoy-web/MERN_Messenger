import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Register from './pages/Register'
import { createBrowserRouter, createRoutesFromElements, Route, Router, RouterProvider } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import Otpverification from './Pages/otpverification'
import ResendOtp from './Pages/ResendOtp'
import LayoutOne from './layout/layoutOne'
import Home from './Pages/Home'
import AllUser from './components/AllUser'
import BlockUser from './components/BlockUser'
import Login from './Pages/Login'
import ProfileCard from './components/ProfileCard'
import NotFound from './Pages/NotFound'

function App() {
  const myRoute = createBrowserRouter(
    createRoutesFromElements(
      <Route>
        <Route path='/login' element={<Login/>}/>
        <Route path='/register' element={<Register/>}/>
        <Route path='/otp' element={<Otpverification/>}/>
        <Route path='/resendotp' element={<ResendOtp/>}/>
        <Route path='*' element={<NotFound/>}/>
        <Route path='/' element={<LayoutOne/>} >
          <Route index element={<Home/>}/>
          <Route path='/allUser' element={<AllUser/>}/>
          <Route path='/blockUser' element={<BlockUser/>}/>
          <Route path='/profile' element={<ProfileCard/>}/>
        </Route>
      </Route>
    )
  )

  return (
    <>
     <RouterProvider router={myRoute} />
     <ToastContainer/>

    </>
  )
}

export default App
