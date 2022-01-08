import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";


function Home(props) {
  /*----------------------------------
     State and Variables
  ----------------------------------*/
  
  

  /*----------------------------------
     Functions  
  ----------------------------------*/


  return (
    <>
      <h1
        className="text-5xl m-10 animation-delay-500 animate-[rainbow_.5s_2]"
      >
        Welcome to monikr
      </h1>
      <h2 className=" text-2xl ">
        <Link
          className="text-pink-600 hover:text-pink-700 transition-all"
          to="/login"
        >
          Log In{" "}
        </Link>{" "}
        or{" "}
        <Link
          className="text-blue-400 hover:text-blue-500 transition-all"
          to="/signup"
        >
          Register
        </Link>{" "}
        to find your perfect name!
      </h2>
    </>
  );
}

export default Home;
