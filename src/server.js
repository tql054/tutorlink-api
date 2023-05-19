import express from "express";
import bodyParser from "body-parser"
import viewEngine from "./config/viewEngine"
import initWebRoutes from "./route/web"
import connectDB from './config/connectDB'
import path from "path"
import cookieParser from 'cookie-parser'


// import cors from 'cors'
require('dotenv').config()
let app = express()
// app.use(cors({origin: true, credentials: true}));
//config app
// app.set('view', path.join(__dirname, 'views'))
// app.set('view engine', 'ejs')

app.use(express.urlencoded({extended: true}))
app.use(express.static('public'))
app.set('view engine', 'ejs')
app.use(cookieParser())

app.use(bodyParser.json())
app.use(express.static(path.join(__dirname, 'public')));


viewEngine(app)
initWebRoutes(app)
// This should already be declared in your API file
// var app = express();

// ADD THIS
// var cors = require('cors');
// app.use(cors());
connectDB()

let port = process.env.PORT || 6969

app.listen(port, () => {
    //callback
    console.log("Backend Nodejs is running on the port: " + port)
})