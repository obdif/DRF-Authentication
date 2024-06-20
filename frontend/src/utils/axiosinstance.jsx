import axios from "axios";




const token = localStorage.getItem('access') ? JSON.parse(localStorage.getItem('access')) : ""
const refresh_token = localStorage.getItem('refresh') ? JSON.parse(localStorage.getItem('refresh')) : ""

const baseUrl ="http://127.0.0.1:8000/api/v1"
const axiosinstance = axios.create({
    baseURL:baseUrl,
    'content-type':'application/json',
    headers:{Authorization: localStorage.getItem('access') ? `Bearer ${token}`: null}
})


export default axiosinstance