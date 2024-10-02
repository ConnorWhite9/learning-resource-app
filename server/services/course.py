from sqlalchemy.orm import Session
from crud.quiz import *
from sqlalchemy.ext.asyncio import AsyncSession


def coursePage_service(name: str, db: Session):
    quizs = get_course_quizs(name, db)
    return quizs 


async def getQuiz_service(course, level, db: AsyncSession):
    quiz = await get_quiz_crud(db, course, level)
    unfiltered = await get_questions(db, quiz.id)
    questions = {}
    i = 0 
    for question in unfiltered:
        questions[i] = question
        question[i]["options"] = []
        question[i]["options"].append([1, unfiltered[question]["option_a"]])
        question[i]["options"].append([2, unfiltered[question]["option_b"]])
        question[i]["options"].append([3, unfiltered[question]["option_c"]])
        question[i]["options"].append([4, unfiltered[question]["option_d"]])
        question[i]["answer"] = unfiltered[question]["answer"]
    return questions, quiz.id



def grade_service(userAnswers, db: AsyncSession):
    answer_key = getAnswers()
    correct = []
    for i in range(len(userAnswers)):
        if userAnswers[i] == answer_key[i]["answer"]:
            correct[i] = 1
        else:
            correct[i] = 0 

        grade = sum(correct)/len(correct) * 100 
        check = addGrade(userAnswers.user_id, grade, userAnswers.quiz_id, db)
    return 