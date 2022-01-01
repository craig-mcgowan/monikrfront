import React from "react"

const FormField = ({ name, label= "", value, type, placeholder, onChange }) => {
  
  let inputStyling, labelStyling

  switch (type) {
    case "radio" :
      inputStyling = "w-0 my-3 peer"
      labelStyling = "px-4 py-1 mx-3 my-4 border-violet-500 border-2 rounded-xl hover:bg-violet-300 shadow-md peer-checked:bg-violet-200 bg-white"
      break;
    case "checkbox":
      inputStyling = "w-0 my-3 peer"
      labelStyling = "px-4 py-1 mx-3 my-4 border-violet-500 border-2 rounded-xl hover:bg-violet-300 shadow-md peer-checked:bg-violet-200 bg-white"
      break;

  
    default:
      inputStyling =  "w-4/5 rounded border-black border bg-slate-100 my-4 shadow-md hover:border-green-400" 
      break;
  }

  return (
    <label >
      <input type={type}
        value={value} 
        name={name}
        placeholder={placeholder}
        onChange={onChange}
        className= {inputStyling}
        />
      <span className={labelStyling}>{label}</span>
    </label>
  )

}

export default FormField