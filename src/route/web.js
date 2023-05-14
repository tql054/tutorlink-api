import express from "express";
import LoginControllers from "../controllers/LoginControllers"
import HomeController from '../controllers/HomeController'
import { getDayOfWeekSchedule, addTeachingDate, removeTeachingDate, validateTeachingTime } from "../controllers/ScheduleController";
import AuthorMidleware from '../midlewares/AuthorMidleware'
import TeachingDateMidleware from '../midlewares/TeachingDateMidleware'
import TeacherProfileController from '../controllers/TeacherProfileController'

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
    router.post('/teaching-schedule/:token', AuthorMidleware.checkUser, addTeachingDate)
    router.delete('/teaching-schedule/:dayOfWeek/:timeBegin/:token', AuthorMidleware.checkUser, removeTeachingDate)
    router.get('/teaching-schedule/:timeBegin/:duration/:dow/:token', AuthorMidleware.checkUser, 
    TeachingDateMidleware.checkTeachingTime, 
    validateTeachingTime)

    //teaching info
    router.get('/teacher-info/:teacherPhone/:token', AuthorMidleware.checkUser, TeacherProfileController.getTeacherInfo) 

    return app.use('/', router)
}

module.exports = initWebRoutes