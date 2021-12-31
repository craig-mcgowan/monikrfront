import FormField from "../components/FormField";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { GlobalCtx } from "../App";

const FavForm = props => {
  /*----------------------------------
  Variable and State
  ----------------------------------*/
  const navigate = useNavigate()
  const nullFav = {
    name: "",
    origin: "",
    gender: "",
    top_choice: null,
  };
  
  const { gState, setGState } = React.useContext(GlobalCtx)
  const {url, token} = gState

  const [formData, setFormData] = useState(nullFav);
  /*----------------------------------
     Functions
  ----------------------------------*/
  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };
  
  const createFav = event => {
    const fav = formData
    console.log(formData)
    fetch(`${url}/favorite`, {
       method: "post",
       headers: {
         "Content-Type": "application/json",
         Authorization: "bearer " + token
        },
        body: JSON.stringify({fav})
      })
      .then(response => response.json())
      .then(data => {
        navigate(`/favorite`)
      })
    }
    
    const handleSubmit = event => {
      event.preventDefault()
      if (props.page === "Register") {
        createFav(event)
      } else if (props.page === "Login") {
        console.log("wazzup")
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
              />
            <FormField
              type="text"
              placeholder="Last Name"
              name="last_name"
              onChange={handleChange}
              value={formData.last_name}
              />
          </div>
          <div>
            <p>Are you expecting?</p>
            <FormField
              type="radio"
              name="expecting"
              label="yes"
              onChange={handleChange}
              value="yes"
              />
            <FormField
              type="radio"
              name="expecting"
              label="no"
              onChange={handleChange}
              value="no"
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
              value=""
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

export default FavForm
