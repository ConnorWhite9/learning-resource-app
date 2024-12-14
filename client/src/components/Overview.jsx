import React, {useState, useEffect} from "react";
import ProgressBar from './ProgressBar';
import Streak from './Streak';


function Overview({ language, title, userInfo }) {
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
    <div className="flex flex-col justify-center items-center border-b-2 border-r-2 border-black w-full h-full">
      <p className="font-semibold text-2xl">{title}</p>
      <div className="flex justify-between items-center w-[90%] mt-4">
        <div className="flex flex-col p-4 ml-[1rem]">
          <h2>Mastery:   {masteryNumber}% </h2>
          
            <ProgressBar progress={masteryNumber} />
            
        </div>
        <div className="flex flex-col p-4 mr-[1rem] ">
    
          
            <Streak streak={streak} />
             
        </div>
      </div>
    </div>
  );
}

export default Overview;
