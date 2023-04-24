import express from "express";
import LoginControllers from "../controllers/LoginControllers"
import HomeController from '../controllers/HomeController'
import AuthorMidleware from '../midlewares/AuthorMidleware'
let router =  express.Router()

let initWebRoutes = (app) => {
    //login
    router.post('/login', LoginControllers.handleUserLogin)
    router.post('/check-user/:phone', LoginControllers.checkUserPhone)
    router.post('/check-user',LoginControllers.checkUserPhone)
    router.get('/all-user', LoginControllers.displayAllUser)


    //home
    router.get('/home/:token', AuthorMidleware.checkUser, HomeController.getHomeData)

    return app.use('/', router)
}

module.exports = initWebRoutes