import db from "../models";
const { QueryTypes } = require('sequelize');
const  getStudentInfo = (studentPhone='') => {
    const promise = new Promise(async function(resolve, reject) {
        try {
            const query = `
                    select "phoneNumber" , "name" , "address" , w."wardName" , d."districtName" , c."className" , "schoolName" , "studentCard" , "ability" , "status"
                    from 	"Students" s  , "Wards" w , "Districts" d , "Classes" c 
                    where 	s."idWard" = w.id and
                            w."idDistrict" = d.id and
                            s."idClass" = c.id  and 
                            "phoneNumber" = '${studentPhone}'`
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

module.exports = {
    getStudentInfo
}