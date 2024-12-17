import react from "react";
import ErrorModal from "./ErrorModal";
import email from '../assets/email.png';
import password from '../assets/password.png';
import person from '../assets/person.png';


function UpdateForm() {
    return (
        <>
            <form id="loginForm" >
                <div className="self-center ml-[auto] mr-[auto] mt-[5rem] min-h-[30rem] w-[35rem] p-10 rounded-lg bg-white flex flex-col items-center">
                <h1 className="text-[2.5rem] text-nowrap decoration-white">Sign Up</h1>
                <hr className="w-[5rem] h-[0.5rem] bg-black rounded-[1rem]"/>
                <div className="flex items-center mt-[3rem] bg-gray-200 rounded-[1rem] px-[1rem] py-[0.3rem]">
                    <img src={email} />
                    <input
                    name="email" 
                    type="email" 
    
                    className="h-[50px] w-[20rem] border-0 outline-none bg-gray-200 rounded-[1rem] pl-[25px] text-[#626262]  text-[18px]" 
                    placeholder='Email'/>
                </div>
                <div className="flex items-center mt-[3rem] bg-gray-200 rounded-[1rem] px-[1rem] py-[0.3rem]">
                    <img src={person} />
                    <input 
                    name="username"
                    
                    type="text"
                     
                    className="h-[50px] w-[20rem] border-0 outline-none bg-gray-200 rounded-[1rem] pl-[25px] text-[#626262]  text-[18px]" 
                    placeholder='Username'/>
                </div>
                <div className="flex items-center mt-[3rem] bg-gray-200 rounded-[1rem] px-[1rem] py-[0.3rem]">
                    <img src={password} />
                    <input 
                    name="password"
                    
                    type="text"
                   
                    className="h-[50px] w-[20rem] border-0 outline-none bg-gray-200 rounded-[1rem] pl-[25px] text-[#626262]  text-[18px]" 
                    placeholder='Password'/>
                </div>
                <div className="flex items-center mt-[3rem] bg-gray-200 rounded-[1rem] px-[1rem] py-[0.3rem]">
                    <img src={password} />
                    <input 
                    name="confirmPassword"
             
                    type="text"
           
                    className="h-[50px] w-[20rem] border-0 outline-none bg-gray-200 rounded-[1rem] pl-[25px] text-[#626262]  text-[18px]" 
                    placeholder='Confirm Password'/>
                </div>
                <hr className="color-[white] mt-[1.5rem] w-[25rem]" />
                <div className="flex items-center gap-3 mt-[1.5rem] ">
                    <button type="submit" className="h-[50px] text-center border-0 outline-none rounded-full  text-[white] bg-blue-600 text-[18px] w-[20rem] py-[0.5rem]" >Sign Up</button>
                </div>
                </div>
            </form>
            {/*<ErrorModal open={isOpen} message={isError} onClose={closeModal} />*/}
        </>
    );
}

export default UpdateForm;