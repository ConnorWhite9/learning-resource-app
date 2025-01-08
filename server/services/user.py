
from sqlalchemy.orm import Session
from crud.quiz import *
from crud.user import *
from sqlalchemy.ext.asyncio import AsyncSession
from helpers.auth import *
from datetime import timedelta, datetime, timezone

async def userInfo_service(refresh_token, access_token, response: Response, db: AsyncSession):
    #Need to grab enrollment 
    payload, checker = decode_token(refresh_token, access_token, response, db)
    user_id = None
    if checker: 
        if not payload:
            raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid access token")

        # Extract user info from the payload
        user_id = payload.get("id")
    else:
        user_id = payload

    courses = await get_courses(db)

    #Need to grab grades
    grades = await grab_grades_crud(user_id, db)
    newGrades = {}
    for course in courses: 
        newGrades[course.name] = {}
   
    selects = []
    
    for grade in grades:
        selects.append(grade.quiz_id)
    converted = await grade_quiz_conversion(selects, db)

    for convert in converted: 
        
        for grade in grades:
            if convert.id == grade.quiz_id:
                newGrades[convert.course][grade.quiz_id] = grade.grade
    
    #Need to calculate mastery for each course
    mastery = {}
    for key in newGrades.keys():
        
        total = await get_course_quizs(key, db)
        
        mastery[key] = int((len(newGrades[key].keys())/len(total)) * 100)
    
    #return all information
    streak = await get_last_streak(user_id, db)
    if streak is not None:
        difference = datetime.now() - streak.lastActivity
        
        if difference > timedelta(days=1):
            await resetStreak(user_id, streak, db)

    return courses, newGrades, mastery, streak



async def streak_service(refresh_token, token, response, db: AsyncSession):
    payload, checker = decode_token(refresh_token, token, response, db)
    user_id = None
    if checker: 
        if not payload:
            raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid access token")

        # Extract user info from the payload
        user_id = payload.get("id")
    else:
        user_id = payload

    streak = await get_last_streak(user_id, db)
    if streak is None:
        await addStreak(user_id, db)
    else:
        difference = datetime.now() - streak.lastActivity

        if difference < timedelta(days=1):
            return {"message": "Streak already set for today"}
        elif difference > timedelta(days=1):
            await resetStreak(user_id, streak, db)
            return {"message": "Streak reset to 0"}
        else:
            await setCurrentStreak(user_id, streak, db)
            return {"message": "Streak increased"}
        

async def accountInfo_service(refresh_token, access_token, response: Response, db: AsyncSession):
    payload, checker = decode_token(refresh_token, access_token, response, db)
    user_id = None
    if checker: 
        if not payload:
            raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid access token")

        # Extract user info from the payload
        user_id = payload.get("id")
    else:
        user_id = payload

    accountInfo = await grabAccount(user_id, db)
    newDict = {}
    newDict["email"] = accountInfo.email
    newDict["username"] = accountInfo.username
    newDict["streak"] = accountInfo.streak

    return newDict, response

#not currently in use
async def updateInfo_service(refresh_token, access_token, info, response: Response, db: AsyncSession):
    payload, checker = decode_token(refresh_token, access_token, response, db)
    user_id = None
    if checker: 
        if not payload:
            raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid access token")

        # Extract user info from the payload
        user_id = payload.get("id")
    else:
        user_id = payload

    accountInfo = await grabAccount(user_id, db)
    checker = False
    if accountInfo.email != info.email:
        accountInfo.email = info.email
        checker = True
    if accountInfo.username != info.username:
        accountInfo.username = info.username
        check = True
    if check:
        db.commit()
    return 