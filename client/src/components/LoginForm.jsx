import React, {useState} from "react";
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import Cookies from 'js-cookie';

function LoginForm() {

    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        email: '',
        password: ''
      });
    
    
    const handleSubmit = async (event) => {
        event.preventDefault();

        const response = await axios.get("http://localhost:8000/auth/get_csrf_token", {
            headers: {
                'Content-Type': 'application/json'
            },
            withCredentials: true  // Important to include cookies
        });
        
        // Log the response to check if the token is retrieved
        console.log(response.data);
        
        // Prepare the data for the POST request
        const postData = {
            email: formData.email,
            password: formData.password, 
        };
        
        // Retrieve the CSRF token from the cookie
        /*const csrf_token = Cookies.get('csrf_token');
        if (!csrf_token) {
            console.error("CSRF token is not set or could not be retrieved.");
            return; // Early exit if the CSRF token is not found
        }*/
        
        // Perform the login POST request
        try {
            const postResponse = await axios.post("http://localhost:8000/auth/login", postData, {
                headers: {
                    'Content-Type': 'application/json',  // Ensure the server expects JSON
                    //'X-CSRF-Token': csrf_token,  // Include the CSRF token in the header
                },
                withCredentials: true  // This ensures that cookies are sent and received
            });
        
            console.log(postResponse.data); // Log the login response
            console.log(document.cookie); // Check all cookies in the browser
            navigate("/courses"); // Navigate to the courses page after successful login
        
        } catch (error) {
            console.error("Error:", error); // Log any errors
        }
        
        // Reset form data
        setFormData({
            email: '',
            password: '',
        });
    }
    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData({
          ...formData,
          [name]: value
        });
      };
    
    return (
        <form id="loginForm" onSubmit={handleSubmit}>
            <div className="self-center ml-[auto] mr-[auto] mt-[5rem] min-h-[30rem] w-[25rem] p-10 rounded-lg bg-[#6300ff] flex flex-col items-center">
            <h1 className="text-[3rem] decoration-white">Log In </h1>
            <div className="flex items-center gap-3 mt-[3rem]">
                <input
                
                name="email" 
                type="email" 
                onChange={handleChange} 
                value={formData.email} 
                className="h-[50px] w-[16rem] border-0 outline-none rounded-full pl-[25px] text-[#626262] bg-[#ebfffc] text-[18px]" 
                placeholder='Email'/>
            </div>
            <div className="flex items-center gap-3 mt-[3rem]">
                <input 
                name="password"
                onChange={handleChange}
                type=""
                value={formData.password} 
                className="h-[50px] w-[16rem] border-0 outline-none rounded-full pl-[25px] text-[#626262] bg-[#ebfffc] text-[18px]" 
                placeholder='Password'/>
            </div>
            <div className="flex items-center gap-3 mt-[3rem] ">
                <button type="submit" className="h-[50px] text-center border-0 outline-none rounded-full  text-[#626262] bg-[#ebfffc] text-[18px] w-[14rem] " ><p>Log In</p></button>
            </div>
                <p className="text-[12px] text-center mt-[0.5rem]">Don't Have An Account? Sign Up</p>
            </div>
        </form>
    );
}

export default LoginForm;