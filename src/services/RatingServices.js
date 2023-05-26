import db from "../models";
const { QueryTypes } = require('sequelize');

const getAllRatingByTeacherPhone = (teacherPhone="") => {
    const promise = new Promise(async function(resolve, reject) {
        try {
            const query = `
                            select 	t.name as teacherName, "teacherPhone" , s2.name as studentName, "studentPhone" ,
                                    "idSubject", s."subject"  , r."idClass" , c."className" , "rating", "comments" 
                            from 	"Ratings" r , "Subjects" s , "Classes" c , "Teachers" t , "Students" s2 
                            where 	r."idSubject" = s.id and 
                                    r."idClass" = c.id and 
                                    r."teacherPhone"  = t."phoneNumber" and 
                                    r."studentPhone" = s2."phoneNumber" and 
                                    "teacherPhone" = '${teacherPhone}'
                        `
            let data = await db.sequelize.query(
                query
                , {type: QueryTypes.SELECT}
            )
            resolve(data) // alternative by data objects
        } catch(e) {
            reject(e)
        }
    })
    return promise
}

const addRating = ({teacherPhone, studentPhone, idSubject, idClass, rating, comments}) => {
    const promise = new Promise(async function(resolve, reject) {
        try {
            const query = `
                            Insert into "Ratings"  
                            ("teacherPhone", "studentPhone", "idSubject", "idClass", "rating", "comments", "createdAt", "updatedAt")
                            values	('${teacherPhone}', '${studentPhone}', '${idSubject}', '${idClass}', ${rating}, '${comments}','2023-03-27', '2023-03-27')
                        `
            await db.sequelize.query(
                query
                , {type: QueryTypes.INSERT}
            )
            resolve("Adding rating successfully") // alternative by data objects
        } catch(e) {
            reject(e)
        }
    })
    return promise
}


module.exports = {
    getAllRatingByTeacherPhone,
    addRating
}
