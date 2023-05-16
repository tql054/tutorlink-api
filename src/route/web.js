import express from "express";
import LoginControllers from "../controllers/LoginControllers"
import HomeController from '../controllers/HomeController'
import {    getDayOfWeekSchedule, 
            getUnactiveDayOfWeekSchedule, 
            addTeachingDate, 
            removeTeachingDate, 
            validateTeachingTime,
            registerTeachingDate,
            unregisterTeachingDate,
            activateTeachingDate
        } from "../controllers/ScheduleController";
import AuthorMidleware from '../midlewares/AuthorMidleware'
import TeachingDateMidleware from '../midlewares/TeachingDateMidleware'
import TeacherProfileController from '../controllers/TeacherProfileController'
import StudentProfileController from '../controllers/StudentProfileController'

let router =  express.Router()

let initWebRoutes = (app) => {
    //authentications
    router.post('/login', LoginControllers.handleUserLogin)
    router.post('/check-user/:phone', LoginControllers.checkUserPhone)
    router.post('/check-user',LoginControllers.checkUserPhone)
    router.get('/all-user', LoginControllers.displayAllUser)
    router.get('/role/:token', AuthorMidleware.checkUser, HomeController.getUserRole)

    //home
    router.get('/home/:token', AuthorMidleware.checkUser, HomeController.getHomeData)

    //teaching schedule
    router.get('/teaching-schedule/:dow/:token', AuthorMidleware.checkUser, getDayOfWeekSchedule)
    router.get('/teaching-schedule/unactive/:teacherPhone/:dow/:token', AuthorMidleware.checkUser, getUnactiveDayOfWeekSchedule)
    router.post('/teaching-schedule/:token', AuthorMidleware.checkUser, addTeachingDate)
    router.delete('/teaching-schedule/:dayOfWeek/:timeBegin/:token', AuthorMidleware.checkUser, removeTeachingDate)
    router.get('/teaching-schedule/:timeBegin/:duration/:dow/:token', AuthorMidleware.checkUser, 
    TeachingDateMidleware.checkTeachingTime, 
    validateTeachingTime)
    router.put('/teaching-schedule/register/:idSubject/:idClass/:token', AuthorMidleware.checkUser, registerTeachingDate)
    router.put('/teaching-schedule/unactive/:token', AuthorMidleware.checkUser, unregisterTeachingDate)
    router.put('/teaching-schedule/active/:token', AuthorMidleware.checkUser, activateTeachingDate)

    //teaching info
    router.get('/teacher-info/:teacherPhone/:token', AuthorMidleware.checkUser, TeacherProfileController.getTeacherInfo) 
    router.get('/teacher-info/subject-class/:teacherPhone/:token', AuthorMidleware.checkUser, TeacherProfileController.getAllTeacherClasses)
    router.get('/teacher-info/subject-class/:teacherPhone/:idClass/:token', 
                AuthorMidleware.checkUser, 
                TeacherProfileController.getTeacherSubjectsByClass
                )

    //student info
    router.get('/student-info/:studentPhone/:token', AuthorMidleware.checkUser, StudentProfileController.getStudentInfoByPhone)
    return app.use('/', router)

    // register
}

module.exports = initWebRoutes