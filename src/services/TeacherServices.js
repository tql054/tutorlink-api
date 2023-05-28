import db from "../models";
import getCurrentDatetime from ".";
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

const getTeacherStatus = (teacherPhone="") => {
    const promise = new Promise(async function(resolve, reject) {
        try {
            // get latest post
            let query =`select 	"status" 
                        from 	"Teachers" t
                        where 	t."phoneNumber" = '${teacherPhone}'`
                                
            const data =  await db.sequelize.query(
                query
                ,{ type: QueryTypes.SELECT }
            )
            
            resolve(data[0].status) // alternative by data objects
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

const getAllActiveTeacher = () => {
    const promise = new Promise(async function(resolve, reject) {
        try {
            // get latest post
            let query = `   select "phoneNumber" , "name" , "address" , "wardName" , d."districtName" , "identify" , "level" , "experience" , "status"  
                            from "Teachers" t , "Wards" w , "Districts" d 
                            where t."idWard" = w.id and 
                                    w."idDistrict" = d.id and
                                    t."status" = 'Activated'  `
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

const getAllNotApprovedTeacher = () => {
    const promise = new Promise(async function(resolve, reject) {
        try {
            // get latest post
            let query = `   select "phoneNumber" , "name" , "address" , "wardName" , d."districtName" , "identify" , "level" , "experience" , "status"  
                            from "Teachers" t , "Wards" w , "Districts" d 
                            where t."idWard" = w.id and 
                                    w."idDistrict" = d.id and
                                    t."status" = 'Not Approved'  `
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

const getAllWaitingTeacher = () => {
    const promise = new Promise(async function(resolve, reject) {
        try {
            // get latest post
            let query = `   select "phoneNumber" , "name" , "address" , "wardName" , d."districtName" , "identify" , "level" , "experience" , "status"  
                            from "Teachers" t , "Wards" w , "Districts" d 
                            where t."idWard" = w.id and 
                                    w."idDistrict" = d.id and
                                    t."status" = 'waiting'  `
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

const deleteTeacherNotUpdated = (teacherPhone) => {
    const promise = new Promise(async function(resolve, reject) {
        try {
            const query = `
                    delete from "Teachers" where "phoneNumber"= '${teacherPhone}'
            `
            let data = await db.sequelize.query(
                query
                , {type: QueryTypes.DELETE}
            )
            resolve("Delete user successfully")
        } catch(e) {
            reject(e)
        }
    })
    return promise
}

const approveTeacher = (teacherPhone) => {
    const promise = new Promise(async function(resolve, reject) {
        try {
            const query = `
                    update	"Teachers"  
                    set 	"status" ='Activated', "updatedAt" = '${getCurrentDatetime()}'
                    where  	"phoneNumber" = '${teacherPhone}'
                    `
            let data = await db.sequelize.query(
                query
                , {type: QueryTypes.UPDATE}
            )
            resolve("Activate user successfully")
        } catch(e) {
            reject(e)
        }
    })
    return promise
}

const refuseTeacher = (teacherPhone) => {
    const promise = new Promise(async function(resolve, reject) {
        try {
            const query = `
                    update	"Teachers"  
                    set 	"status" ='waiting', "updatedAt" = '${getCurrentDatetime()}'
                    where  	"phoneNumber" = '${teacherPhone}'
                    `
            let data = await db.sequelize.query(
                query
                , {type: QueryTypes.UPDATE}
            )
            resolve("Activate user successfully")
        } catch(e) {
            reject(e)
        }
    })
    return promise
}

const insertTeacher = (idWard, {phoneNumber, name="", address="", identify="", level="", experience ="" ,status="waiting"}) => {
    const promise = new Promise(async function(resolve, reject) {
        try {
            const query = `
                    Insert into "Teachers" ("phoneNumber", "name", "address", "idWard", "identify", 
                                            "level", "experience", "status", "createdAt", "updatedAt")
                    values		('${phoneNumber}', '${name}', '${address}', ${idWard}, '${identify}', '${level}',
                                '${experience}', '${status}', '${getCurrentDatetime()}', '${getCurrentDatetime()}')`
            let data = await db.sequelize.query(
                query
                , {type: QueryTypes.INSERT}
            )
            resolve("Update info successfully")
        } catch(e) {
            reject(e)
        }
    })
    return promise
}

const updateTeacher = (idWard, phoneNumber, { name, address, identify, level, experience, status}) => {
    const promise = new Promise(async function(resolve, reject) {
        try {
            const query = `
                    update	"Teachers"  
                    set 	"name" = '${name}', "address" = '${address}', "idWard" = ${idWard},
                            "identify" = '${identify}', "level"= '${level}', "experience"= '${experience}',
                             "status"='${status}', "updatedAt"='${getCurrentDatetime()}'
                    where  	"phoneNumber" = '${phoneNumber}'`
            let data = await db.sequelize.query(
                query
                , {type: QueryTypes.UPDATE}
            )
            resolve("Update info successfully")
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
            let querySelectTeachers = `  select distinct "phoneNumber" , "name" , "address" , "wardName" , d."districtName" , "identify" , "level" , "experience" , "status"  
            from "Teachers" t , "Wards" w , "Districts" d , "Ratings" r
            where t."idWard" = w.id and 
                    w."idDistrict" = d.id and
                    t."phoneNumber" = r."teacherPhone" and
                    r."rating" > 4`

            const data =  await db.sequelize.query(
                querySelectTeachers
                ,{ type: QueryTypes.SELECT }
            )
            resolve(data) // alternative by data objects
        } catch(e) {
            reject(e)
        }
    })
    return promise
}

const getAventuredTeachers = (district="", subject="", classObject="", limit = 5) => {
    const promise = new Promise(async function(resolve, reject) {
        try {
            // get latest post
            let query = `   select distinct	"phoneNumber" , "name" , "address" , w."wardName" , d."districtName" , "identify" , "level" , "experience" , "status" 
                            from 	"Teachers" t, "Wards" w , "Districts" d , "SubjectOfTeachers" sot 
                            where 	t."idWard" = w.id and 
                                    w."idDistrict" = d.id and 
                                    t."phoneNumber" = sot."teacherPhone" and
                                    t.status = 'Activated'
                                    
                                    ${district} ${subject} ${classObject} 
                            limit ${limit} `
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

const getAllSubjects= () => {
    const promise = new Promise(async function(resolve, reject) {
        try {
            // get latest post
            let query = `   select 	id, subject 
                            from 	"Subjects" s 
                            where   s."subject" is not null`
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

const getAllSubjectsByClass = (idClass) => {
    const promise = new Promise(async function(resolve, reject) {
        try {
            // get latest post
            let query = `   select 	id, subject 
                            from 	"Subjects" s 
                            where 	s."minClass" <= ${idClass} and 
                                    s."maxClass" >= ${idClass} and
                                    s."subject" is not null`
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
    getTeacherByPhone,
    getAllTeacher,
    getTeacherStatus,
    getAllActiveTeacher,
    getAllNotApprovedTeacher,
    getAllWaitingTeacher,
    deleteTeacherNotUpdated,
    approveTeacher,
    refuseTeacher,
    getMostRatingTeachers,
    insertTeacher,
    updateTeacher,
    getAventuredTeachers,
    getAllSubjects,
    getAllSubjectsByClass
}