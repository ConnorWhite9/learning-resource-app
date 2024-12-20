import React from "react";

function Video({ link }) {
  return (
    <div className="h-[30rem] md:h-[30rem] h-auto border-b-2 border-black w-full md:w-[52rem] flex flex-col justify-center items-center p-6">
      <h2 className="font-semibold text-2xl my-4">Video</h2>
      <iframe
        className="w-full md:w-[70%] h-[15rem] md:h-[70%]"
        src={link}
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        title="YouTube video player"
      ></iframe>
    </div>
  );
}

export default Video;
