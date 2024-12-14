import React, {useState, useEffect} from "react";
import Lesson from "./Lesson";
import axios from "axios";
import Cookies from 'js-cookie';
import { useNavigate } from "react-router-dom";
import ErrorModal from "./ErrorModal";
import { useAuth } from '../context/AuthContext';
//import Circle from "./Circle";

const htmlQuizzes = [
  ["Introduction to HTML", 1],
  ["HTML Document Standards", 2],
  ["Hyperlinks", 3],
  ["Images", 4],
  ["Text Formatting", 5],
  ["Lists", 6],
  ["Tables", 7],
  ["Span/Div", 8],
  ["Buttons", 9],
  ["Forms", 10]
];
const cssQuizzes = [
  ["Introduction to CSS", 1],
  ["In-line, Internal, and External CSS", 2],
  ["Box Model", 3],
  ["Fonts", 4],
  ["Borders", 5],
  ["Background", 6],
  ["Margins", 7],
  ["Position", 8],
  ["Pseudo Classes", 9],
  ["Shadows", 10], 
  ["Icons", 11]
];
const pythonQuizzes = [
  ["Introduction to Python", 1],
  ["Variables and Data Types", 2],
  ["Output/Printing", 3],
  ["User Input", 4],
  ["Lists", 5],
  ["Loops", 6],
  ["Functions", 7],
  ["Classes", 8],
  ["String Methods", 9]
];

const htmlDocumentation = [
  "https://www.w3schools.com/html/",
  "https://developer.mozilla.org/en-US/docs/Learn/HTML/Introduction_to_HTML",
];
const cssDocumentation = [
  "https://www.w3schools.com/css/",
  "https://developer.mozilla.org/en-US/docs/Learn/CSS",
];
const pythonDocumentation = [
  "  https://www.w3schools.com/python/",
  "https://www.geeksforgeeks.org/python-programming-language-tutorial/",
];

const htmlVideo = "https://www.youtube.com/embed/HD13eq_Pmp8";
const cssVideo = "https://www.youtube.com/embed/wRNinF7YQqQ";
const pythonVideo = "https://www.youtube.com/embed/VchuKL44s6E"





function Lessons() {

  const apiUrl = import.meta.env.VITE_BACKEND_API;
  const [loading, setLoading] = useState(true);  // Loading state
  const [error, setError] = useState(null);  // Error state
  const [userInfo, setUserInfo] = useState(null);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const { checkDemo } = useAuth();

  const closeModal = () => {
    setIsOpen(false);
  };

  const navigate = useNavigate();

  const loginCheck = async () => {
         
    
    const response = await axios.get(`${apiUrl}/auth/get_csrf_token`, {
      headers: {
          'Content-Type': 'application/json'
      },
      withCredentials: true,  // Important to include cookies
    });
    
    //console.log(response.status);
    //console.log(response.data);
  
    // Log the response to check if the token is retrieved
    const csrf_token = response.data.csrf_token;
    
    // Retrieve the CSRF token from the cookie
    
    try {
      const response = await axios.post(`${apiUrl}/auth/refresh`, {},
      {
        headers: {
            'Content-Type': 'application/json',  // Ensure the server expects JSON
            'X-CSRF-Token': csrf_token,
        },
        withCredentials: true,  // This ensures that cookies are sent and received
      })
      console.log("This is right before the modal");
      if (response.status !== 200) {
        navigate("/login");
      }
      
    } catch(error) {
        console.error("Error:", error)
        navigate("/login");
      }
}


  const grabInfo = async () => {

    try {
      const response = await axios.get(`${apiUrl}/user/userInfo`, {
        headers: {
            'Content-Type': 'application/json'  // Ensure the server expects JSON
               
        },
        withCredentials: true  // This ensures that cookies are sent and received
    });
    console.log(response.data);
    setUserInfo(response.data);
    } catch (error){
      console.error("Error:", error)
      setIsOpen(true);
      setError("There was an issue grabbing your account information. Reload the page and make sure you are logged in.");
    }
  }
  
  const [testQuizzes, setTestQuizzes] = useState({});


  const quizzes = async () => {

    try {
      const response = await axios.get(`${apiUrl}/course/getAllQuiz`, {
        headers: {
            'Content-Type': 'application/json'  // Ensure the server expects JSON
               
        },
        withCredentials: true  // This ensures that cookies are sent and received
    });
    console.log(response.data)
    setTestQuizzes(response.data);
    } catch (error){
      console.error("Error:", error)
      setIsOpen(true);
      setError("There was an issue grabbing the quizzes.");
    }
  }



  useEffect(() => {
    // Async function inside useEffect
    const fetchData = async () => {
      if (!isRefreshing) {
        const checker = checkDemo();
        if (checker === false){
          await loginCheck();  
          await grabInfo();  
        
          
        } 
        await quizzes(); // Fetch quizzes
        setLoading(false);
      }
    };

    fetchData();  // Call async function

  }, []); 

    if (loading) {
      return  <p>Loading ... </p> 
      {/*<Circle />*/}
    }
    else {
      return (
        <div>
          <Lesson
            language="HTML"
            quizzes={testQuizzes["HTML"]}
            documentation={htmlDocumentation}
            title="Introduction to HTML"
            color="#B2DF8A"
            video={htmlVideo}
            userInfo={userInfo}
          />
          <Lesson
            language="CSS"
            quizzes={testQuizzes["CSS"]}
            documentation={cssDocumentation}
            title="Introduction to CSS"
            color="#FFA76C"
            video={cssVideo}
            userInfo={userInfo}
          />
          <Lesson
            language="Python"
            quizzes={testQuizzes["Python"]}
            documentation={pythonDocumentation}
            title="Introduction to Python"
            color="#A6DBFF"
            video={pythonVideo}
            userInfo={userInfo}
          />
          <ErrorModal open={isOpen} message={error} onClose={closeModal} />
        </div>
      );
    }
}


export default Lessons;
