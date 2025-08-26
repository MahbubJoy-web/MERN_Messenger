import axios from "axios";
import React, { useState } from "react";
import { MdOutlineMarkEmailRead } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";
import { Bounce, toast } from "react-toastify";
const Otpverification = () => {
const [formData, setFormData] = useState({otp: "" });
const navigate = useNavigate() 
    const HandleSubmit = (e)=>{
         e.preventDefault();
         
        if(!formData.otp){
        toast.error( 'Invaild OTP', {
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
             axios.post('http://localhost:3000/auth/otpVerification',{
                otp : formData.otp
             })
             .then((res)=>{
                toast.success('OTP verify Success', {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                    transition: Bounce,
                    })
                navigate('/login')    
             }).catch((err)=>{
                toast.error( 'Invalid OTP', {
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
        
}


return (
    <>
     <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <form
             onSubmit={HandleSubmit}
             className="bg-white shadow-lg rounded-2xl p-8 w-full max-w-md"
           >
             <h2 className="text-2xl font-bold text-center mb-2 text-gray-700">
               OTP Verification
             </h2>
                 <p className=" mb-6 text-red-600 font-poppins flex justify-center items-center"> OTP Will Expire In 3 minute</p>
     
             {/* Otp */}
             <div className="mt-8 mb-4">
               <div className="flex items-center border rounded-lg px-3 py-2">
                 <MdOutlineMarkEmailRead  className="text-gray-400 mr-2" />
                 <input
                   type="text"
                   placeholder="OTP"
                   value={formData.email}
                   onChange={(e)=>setFormData({otp:e.target.value})}
                   className="w-full outline-none"
                   required
                 />
               </div>
             </div>
             {/* Submit Button */}
             <button
                onClick={HandleSubmit}
               type="submit"
               className="mb-4 w-full bg-blue-600 text-white font-semibold py-2 rounded-lg hover:bg-blue-700 transition"
             >
               Verify
             </button>
             <div className="flex flex-col justify-center items-center gap-2">
                <Link to="/resendOtp" className="text-[#33A1E0] ml-2">Resend OTP</Link>
                <Link to="/register" className="text-[#33A1E0] ml-2">Back To Register</Link>
             </div>
           </form>
         </div> 
    </>
  )
}

export default Otpverification
