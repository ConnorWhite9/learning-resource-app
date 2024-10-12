import React, {useState, useEffect} from "react";
import ProgressBar from './ProgressBar';

function Overview({ language, title, userInfo }) {
  const [masteryNumber, setMasteryNumber] = useState(null);
  useEffect(() => {
    if (userInfo["mastery"] === null) {
      setMasteryNumber(0);
    } else {
      setMasteryNumber(userInfo["mastery"][language] || 0); // Default to 0 if the language key doesn't exist
    }
  }, [userInfo, language]); // Run effect whenever userInfo or language changes

  return (
    <div className="flex flex-col justify-center items-center border-b-2 border-r-2 border-black w-full h-full">
      <p className="font-semibold text-2xl">{title}</p>
      <div className="flex justify-between items-center w-[90%] mt-4">
        <div className="flex flex-col p-4">
          <h2>Mastery:  {userInfo?.["mastery"]?.[language] === null ? <span>{userInfo?.["mastery"]?.[language]}</span> : <span>0%</span>} </h2>
          <ProgressBar progress={masteryNumber} />
        </div>
      </div>
    </div>
  );
}

export default Overview;
