import React, {useEffect} from 'react'
import { useNavigate } from "react-router-dom";
import axiosinstance from '../utils/axiosinstance';



const Profile = () => {
  const navigate = useNavigate()
  const user = JSON.parse(localStorage.getItem('user'))
  const jwt_access =localStorage.getItem('access')

  useEffect(() =>{
    if (jwt_access === null && !user ){
      navigate("/signin")
    }

  }, [])

  return (
    <div>
      <h2>hi {user && user.names}</h2>
      <p>Welcome to your profile</p>
      <button className="btn btn-lg btn-danger">Sign Out</button>
    </div>
  )
}

export default Profile
