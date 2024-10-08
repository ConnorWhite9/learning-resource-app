import react, {useState} from "react";
import axios from 'axios';
import { useNavigate } from "react-router-dom";

function LogOut() {

    const navigate = useNavigate();
    try {
        const response = axios.post("http://localhost:8000/auth/logout",  {
            headers: {
                'Content-Type': 'application/json'  // Ensure the server expects JSON
                   
            },
            withCredentials: true  // This ensures that cookies are sent and receive

    })
        console.log(response.data)
        navigate("/");
    } catch(error)  {
            console.error("Error:", error)
    };

}

export default LogOut;