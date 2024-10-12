import react, {useState, useEffect} from "react";
import axios from 'axios';
import { useNavigate } from "react-router-dom";

function LogOut() {

    const navigate = useNavigate();
    const [isRefreshed, setIsRefreshed] = useState(false);
    const removeCookies = async () => {
        try {
            const response = axios.post("http://localhost:8000/auth/logout",  {
                headers: {
                    'Content-Type': 'application/json'  // Ensure the server expects JSON
                    
                },
                withCredentials: true  // This ensures that cookies are sent and receive

        })
            console.log(response.data)
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
    
    }, []); 
}

export default LogOut;