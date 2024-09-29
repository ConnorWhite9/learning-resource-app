from sqlalchemy.orm import Session
from crud.quiz import *



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