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
                                    t."status" = 'Not approved'  `
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
                    set 	"status" ='Activated'
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
                    set 	"status" ='waiting'
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
                                '${experience}', '${status}', '2023-03-27', '2023-03-27')`
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
                            "identify" = '${identify}', "level"= '${level}', "experience"= '${experience}', "status"='${status}'
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
    getAllActiveTeacher,
    getAllNotApprovedTeacher,
    getAllWaitingTeacher,
    deleteTeacherNotUpdated,
    approveTeacher,
    refuseTeacher,
    getMostRatingTeachers,
    insertTeacher,
    updateTeacher
}