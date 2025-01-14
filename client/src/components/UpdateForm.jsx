import react, {useState, useEffect} from "react";
import ErrorModal from "./ErrorModal";
import email from '../assets/email.png';
import password from '../assets/password.png';
import person from '../assets/person.png';
import { useNavigate } from "react-router-dom";
import { useAuth } from '../context/AuthContext';
import axios from "axios";
import ChangePassword from './ChangePassword';
import UpdatePassword from './UpdatePasswordModal';


function UpdateForm() {
    const apiUrl = import.meta.env.VITE_BACKEND_API.replace(/^"|"$/g, "").trim();
    const { isLoggedIn } = useAuth();
    const [account, setAccount] = useState(null);
    const [isOpen, setIsOpen] = useState(false);
    const [isModalOne, setIsModalOne] = useState(false);
    const [isModalTwo, setIsModalTwo] = useState(false);
    const [formData, setFormData] = useState({
        email: '',
        username: '',
    });
    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData({
          ...formData,
          [name]: value
        });
      };
    const navigate = useNavigate();
    
    

    const grabAccount = async() => {
        try {
            const constructedUrl = `${apiUrl}/user/accountInfo`;
            const response = await axios.get(constructedUrl,
            {
                headers: {
                    'Content-Type': 'application/json',  // Ensure the server expects JSON
                    //'X-CSRF-Token': csrf_token,
                },
                withCredentials: true,  // This ensures that cookies are sent and received
            })
          
            setFormData({
                email: response.data[0].email,
                username: response.data[0].username
            });

            
        } catch(error) {
            console.error("There was an issue: ", error);
        }
    }

    useEffect(() => {
        if (!isLoggedIn) {
            navigate("/login");
        }
        const fetchAccountData = async () => {
            await grabAccount();
        };
    
        fetchAccountData();
    
        return () => {
            // Cleanup logic, if necessary
        };
    }, []); // Empty dependency array to run once on component mount

    

    const changePassword = () => {
        setIsModalOne(true);
    }
    const closeModalOne = () => {
        setIsModalOne(false);
    };

    const closeModalTwo = () => {
        setIsModalTwo(false);
    }

    const openNew = () => {
        setIsModalOne(false);
        setIsModalTwo(true);
    }
    const infoUpdate = async(event) => {
        event.preventDefault();
        try {
            const constructedUrl = `${apiUrl}/auth/infoUpdate`;
            const postData = {
                "email": formData.email,
                "username": formData.username
            }
            const response = await axios.post(constructedUrl, postData, {
                headers: {
                    'Content-Type': 'application/json',  // Ensure the server expects JSON
                    //'X-CSRF-Token': csrf_token,
                },
                withCredentials: true,  // This ensures that cookies are sent and received
            })

        } catch(error) {
            console.error(error);
        }
    }

    return (
        <>
            <form id="updateForm" >
                <div className="self-center ml-[auto] mr-[auto] mt-[5rem] min-h-[30rem] w-[35rem] p-10 rounded-lg bg-white flex flex-col items-center">
                <h1 className="text-[2.5rem] text-nowrap decoration-white">Account Information</h1>
                <hr className="w-[5rem] h-[0.5rem] bg-black rounded-[1rem]"/>
               
                <div className="flex items-center mt-[3rem] bg-gray-200 rounded-[1rem] px-[1rem] py-[0.3rem]">
                    
                    <img src={email} />
                    <input
                    name="email" 
                    type="email" 
                    value={formData.email}
                    onChange={handleChange}
                    className="h-[50px] w-[20rem] border-0 outline-none bg-gray-200 rounded-[1rem] pl-[25px] text-[#626262]  text-[18px]" 
                    placeholder={formData.email}/>
                </div>
                <div className="flex items-center mt-[3rem] bg-gray-200 rounded-[1rem] px-[1rem] py-[0.3rem]">
                    <img src={person} />
                    <input 
                    name="username"
                    onChange={handleChange}
                    value={formData.username}
                    type="text"
                     
                    className="h-[50px] w-[20rem] border-0 outline-none bg-gray-200 rounded-[1rem] pl-[25px] text-[#626262]  text-[18px]" 
                    placeholder={formData.username}/>
                </div>
                <div className="flex items-center mt-[3rem] bg-gray-200 rounded-[1rem] px-[1rem] py-[0.3rem]">
                    <img src={password} />
                    <button onClick={(e) => {
                    e.preventDefault(); // Prevent form submission
                    changePassword();
                    }} 
                    className="h-[50px] w-[20rem] border-0 outline-none bg-gray-200 rounded-[1rem] text-center text-[#626262] text-[18px]">
                        Change Password
                    </button>
                </div>
                
                <hr className="color-[white] mt-[1.5rem] w-[25rem]" />
                <div className="flex items-center gap-3 mt-[1.5rem] ">
                    <button type="submit" onClick={infoUpdate} className="h-[50px] text-center border-0 outline-none rounded-full  text-[white] bg-blue-600 text-[18px] w-[20rem] py-[0.5rem]">Save Changes</button>
                </div>
                </div>
            </form>
            {/*<ErrorModal open={isOpen} message={isError} onClose={closeModal} />*/}
            <ChangePassword open={isModalOne} onClose={closeModalOne} openNew={openNew} />
            <UpdatePassword open={isModalTwo} onClose={closeModalTwo} />
            
        </>
    );
}

export default UpdateForm;