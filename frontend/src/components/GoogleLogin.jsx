import React, { useEffect } from "react";
import { gapi } from "gapi-script";
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const GoogleLogin = () => {
  const navigate = useNavigate();

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

  useEffect(() => {
    function start() {
      gapi.client.init({
        clientId: "37845926959-o86oop0ptqtno0j7me315ctps0tnr3ok.apps.googleusercontent.com",
        scope: "email",
      });
    }
    gapi.load("client:auth2", start);
  }, []);

  const onSuccess = (googleUser) => {
    console.log("Logged in as: " + googleUser.getBasicProfile().getName());
    const idToken = googleUser.getAuthResponse().id_token;
    handleSignInWithGoogle({ credential: idToken });
  };

  const onFailure = (error) => {
    console.log("Failed to login: " + error);
  };

  const handleLogin = () => {
    const auth2 = gapi.auth2.getAuthInstance();
    auth2.signIn().then(onSuccess).catch(onFailure);
  };

  return (
    <div>
      <button onClick={handleLogin} id="signIn" className="btn btn-lg btn-danger">
        Sign up with Google
      </button>
    </div>
  );
};

export default GoogleLogin;
