import React, {useState, useEffect} from "react";
import Lesson from "./Lesson";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import ErrorModal from "./ErrorModal";
import { useAuth } from '../context/AuthContext';
import Circle from "./Circle"
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

  const apiUrl = import.meta.env.VITE_BACKEND_API.replace(/^"|"$/g, "").trim();
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


  const grabInfo = async () => {

    try {
      const constructedUrl = `${apiUrl}/user/userInfo`;
      console.log(constructedUrl);
      const response = await axios.get(constructedUrl, {
        headers: {
            'Content-Type': 'application/json'  // Ensure the server expects JSON
               
        },
        withCredentials: true  // This ensures that cookies are sent and received
    });
    setUserInfo(response.data);
    } catch (error){
        console.log(error);
        navigate("/login");
        // Handle unauthorized access, such as redirecting to login or showing an error message
      
      setIsOpen(true);
      setError("There was an issue grabbing your account information. Reload the page and make sure you are logged in.");

    }
  }
  
  const [testQuizzes, setTestQuizzes] = useState({});


  const quizzes = async () => {

    try {
      const constructedUrl = `${apiUrl}/course/getAllQuiz`;
      console.log("Constructed Url", constructedUrl);
      const response = await axios.get(constructedUrl, {
        headers: {
            'Content-Type': 'application/json'  // Ensure the server expects JSON
               
        },
        withCredentials: true  // This ensures that cookies are sent and received
    });
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
        if (checker === false) {
          await grabInfo();  
        } else {
          const demoUser = JSON.parse(localStorage.getItem('demoUser'));
          
          console.log(demoUser);
        
          if (demoUser) {
            setUserInfo(demoUser); // Asynchronous update
          } else {
            console.error("Demo user is null or undefined in localStorage");
          }
        }
        await quizzes(); // Fetch quizzes
        setLoading(false);
      }
    };

    fetchData();  // Call async function

  }, []); 

    if (loading) {
      return <Circle  /> 
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
