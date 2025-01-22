import React from "react";

function Video({ link }) {
  return (<>
    <div className="w-[100%] border-b border-blue-500 pb-2">
        <h2 className="font-semibold text-2xl text-white text-center my-4 mx-auto">Video</h2>
        <iframe
            className="w-[60%] h-[18rem] mx-auto"
            src={link}
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            title="YouTube video player"
        ></iframe>
        <h6 className="text-[30%] text-white text-center">This video was not created in any way by the creators of this website. It is solely used to help users find good quality free coding education.</h6>
    </div>


</>);
}

export default Video;
