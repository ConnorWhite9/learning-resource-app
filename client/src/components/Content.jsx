import React from "react";

function Content() {
  return (
    <div className="flex justify-center items-center h-[500px] font-custom">
      <div className="flex justify-center items-center w-[90%]">
        <section className="text-white flex-1 flex flex-col justify-center items-center">
          <div>
            <h3 className="font-bold text-2xl mb-3">Stay on Task</h3>
            <p className="mb-2">
              These lessons will cut the unnecessary fluff and get straight to
              the point.
            </p>
            <ul>
              <li className="list-disc ml-[1em] mb-1">
                Pacing catered towards the individuals{" "}
              </li>
              <li className="list-disc ml-[1em] mb-1">
                Quizzes to ensure mastery
              </li>
              <li className="list-disc ml-[1em] mb-1">
                Mastery bar to visually represent understanding
              </li>
            </ul>
          </div>
        </section>
        <aside className="flex justify-center items-center flex-1">
          <img src="./hero.png" alt="placeholder" className="w-[60%]" />
        </aside>
      </div>
    </div>
  );
}

export default Content;
