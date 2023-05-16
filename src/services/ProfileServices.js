import db from "../models";
const { QueryTypes } = require('sequelize');
let getStudentHomeData = (phoneNumber='') => {
    const promise = new Promise(async function(resolve, reject) {
        try {
            let query = `   select "phoneNumber" , "name" , "address" , w."wardName" , d."districtName" , c."className" , "schoolName" , "studentCard" , "ability" , "status"
                            from 	"Students" s  , "Wards" w , "Districts" d , "Classes" c 
                            where 	s."idWard" = w.id and
                                    w."idDistrict" = d.id and
                                    s."idClass" = c.id  and 
                                    "phoneNumber" = '${phoneNumber}' `
            const data =  await db.sequelize.query(
                query
                ,{ type: QueryTypes.SELECT }
            )
            resolve(data[0])
        } catch(e) {
            reject(e)
        }
    })
    return promise
}

let getTeacherHomeData = (phoneNumber='') => {
    const promise = new Promise(async function(resolve, reject) {
        try {
            let query = `   select "phoneNumber" , "name" , "address" , w."wardName" , d."districtName", "identify" , "level" , "experience" , "status"  
                            from "Teachers" t , "Wards" w , "Districts" d
                            where 
                            w."idDistrict" = d.id and
                            t."idWard" = w.id and 
                            t."phoneNumber" = '${phoneNumber}' `
            const data =  await db.sequelize.query(
                query
                ,{ type: QueryTypes.SELECT }
            )
            resolve(data[0])
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