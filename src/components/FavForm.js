import FormField from "../components/FormField";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { GlobalCtx } from "../App";

const FavForm = (props) => {
  /*----------------------------------
      Variables and State
  ----------------------------------*/
  const { btnText, toggleSidebar, getFavorites} = props
  const navigate = useNavigate()
  const nullFav = {
    name: "",
    origin: "",
    gender: "",
    top_choice: null,
  };
  
  const { gState, setGState } = React.useContext(GlobalCtx)
  const {url, token} = gState

  const [formData, setFormData] = useState(props.currentFav);
  
  

  /*----------------------------------
     Functions
  ----------------------------------*/
  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };
  
  const createFav = event => {
    const fav = JSON.stringify(formData)
    
    
    console.log(fav)
    fetch(`${url}/favorites/`, {
       method: "post",
       headers: {
         "Content-Type": "application/json",
         Authorization: "bearer " + token
        },
        body: fav
      })
      .then(response => response.json())
      .then(data => {
        console.log(data)
        
      })
    }
    
    const handleSubmit = event => {
      event.preventDefault()
 //     if (props.page === "Register") {
      createFav(event)
      getFavorites()
      toggleSidebar()
      setFormData(nullFav)
//      } else if (props.page === "Login") {
//        console.log("wazzup")
 //     }
    }
  

  
    
    return (
      <form onSubmit={(event) => handleSubmit(event)}>
        <FormField
          type="text"
          onChange={handleChange}
          value={formData.name}
          name="name"
          placeholder="name"
          required
        />
        <FormField
          type="text"
          onChange={handleChange}
          value={formData.origin}
          name="origin"
          placeholder="origin"
          required
        />
        <fieldset className="border-8 border-white rounded-xl bg-white" >
        <legend>Gender</legend>
        <FormField
          type="radio"
          onChange={handleChange}
          value="Masculine"
          name="gender"
          label="Masculine"
          required
          />
        <FormField
          type="radio"
          onChange={handleChange}
          value="Feminine"
          name="gender"
          label="Feminine"
          />
        <FormField
          type="radio"
          onChange={handleChange}
          value="Gender Neutral"
          name="gender"
          label="Gender Neutral"
          />
        </fieldset>
        <br/>
        <br/>
        <FormField
          type="checkbox"
          onChange={handleChange}
          value="top-choice"
          name="top_choice"
          label="Top Choice?"
        />
        <br />
        <br />
        <input
          type="submit"
          value="submit"
          className="border-2 py-1 px-2 rounded-lg bg-blue-400 border-blue-600 text-white hover:bg-blue-600 "
        />
      </form>
    );
}

export default FavForm
