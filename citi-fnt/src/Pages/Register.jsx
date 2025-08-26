import React, { useState } from "react";
import { FaUser, FaEnvelope, FaPhone,  } from "react-icons/fa";
import { GiPerson } from "react-icons/gi";
import { Link, useNavigate } from "react-router-dom";
import { TbLockPassword } from "react-icons/tb";
import { Bounce, toast } from "react-toastify";
import axios from "axios";
const Register = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    password : "",
    gender: "",
  })
  const navigate = useNavigate()

  const handleChange = (e) => {
    e.preventDefault();

    if(!formData.firstName || !formData.lastName || !formData.email || !formData.phone || !formData.password || !formData.gender){
       toast.error( 'Please Fill The All Input', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
        });
    }else{
        axios.post('http://localhost:3000/auth/registraion',{
            firstName : formData.firstName,
            lastName : formData.lastName,
            email : formData.email,
            phone : formData.phone,
            password : formData.password,
            gender : formData.gender
        })
        .then((res)=>{
            toast.success('OTP send', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
                transition: Bounce,
                });
            navigate('/otp')
        }).catch((err)=>{        
        toast.error( (err.response.data), {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: false,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
            transition: Bounce,
            });  
        })
    }
  };


  return (
    <>
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
       <form
        onSubmit={handleChange}
        className="bg-white shadow-lg rounded-2xl p-8  w-full max-w-md"
      >
        <h2 className="text-2xl font-bold text-center mb-6 text-[#33A1E0]">
          Create A New Account
        </h2>

        {/* First Name */}
        <div className="mb-4">
          <div className="flex items-center border rounded-lg px-3 py-2">
            <FaUser className="text-gray-400 mr-2" />
            <input
              type="text"
              placeholder="First Name"
              onChange={(e)=>setFormData((prev)=>({...prev, firstName:e.target.value}))}
              className="w-full outline-none"
              required
            />
          </div>
        </div>

        {/* Last Name */}
        <div className="mb-4">
          <div className="flex items-center border rounded-lg px-3 py-2">
            <FaUser className="text-gray-400 mr-2" />
            <input
              type="text"
              placeholder="Last Name"
              onChange={(e)=>setFormData((prev)=>({...prev, lastName:e.target.value}))}
              className="w-full outline-none"
              required
            />
          </div>
        </div>

        {/* Email */}
        <div className="mb-4">
          <div className="flex items-center border rounded-lg px-3 py-2">
            <FaEnvelope className="text-gray-400 mr-2" />
            <input
              type="email"
              placeholder="Email"
              onChange={(e)=>setFormData((prev)=>({...prev, email:e.target.value}))}
              className="w-full outline-none"
              required
            />
          </div>
        </div>

        {/* Phone */}
        <div className="mb-4">
          <div className="flex items-center border rounded-lg px-3 py-2">
            <FaPhone className="text-gray-400 mr-2" />
            <input
              type="tel"
              placeholder="Phone Number"
              onChange={(e)=>setFormData((prev)=>({...prev, phone:e.target.value}))}
              className="w-full outline-none"
              required
            />
          </div>
        </div>
        {/* Pass */}
             <div className="mb-4">
               <div className="flex items-center border rounded-lg px-3 py-2">
                 <TbLockPassword  className="text-gray-400 mr-2" />
                 <input
                   type="password"
                   placeholder="Password"
                   onChange={(e)=>setFormData((prev)=>({...prev, password:e.target.value}))}
                   className="w-full outline-none"
                   required
                 />
               </div>
             </div>
        {/* gender */}
        <div className="flex items-center py-2 text-gray-600 mb-1">
            <GiPerson className="text-lg text-gray-400 mr-1"/>
            <h2 className="text-gray-400 ">
            Gender 
            </h2>
            <div className=" flex justify-center items-center gap-4 ml-4">
            {/* male Radio */}
            <div  onChange={()=>setFormData((prev)=>({...prev, gender:'male'}))} className="flex justify-center gap-2 border rounded-lg px-3 py-2 text-gray-600">
                <label htmlFor="male" className="">Male</label>
                <input id="male" name="gender" type="radio" />
            </div>
              {/* female Radio */}
            <div onChange={()=>setFormData((prev)=>({...prev, gender:'female'}))} className="flex justify-center gap-2 border rounded-lg px-3 py-2 text-gray-600">
                <label htmlFor="female" className="">Female</label>
                <input id="female" name="gender" type="radio" />
            </div>
            </div>
        </div>

        

        {/* Submit Button */}
        <button
        onClick={handleChange}
          type="submit"
          className="w-full bg-[#33A1E0] my-3 text-white font-poppins font-semibold py-2 rounded-lg hover:bg-blue-700 transition"
        >
          Register
        </button>
        <div className="text-center my-2">
            <p className="">Already Have an Account
                <Link to="/login" className="text-[#33A1E0] ml-2">Login</Link>
            </p>
        </div>
      </form>
    </div>
      
    </>
  )
}

export default Register
