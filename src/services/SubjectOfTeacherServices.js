import db from "../models";
const { QueryTypes } = require('sequelize');

const getAllSubjectTeacher = (teacherPhone="") => {
    const promise = new Promise(async function(resolve, reject) {
        try {
            let query = `   select 	"teacherPhone" , sot."idSubject" , s.subject , sot."idClass" , c."className"  
                            from 	"SubjectOfTeachers" sot  , "Subjects" s , "Classes" c 
                            where 	sot ."idSubject" = s.id and 
                                    sot."idClass" = c.id and
                                    "teacherPhone" = '${teacherPhone}' `
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

const getAllClassesByTeacherPhone = (teacherPHone="") => {
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

const addSubjecTeacher = ({teacherPhone, idSubject, idClass}) => {
    const promise = new Promise(async function(resolve, reject) {
        try {
            let query = `   insert into "SubjectOfTeachers"  
                            values	('${teacherPhone}', ${idSubject}, ${idClass}, '2023-03-27', '2023-03-27')
                        `
            const data =  await db.sequelize.query(
                query
                ,{ type: QueryTypes.INSERT }
            )
            resolve("Add subject of teacher successfully")// alternative by data objects
        } catch(e) {
            reject(e)
        }
    })
    return promise
}



module.exports = {
    getAllSubjectTeacher,
    getAllSubjectsByClass,
    getAllClassesByTeacherPhone,
    addSubjecTeacher
}