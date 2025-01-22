import React from "react";
import { Link } from "react-router-dom";

function Quizzes({ language, quizzes, userInfo }) {
  const apiUrl = import.meta.env.VITE_BACKEND_API;
  
  return (
    <div id="quizzes" className="w-[40%] h-full max-[730px]:w-[100%] max-[730px]:border-b max-[730px]:border-blue-500 font-custom">
      <h2 className="font-semibold text-2xl ml-4 my-4 text-white max-[730px]:text-center">Quizzes</h2>
      <ul className="list-none p-0">
        {Object.keys(quizzes).map((key, index) => (
          <Link to={`/quiz/${language}/${quizzes[key]["level"]}`} key={index}>
            <li className="flex items-center mb-2" >
              <img src="newquiz.png" alt="quiz" className="w-[30px] ml-4 mr-2" />
                <p className="hover:underline text-blue-500 text-[100%]">
                  {quizzes[key].topic}  
                                            
                  {/* Check if a grade exists for the quiz, and display it if it does */}
                  {userInfo?.grades?.[language]?.[quizzes[key]["id"]] != null ? (
                    <>:  {userInfo.grades[language][quizzes[key]["id"]]}%   ✔️</>
                    ) : (
                      <></>
                    )}
                </p>
            </li>
          </Link>
        ))}
      </ul>
    </div>
  );
}

export default Quizzes;
