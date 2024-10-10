
from sqlalchemy.orm import Session
from crud.quiz import *
from crud.user import *
from sqlalchemy.ext.asyncio import AsyncSession
from helpers.auth import *
import datetime

async def userInfo_service(access_token, db: AsyncSession):
    #Need to grab enrollment 
    payload = decode_token(access_token)
    print(1)
    print(payload)
    if payload is None: 
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail=access_token)

    user_id = payload.get("id")

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
        mastery[course] = int((len(reformat[key])/len(total)) * 100)
    #return all information
    return enroll_list, reformat, mastery 



async def streak_service(token, db: AsyncSession):
    payload = decode_token(token)
    if not payload:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid refresh token")

    # Extract user info from the payload
    user_id = payload.get("id")

    streak = await get_last_streak(user_id, db)

    difference = datetime.now(timezone.utc) - streak.lastActivity

    if difference < timedelta(days=1):
        return {"message": "Streak already set for today"}
    elif difference > timedelta(days=1):
        await resetStreak(user_id, streak, db)
        return {"message": "Streak reset to 0"}
    else:
        await setCurrentStreak(user_id, streak, db)
        return {"message": "Streak increased"}