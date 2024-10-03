import React from "react";
import Tempelates from "../components/Tempelates";
import loginImg from "../assets/login.png";

function Login({ setIsLoggedIn }) {
  return (
    <div>
      <Tempelates
        title="Welcome Back"
        descr1="Build skills for today,tomorrow and beyond "
        image={loginImg}
        descr2="Eduction to future -proof your career"
        formType="login"
        setIsLoggedIn={setIsLoggedIn}></Tempelates>
    </div>
  );
}

export default Login;
