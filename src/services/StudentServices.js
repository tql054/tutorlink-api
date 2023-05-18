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

const insertStudent = (idWard, idClass, {phoneNumber, name="", address="", schoolName="", studentCard="", 
                        ability="", transcript="", status="waiting"}) => {
    const promise = new Promise(async function(resolve, reject) {
        try {
            const query = `
                    insert into "Students" ("phoneNumber", "name", "address", "idWard", "idClass", "schoolName", 
                            "studentCard", "ability", "transcript", "status", "createdAt", "updatedAt")
                    values	('${phoneNumber}', '${name}', '${address}', ${idWard}, ${idClass}, '${schoolName}', '${studentCard}',
                            '${ability}', '${transcript}', '${status}', '2023-03-27', '2023-03-27')
                    `
            const data =  await db.sequelize.query(
                query
                ,{ type: QueryTypes.INSERT }
            )

            resolve("Update student info successfully") // alternative by data objects
        } catch(e) {
            reject(e)
        }
    })
    return promise
}

const updateStudent = (idWard, idClass, phoneNumber, {name, address, schoolName, studentCard, ability, transcript, status}) => {
    const promise = new Promise(async function(resolve, reject) {
        try {
            const query = `
                    update	"Students"  
                    set 	"name" = '${name}', "address" = '${address}', "idWard" = ${idWard}, "idClass" = ${idClass},
                            "schoolName" = '${schoolName}', "studentCard"= '${studentCard}', "ability" = '${ability}', 
                            "transcript"='${transcript}', "status"='${status}'
                    where  	"phoneNumber"  = '${phoneNumber}'
                    `
            const data =  await db.sequelize.query(
                query
                ,{ type: QueryTypes.UPDATE }
            )

            resolve("Update student info successfully") // alternative by data objects
        } catch(e) {
            reject(e)
        }
    })
    return promise
}

module.exports = {
    getStudentInfo,
    insertStudent,
    updateStudent
}