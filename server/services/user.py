
from sqlalchemy.orm import Session
from crud.quiz import *
from crud.user import *
from sqlalchemy.ext.asyncio import AsyncSession


async def userInfo_service(user_id, db: AsyncSession):
    #Need to grab enrollment 
    enroll_list = await grab_enrollment_crud(user_id, db)

    #Need to grab grades
    grades = grab_grades_crud(user_id, db)
    reformat = {}
    for course in enroll_list: 
        reformat[enroll_list[course]["course"]] = []

    for key in reformat.keys():
        for grade in grades:
            if grade["course"] == key:
                reformat[key].append(grade)
    
    
    #Need to calculate mastery for each course
    mastery = {}
    for key in reformat.keys():
        total = await get_course_quizs(course, db)
        mastery[course] = int((len(reformat[key])/total) * 100)
    #return all information
    return enroll_list, reformat, mastery 
