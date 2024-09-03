import React from "react";
import Quizzes from "./Quizzes";
import Overview from "./Overview";
import Video from "./Video.jsX";
import Documentation from "./Documentation";



function Lesson({ quizzes, documentation, title, color }) {
  return (
    <>
      <div className="flex justify-center mt-[40px] font-sans">
        <div className={`flex w-[70%] h-[701px] bg-[${color}] rounded-lg`}>
          <div className="flex">
            <div className="flex flex-col justify-between w-[30%] h-full">
              <Overview title={title} />
              <Quizzes quizzes={quizzes} />
            </div>
            <div className="flex flex-col">
              <Video link="https://www.youtube.com/embed/HD13eq_Pmp8" />
              <Documentation links={documentation} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Lesson;
