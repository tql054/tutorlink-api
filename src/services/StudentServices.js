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

const getAllActiveStudent = () => {
    const promise = new Promise(async function(resolve, reject) {
        try {
            // get latest post
            let query = `   select "phoneNumber" , "name" , "address" , w."wardName" , d."districtName" , c."className" , "schoolName" , "studentCard" , "ability" , "status"
                            from 	"Students" s  , "Wards" w , "Districts" d , "Classes" c 
                            where 	s."idWard" = w.id and
                                    w."idDistrict" = d.id and
                                    s."idClass" = c.id and
                                    s."status" = 'Activated'`
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

const getStudentStatus = (phoneNumber="") => {
    const promise = new Promise(async function(resolve, reject) {
        try {
            // get latest post
            let query = `   select "status"
                            from 	"Students" s  
                            where 	s."phoneNumber"='${phoneNumber}'`
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

const getAllNotApprovedStudent = () => {
    const promise = new Promise(async function(resolve, reject) {
        try {
            // get latest post
            let query = `    select "phoneNumber" , "name" , "address" , w."wardName" , d."districtName" , c."className" , "schoolName" , "studentCard" , "ability" , "status"
                            from 	"Students" s  , "Wards" w , "Districts" d , "Classes" c 
                            where 	s."idWard" = w.id and
                                    w."idDistrict" = d.id and
                                    s."idClass" = c.id and
                                    s."status" = 'Not approved'`
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

const getAllWaitingStudent = () => {
    const promise = new Promise(async function(resolve, reject) {
        try {
            // get latest post
            let query = `   select "phoneNumber" , "name" , "address" , w."wardName" , d."districtName" , c."className" , "schoolName" , "studentCard" , "ability" , "status"
                            from 	"Students" s  , "Wards" w , "Districts" d , "Classes" c 
                            where 	s."idWard" = w.id and
                                    w."idDistrict" = d.id and
                                    s."idClass" = c.id and
                                    s."status" = 'waiting'`
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

const deleteStudentNotUpdated = (StudentPhone) => {
    const promise = new Promise(async function(resolve, reject) {
        try {
            const query = `
                    delete from "Students" where "phoneNumber"= '${StudentPhone}'
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


const approveStudent = (studentPhone) => {
    const promise = new Promise(async function(resolve, reject) {
        try {
            const query = `
                    update	"Students"  
                    set 	"status" ='Activated'
                    where  	"phoneNumber" = '${studentPhone}'
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

const refuseStudent = (studentPhone) => {
    const promise = new Promise(async function(resolve, reject) {
        try {
            const query = `
                    update	"Students"  
                    set 	"status" ='waiting'
                    where  	"phoneNumber" = '${studentPhone}'
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

const updateStudent = (idWard, idClass, phoneNumber, {name, address, schoolName, studentCard, ability, transcript}) => {
    const promise = new Promise(async function(resolve, reject) {
        try {
            const query = `
                    update	"Students"  
                    set 	"name" = '${name}', "address" = '${address}', "idWard" = ${idWard}, "idClass" = ${idClass},
                            "schoolName" = '${schoolName}', "studentCard"= '${studentCard}', "ability" = '${ability}', 
                            "transcript"='${transcript}', "status"='Not approved'
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
    getStudentStatus,
    insertStudent,
    updateStudent,
    getAllActiveStudent,
    getAllNotApprovedStudent,
    getAllWaitingStudent,
    deleteStudentNotUpdated,
    approveStudent,
    refuseStudent
}