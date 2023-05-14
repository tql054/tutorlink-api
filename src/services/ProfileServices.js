import db from "../models";
const { QueryTypes } = require('sequelize');
let getStudentHomeData = (phoneNumber='') => {
    const promise = new Promise(async function(resolve, reject) {
        try {
            const data = await db.Student.findOne({
                attributes: {
                    exclude: ['id', 'createAt', 'updateAt']
                },
                where: {
                    phoneNumber
                }
            })
            resolve(data) // alternative by data objects
        } catch(e) {
            reject(e)
        }
    })
    return promise
}

let getTeacherHomeData = (phoneNumber='') => {
    const promise = new Promise(async function(resolve, reject) {
        try {
            let query = `   select "phoneNumber" , "name" , "address" , "wardName" , "identify" , "level" , "experience" , "status"  
                            from "Teachers" t , "Wards" w 
                            where t."idWard" = w.id and t."phoneNumber" = '${phoneNumber}' `
            const data =  await db.sequelize.query(
                query
                ,{ type: QueryTypes.SELECT }
            )
            resolve(data[0])// alternative by data objects
        } catch(e) {
            reject(e)
        }
    })
    return promise
}

module.exports = {
    getStudentHomeData,
    getTeacherHomeData
}