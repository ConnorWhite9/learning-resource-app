import React, {useState, useEffect} from "react";
import Streak from "./Streak";
import ProgressBar from "./ProgressBar";
import { Link } from "react-router-dom";

function CourseHead({ language, title, color, video, userInfo }) {
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
    return (<>
        <div className="flex flex-column border-b border-blue-500">
            <div>
                <p className="py-6 px-5 text-white text-[150%] font-semibold">{title}</p>
            </div>
            <div className="flex flex-row py-3 text-white ml-[auto] mr-[2%] gap-5">
                <div className="flex flex-col py-2 max-[730px]:py-5 ">
                    <h2 className="font-semibold">Mastery:   {masteryNumber}% </h2>  
                    <ProgressBar progress={masteryNumber} />
                </div>
                <Streak streak={streak}/>
            </div>
        </div>
    </>);

}

export default CourseHead;