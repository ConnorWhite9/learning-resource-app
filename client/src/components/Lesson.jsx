import React, {useState, useEffect} from "react";
import Quizzes from "./Quizzes";
import Overview from "./Overview";
import Video from "./Video";
import Documentation from "./Documentation"; 
import CourseHead from "./CourseHead";
import Streak from "./Streak";
import ProgressBar from './ProgressBar';
import { Link } from "react-router-dom";
import NewVideo from "./NewVideo";

function Lesson({ language, quizzes, documentation, title, color, video, userInfo }) {
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
            <CourseHead userInfo={userInfo} language={language} title={title}/>
            <div id="body" className="flex flex-row max-[730px]:flex-col ">
                <Quizzes language={language} quizzes={quizzes} userInfo={userInfo}/>
                <div id="other" className="w-[100%] h-[100%] border-l border-blue-500">
                    <Video link={video} className=""/>
                    <Documentation links={documentation} />
                </div>

            </div>
                

          </div>
        </div>
      </>
    );
}

export default Lesson;