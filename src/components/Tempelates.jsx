import React from "react";
import SignupForm from "./SignupForm";
import LoginForm from "./LoginForm";
// import {fcGoogle} from
import { FcGoogle } from "react-icons/fc"; // Import the Google icon
// import Signup from "../pages/Signup";
// import frameImage from "../assets/frame.png";

function Tempelates({ title, descr1, descr2, image, formType, setIsLoggedIn }) {
  //   console.log(formType);
  return (
    <div className="flex w-11/12 max-w-[1160px] h-full py-12 mx-auto gap-x-12 justify-between gap-y-8 ">
      <div>
        <h1 className="text-white font-semibold text-[1.875rem] leading-[2.375rem]">
          {title}
        </h1>
        <p className="text=[1.125rem leading[1.625rem]] mt-4">
          <span className="text-white ">{descr1}</span>
          <br />
          <span className="text-blue-800 italic">{descr2}</span>
        </p>
        {formType === "signup" ? (
          <SignupForm setIsLoggedIn={setIsLoggedIn} />
        ) : (
          <LoginForm setIsLoggedIn={setIsLoggedIn} />
        )}
        <div className="flex w-full items-center my-4 gap-x-2 ">
          <div className="h-[1px] w-full bg-richBlack700  "></div>
          <p className=" font-medium text-white leading[1.375rem]">OR</p>
          <div className="h-[1px] w-full bg-richBlack700 "></div>
        </div>
        <button className="w-full flex justify-center items-center rounded-[8px] font-medium text-richBlack700 border border-richBlack700 px-[12px] py-[8px] gap-x-2">
          <FcGoogle className="text-[1.5rem]" />
          <p className="text-white">Sign in with Google</p>
        </button>
      </div>
      <div className="relative w-11/12 max-w-[450px]">
        <img
          src="src/assets/frame.png"
          alt="patter"
          width={558}
          height={584}
          loading="lazy"
        />
        <img
          src={image}
          alt="students"
          width={558}
          height={490}
          loading="lazy"
          className="absolute -top-4 right-4"
        />
      </div>
    </div>
  );
}

export default Tempelates;
