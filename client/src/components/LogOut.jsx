import react, {useState} from "react";
import axios from 'axios';
import { useNavigate } from "react-router-dom";

function LogOut() {

    const navigate = useNavigate();

    axios.post("http://localhost:8000/auth/logout",  {
        headers: {
            'Content-Type': 'application/json'  // Ensure the server expects JSON
               
        },
        withCredentials: true  // This ensures that cookies are sent and received
    })
        .then((response) => {
            console.log(response.data);

            navigate("/login");
            
        })
        .catch((error) => {
            console.error("Error:", error)
        })

    }

export default LogOut;