import React, { useState, useEffect } from "react";
import UserForm from "../components/UserForm";
export default function Login({nullUser, handleChange, handleSubmit, formData}) {
  /*----------------------------------
     Form Data State
  ----------------------------------*/



  /*----------------------------------
     Functions
  ----------------------------------*/

  return (
    <>
      <h2>Login</h2>
      <UserForm page = "Login"/>
    </>  
  );
}
