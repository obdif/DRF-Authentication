import React, {useState} from "react";
import axios  from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";




const VerifyEmail = () => {
  const [otp, setOtp]=useState("")
  const navigate = useNavigate();
  const handleSubmit = async (e)=>{
    e.preventDefault()
    if (otp) {
      const response= await axios.post("http://127.0.0.1:8000/api/v1/auth/verify-email/", {"otp":otp})
      // const response=res.data
      if (response.status === 200){
          navigate("/signin")
          toast.success(response.data.message)

      }
    }
  }
  return (
    <div>
      <h2>VERIFY YOUR EMAIL ADDRESS</h2>
      <form action="" onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="formGroupExampleInput" className="form-label">
            Enter your OTP code
          </label>
          <input
            type="text"
            className="form-control"
            id="formGroupExampleInput"
            placeholder="Enter OTP"
            name="otp"
            value={otp}
            onChange={(e)=>setOtp(e.target.value)}
          />
        </div>
        <input
          class="btn btn-lg btn-primary"
          type="submit"
          value="Submit"
          className="submitBtn"
        />
      </form>
    </div>
  );
};

export default VerifyEmail;
