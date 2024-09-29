import React from "react";
import Lesson from "./Lesson";

const htmlQuizzes = [
  ["Introduction to HTML", 1],
  ["HTML Document Standards", 2],
  ["Hyperlinks", 3],
  ["Images", 4],
  ["Text Formatting", 5],
  ["Lists", 6],
  ["Tables", 7],
  ["Span/Div", 8],
  ["Buttons", 9],
  ["Forms", 10]
];
const cssQuizzes = [
  ["Introduction to CSS", 1],
  ["In-line, Internal, and External CSS", 2],
  ["Box Model", 3],
  ["Fonts", 4],
  ["Borders", 5],
  ["Background", 6],
  ["Margins", 7],
  ["Position", 8],
  ["Pseudo Classes", 9],
  ["Shadows", 10], 
  ["Icons", 11]
];
const pythonQuizzes = [
  ["Introduction to Python", 1],
  ["Variables and Data Types", 2],
  ["Output/Printing", 3],
  ["User Input", 4],
  ["Lists", 5],
  ["Loops", 6],
  ["Functions", 7],
  ["Classes", 8],
  ["String Methods", 9]
];

const htmlDocumentation = [
  "https://www.w3schools.com/html/",
  "https://developer.mozilla.org/en-US/docs/Learn/HTML/Introduction_to_HTML",
];
const cssDocumentation = [
  "https://www.w3schools.com/css/",
  "https://developer.mozilla.org/en-US/docs/Learn/CSS",
];
const pythonDocumentation = [
  "  https://www.w3schools.com/python/",
  "https://www.geeksforgeeks.org/python-programming-language-tutorial/",
];

const htmlVideo = "https://www.youtube.com/embed/HD13eq_Pmp8";
const cssVideo = "https://www.youtube.com/embed/wRNinF7YQqQ";
const pythonVideo = "https://www.youtube.com/embed/VchuKL44s6E"

function Lessons() {

    return (
      <div>
        <Lesson
          language="HTML"
          quizzes={htmlQuizzes}
          documentation={htmlDocumentation}
          title="Introduction to HTML"
          color="#B2DF8A"
          video={htmlVideo}
        />
        <Lesson
          language="CSS"
          quizzes={cssQuizzes}
          documentation={cssDocumentation}
          title="Introduction to CSS"
          color="#FFA76C"
          video={cssVideo}
        />
        <Lesson
          language="Python"
          quizzes={pythonQuizzes}
          documentation={pythonDocumentation}
          title="Introduction to Python"
          color="#A6DBFF"
          video={pythonVideo}
        />
      </div>
    );
}


export default Lessons;
