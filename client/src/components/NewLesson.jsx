import React, {useState, useEffect} from "react";
import Quizzes from "./Quizzes";
import Overview from "./Overview";
import NewVideo from "./NewVideo";
import Documentation from "./Documentation";
import Streak from "./Streak";
import ProgressBar from './ProgressBar';
import { Link } from "react-router-dom";

function NewLesson({ language, quizzes, documentation, title, color, video, userInfo }) {
    const [masteryNumber, setMasteryNumber] = useState(null);
    const [streak, setStreak] = useState(null);
    useEffect(() => {
        if (userInfo?.mastery?.[language] === null) {
          setMasteryNumber(0);
        } else {
          setMasteryNumber(userInfo?.mastery?.[language] || 0); // Default to 0 if the language key doesn't exist
        }
     
        if (userInfo?.streak  === null) {
          setStreak(0);
        } else {
          setStreak(userInfo?.streak?.current);
        }
      }, [userInfo, language]); // Run effect whenever userInfo or language changes
    return (
      <>
        <div className="flex flex-row border border-blue-500 w-[75%] mx-auto mt-[4rem]">
            <div id="header" className="border-b border-blue-500 w-[100%]">
                <div className="flex flex-column border-b border-blue-500">
                    <div>
                        <p className="py-6 px-5 text-white text-[150%] font-semibold">{title}</p>
                    </div>
                    <div className="flex flex-row py-3 text-white ml-[auto] mr-[2%] gap-5">
                        <div className="flex flex-col py-2 ">
                            <h2 className="font-semibold">Mastery:   {masteryNumber}% </h2>  
                            <ProgressBar progress={masteryNumber} />
                        </div>
                        <Streak streak={streak}/>
                    </div>
                </div>
            <div id="body" className="flex flex-row">
                <div id="quizzes" className="w-[30%] h-[100%] border-r border-blue-500">
                    <h2 className="font-semibold text-2xl ml-4 my-4 text-white">Quizzes</h2>
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
                <div id="other" className="w-[100%]">
                    <NewVideo link={video} className=""/>
                    <Documentation links={documentation} />
                </div>

            </div>
                

            </div>
        </div>
      </>
    );
  }
  
  export default NewLesson;