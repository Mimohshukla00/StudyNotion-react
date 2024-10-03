import React from "react";
import Tempelates from "../components/Tempelates";
// import signpImg from "src/assets/signup.png";

function Signup({ setIsLoggedIn }) {
  return (
    <div>
      <Tempelates
        title="Join the millions learning to code with studynotion for free"
        descr1="Build skills for today,tomorrow and beyond "
        image="src/assets/signup.png"
        descr2="Eduction to future -proof your career"
        formType="signup"
        setIsLoggedIn={setIsLoggedIn}></Tempelates>
    </div>
  );
}

export default Signup;
