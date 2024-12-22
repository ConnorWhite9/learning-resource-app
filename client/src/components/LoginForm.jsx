import React, {useState, useEffect} from "react";
import axios from 'axios';
import { useNavigate, Link } from "react-router-dom";
import Cookies from 'js-cookie';
import ErrorModal from "./ErrorModal";
import email from "../assets/email.png";
import password from '../assets/password.png';
import person from '../assets/person.png'
import { AuthProvider, useAuth } from '../context/AuthContext';

function LoginForm() {
    const { login, deactivateDemo, checkDemo } = useAuth();
    const apiUrl = import.meta.env.VITE_BACKEND_API.replace(/^"|"$/g, "").trim();
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
            const constructedUrl = `${apiUrl}/auth/get_csrf_token`;
            const response = await axios.get(constructedUrl, {
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
    
    
    



    const handleSubmit = async (event) => {
        event.preventDefault();

        // Prepare the data for the POST request
        const postData = {
            email: formData.email,
            password: formData.password, 
        };
        
        
        
        // Perform the login POST request
        try {
            const constructedUrl = `${apiUrl}/auth/login`;
            const postResponse = await axios.post(constructedUrl, postData, {
                headers: {
                    'Content-Type': 'application/json',  // Ensure the server expects JSON
                    'X-CSRF-Token': csrf_token,  // Include the CSRF token in the header
                },
                withCredentials: true  // This ensures that cookies are sent and received
            });
            
            
            const checker = checkDemo();
            if (checker) {
                deactivateDemo();
            }
            login();
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
                <div className="self-center ml-[auto] mr-[auto] mt-[5rem] min-h-[30rem] w-[25rem] p-10 rounded-lg bg-[white] flex flex-col items-center">
                    <h1 className="text-[3rem] decoration-white">Login</h1>
                    <hr className="h-[0.5rem] w-[5rem] rounded-[1rem] bg-black " />
                    <div className="flex items-center mt-[3rem] bg-gray-200 rounded-[1rem] px-[1rem] py-[0.3rem]">
                        <img src={email} />
                        <input
                        
                        name="email" 
                        type="email" 
                        onChange={handleChange} 
                        value={formData.email} 
                        className="h-[50px] w-[20rem] border-0 outline-none bg-gray-200 rounded-[1rem] pl-[25px] text-[#626262] text-[18px] max-md:w-[15rem]" 
                        placeholder='Email'/>
                    </div>
                    <div className="flex items-center mt-[3rem] bg-gray-200 rounded-[1rem] px-[1rem] py-[0.3rem]">
                        <img src={password} />
                        <input 
                        name="password"
                        onChange={handleChange}
                        type=""
                        value={formData.password} 
                        className="h-[50px] w-[20rem] border-0 outline-none bg-gray-200 rounded-[1rem] pl-[25px] text-[#626262]  text-[18px] max-md:w-[15rem]" 
                        placeholder='Password'/>
                    </div>
                    
                    <div className="flex items-center gap-3 mt-[3rem] ">
                        <button type="submit" className="h-[50px] text-center border-0 outline-none rounded-full  text-[white] bg-blue-600 text-[18px] w-[20rem] py-[0.5rem]" >Login</button>
                    </div>
                    <p className="text-[12px] text-center mt-[0.5rem]">
                            Don't Have An Account? <Link to="/register" className=" underline">Sign Up</Link>
                    </p>
                </div>
            </form>
            <ErrorModal open={isOpen} message={isError} onClose={closeModal}/>
        </>
        
    );
}

export default LoginForm;