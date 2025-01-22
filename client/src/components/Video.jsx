import React from "react";

function Video({ link }) {
  return (<>
    <div className="w-[100%] border-b border-blue-500 pb-2 font-custom">
        <h2 className="font-semibold text-2xl text-white text-center my-4 mx-auto">Video</h2>
        <iframe
            className="w-[60%] h-[18rem] mx-auto"
            src={link}
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            title="YouTube video player"
        ></iframe>
    </div>


</>);
}

export default Video;
