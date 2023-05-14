import db from "../models";
const { QueryTypes } = require('sequelize');

const getTeacherByPhone = (teacherPhone="") => {
    const promise = new Promise(async function(resolve, reject) {
        try {
            // get latest post
            let query =`select 	"phoneNumber","name" , "address", w."wardName" , d."districtName"  , "identify"  , "level" , "experience" , "status" 
                        from 	"Teachers" t, "Wards" w, "Districts" d 
                        where 	t."phoneNumber" = '${teacherPhone}' and 
                                t."idWard" = w.id and 
                                w."idDistrict" = d.id `
            const data =  await db.sequelize.query(
                query
                ,{ type: QueryTypes.SELECT }
            )
            resolve(data) // alternative by data objects
        } catch(e) {
            reject(e)
        }
    })
    return promise
}

const getAllTeacher = () => {
    const promise = new Promise(async function(resolve, reject) {
        try {
            // get latest post
            let query = `   select "phoneNumber" , "name" , "address" , "wardName" , d."districtName" , "identify" , "level" , "experience" , "status"  
                            from "Teachers" t , "Wards" w , "Districts" d 
                            where t."idWard" = w.id and 
                                    w."idDistrict" = d.id  `
            const data =  await db.sequelize.query(
                query
                ,{ type: QueryTypes.SELECT }
            )
            resolve(data) // alternative by data objects
        } catch(e) {
            reject(e)
        }
    })
    return promise
}

const getMostRatingTeachers = () => {
    const promise = new Promise(async function(resolve, reject) {
        try {
            // get latest post
            let querySelectTeachers = `  select "phoneNumber" , "name" , "address" , "wardName" , d."districtName" , "identify" , "level" , "experience" , "status"  
            from "Teachers" t , "Wards" w , "Districts" d 
            where t."idWard" = w.id and 
                    w."idDistrict" = d.id `

            const data =  await db.sequelize.query(
                querySelectTeachers
                ,{ type: QueryTypes.SELECT }
            )

            data.map(async (value, index) => {
                let querySelectSubjectOfTeachers = `
                            select  s.subject , c."className" 
                            from 	"SubjectOfTeachers" sot, "Subjects" s , "Classes" c 
                            where 	"teacherPhone" = '${value.phoneNumber}' and 
                                    sot."idSubject" = s.id and 
                                    sot."idClass" = c.id 
                `
                const listSOT = await db.sequelize.query(
                    querySelectSubjectOfTeachers
                    ,{ type: QueryTypes.SELECT }
                )
                value.listSOT = []
            })
            resolve(data) // alternative by data objects
        } catch(e) {
            reject(e)
        }
    })
    return promise
}


module.exports = {
    getTeacherByPhone,
    getAllTeacher,
    getMostRatingTeachers
}