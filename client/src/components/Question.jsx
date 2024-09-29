import react, {useState} from "react";
import axios from 'axios';

function setQuestion(props){

    const [questions, setQuestions] = useState(null);
    

    /*axios.get(`http://localhost:8000/auth/getQuiz/${props.course}/${props.level}`, {
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

    return (
        <>
            <p>Hello World</p>
            <div className="ml-auto mr-auto mt-[10rem] bg-[green] w-[30rem] h-[30rem]">
                <ul className="ml-auto mr-auto flex-column">
                    {question[index].options.map(option => (
                    <li key={option[0]}>
                        <label>
                        <input
                            type="radio"
                            value={option[0]}
                            checked={choice === option[0]}
                            onChange={() => updateChoice(option[0])}
                        />
                        {option[1]}
                        </label>
                    </li>
                    ))}
                </ul>
                <button onClick={resetChoice}>Next</button>
            </div>
        </>
    );
}

export default setQuestion;