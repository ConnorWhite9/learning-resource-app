import react, {useState, useEffect} from "react";
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import { AuthProvider, useAuth } from '../context/AuthContext';

function LogOut() {
    const apiUrl = import.meta.env.VITE_BACKEND_API.replace(/^"|"$/g, "").trim();
    const { logout, deactivateDemo } = useAuth();
    const navigate = useNavigate();
    const [isRefreshed, setIsRefreshed] = useState(false);
    const removeCookies = async () => {
        try {
            const response = await axios.post(`${apiUrl}/auth/logout`, {},  {
                headers: {
                    'Content-Type': 'application/json'  // Ensure the server expects JSON
                    
                },
                withCredentials: true  // This ensures that cookies are sent and receive

            })
            console.log(response.data);
            logout();
            deactivateDemo();
            navigate("/");
        } catch(error)  {
                console.error("Error:", error)
                navigate("/");
        };
    }
    useEffect(() => {
        // Async function inside useEffect
        const fetchData = async () => {
            if (!isRefreshed){
                await removeCookies();  // Assuming grabInfo is an async function  // Fetch quizzes
                setIsRefreshed(true);
            }
            
        }
        
    
        fetchData();  // Call async function
        return () => {
            setIsRefreshed(false);
        };
    }, [isRefreshed]); 
    
}

export default LogOut;