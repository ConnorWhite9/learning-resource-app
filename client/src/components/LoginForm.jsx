import React, {useState, useEffect} from "react";
import axios from 'axios';
import { useNavigate, Link } from "react-router-dom";
import Cookies from 'js-cookie';
import ErrorModal from "./ErrorModal";


function LoginForm() {

    const navigate = useNavigate();
    
    const [isRefreshed, setIsRefreshed] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const [isError, setIsError] = useState(null);

    const closeModal = () => {
        setIsOpen(false);
    };

    const [count, setCount] = useState(0);
    const [formData, setFormData] = useState({
        email: '',
        password: ''
      });
     
    const [csrf_token, setCsrf_token] = useState([]);
    const csrf = async () => {
        try {
            const response = await axios.get("https://6491-67-250-141-193.ngrok-free.app/auth/get_csrf_token", {
                headers: {
                    'Content-Type': 'application/json'
                },
                withCredentials: true,  // Important to include cookies
                
            });
            setCsrf_token(response.data.csrf_token);
        } catch (error) {
            console.log(error);
            setIsOpen(true);
            setIsError("Could not grab CSRF token.");
        }
    }


    useEffect(() => {
        // Async function inside useEffect
        const fetchData = async () => {
            if (!isRefreshed) {
                csrf();
                setIsRefreshed(true);
            }
                
            
        };
    
        fetchData();  // Call async function
    
      }, []); 
    
    
      console.log(csrf_token);
    



    const handleSubmit = async (event) => {
        event.preventDefault();

        
        // Prepare the data for the POST request
        const postData = {
            email: formData.email,
            password: formData.password, 
        };
        
        
        
        // Perform the login POST request
        try {
            
            const postResponse = await axios.post("https://6491-67-250-141-193.ngrok-free.app/auth/login", postData, {
                headers: {
                    'Content-Type': 'application/json',  // Ensure the server expects JSON
                    'X-CSRF-Token': csrf_token,  // Include the CSRF token in the header
                },
                withCredentials: true  // This ensures that cookies are sent and received
            });
            
            console.log(postResponse.data); // Log the login response
            console.log(document.cookie); // Check all cookies in the browser
            navigate("/courses"); // Navigate to the courses page after successful login
        
        } catch (error) {
            
            console.error("Error:", error); // Log any errors
            
            
        
            // Enhanced error handling
            if (error.response) {
                // The request was made and the server responded with a status code
                console.error("Error Status:", error.response.status);
                console.error("Error Data:", error.response.data);
                
                // Display a specific error message based on the response
                setIsOpen(true);
                setIsError(`There was an issue with logging in: ${error.response.data.detail || 'Unknown error'}`);
            } else if (error.request) {
                // The request was made but no response was received
                console.error("No response received:", error.request);
                setIsOpen(true);
                setIsError('No response from the server. Please try again.');
            } else {
                // Something happened in setting up the request that triggered an Error
                
                console.error("Error Message:", error.message);
                setIsOpen(true);
                setIsError(`An unexpected error occurred: ${error.message}`);
            }
            return;
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
        <>
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
                    <p className="text-[12px] text-center mt-[0.5rem]">
                        Don't Have An Account? <Link to="/register" className=" hover:underline">Sign Up</Link>
                    </p>
                </div>
            </form>
            <ErrorModal open={isOpen} message={isError} onClose={closeModal}/>
        </>
        
    );
}

export default LoginForm;