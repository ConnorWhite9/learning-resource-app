import react, {useState} from "react";
import axios from 'axios';

function setQuestion(){
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
    const [question, setQuestion] = useState(index);
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
            index: choice,
        }))
    };


    const resetChoice = () => {
        setChoice(0);
    }

    return (
        <div>
            <ul>
            {question.options.map(option => (
            <li key={option.id}>
                <label>
                <input
                    type="radio"
                    value={option.id}
                    checked={selectedAnswer === option.id}
                    onChange={() => handleOptionChange(option.id)}
                />
                {option.text}
                </label>
            </li>
            ))}
            </ul>
            <button onClick={resetChoice}>Next</button>
        </div>
    );
}

export default setQuestion;