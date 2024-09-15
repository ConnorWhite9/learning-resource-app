import React, {useState} from "react";
import axios from 'axios';
import { useNavigate } from "react-router-dom";

function RegisterForm() {

    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        email: '',
        username: '',
        password: ''
      });
    

    const handleSubmit = (event) => {
        event.preventDefault();
        
        //React query Api call
        const postData = {
            email: formData.email,
            username: formData.username,
            password: formData.password, 
        }
        axios.post("http://localhost:8000/auth/register", postData, {
            headers: {
                'Content-Type': 'application/json'  // Ensure the server expects JSON
            }
        })
            .then((response) => {
                console.log(response.data);
                navigate("/login");
            })
            .catch((error) => {
                console.error("Error:", error)
            })
        //Reset form data
        setFormData({
            email: '',
            username: '',
            password: '',

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
                type=""
                value={formData.password} 
                className="h-[50px] w-[20rem] border-0 outline-none rounded-full pl-[25px] text-[#626262] bg-[#ebfffc] text-[18px]" 
                placeholder='Password'/>
            </div>
            <hr className="color-[white] mt-[1.5rem] w-[25rem]" />
            <div className="flex items-center gap-3 mt-[1.5rem] ">
                <button type="submit" className="h-[50px] text-center border-0 outline-none rounded-full  text-[#626262] bg-[#ffffff] text-[18px] w-[20rem] " ><p>Create Account </p></button>
            </div>
            </div>
        </form>
    );
}

export default RegisterForm;
