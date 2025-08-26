import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Register from './pages/Register'
import Login from './Pages/login'
import { createBrowserRouter, createRoutesFromElements, Route, Router, RouterProvider } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import Otpverification from './Pages/otpverification'
import ResendOtp from './Pages/ResendOtp'
import LayoutOne from './layout/layoutOne'
import Home from './Pages/Home'
import AllUser from './components/AllUser'
import BlockUser from './components/BlockUser'

function App() {
  const myRoute = createBrowserRouter(
    createRoutesFromElements(
      <Route>
        <Route path='/login' element={<Login/>}/>
        <Route path='/register' element={<Register/>}/>
        <Route path='/otp' element={<Otpverification/>}/>
        <Route path='/resendotp' element={<ResendOtp/>}/>
        <Route path='/' element={<LayoutOne/>} >
          <Route index element={<Home/>}/>
          <Route path='/allUser' element={<AllUser/>}/>
          <Route path='/blockUser' element={<BlockUser/>}/>
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
