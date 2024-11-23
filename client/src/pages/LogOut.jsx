import react, {useState, useEffect} from "react";
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import { AuthProvider, useAuth } from '../context/AuthContext';

function LogOut() {

    const { logout } = useAuth();
    const navigate = useNavigate();
    const [isRefreshed, setIsRefreshed] = useState(false);
    const removeCookies = async () => {
        try {
            const response = await axios.post("https://2ae8-67-250-141-193.ngrok-free.app/auth/logout", {},  {
                headers: {
                    'Content-Type': 'application/json'  // Ensure the server expects JSON
                    
                },
                withCredentials: true  // This ensures that cookies are sent and receive

            })
            console.log(response.data)
            logout();
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