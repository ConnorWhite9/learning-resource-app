from sqlalchemy.orm import Session
from crud.quiz import *
from sqlalchemy.ext.asyncio import AsyncSession
from helpers.auth import *
from fastapi import Depends, HTTPException, status

def coursePage_service(name: str, db: Session):
    quizs = get_course_quizs(name, db)
    return quizs 


async def getQuiz_service(course, level, db: AsyncSession):
    quiz = await get_quiz_crud(db, course, level)
    if quiz is None:
        raise ValueError(course, level)
    unfiltered = await get_questions(db, quiz.id)
    questions = {}
    i = 1
    for question in unfiltered:
        
        questions[i] = {
        "number": question.number,  # or whatever ID you want to assign
        "question": question.question,  # Assuming `question` has an attribute `question`
        "options": [
            [1, question.option_a],
            [2, question.option_b],
            [3, question.option_c],
            [4, question.option_d]
        ],
        "answer": question.answer  # Assuming `question` has an attribute `answer`
        }
        i += 1


    return questions, quiz.id



async def grade_service(access_token, userAnswers, db: AsyncSession):
    payload = decode_token(access_token)
    if not payload:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid refresh token")

    # Extract user info from the payload
    user_id = payload.get("id")
    answer_key = await getAnswers(userAnswers.quiz_id, db)
    correlation = {
        0: 'NA',
        1: 'a',
        2: 'b',
        3: 'c',
        4: 'd',
    }

    correct = {}
    for answer in answer_key:
        if correlation[userAnswers.answers[answer.number]] == answer.answer:
            correct[answer.number] = 1
        else:
            correct[answer.number] = 0 

        grade = sum(correct)/len(correct) * 100 
        check = await addGrade(user_id, grade, userAnswers.quiz_id, db)
    return True




async def getAllQuiz_service(db: AsyncSession):
    quizzes = await grab_all_quizzes(db)
    return quizzes
