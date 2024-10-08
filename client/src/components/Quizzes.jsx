import React from "react";

function Quizzes({ language, quizzes }) {
  return (
    <div className="border-r-2 border-black h-full flex-1">
      <h2 className="font-semibold text-2xl ml-4 my-4">Quizzes</h2>
      <ul className="list-none p-0">
        {Object.keys(quizzes).map((key, index) => (
          <a href={`http://localhost:5173/quiz/${language}/${quizzes[key]["level"]}`} key={index}>
            <li className="flex items-center mb-2" >
              <img src="quiz.png" alt="quiz" className="w-[30px] ml-4 mr-2" />
              <p className="hover:underline">{quizzes[key]["topic"]}        </p>
            </li>
          </a>
        ))}
      </ul>
    </div>
  );
}

export default Quizzes;
