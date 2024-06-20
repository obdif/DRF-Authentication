import React, { useState } from 'react'
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";





const Signin = () => {
  const navigate = useNavigate();
  const[signin, setSignin]=useState({
      email:"",
      password:""
  })

  const [error, setError] =useState("")
  const [loading, setLoading]=useState(false)

  const handleOnchange = (e)=>{
    setSignin({...signin, [e.target.name]:e.target.value})
  }

  const {email, password }= signin


  const handleSubmit = async (e) =>{
    e.preventDefault()
    if(!email || !password ){
        setError("Email and Password required")
    }
    else{
        setLoading(true)
        //BACKEND API CALL
        const res = await axios.post("http://127.0.0.1:8000/api/v1/auth/login/", signin)
        // CHECK API RESPONSE
        const response=res.data
        console.log(response)
        setLoading(false)
        
        const user={
          "email":response.email,
          "names":response.full_name
        }

        if (res.status === 200){
          localStorage.setItem("user", JSON.stringify(user))
          localStorage.setItem("access", JSON.stringify(response.access_token))
          localStorage.setItem("refresh", JSON.stringify(response.refresh_token))
            navigate("/dashboard")
            toast.success("Login successfully")

        }
    }
}


  return (
    <div className="signup-form">
      <h2>SIGN IN TO YOUR ACCOUNT</h2>
      <form action="" onSubmit={handleSubmit}>
        {loading && (
          <p>Loading...</p>
        )}
        
        <div className="mb-3">
          <label htmlFor="formGroupExampleInput" className="form-label">
            Email
          </label>
          <input
            type="email"
            className="form-control"
            id="formGroupExampleInput"
            name="email"
            placeholder="Enter your email Address"
            value={email}
            onChange={handleOnchange}
          />
        </div>

        <div className="mb-3">
          <label htmlFor="formGroupExampleInput2" className="form-label">
            Password
          </label>
          <input
            type="password"
            className="form-control"
            id="formGroupExampleInput2"
            name="password"
            value={password}
            placeholder="Enter your password"
            onChange={handleOnchange}
          />
        </div>

        <input className="btn btn-lg btn-primary submitBtn" type="submit" value="Submit" />
      </form>
      <h3>Or</h3>
      <div className="d-grid gap-2">
  <button className="btn btn-lg btn-danger" type="button">Sign up with Google</button>
  <button className="btn btn-lg btn-secondary" type="button">Sign up with GitHub</button>
</div>
    </div>
  )
}

export default Signin
