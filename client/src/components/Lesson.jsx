import React from "react";

const quizzes = [
  "Introduction to HTML",
  "HTML Document Standards",
  "Hyperlinks",
  "Images",
  "Text Formatting",
  "Lists",
  "Tables",
  "Span/Div",
  "Buttons",
  "Forms",
];

function Lesson() {
  return (
    <div className="flex justify-center mt-[40px] font-sans">
      <div className="flex w-[70%] h-[701px] bg-[#B2DF8A] rounded-lg">
        <div className="flex">
          <div className="flex flex-col justify-between w-[300px] h-full">
            <div className="flex flex-col justify-center items-center border-b-2 border-r-2 border-black w-full h-full">
              <p className="font-semibold text-2xl">Introduction to HTML</p>
              <div className="flex justify-between items-center w-[90%] mt-4">
                <div className="flex flex-col p-4">
                  <h2>Mastery: 0%</h2>
                  <img
                    src="masterybar.png"
                    alt="mastery bar"
                    className="w-[80%]"
                  />
                </div>
                <button className="bg-gray-400 px-2 py-1 border-2 border-black rounded-lg mt-4">
                  Enroll
                </button>
              </div>
            </div>
            <div className="border-r-2 border-black h-full flex-1">
              <h2 className="font-semibold text-2xl ml-4 my-4">Quizzes</h2>
              <ul className="list-none p-0">
                {quizzes.map((quiz, index) => (
                  <li className="flex items-center mb-2" key={index}>
                    <img
                      src="quiz.png"
                      alt="quiz"
                      className="w-[30px] ml-4 mr-2"
                    />
                    {quiz}
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className="flex flex-col">
            <div>vid</div>
            <div>doc</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Lesson;
