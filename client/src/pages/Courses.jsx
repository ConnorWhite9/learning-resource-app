import React, {useEffect} from 'react'
import Lessons from '../components/Lessons'
import { useNavigate } from "react-router-dom";
import axios from 'axios';  // Import axios



function Courses() {

  const navigate = useNavigate();

  



  return (
    <div className='bg-black'>
      <Lessons /> 
    </div>
  )
}

export default Courses
