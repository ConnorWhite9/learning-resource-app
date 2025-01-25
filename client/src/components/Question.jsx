import react, {useState, useEffect} from "react";
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import ErrorModal from "./ErrorModal";
import { useAuth } from '../context/AuthContext';
import Circle from './Circle';

function setQuestion(props){

    const apiUrl = import.meta.env.VITE_BACKEND_API.replace(/^"|"$/g, "").trim();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);  // Loading state
    const [isError, setIsError] = useState(null);  // Error state
    const [isOpen, setIsOpen]  = useState(false);
    const [isFinished, setIsFinished] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const { checkDemo } = useAuth();
    const closeModal = () => {
        setIsOpen(false);
    };


    const [questions, setQuestions] = useState(null);
    const [quiz_id, setQuiz_id] = useState(null);
    
    const grabQuestions = async () => {
        try {
            const constructedUrl = `${apiUrl}/course/getQuiz/?course=${props.course}&level=${props.level}`;
            const response = await axios.get(constructedUrl, {
                headers: {
                    'Content-Type': 'application/json'  // Ensure the server expects JSON
                    
                },
                withCredentials: true  // This ensures that cookies are sent and received
            })

            console.log(response.data);
            setQuestions(response.data.questions);
            setQuiz_id(response.data.quiz_id);
        } catch(error) {
            console.log(error);
            setIsOpen(true);
            setIsError("There was an error in grabbing the questions for the quiz");
        }
    }
    





    const [answers, setAnswers] = useState({
        1: 0,
        2: 0, 
        3: 0, 
        4: 0,
        5: 0,
        6: 0, 
        7: 0, 
        8: 0,
        9: 0,
        10: 0,

    })
    const [index, setIndex] = useState(1);
    //const [question, setQuestion] = useState(index);
    const [choice, setChoice] = useState(0);

    const updateAnswer = (newAnswer) => {
        setAnswers((prevAnswer) => ({
          ...prevAnswer,  // Copy the previous state
          [index]: newAnswer // Update only the name property
        }));
      };

    const updateChoice = (newChoice) => {
        setChoice(newChoice);
        setAnswers((prevAnswer) => ({
            ...prevAnswer,
            [index]: newChoice,
        }))
        console.log(answers);
    };

    
    const resetChoice = () => {
        setChoice(0);
        setIndex(prevIndex => prevIndex + 1);
    }

    const prev = () => {
        setChoice(0);
        setIndex(prevIndex => prevIndex - 1)
    }
    
    const submit = async () => {
        const checker = checkDemo();
        
        const postData = {
            "quiz_id": quiz_id,
            "answers": answers,
            "isDemo": checker

        }
        try {
            const constructedUrl = `${apiUrl}/course/grade`;  
            const response = await axios.post(constructedUrl, postData, {
                headers: {
                    'Content-Type': 'application/json'  // Ensure the server expects JSON
                    
                },
                withCredentials: true  // This ensures that cookies are sent and received
            })
            console.log(response.data);
            setIsSubmitted(true);
            
            if (checker) {
                const info = response.data["grade"]
                const demoUser = JSON.parse(localStorage.getItem('demoUser'));
                const pathParts = new URL(window.location.href).pathname.split('/'); // Split the URL into parts based on "/"

                // Extract course name and course number from the path
                const courseName = pathParts[2];  // "HTML"
                
               
                // Add a new key-value pair to the quizScores object
                // Ensure that the course name exists in quizScores
                if (!demoUser.grades[courseName]) {
                    demoUser.grades[courseName] = {};  // Initialize if it doesn't exist
                }
                
                // Now set the value for the specific course number
                demoUser.grades[courseName][quiz_id] = info;

                // Save the updated demoUser object back to localStorage
                localStorage.setItem('demoUser', JSON.stringify(demoUser));
            }
            
            setLoading(true);
            setTimeout(() => {
                navigate("/courses");
            }, 1000);
            
        } catch (error){
            console.error("error", error);
            setIsOpen(true);
            setIsError("There was an error in grading your assignment");
        }
                
            
        
    }

    useEffect(() => {
        // Async function inside useEffect
        const fetchData = async () => {
            if (!isFinished) {
                await grabQuestions();  // Assuming grabInfo is an async function 
                setLoading(false);
                setIsFinished(true);
            }
        };
    
        fetchData();  // Call async function
    
      }, []); 

    if (loading || isSubmitted) {
        return <Circle />
    }

    return (
        <>
            <div className="ml-auto mr-auto mt-[10rem] bg-[white] w-[30rem] h-[35rem] p-[3rem]  flex-column rounded-[10%]">
                <ul className="ml-auto mr-auto flex-column">
                    <p className="text-[1.2rem]">{index}: {questions[index]["question"]} </p>
                    {questions[index].options.map(option => (
                    <li key={option[0]}>
                        <label>
                        <button
                            style={{ 
                                backgroundColor: answers[index] === option[0] ? 'blue' : 'white',
                                border: answers[index] === option[0] ? '4px solid blue' : '1px solid gray',


                            }}
                            className="w-[20rem] h-[3rem] ml-[2rem]  mt-[2rem] py-2.5 px-6 text-sm rounded-full bg-gradient-to-tr from-indigo-600 via-indigo-500 to-indigo-400 shadow-lg shadow-indigo-500/50 text-white cursor-pointer font-semibold text-center shadow-xs transition-all duration-500 hover:bg-gradient-to-l"
                            id={option[0]}
                            value={option[0]}
                            onClick={() => updateChoice(option[0])}
                        >
                            {option[1]}
                        </button>
                        </label>
                    </li>
                    ))}
                </ul>
                <div className="flex-row mt-[4rem]">
                    {index!=0 && <button className="" onClick={prev}>Previous</button>}
                    {index<10 && <button className="ml-[18rem] " onClick={resetChoice}>Next</button>}
                    {index==10 && <button className="ml-[16rem]" onClick={submit}>Submit</button>}
                
                </div>
                
            </div>
            <ErrorModal open={isOpen} message={isError} onClose={closeModal} />
        </>
    );
}

export default setQuestion;