import React from 'react';
import {useParams} from 'react-router-dom';
import Question from '../components/Question';
function Quiz() {
    const {course, level} = useParams();
    return(
        <div className="bg-black">
           <Question course={course} level={level} />
        </div>
    );
}


export default Quiz;