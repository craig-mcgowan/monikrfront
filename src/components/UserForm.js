import FormField from "./FormField";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { GlobalCtx } from "../App";

const UserForm = props => {
  /*----------------------------------
  Variable and State
  ----------------------------------*/
  const navigate = useNavigate()
  const nullUser = {
    username: "",
    password: "",
    email: "",
    first_name: "",
    last_name: "",
    expecting: false,
    baby_gender: "",
    theme: "",
    partner_id: 0,
  };
  
  const { gState, setGState } = React.useContext(GlobalCtx)
  const {url} = gState

  const [formData, setFormData] = useState(nullUser);
  /*----------------------------------
     Functions
  ----------------------------------*/
  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };
  
  const registerUser = event => {
    const newUser = formData
    newUser.expecting = newUser.expecting === "true"
    newUser.email = newUser.email ? newUser.email : ""
    fetch(`${url}/users`, {
       method: "post",
       headers: {
         "Content-Type": "application/json"
        },
        body: JSON.stringify(formData)
      })
      .then(response => response.json())
      .then(data => {
        console.log("data")
        setGState({...gState, token: data.token})
        setFormData(nullUser)
        navigate(`/login`)
      })
    }
    
    const login = (event) => {
    const { username, password } = formData;
    console.log(formData);
 
    fetch(`${url}/login`, {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("data.token: " + data.token);
        window.localStorage.setItem("token", JSON.stringify(data.token))
        setGState({ ...gState, token: data.token });
        setFormData(nullUser);
        navigate(`/`);
      });
    };
    
    const handleSubmit = event => {
      event.preventDefault()
      if (props.page === "Register") {
        registerUser(event)
      } else if (props.page === "Login") {
        login(event)
      }
    }
  

  

  
    
    return (
      <form onSubmit={(event) => handleSubmit(event)}>
      {props.page === "Register" && (
        <>
          <div>
            <p>What's Your Name?</p>
            <FormField
              type="text"
              placeholder="First Name"
              name="first_name"
              onChange={handleChange}
              value={formData.first_name}
              required
              />
            <FormField
              type="text"
              placeholder="Last Name"
              name="last_name"
              onChange={handleChange}
              value={formData.last_name}
              required
              />
          </div>
          <div>
            <p>Are you expecting?</p>
            <FormField
              type="radio"
              name="expecting"
              label="yes"
              onChange={handleChange}
                value={true}
                required
              />
            <FormField
                type="radio"
                name="expecting"
                label="no"
                onChange={handleChange}
                value={false}
            />
          </div>
          <div>
            <p>Do you know the gender?</p>
            <FormField
              type="radio"
              name="baby_gender"
              label="Boy"
              onChange={handleChange}
              value="boy"
            />
            <FormField
              type="radio"
              name="baby_gender"
              label="Girl"
              onChange={handleChange}
              value="girl"
            />
            <FormField
              type="radio"
              name="baby_gender"
              label="I don't know or I'd rather not say"
              onChange={handleChange}
              value="unknown"
            />
          </div>
        </>
      )}
        <FormField
          type="text"
          onChange={handleChange}
          value={formData.username}
          name="username"
          placeholder="Username"
        />
        <FormField
          type="password"
          onChange={handleChange}
          value={formData.password}
          name="password"
          placeholder="Password"
        />

        <input
          type="submit"
          value={props.page}
          className="border-2 py-1 px-2 rounded-lg bg-blue-400 border-blue-600 text-white hover:bg-blue-600 "
        />
    </form>
  );
}

export default UserForm
