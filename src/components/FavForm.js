import FormField from "../components/FormField";
import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { GlobalCtx } from "../App";

const FavForm = (props) => {
  
  /*----------------------------------
  Variables and State
  ----------------------------------*/
  const { btnText, toggleSidebar, getFavorites, handleSubmit, handleChange, formData, page, deleteFavorite} = props
  
  
  /*----------------------------------
     Functions
  ----------------------------------*/


  const loaded = (
    <>
      {page === "update" && (
        <button
          onClick={()=>{deleteFavorite(formData)}}
        >Delete Favorite</button>
      )}
    <form className="bg-white max-w-56 " onSubmit={(event) => handleSubmit(event)}>
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
        <br/>
        <FormField className="truncate"
          type="radio"
          onChange={handleChange}
          value="Gender Neutral"
          name="gender"
          label="Neutral"
        />
      </fieldset>
      <br />
      <br />
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
        className="border-2 py-1 px-2 rounded-lg bg-blue-400
       border-blue-600 text-white hover:bg-blue-600 "
      />
      </form>
    </>
  )

  const loading = <h4>loading</h4>



  /*----------------------------------
     Returned JSX
  ----------------------------------*/
  
  return  formData? loaded: loading  ;
}

export default FavForm
