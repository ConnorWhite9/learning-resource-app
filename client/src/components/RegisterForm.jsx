import React, {useState} from "react";
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import ErrorModal from "./ErrorModal";

function RegisterForm() {

    const navigate = useNavigate();
    const [isOpen, setIsOpen] = useState(false);
    const [isError, setIsError] = useState(false);
    const [csrf_token, setCsrf_token] = useState(null);

    const closeModal = () => {
        setIsOpen(false);
    };

    const [formData, setFormData] = useState({
        email: '',
        username: '',
        password: '',
        confirmPassword: '',
      });
    
    
    
    const handleSubmit = async (event) => {
        event.preventDefault();
        
        
        
        try {
            const response = await axios.get("https://learning-resource-app-f024.onrender.com/auth/get_csrf_token", {
                headers: {
                    'Content-Type': 'application/json'
                },
                withCredentials: true
            });
            console.log(response.status)
            console.log(response.data);
            
            setCsrf_token(response.data.csrf_token);
            
        } catch (error) {
            
            console.log(error);
            setIsOpen(true);
            setIsError("It appears there is already an account with this username or password");
            return;
        }
        
        //React query Api call
        const postData = {
            email: formData.email,
            username: formData.username,
            password: formData.password, 
        }

        if (formData.confirmPassword !== formData.password) {
            setIsOpen(true);
            setIsError("Password and password confirmation must be the same");
            return;
        }

        try { 
            const response = await axios.post("https://learning-resource-app-f024.onrender.com/auth/register", postData, {
                headers: {
                    'Content-Type': 'application/json',  // Ensure the server expects JSON
                    'X-CSRF-Token': csrf_token,
                },
                withCredentials: true
            })
            console.log(response.data);
            navigate("/login");

        } catch (error) {
            
            
            console.error("Error:", error); // Log any errors
            
        
            // Enhanced error handling
            if (error.response) {
                // The request was made and the server responded with a status code
                
                console.error("Error Status:", error.response.status);
                console.error("Error Data:", error.response.data);
                
                // Display a specific error message based on the response
                
                setIsOpen(true);
                setIsError(`There was an issue with logging in: ${error.response.data.detail}`);
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
        //Reset form data
        setFormData({
            email: '',
            username: '',
            password: '',
            confirmPassword: '',

        })
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
                <div className="self-center ml-[auto] mr-[auto] mt-[5rem] min-h-[30rem] w-[35rem] p-10 rounded-lg bg-[#6300ff] flex flex-col items-center">
                <h1 className="text-[2.5rem] text-nowrap decoration-white">Create An Account</h1>
                <div className="flex-column items-center gap-3 mt-[3rem]">
                    <input
                    name="email" 
                    type="email" 
                    onChange={handleChange} 
                    value={formData.email} 
                    className="h-[50px] w-[20rem] border-0 outline-none rounded-full pl-[25px] text-[#626262] bg-[#ebfffc] text-[18px]" 
                    placeholder='Email'/>
                </div>
                <div className="flex-column items-center gap-3 mt-[3rem]">
                    <input 
                    name="username"
                    onChange={handleChange}
                    type="text"
                    value={formData.username} 
                    className="h-[50px] w-[20rem] border-0 outline-none rounded-full pl-[25px] text-[#626262] bg-[#ebfffc] text-[18px]" 
                    placeholder='Username'/>
                </div>
                <div className="flex-column items-center gap-3 mt-[3rem]">
                    <input 
                    name="password"
                    onChange={handleChange}
                    type="text"
                    value={formData.password} 
                    className="h-[50px] w-[20rem] border-0 outline-none rounded-full pl-[25px] text-[#626262] bg-[#ebfffc] text-[18px]" 
                    placeholder='Password'/>
                </div>
                <div className="flex-column items-center gap-3 mt-[3rem]">
                    <input 
                    name="confirmPassword"
                    onChange={handleChange}
                    type="text"
                    value={formData.confirmPassword} 
                    className="h-[50px] w-[20rem] border-0 outline-none rounded-full pl-[25px] text-[#626262] bg-[#ebfffc] text-[18px]" 
                    placeholder='Confirm Password'/>
                </div>
                <hr className="color-[white] mt-[1.5rem] w-[25rem]" />
                <div className="flex items-center gap-3 mt-[1.5rem] ">
                    <button type="submit" className="h-[50px] text-center border-0 outline-none rounded-full  text-[#626262] bg-[#ffffff] text-[18px] w-[20rem] " ><p>Create Account </p></button>
                </div>
                </div>
            </form>
            <ErrorModal open={isOpen} message={isError} onClose={closeModal} />
        </>
    );
}

export default RegisterForm;
