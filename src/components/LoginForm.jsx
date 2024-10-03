import React, { useState } from "react";
import toast from "react-hot-toast";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { Link, useNavigate } from "react-router-dom";

function LoginForm({ setIsLoggedIn }) {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const changeHandler = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle login logic here (e.g., API call)
    console.log(formData);
    setIsLoggedIn(true);
    toast.success("Logged in");
    navigate("/dashboard");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col w-full gap-y-4 mt-6 " 
    >
      <label htmlFor="email" className="w-full relative">
        <p className="text-[0.875rem] text-white mb-1 leading-[1.375rem]">
          Email Address
          <sup className="text-pink-700">*</sup>
        </p>
        <input
          required
          type="email"
          value={formData.email}
          onChange={changeHandler}
          placeholder="Enter Email"
          name="email"
          className="bg-richBlack700 rounded-[0.5rem] text-rich text-white w-full p-[12px]"
        />
      </label>
      <label htmlFor="password" className="relative">
        <p>
          Password
          <sup>*</sup>
        </p>
        <input
          required
          type={showPassword ? "text" : "password"}
          value={formData.password}
          onChange={changeHandler}
          placeholder="Enter Password"
          name="password"
          className="bg-richBlack700 rounded-[0.5rem] text-rich text-white w-full p-[12px]"
        />
        <span
          onClick={() => setShowPassword((prev) => !prev)}
          style={{ cursor: "pointer" }}
         className="absolute right-3 top-[38px] cursor-pointer z-10"
        >
          {showPassword ? <AiOutlineEyeInvisible fontSize={24} fill="#AFB2BF" /> : <AiOutlineEye fontSize={24} fill="#AFB2BF" />}
        </span>
      </label>

      <Link to="#">
        <p>Forgot Password?</p>
      </Link>

      <button  className="bg-yellow-300 rounded-[8px] font-medium px-[17px] py-[8px] mt-6"  type="submit">Login</button>
    </form>
  );
}

export default LoginForm;
