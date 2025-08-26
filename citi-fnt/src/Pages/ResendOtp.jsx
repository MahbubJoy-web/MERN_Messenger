import axios from "axios";
import React, { useState } from "react";
import { IoIosMail } from "react-icons/io";
import { Link, useNavigate } from "react-router-dom";
import { Bounce, toast } from "react-toastify";
const ResendOtp = () => {
const [formData, setFormData] = useState({email: "" });
const navigate = useNavigate()
    const HandleSubmit = (e)=>{
         e.preventDefault();
         
        if(!formData.email){
        toast.error( 'Invaild Email', {
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
             axios.post('http://localhost:3000/auth/resendOtp',{
                email : formData.email
             })
             .then((res)=>{
                toast.success('OTP Send to your Email', {
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
                  navigate('/otp')  
             }).catch((err)=>{
                toast.error( 'OTP Send failed', {
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
               Resend OTP
             </h2>
             {/* Otp */}
             <div className="mt-8 mb-4">
               <div className="flex items-center border rounded-lg px-3 py-2">
                 <IoIosMail  className="text-gray-400 mr-2 text-xl" />
                 <input
                   type="email"
                   name="email"
                   placeholder="Email"
                   value={formData.email}
                   onChange={(e)=>setFormData({email:e.target.value})}
                   className="w-full outline-none"
                   required
                 />
               </div>
             </div>
             {/* Submit Button */}
             <button
                onClick={HandleSubmit}
               type="submit"
               className="mb-2 w-full bg-blue-600 text-white font-semibold py-2 rounded-lg hover:bg-blue-700 transition"
             >
               OTP Send
             </button>
            <div className="text-center my-2">
                <Link to="/otp" className="text-[#33A1E0] ml-2">Back To Verification</Link>
        </div>
           </form>
         </div> 
    </>
  )
}

export default ResendOtp
