import React from 'react'

function Video({ link }) {
  return (
    <div className="h-[500px] border-b-2 border-black w-[900px] flex flex-col justify-center items-center">
      <h2 className="font-semibold text-2xl ml-4 my-4">Video</h2>
      <iframe
        className="h-[70%] w-[70%] ml-[4rem]"
        src={link}
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        title="YouTube video player"
      ></iframe>
    </div>
  );
}

export default Video
