import React from "react";
import { Link } from "react-router-dom";

function Quizzes({ language, quizzes, userInfo }) {
  const apiUrl = import.meta.env.VITE_BACKEND_API;
  return (
    <div className="border-r-2 border-black h-full flex-1">
      <h2 className="font-semibold text-2xl ml-4 my-4">Quizzes</h2>
      <ul className="list-none p-0">
        {Object.keys(quizzes).map((key, index) => (
          <Link to={`/quiz/${language}/${quizzes[key]["level"]}`} key={index}>
            <li className="flex items-center mb-2" >
              <img src="quiz.png" alt="quiz" className="w-[30px] ml-4 mr-2" />
              <p className="hover:underline">
                {quizzes[key].topic}  
                
                {/* Check if a grade exists for the quiz, and display it if it does */}
                {userInfo?.grades?.[language]?.[quizzes[key]["id"]] != null ? (
                  <>:  {userInfo.grades[language][quizzes[key]["id"]].grade}%   ✔️</>
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
