import db from "../models";
const { QueryTypes } = require('sequelize');

let getLatestPost = () => {
    const promise = new Promise(async function(resolve, reject) {
        try {
            // get latest post
            let query = `
                select "teacherLevel"  , "teacherExperience" ,"otherRequires" , "address", "studentPhone" , "teacherPhone" ,
                        "wardName", "districtName", "subject", "className", "status"   from "StudentPosts" sp , "Subjects" s , "Classes" c , "Wards" w , "Districts" d 
                where 	sp."idSubject" = s.id and 
                        sp."idClass" = c.id and 	
                        sp."idWard" = w.id and 
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

let getSpecialPost = () => {
    const promise = new Promise(async function(resolve, reject) {
        try {
            // get special post
            let query = `
                select "teacherLevel"  , "teacherExperience" ,"otherRequires" , "address", "studentPhone" , "teacherPhone" ,
                        "wardName", "districtName", "subject", "className", "status"   from "StudentPosts" sp , "Subjects" s , "Classes" c , "Wards" w , "Districts" d 
                where 	sp."idSubject" = s.id and 
                        sp."idClass" = c.id and 	
                        sp."idWard" = w.id and 
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
module.exports = {
    getLatestPost,
    getSpecialPost
}