import React from "react";

function Video({ link }) {
  return (
    <div className="h-[50%] md:h-[50%] border-b-2 border-black w-[100%] md:w-[30rem] flex flex-col justify-center items-center p-6">
      <h2 className="font-semibold text-2xl text-white my-4">Video</h2>
      <iframe
        className="w-full md:w-[70%] h-[15rem] md:h-[70%]"
        src={link}
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        title="YouTube video player"
      ></iframe>
      <h6 className="text-[5px] text-white text-center">This video was not created in any way by the creators of this website. It is solely used to help users find good quality free coding education.</h6>
    </div>
  );
}

export default Video;
