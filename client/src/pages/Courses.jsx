import React, {useEffect} from 'react'
import Lessons from '../components/Lessons'
import { useNavigate } from "react-router-dom";
import axios from 'axios';  // Import axios



function Courses() {

  const navigate = useNavigate();

  const loginCheck = async () => {
      

      try {
        const response = await axios.post("http://localhost:8000/auth/refresh", {},
        {
          headers: {
              'Content-Type': 'application/json',  // Ensure the server expects JSON
          },
          withCredentials: true  // This ensures that cookies are sent and received
        })
      } catch(error) {
          console.error("Error:", error)
          navigate("/login");
        }
  }
  useEffect(() => {
    loginCheck();
  }, []);  //



  return (
    <div className='bg-black'>
      <Lessons /> 
    </div>
  )
}

export default Courses
