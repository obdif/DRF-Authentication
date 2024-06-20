import React, { useState } from "react";
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Signup = () => {
    const navigate = useNavigate();
    const[formdata, setFormData]=useState({
        email:"",
        first_name:"",
        last_name:"",
        password:"",
        password2:""
    })
const [error, setError] =useState("")

const handleOnchange = (e)=>{
    setFormData({...formdata, [e.target.name]:e.target.value})
}

const{email, first_name, last_name, password, password2} = formdata


const handleSubmit = async (e) =>{
    e.preventDefault()
    if(!email || !first_name || !last_name || !password || !password2){
        setError("all fields are required")
    }
    else{
        //BACKEND API CALL
        const res = await axios.post("http://127.0.0.1:8000/api/v1/auth/register/", formdata)
        // CHECK API RESPONSE
        const response=res.data
        if (res.status === 201){
            navigate("/otp/verify")
            toast.success(response.message)

        }
    }
}

  return (
    <div className="signup-form">
      <h2>CREATE ACCOUNT</h2>
      <p style={{color:"red", padding:"5px"}}>{error? error: ""}</p>
      <form action="" onSubmit={handleSubmit}>
        <div className="mb-3">
          <label  className="form-label">
            First Name
          </label>
          <input
            type="text"
            className="form-control"
            name="first_name"
            placeholder="Your First Name"
            value={first_name}
            onChange={handleOnchange}
          />
        </div>

        <div className="mb-3">
          <label  className="form-label">
            Last Name
          </label>
          <input
            type="text"
            className="form-control"
            placeholder="Your Last Name"
            name="last_name"
            value={last_name}
            onChange={handleOnchange}
          />
        </div>

        <div className="mb-3">
          <label  className="form-label">
            Email
          </label>
          <input
            type="email"
            className="form-control"
            placeholder="Enter your email Address"
            name="email"
            value={email}
            onChange={handleOnchange}
          />
        </div>

        <div className="mb-3">
          <label  className="form-label">
            Password
          </label>
          <input
            type="password"
            className="form-control"
            placeholder="Enter your password"
            name="password"
            value={password}
            onChange={handleOnchange}
          />
        </div>

        <div className="mb-3">
          <label  className="form-label">
            Confirm Password
          </label>
          <input
            type="password"
            className="form-control"
            placeholder="Confirm your password"
            name="password2"
            value={password2}
            onChange={handleOnchange}
          />
        </div>
        <input className="btn btn-lg btn-primary" type="submit" value="Submit"  />
      </form>
      <h3>Or</h3>
      <div className="d-grid gap-2">
  <button className="btn btn-lg btn-danger" type="button">Sign up with Google</button>
  <button className="btn btn-lg btn-secondary" type="button">Sign up with GitHub</button>
</div>
    </div>
  );
};

export default Signup;
