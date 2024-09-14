import React from "react";
import Lesson from "./Lesson";

const htmlQuizzes = [
  "Introduction to HTML",
  "HTML Document Standards",
  "Hyperlinks",
  "Images",
  "Text Formatting",
  "Lists",
  "Tables",
  "Span/Div",
  "Buttons",
  "Forms",
];
const cssQuizzes = [
  "Introduction to CSS",
  "In-line, Internal, and External CSS",
  "Box Model",
  "Fonts",
  "Borders",
  "Background",
  "Margins",
  "Position",
  "Pseudo Classes",
  "Shadows",
  "Icons",
];
const pythonQuizzes = [
  "Introduction to Python",
  "Variables and Data Types",
  "Output/Printing",
  "User Input",
  "Lists",
  "Loops",
  "Functions",
  "Classes",
  "String Methods",
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
          quizzes={htmlQuizzes}
          documentation={htmlDocumentation}
          title="Introduction to HTML"
          color="#B2DF8A"
          video={htmlVideo}
        />
        <Lesson
          quizzes={cssQuizzes}
          documentation={cssDocumentation}
          title="Introduction to CSS"
          color="#FFA76C"
          video={cssVideo}
        />
        <Lesson
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
