import React from "react";
import Quizzes from "./Quizzes";
import Overview from "./Overview";
import Video from "./Video";
import Documentation from "./Documentation";

function Lesson({ language, quizzes, documentation, title, color, video, userInfo }) {
  return (
    <>
      <div className="flex justify-center mt-[40px] font-sans">
        <div
          className="flex flex-col md:flex-row w-[70%] h-auto md:h-[40rem] rounded-lg"
          style={{ backgroundColor: color }}
        >
          <div className="flex flex-col md:w-[30%] w-full h-auto md:h-full">
            <Overview language={language} title={title} userInfo={userInfo} />
            <Quizzes language={language} quizzes={quizzes} userInfo={userInfo} />
          </div>
          <div className="flex flex-col w-full md:w-auto mt-4 md:mt-0">
            <Video link={video} />
            <Documentation links={documentation} />
          </div>
        </div>
      </div>
    </>
  );
}

export default Lesson;