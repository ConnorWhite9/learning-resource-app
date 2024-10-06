from sqlalchemy.orm import Session
from crud.quiz import *
from sqlalchemy.ext.asyncio import AsyncSession


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



def grade_service(userAnswers, db: AsyncSession):
    answer_key = getAnswers(db)
    correlation = {
        1: 'a',
        2: 'b',
        3: 'c',
        4: 'd',
    }

    correct = []
    for i in range(len(userAnswers)):
        if correlation[userAnswers[i]] == answer_key[i]["answer"]:
            correct[i] = 1
        else:
            correct[i] = 0 

        grade = sum(correct)/len(correct) * 100 
        check = addGrade(userAnswers.user_id, grade, userAnswers.quiz_id, db)
    return 




async def getAllQuiz_service(db: AsyncSession):
    quizzes = await grab_all_quizzes(db)
    return quizzes
