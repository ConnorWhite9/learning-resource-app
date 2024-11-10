import React from "react";

function Features() {
  return (
    <section className="flex text-white h-[248px] items-center justify-center mb-8 font-custom">
      <div className="flex items-center w-[90%] flex-col md:flex-row ">
        <div className="flex flex-col flex-1 items-center">
          <div className="w-[70%]">
            <div className="flex flex-row items-center">
              <img src="./quizzes.png" alt="quizzes" className="w-[2.5rem]" />
              <h3 className="text-xl ml-4 font-bold italic">
                Quizzes created by AI
              </h3>
            </div>
            <p className="text-[#F2FDFF] text-[1rem] mt-[0.5rem]">
              Right now we only have our standardized quizzes to offer. But we are currently hard at work to bring you quizzes that are personally tailored to your needs.
            </p>
          </div>
        </div>
        <div className="flex flex-col flex-1 items-center max-md:mt-[5rem]">
          <div className="w-[70%]">
            <div className="flex flex-row items-center">
              <img
                src="./masteryicon.png"
                alt="mastery bar"
                className="w-[2.5rem]"
              />
              <h3 className="text-xl ml-4 font-bold italic">Mastery Bar</h3>
            </div>
            <p className="text-[#F2FDFF] text-[1rem] mt-[0.5rem]">
              Users will each have a mastery bar showing their progress for each
              programming language their learning.
            </p>
          </div>
        </div>
        <div className="flex flex-col flex-1 items-center max-md:mt-[5rem]">
          <div className="w-[70%]">
            <div className="flex flex-row items-center">
              <img
                src="./learningstreak.png"
                alt="learning streak"
                className="w-[2.5rem]"
              />
              <h3 className="text-xl ml-4 font-bold italic">Learning Streak</h3>
            </div>
            <p className="text-[#F2FDFF] text-[1rem] mt-[0.5rem]">
              Calendars on the individuals dashboard will show their learning
              streak keeping the users motivated to come back the next day.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Features;
