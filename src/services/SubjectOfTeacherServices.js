import db from "../models";
const { QueryTypes } = require('sequelize');

const getAllClasses = (teacherPHone="") => {
    const promise = new Promise(async function(resolve, reject) {
        try {
            let query = `   select distinct  "idClass" ,c."className" 
                            from "SubjectOfTeachers" sot, "Classes" c  
                            where	sot."teacherPhone" = '${teacherPHone}' and
                                    sot."idClass" = c.id `
            const data =  await db.sequelize.query(
                query
                ,{ type: QueryTypes.SELECT }
            )
            resolve(data)// alternative by data objects
        } catch(e) {
            reject(e)
        }
    })
    return promise
}

const getAllSubjectsByClass = (teacherPhone="", idClass=13) => {
    const promise = new Promise(async function(resolve, reject) {
        try {
            let query = `   select 	"idSubject" ,s."subject" 
                            from 	"SubjectOfTeachers" sot , "Subjects" s 
                            where 	sot ."teacherPhone" = '${teacherPhone}' and
                                    sot."idClass" = ${idClass} and
                                    sot."idSubject" = s.id  `
            const data =  await db.sequelize.query(
                query
                ,{ type: QueryTypes.SELECT }
            )
            resolve(data)// alternative by data objects
        } catch(e) {
            reject(e)
        }
    })
    return promise
}

module.exports = {
    getAllClasses,
    getAllSubjectsByClass
}