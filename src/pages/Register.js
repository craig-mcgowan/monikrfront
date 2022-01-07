import React, {createContext, useContext, useState} from "react";
import { GlobalCtx } from "../App";

import UserForm from "../components/UserForm";

const Register = ({handleChange, nullUser, formData}) => {
  const { gState, setGState } = createContext(GlobalCtx)
  
  
  return (
    <div className="w-1/2 py-10 mt-10 mx-auto border-2 shadow shadow-black rounded-3xl border-purple-800">
      <UserForm page="Register"/>
 
    </div>
  )
}

export default Register