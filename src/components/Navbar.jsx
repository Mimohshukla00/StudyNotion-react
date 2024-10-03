import React from "react";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";

function Navbar(props) {
  let isLoggedIn = props.isLoggedIn;
  let setIsLoggedIn = props.setIsLoggedIn;
  return (
    <div className="flex justify-between items-center w-11/12 max-w-[1160px] py-4 mx-auto  ">
      <Link to="/">
        <img
          src="src/assets/Logo.svg"
          alt="logo"
          width={160}
          height={32}
          loading="lazy"></img>
      </Link>
      <nav>
        <ul className="flex text-gray-400 gap-x-6">
          <li>
            <Link  className ="hover:text-yellow-500 transition duration-300 ease-in-out" to="/">Home</Link>
          </li>
          <li>
            <Link className ="hover:text-yellow-500 transition duration-300 ease-in-out"  to="/">About</Link>
          </li>
          <li>
            <Link  className ="hover:text-yellow-500 transition duration-300 ease-in-out" to="/">Contact</Link>
          </li>
        </ul>
      </nav>

      <div className="flex items-center gap-x-4 ">
        {!isLoggedIn && (
          <Link to="/login">
            <button className="bg-richBlack700   text-gray-400  hover:text-blue-800 transition duration-300 ease-in-out py-[8px] px-[12px] rounded-[8px] border border-richBlack700">
              Login
            </button>
          </Link>
        )}
        {!isLoggedIn && (
          <Link to="/signup">
            <button className="bg-richBlack700 text-gray-400 py-[8px] px-[12px] rounded-[8px] border border-richBlack700
            hover:text-blue-800 transition duration-300 ease-in-out
            ">
              Sign up
            </button>
          </Link>
        )}

        {isLoggedIn && (
          <Link to="/">
            <button
              className="bg-richBlack700 text-gray-400 py-[8px] px-[12px] rounded-[8px] border border-richBlack700
              hover:text-blue-800 transition duration-300 ease-in-out"
              onClick={() => {
                setIsLoggedIn(false);
                toast.success("logout");
              }}>
              Log Out
            </button>
          </Link>
        )}
        {isLoggedIn && (
          <Link to="/dashboard">
            <button className="bg-richBlack700 text-gray-400 py-[8px] px-[12px] rounded-[8px] border border-richBlack700
            hover:text-blue-800 transition duration-300 ease-in-out">
              Dashboard
            </button>
          </Link>
        )}
      </div>
    </div>
  );
}

export default Navbar;
