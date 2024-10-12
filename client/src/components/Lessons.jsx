import React, {useState, useEffect} from "react";
import Lesson from "./Lesson";
import axios from "axios";
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


  const [loading, setLoading] = useState(true);  // Loading state
  const [error, setError] = useState(null);  // Error state
  const [userInfo, setUserInfo] = useState(null);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const grabInfo = async () => {

    try {
      const response = await axios.get(`http://localhost:8000/user/userInfo`, {
        headers: {
            'Content-Type': 'application/json'  // Ensure the server expects JSON
               
        },
        withCredentials: true  // This ensures that cookies are sent and received
    });
    console.log(response.data);
    setUserInfo(response.data);
    } catch (error){
      console.error("Error:", error)
    }
  }
  
  const [testQuizzes, setTestQuizzes] = useState({});


  const quizzes = async () => {

    try {
      const response = await axios.get(`http://localhost:8000/course/getAllQuiz`, {
        headers: {
            'Content-Type': 'application/json'  // Ensure the server expects JSON
               
        },
        withCredentials: true  // This ensures that cookies are sent and received
    });
    console.log(response.data)
    setTestQuizzes(response.data);
    } catch (error){
      console.error("Error:", error)
    }
  }


      const loginCheck = async () => {
          

        try {
          const response = await axios.post("http://localhost:8000/auth/refresh", {},
          {
            headers: {
                'Content-Type': 'application/json',  // Ensure the server expects JSON
            },
            withCredentials: true  // This ensures that cookies are sent and received
          })
        } catch(error) {
            console.error("Error:", error)
            navigate("/login");
          }
    }


    


  


  useEffect(() => {
    // Async function inside useEffect
    const fetchData = async () => {
      if (!isRefreshing) {
        await loginCheck();  // Assuming grabInfo is an async function  // Fetch quizzes
        await grabInfo();  // Assuming grabInfo is an async function
        await quizzes();    // Fetch quizzes
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
            quizzes={htmlQuizzes}
            documentation={htmlDocumentation}
            title="Introduction to HTML"
            color="#B2DF8A"
            video={htmlVideo}
            userInfo={userInfo}
          />
          <Lesson
            language="CSS"
            quizzes={cssQuizzes}
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
        </div>
      );
    }
}


export default Lessons;
