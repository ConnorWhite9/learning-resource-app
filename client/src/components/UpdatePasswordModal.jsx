import react, {useState, useEffect} from "react";
import password from '../assets/password.png';
import axios from "axios";
import ErrorModal from './ErrorModal';

const UpdatePassword = ({open, onClose}) => {
    const apiUrl = import.meta.env.VITE_BACKEND_API.replace(/^"|"$/g, "").trim();
    const [isOpen, setIsOpen] = useState(false);
    const [message, setMessage] = useState(false);
    const onErrorClose = () => {
        setIsOpen(false);
    }
    const [formData, setFormData] = useState({
        password: '',
      
    });
    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData({
          ...formData,
          [name]: value
        });
      };

    const updateRequest = async() => {
        try {
            const constructedUrl = `${apiUrl}/auth/updatePassword`;
            const postData = {
                "password": formData.password
            }
            const response = await axios.post(constructedUrl, postData,
            {
                headers: {
                    'Content-Type': 'application/json',  // Ensure the server expects JSON
                    //'X-CSRF-Token': csrf_token,
                },
                withCredentials: true,  // This ensures that cookies are sent and received
            
            })
            if (response.data.message == true) {
                //set updatePassword modal to true
                onClose();
            } else {
                // oppen the error modal
                setIsOpen(true);
            }
            onClose();
        } catch(error) {
            console.error(error);
        }
    }
    
        
    if (open) {
        return (
            <>
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-lg p-6 max-w-sm w-full">
                    <h2 className="text-lg text-center font-bold mb-4">Please Enter Your Password</h2>
                    <div className="flex items-center mt-[3rem] bg-gray-200 rounded-[1rem] px-[1rem] py-[0.3rem]">
                                        
                        <img src={password} />
                        <input
                        name="password" 
                        type="password" 
                        value={formData.password}
                        onChange={handleChange}
                        className="h-[50px] w-[20rem] border-0 outline-none bg-gray-200 rounded-[1rem] pl-[25px] text-[#626262]  text-[18px]" 
                        placeholder="New Password"/>
                    </div>
                    <button
                        onClick={updateRequest}
                        className="bg-blue-500 w-full mt-3 text-white px-4 py-2 flex rounded hover:bg-blue-600"
                    >
                        Update Password
                    </button>
                    </div>
                </div>
                <ErrorModal open={isOpen} message={message} onClose={onErrorClose}/>
            </>
        );
    } else {
        return; 
    }
        
         
        
        
        
       
}

export default UpdatePassword;