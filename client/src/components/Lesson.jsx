import React from "react";
import Quizzes from "./Quizzes";
import Overview from "./Overview";
import Video from "./Video.jsX";
import Documentation from "./Documentation";



function Lesson({language, quizzes, documentation, title, color, video, userInfo }) {
  return (
    <>
      <div className="flex justify-center mt-[40px] font-sans">
        <div
          className="flex w-[70%] h-[701px] rounded-lg"
          style={{ backgroundColor: color }}
        >
          <div className="flex">
            <div className="flex flex-col justify-between w-[30%] h-full">
              <Overview language={language} title={title} userInfo={userInfo} />
              <Quizzes language={language} quizzes={quizzes} userInfo={userInfo}/>
            </div>
            <div className="flex flex-col">
              <Video link={video} />
              <Documentation links={documentation} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Lesson;
