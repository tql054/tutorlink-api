import express from "express";
import LoginControllers from "../controllers/LoginControllers"
import SignInController from "../controllers/SignInController" 
import HomeController from '../controllers/HomeController'
import {    getDayOfWeekSchedule, 
            getUnactiveDayOfWeekSchedule, 
            addTeachingDate, 
            removeTeachingDate, 
            validateTeachingTime,
            registerTeachingDate,
            unregisterTeachingDate,
            activateTeachingDate,
            getHomeTeachingDate,
            getStudentSchedule,
            shutDownTeachingDate
        } from "../controllers/ScheduleController";
import AuthorMidleware from '../midlewares/AuthorMidleware'
import TeachingDateMidleware from '../midlewares/TeachingDateMidleware'
import TeacherProfileController from '../controllers/TeacherProfileController'
import StudentProfileController from '../controllers/StudentProfileController'
import RatingController from '../controllers/RatingController'

let router =  express.Router()

let initWebRoutes = (app) => {
    //authentications
    router.post('/login', LoginControllers.handleUserLogin)
    router.post('/check-user/:phone', LoginControllers.checkUserPhone)
    router.get('/check-user/register/:phone', LoginControllers.checkRegisterUserPhone)
    router.post('/check-user',LoginControllers.checkUserPhone)
    router.get('/all-user', LoginControllers.displayAllUser)
    router.get('/role/:token', AuthorMidleware.checkUser, HomeController.getUserRole)
    router.post('/add-account', AuthorMidleware.checkDoublePhoneNumber, SignInController.handleUserSignin)

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
    router.put('/teaching-schedule/shutdown/:token', AuthorMidleware.checkUser, shutDownTeachingDate)
    router.put('/teaching-schedule/unactive/:token', AuthorMidleware.checkUser, unregisterTeachingDate)
    router.put('/teaching-schedule/active/:token', AuthorMidleware.checkUser, activateTeachingDate)
    router.get('/teaching-schedule/home/:dow/:token', AuthorMidleware.checkUser, getHomeTeachingDate)
    router.get('/student-schedule/:dow/:token', AuthorMidleware.checkUser, getStudentSchedule)

    //teaching info
    router.get('/teacher-info/:token', AuthorMidleware.checkUser, TeacherProfileController.getTeacherProfileData)
    router.get('/teacher-info/:teacherPhone/:token', AuthorMidleware.checkUser, TeacherProfileController.getTeacherInfo) 
    router.get('/teacher-info/subject-class/:teacherPhone/:token', AuthorMidleware.checkUser, TeacherProfileController.getAllTeacherClasses)
    router.get('/teacher-info/subject-class/:teacherPhone/:idClass/:token', 
                AuthorMidleware.checkUser, 
                TeacherProfileController.getTeacherSubjectsByClass
                )
    router.get('/teacher-info/subject/:teacherPhone/:token', AuthorMidleware.checkUser, TeacherProfileController.getAllSubjectOfTeacher)
    router.get('/teacher-info/:name/:idSubject/:idClass/:idDistrict/:currentPage/:token', AuthorMidleware.checkUser, TeacherProfileController.getAventuredTeachers)
    router.get('/teacher-status/status/teacher/:token', AuthorMidleware.checkUser, TeacherProfileController.getTeacherStatus)
    router.get('/teacher-info/sot/:token', AuthorMidleware.checkUser, TeacherProfileController.getSubjectOfTeacher)

    router.post('/teacher-info/:idWard', TeacherProfileController.insertNewTeacher)
    router.post('/teacher-info/sot/:token', AuthorMidleware.checkUser, SignInController.addSubjectTeacher)
    router.put('/teacher-info/:idWard/:token', AuthorMidleware.checkUser, TeacherProfileController.updateTeacher)
    

    //student info
    router.get('/student-info/:token', AuthorMidleware.checkUser, StudentProfileController.getStudentInfo)
    router.get('/student-info/:studentPhone/:token', AuthorMidleware.checkUser, StudentProfileController.getStudentInfoByPhone)
    router.get('/student-status/:token', AuthorMidleware.checkUser, StudentProfileController.getStudentStatus)
    
    router.post('/student-info/:idWard/:idClass', StudentProfileController.insertNewStudent)
    router.put('/student-info/:idWard/:idClass/:token', AuthorMidleware.checkUser, StudentProfileController.updateStudent)

    // register
    router.get('/list-district', SignInController.getAllDistrict)
    router.get('/list-ward/:idDistrict', SignInController.getWardByDistrict)
    router.get('/list-class/', SignInController.getAllClasses)

    router.get('/list-subject/:idClass', SignInController.getAllSubjectsByClass)
    router.get('/list-subject', SignInController.getAllSubjects)

    // Admin side
    router.get('/login', LoginControllers.showAdminLoginPage)
    router.post('/login-admin', LoginControllers.handleAdminLogin)
    router.get('/', AuthorMidleware.checkAdmin, HomeController.getAdminManageAllTeacher)
    router.get('/teacher/not-approved', AuthorMidleware.checkAdmin, HomeController.getAdminManageNotApproveTeacher)
    router.get('/teacher/waiting', AuthorMidleware.checkAdmin, HomeController.getAdminManageWaitingTeacher)
    router.get('/teacher/approve/:phoneNumber', AuthorMidleware.checkAdmin, HomeController.approveTeacher)
    router.get('/teacher/refuse/:phoneNumber', AuthorMidleware.checkAdmin, HomeController.refuseTeacher)
    router.get('/teacher/waiting/delete/:phoneNumber', AuthorMidleware.checkAdmin, HomeController.deleteTeacherNotUpdated)
    router.get('/student', AuthorMidleware.checkAdmin, HomeController.getAdminManageStudent)
    router.get('/student/not-approved', AuthorMidleware.checkAdmin, HomeController.getAdminManageNotApproveStudent)
    router.get('/student/waiting', AuthorMidleware.checkAdmin, HomeController.getAdminManageWaitingStudent)
    router.get('/student/approve/:phoneNumber', AuthorMidleware.checkAdmin, HomeController.approveStudent)
    router.get('/student/refuse/:phoneNumber', AuthorMidleware.checkAdmin, HomeController.refuseStudent)
    router.get('/student/waiting/delete/:phoneNumber', AuthorMidleware.checkAdmin, HomeController.deleteStudentNotUpdated)

    // Rating side
    router.get('/rating/:teacherPhone/:token', AuthorMidleware.checkUser, RatingController.getAllRatingByTeacherPhone)
    router.get('/rating/page/:teacherPhone/:token', AuthorMidleware.checkUser, RatingController.getRatingPageData)
    router.post('/rating/:dow/:timeBegin/:token', AuthorMidleware.checkUser, RatingController.addRating)

    return app.use('/', router)
}

module.exports = initWebRoutes