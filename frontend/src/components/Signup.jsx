import React, { useState, useEffect} from "react";
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
// import GoogleLogin from "./GoogleLogin";
import { gapi } from "gapi-script";




const Signup = () => {
    const navigate = useNavigate();
    const[formdata, setFormData]=useState({
        email:"",
        first_name:"",
        last_name:"",
        password:"",
        password2:""
    })

    const handleSignInWithGoogle = async (response) => {
      const payload = response.credential;
  
      try {
        const server_res = await axios.post("http://127.0.0.1:8000/api/v1/auth/google", { access_token: payload });
        console.log(server_res);
        if (server_res.status === 200) {
          navigate("/dashboard");
          toast.success("Successfully logged in!");
        } else {
          toast.error("Failed to log in");
        }
      } catch (error) {
        console.error("Error during Google login:", error);
        toast.error("An error occurred while logging in");
      }
    };
  
    // useEffect(() => {
    //   /* global google */
    //   google.accounts.id.initialize({
    //     client_id: "37845926959-o86oop0ptqtno0j7me315ctps0tnr3ok.apps.googleusercontent.com",
    //     callback: handleSignInWithGoogle,
    //   });
    //   google.accounts.id.renderButton(
    //     document.getElementById("signInDiv"),
    //     { theme: "outline", size: "large", text: "continue_with", shape: "circle", width: "280" }
    //   );
    //   google.accounts.id.prompt(); // Display the One Tap prompt
    // }, []);
  
    // const handleSignInWithGoogle = async (response) =>{
    //   const payload=response.crediential
    //   const server_res=await axios.post("http://127.0.0.1/api/v1/auth/google", {"access_token": payload})
    //   console.log(server_res)

    // }

    useEffect(() => {
      // Ensure `google` is defined in the global scope
      if (window.google) {
          window.google.accounts.id.initialize({
              // client_id:import.meta.env.VITE_CLIENT_ID,
              client_id:'37845926959-o86oop0ptqtno0j7me315ctps0tnr3ok.apps.googleusercontent.com', 
              callback: handleSignInWithGoogle
          });
          window.google.accounts.id.renderButton(
              document.getElementById('signInDiv'),
              { theme: "outline", size: "large", text: "continue_with", shape: "circle", width: "280" }
          );
      } else {
          console.error('Google client library not loaded');
      }
  }, []);


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
        {/* <GoogleLogin/> */}
        {/* <div className="googleContainer btn" id="signInDiv"></div> */}
        <div id="signInDiv"></div>
  <button className="btn btn-lg btn-danger" type="button">Sign up with Google</button>
  <button className="btn btn-lg btn-secondary" type="button">Sign up with GitHub</button>
</div>
    </div>
  );
};

export default Signup;
