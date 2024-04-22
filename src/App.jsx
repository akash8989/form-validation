import React, {useState} from 'react'
import "./App.css"
import { isElement } from 'react-dom/test-utils'

const App = () => {

  const defaultValues = {
    firstName:{
      id:"firstName",
      label: "First Name",
      type: "text",
      placeholder : "First Name...",
      value : "",
      isError : false,
      errorMsg: "First Name cant be empty"
    },
    lastName:{
      id:"lastName",
      label: "Last Name",
      type: "text",
      placeholder : "Last Name...",
      value : "",
      isError : false,
      errorMsg: "Last Name cant be empty"
    },
    email:{
      id:"email",
      label: "Email",
      type: "email",
      placeholder : "Email...",
      value : "",
      isError : false,
      errorMsg: "Email cant be empty"
    },
    password:{
      id:"password",
      label: "Password",
      type: "text",
      placeholder : "Password",
      value : "",
      isError : false,
      errorMsg: "password cant be empty"
    },
    confirmPassword:{
      id:"confirmPassword",
      label: "Confirm Password",
      type: "text",
      placeholder : "Confirm Password",
      value : "",
      isError : false,
      errorMsg: "Confirm password cant be empty"
    }
  }

  const [formData, setFormData]= useState(defaultValues)
  const [isPassMatch, setIsPassMatch] = useState(true)

  const handleInput=(e)=>{
    const key = e.target.id;
    const value= e.target.value;
    console.log(key, value)
    const copyFormData= {...formData}
    copyFormData[key].value = value
    setFormData(copyFormData)
    isValidForm()
  }
  console.log(formData)

  const passwordMatch=()=>{
    const copyFormData={...formData}
    const pass = copyFormData["password"].value
    const cPass= copyFormData["confirmPassword"].value
    if(pass !== cPass){
      setIsPassMatch(false)
    }else{
      setIsPassMatch(true)
    }
  }

  const isValidForm=()=>{
    const copyFormData={...formData}
    Object.keys(copyFormData).forEach((key)=>{
      const obj = copyFormData[key]
      obj.isError = !obj.value ? true : false
      passwordMatch()
    }

    )
    setFormData(copyFormData)
  }

  const handleOnSubmit=(e)=>{
    e.preventDefault()
    isValidForm()
  }


  return (
    <div className='App'>
      <div className="container">
        <form onSubmit={handleOnSubmit}>
       {
        Object.keys(formData).map((key)=>{
          const {id, value, placeholder, label,type, isError, errorMsg} = formData[key]
          return <div className='form_item'>
            <label>{label}</label>
            <input
            id={id}
            placeholder={placeholder}
            type={type}
            value={value}
            onChange={handleInput}
            className={isError && "error_border"}
            />
            {
        isError && 
        <span className='error'>{errorMsg}</span>
       }  
        {
        key ===  "confirmPassword" &&
        !isPassMatch && <span className='error'>
          Password does not match
        </span>
       } 
          </div>

        })
       }     
       
      
       <div className='form_item'>
        <button>Submit</button>
       </div>
        </form>
      </div>
    </div>
  )
}

export default App
