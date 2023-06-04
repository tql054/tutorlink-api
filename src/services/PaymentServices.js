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

module.exports = {
    insertPayMent
}