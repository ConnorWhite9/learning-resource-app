import react, {useState, useEffect} from "react";
import password from '../assets/password.png';

const ChangePassword = ({open, onClose}) => {
    
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

    const checkPassword = () => {

    }
    
        
    if (open) {
        return (
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
                    placeholder="Password"/>
                </div>
                <button
                    onClick={onClose}
                    className="bg-blue-500 w-full mt-3 text-white px-4 py-2 flex rounded hover:bg-blue-600"
                >
                    Check Password
                </button>
                </div>
            </div>
        );
    } else {
        return; 
    }
        
         
        
        
        
       
}

export default ChangePassword;