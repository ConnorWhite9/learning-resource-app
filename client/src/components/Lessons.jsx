import React from 'react'
import Lesson from './Lesson'

const quizzes = [
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

const documentation = [
  "https://www.w3schools.com/html/",
  "https://developer.mozilla.org/en-US/docs/Learn/HTML/Introduction_to_HTML",
];

function Lessons() {
  return (
    <div>
      <Lesson quizzes={quizzes} documentation={documentation} title="Introduction to HTML" color="#B2DF8A"/>
    </div>
  )
}

export default Lessons
