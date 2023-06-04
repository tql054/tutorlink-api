import db from "../models";
import getCurrentDatetime from '.'
const { QueryTypes } = require('sequelize');

let insertPayMent = (teacherPhone, {paymentId, dayOfWeek, timeBegin, duration, amount}) => {
    const promise = new Promise(async function(resolve, reject) {
        try {
            let query = `   insert into "PaymentTeachingDates" ("paymentId", "teacherPhone","dayOfWeek", "timeBegin",
                                                         "duration", "amount", "createdAt", "updatedAt")
                            values ('${paymentId}', '${teacherPhone}', '${dayOfWeek}','${timeBegin}', '${duration}', '${amount}', 
                                    '${getCurrentDatetime()}', '${getCurrentDatetime()}') `
            const data =  await db.sequelize.query(
                query
                ,{ type: QueryTypes.INSERT }
            )
            resolve("Adding payment successfully")
        } catch(e) {
            reject(e)
        }
    })
    return promise
}

let getAllPaymentByTeacher = (teacherPhone) => {
    const promise = new Promise(async function(resolve, reject) {
        try {
            let query = `   select 	"paymentId" ,"dayOfWeek" , "timeBegin" , duration ,"createdAt", "amount"  
                            from 	"PaymentTeachingDates" ptd
                            where 	"teacherPhone" = '${teacherPhone}'
                            `
            const data =  await db.sequelize.query(
                query
                ,{ type: QueryTypes.SELECT }
            )
            resolve(data)
        } catch(e) {
            reject(e)
        }
    })
    return promise
}

module.exports = {
    insertPayMent,
    getAllPaymentByTeacher
}