import db from "../models";
const { QueryTypes } = require('sequelize');
import getCurrentDatetime from ".";
const  getByDayOfWeek = (teacherPhone='', dayOfWeek='') => {
    const promise = new Promise(async function(resolve, reject) {
        try {
            const query = 
            `SELECT 	"teacherPhone", "dayOfWeek", "timeBegin", "duration", "numberOfStudent", "subject", "className", "studentPhone", "status" 
            FROM 	"TeachingDates" AS "TeachingDate", "Subjects" s , "Classes" c 
            WHERE 	"TeachingDate"."teacherPhone" = '${teacherPhone}' AND 
                    "TeachingDate"."dayOfWeek" = '${dayOfWeek}' and 
                    "TeachingDate"."idSubject" = s.id and
                    "TeachingDate"."idClass"  = c.id`
            const data =  await db.sequelize.query(
                query
                ,{ type: QueryTypes.SELECT }
            )

            data
            resolve(data) // alternative by data objects
        } catch(e) {
            reject(e)
        }
    })
    return promise
}

const  getByDayOfWeekUnactive = (teacherPhone='', dayOfWeek='') => {
    const promise = new Promise(async function(resolve, reject) {
        try {
            const query = 
            `SELECT 	"teacherPhone", "dayOfWeek", "timeBegin", "duration", "numberOfStudent", "subject", "className", "studentPhone", "status" 
            FROM 	"TeachingDates" AS "TeachingDate", "Subjects" s , "Classes" c 
            WHERE 	"TeachingDate"."teacherPhone" = '${teacherPhone}' AND 
                    "TeachingDate"."dayOfWeek" = '${dayOfWeek}' and 
                    "TeachingDate"."idSubject" = s.id and
                    "TeachingDate"."idClass"  = c.id and
                    "TeachingDate"."studentPhone" is null and
                    "TeachingDate"."status" = 'unactivated'`
            const data =  await db.sequelize.query(
                query
                ,{ type: QueryTypes.SELECT }
            )

            data
            resolve(data) // alternative by data objects
        } catch(e) {
            reject(e)
        }
    })
    return promise
}

const insertTeachingDate = (teacherPhone='', { timeBegin, duration, dayOfWeek, numberOfStudent}) => {
    const promise = new Promise(async function(resolve, reject) {
        try {
            const currentDate = getCurrentDatetime()
            const query = `
            Insert into "TeachingDates"  
            ("teacherPhone", "dayOfWeek", "timeBegin", "duration", "numberOfStudent", "idSubject" , "idClass", "studentPhone", "status", "createdAt", "updatedAt")
            values	('${teacherPhone}', '${dayOfWeek}', '${timeBegin}', '${duration}', ${numberOfStudent}, 10, 13, null, 'unactivated', '2023-03-27', '2023-03-27')`
            let data = await db.sequelize.query(
                query
                , {type: QueryTypes.INSERT}
            )
            resolve(data) // alternative by data objects
        } catch(e) {
            reject(e)
        }
    })
    return promise
}

const deleteTeachingDate = (teacherPhone='', dayOfWeek, timeBegin) => {
    const promise = new Promise(async function(resolve, reject) {
        try {
            console.log(`data: ${teacherPhone} - ${timeBegin} - ${dayOfWeek}`)
            const currentDate = getCurrentDatetime()
            const query = `
                delete from "TeachingDates" 
                where 	"teacherPhone" = '${teacherPhone}' and 
                "dayOfWeek" = '${dayOfWeek}' and 
                "timeBegin" = '${timeBegin}'
            `
            console.log(query)
            let data = await db.sequelize.query(
                query
                , {type: QueryTypes.DELETE}
            )
            resolve(data) // alternative by data objects
        } catch(e) {
            reject(e)
        }
    })
    return promise
}

const getCurrentTeachingTimes = (teacherPhone='', dayOfWeek='Hai') => {
    const promise = new Promise(async function(resolve, reject) {
        try {
            console.log("data: ", teacherPhone)
            const query = `
                select "timeBegin", "duration" 
                from "TeachingDates" td 
                where 	td."teacherPhone" = '${teacherPhone}' and 
                td."dayOfWeek"  = '${dayOfWeek}'
            `
            let data = await db.sequelize.query(
                query,
                {type: QueryTypes.SELECT}
            )
            resolve(data)
        } catch(e) {
            reject(e)
        }
    })
    return promise
}

const registerTeachingDate = (studentPhone="", idClass, idSubject, {teacherPhone, dayOfWeek, timeBegin}) => {
    const promise = new Promise(async function(resolve, reject) {
        try {
            const query = `
                update	"TeachingDates" 
                set 	"idSubject" = ${idSubject}, "idClass" = ${idClass}, "studentPhone" = '${studentPhone}'
                where  	"teacherPhone" = '${teacherPhone}' and 
                        "dayOfWeek" = '${dayOfWeek}' and 
                        "timeBegin" = '${timeBegin}' 
            `
            let data = await db.sequelize.query(
                query,
                {type: QueryTypes.UPDATE}
            )
            resolve(data)
        } catch(e) {
            reject(e)
        }
    })
    return promise
}

const unregisterTeachingDate = ({teacherPhone, dayOfWeek, timeBegin}) => {
    const promise = new Promise(async function(resolve, reject) {
        try {
            const query = `
                update	"TeachingDates" 
                set 	"idSubject" = 10, "idClass" = 13, "studentPhone" = null, "status" = 'unactivated'
                where  	"teacherPhone" = '${teacherPhone}' and 
                        "dayOfWeek" = '${dayOfWeek}' and 
                        "timeBegin" = '${timeBegin}' 
            `
            let data = await db.sequelize.query(
                query,
                {type: QueryTypes.UPDATE}
            )
            resolve(data)
        } catch(e) {
            reject(e)
        }
    })
    return promise
}

const activateTeachingDate = ({teacherPhone, dayOfWeek, timeBegin}) => {
    const promise = new Promise(async function(resolve, reject) {
        try {
            const query = `
                update	"TeachingDates" 
                set 	"status" = 'active'
                where  	"teacherPhone" = '${teacherPhone}' and 
                        "dayOfWeek" = '${dayOfWeek}' and 
                        "timeBegin" = '${timeBegin}' 
            `
            let data = await db.sequelize.query(
                query,
                {type: QueryTypes.UPDATE}
            )
            resolve(data)
        } catch(e) {
            reject(e)
        }
    })
    return promise
}

module.exports = {
    getByDayOfWeek,
    getByDayOfWeekUnactive,
    insertTeachingDate,
    deleteTeachingDate,
    getCurrentTeachingTimes,
    registerTeachingDate,
    unregisterTeachingDate,
    activateTeachingDate
}