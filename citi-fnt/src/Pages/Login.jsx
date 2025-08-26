import axios from "axios";
import React, { useState } from "react";
import { FaEnvelope } from "react-icons/fa";
import { TbLockPassword } from "react-icons/tb";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { Bounce, toast } from "react-toastify";
import { UserInfo } from "../Slice/UserSlice";
import Cookies from "js-cookie";

const Login = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const dispatch = useDispatch()
  const navigate = useNavigate()

  // input change handle
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // form submit handle
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.email || !formData.password) {
      toast.error("Please fill all inputs", {
        position: "top-right",
        autoClose: 5000,
        theme: "light",
        transition: Bounce,
      });
    } else {
      axios
        .post("http://localhost:3000/auth/login", {
          email: formData.email,
          password: formData.password,
        })
        .then((res) => {
          toast.success("Login Success", {
            position: "top-right",
            autoClose: 5000,
            theme: "light",
            transition: Bounce,
          });
          navigate('/')
          dispatch(UserInfo(res.data.UserInfo))
          localStorage.setItem('userInfo' , JSON.stringify(res.data.UserInfo))
          Cookies.set('token' , res.data.accessToken)
          
        })
        .catch((err) => {
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
          
        });
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-lg rounded-2xl p-8 w-full max-w-md"
      >
        <h2 className="text-2xl font-bold text-center mb-6 text-gray-700">
          Welcome Back
        </h2>

        {/* Email */}
        <div className="mb-4">
          <div className="flex items-center border rounded-lg px-3 py-2">
            <FaEnvelope className="text-gray-400 mr-2" />
            <input
              type="email"
              name="email"
              placeholder="Enter Email"
              value={formData.email}
              onChange={handleInputChange}
              className="w-full outline-none"
              required
            />
          </div>
        </div>

        {/* Password */}
        <div className="mb-4">
          <div className="flex items-center border rounded-lg px-3 py-2">
            <TbLockPassword className="text-gray-400 mr-2" />
            <input
              type="password"
              name="password"
              placeholder="Enter Password"
              value={formData.password}
              onChange={handleInputChange}
              className="w-full outline-none"
              required
            />
          </div>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="mb-4 w-full bg-blue-600 text-white font-semibold py-2 rounded-lg hover:bg-blue-700 transition"
        >
          Login
        </button>

        <div className="text-center my-2">
          <p>
            Don't Have an Account?
            <Link to="/register" className="text-[#33A1E0] ml-2">
              Register
            </Link>
          </p>
        </div>
      </form>
    </div>
  );
};

export default Login;
