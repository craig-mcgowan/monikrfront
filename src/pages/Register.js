import React, {createContext, useContext, useState} from "react";
import { GlobalCtx } from "../App";

import UserForm from "../components/UserForm";

const Register = ({handleChange, nullUser, formData}) => {
  const { gState, setGState } = createContext(GlobalCtx)
  
  
  return (
    <>
      <UserForm page="Register"/>
 
    </>
  )
}

export default Register