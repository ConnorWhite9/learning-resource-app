import React from "react";
import {Link} from "react-router-dom";
function Hero() {

  const demoLogin = () => {
    const demoUser = {
      id: `demo_${Date.now()}`,
      name: "Demo User",
      quizScores: [], // or whatever initial data you need
    };
    localStorage.setItem('demoUser', JSON.stringify(demoUser));
    
  }


  return (
    <div className="flex font-custom h-[500px] mb-8 justify-center items-center">
      <div className="flex justify-center items-center w-[90%]">
        <section className="flex justify-center items-center flex-1">
          <div className="flex flex-col justify-center w-[80%]">
            <h1 className="font-bold text-6xl text-white">
              AI Generated Lesson Plans
            </h1>
            <p className="text-[#F2FDFF] mt-[15px]">
              Greater mastery and understanding on programming languages—HTML,
              CSS, Python.
            </p>
            <div className="flex flex-row">
              <Link to="/register">
                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-[125px] mt-[40px]">
                  Sign Up
                </button>
              </Link>
              <Link to="/" className="ml-[2rem]">
                <button className="bg-blue-500 hover:bg-blue-700 text-white text-nowrap font-bold py-2 px-4 rounded w-[125px] mt-[40px]" >
                  Demo User
                </button>
              </Link>
            </div>
          </div>
        </section>
        <aside className="flex justify-center items-center flex-1">
          <img src="./hero.png" alt="hero" className="w-[60%]" />
        </aside>
      </div>
    </div>
  );
}

export default Hero;
