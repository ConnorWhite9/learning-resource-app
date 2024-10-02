import react, {useState} from "react";
import axios from 'axios';

function setQuestion(props){

    const [questions, setQuestions] = useState(null);
    

    /*axios.get(`http://localhost:8000/course/getQuiz/${props.course}/${props.level}`, {
        headers: {
            'Content-Type': 'application/json'  // Ensure the server expects JSON
               
        },
        withCredentials: true  // This ensures that cookies are sent and received
    })
        .then((response) => {
            console.log(response.data);
            setQuestions(response.data.questions);
            
        })
        .catch((error) => {
            console.error("Error:", error)
        })*/
    
    




    const [answers, setAnswers] = useState({
        0: 0,
        1: 0,
        2: 0, 
        3: 0, 
        4: 0,
        5: 0,
        6: 0, 
        7: 0, 
        8: 0,
        9: 0,

    })
    const [index, setIndex] = useState(0);
    //const [question, setQuestion] = useState(index);
    const [choice, setChoice] = useState(0);

    const updateAnswer = (newAnswer) => {
        setAnswer((prevAnswer) => ({
          ...prevAnswer,  // Copy the previous state
          index: newAnswer // Update only the name property
        }));
      };

    const updateChoice = (newChoice) => {
        setChoice(newChoice);
        setAnswer((prevAnswer) => ({
            ...prevAnswer,
            index: newChoice,
        }))
    };

    const [question] = useState({
        0: { "question": "What is the right text?",
        options: [
            [1, "Hello There"],
            [
                2, "What is going on"
            ],
            [
                3, "Why me"
            ],
            [
               4, "How you doing"
            ]
            
        ]},
        1: { "question": "What is the right text?",
            options: [
                [1, "Fortnite"],
                [
                    2, "Freaky"
                ],
                [
                    3, "Friday"
                ],
                [
                   4, "Free"
                ]
                
            ]}
    })

    const resetChoice = () => {
        setChoice(0);
        setIndex(prevIndex => prevIndex + 1);
    }

    const prev = () => {
        setChoice(0);
        setIndex(prevIndex => prevIndex - 1)
    }
    
    const submit = () => {
        const postData = {
            "answers": answers,
            "user_id": 1,
            "quiz_id": quiz_id

        }
        axios.post(`http://localhost:8000/course/grade`, postData, {
            headers: {
                'Content-Type': 'application/json'  // Ensure the server expects JSON
                   
            },
            withCredentials: true  // This ensures that cookies are sent and received
        })
            .then((response) => {
                console.log(response.data);
                
                
            })
            .catch((error) => {
                console.error("Error:", error)
            })
    }



    return (
        <>
            <div className="ml-auto mr-auto mt-[10rem] bg-[white] w-[30rem] h-[30rem] p-[3rem]  flex-column rounded-[10%]">
                <ul className="ml-auto mr-auto flex-column">
                    <p className="text-[1.5rem]">{index + 1}: {question[index]["question"]} </p>
                    {question[index].options.map(option => (
                    <li key={option[0]}>
                        <label>
                        <button
                            style={{ 
                                backgroundColor: choice === option[0] ? 'blue' : 'white',
                                border: choice === option[0] ? '4px solid blue' : '1px solid gray',


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
                <div className="flex-row mt-[2rem]">
                    {index!=0 && <button className="" onClick={prev}>Previous</button>}
                    <button className="ml-[18rem] " onClick={resetChoice}>Next</button>
                </div>
                
            </div>
        </>
    );
}

export default setQuestion;