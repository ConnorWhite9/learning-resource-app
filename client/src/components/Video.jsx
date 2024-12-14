import React from 'react'

function Video({ link }) {
  return (
    <div className="h-[500px] border-b-2 border-black w-[50rem] flex flex-col ml-[auto] mr">
      <h2 className="font-semibold text-2xl text-center my-4">Video</h2>
      <iframe
        className="h-[50%] w-[55%] ml-[4rem]"
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
