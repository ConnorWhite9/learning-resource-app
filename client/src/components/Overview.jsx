import React from "react";

function Overview({ title }) {
  return (
    <div className="flex flex-col justify-center items-center border-b-2 border-r-2 border-black w-full h-full">
      <p className="font-semibold text-2xl">{title}</p>
      <div className="flex justify-between items-center w-[90%] mt-4">
        <div className="flex flex-col p-4">
          <h2>Mastery: 0%</h2>
          <img src="masterybar.png" alt="mastery bar" className="w-[80%]" />
        </div>
      </div>
    </div>
  );
}

export default Overview;
