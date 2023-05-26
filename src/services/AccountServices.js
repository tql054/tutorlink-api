import getCurrentDatetime from ".";
import db from "../models";
const { QueryTypes } = require('sequelize');

const getAllDistrict = () => {
    const promise = new Promise(async function(resolve, reject) {
        try {
            // get latest post
            let data = await db.District.findAll({
                attributes: {
                    exclude: ['createdAt', 'updatedAt']
                },
                raw: true
            })
            resolve(data) 
        } catch(e) {
            reject(e)
        }
    })
    return promise
}

const getWardsByDistrict = (idDistrict="") => {
    const promise = new Promise(async function(resolve, reject) {
        try {
            // get latest post
            let data = await db.Ward.findAll({
                attributes: {
                    exclude: ['createdAt', 'updatedAt']
                },
                where: {
                    idDistrict
                },
                raw: true
            })
            resolve(data) 
        } catch(e) {
            reject(e)
        }
    })
    return promise
}

const getAllClasses = () => {
    const promise = new Promise(async function(resolve, reject) {
        try {
            const query = `select id , "className" 
                            from "Classes" c 
                            where "className"  is not null`
            let data = await db.sequelize.query(
                query
                , {type: QueryTypes.SELECT}
            )
            resolve(data) 
        } catch(e) {
            reject(e)
        }
    })
    return promise
}

const checkDoublePhoneNumber = (phoneNumber="") => {
    const promise = new Promise(async function(resolve, reject) {
        try {
            // get latest post
            let data = await db.Account.findOne({
                attributes: {
                    exclude: ['id']
                },
                where: {
                    phoneNumber
                },
                raw: true
            })
            resolve(data) 
        } catch(e) {
            reject(e)
        }
    })
    return promise
}

const insertAccount = (phoneNumber="",password="", role="") => {
    const promise = new Promise(async function(resolve, reject) {
        try {
            const query = `Insert into "Accounts"  
                          values 	('${phoneNumber}', '${password}', '${role}', '${getCurrentDatetime}', '${getCurrentDatetime}')`
            let data = await db.sequelize.query(
                query
                , {type: QueryTypes.INSERT}
            )
            resolve({
                phoneNumber,
                password,
                role
            })
        } catch(e) {
            reject(e)
        }
    })
    return promise
}



module.exports = {
    getAllDistrict,
    getWardsByDistrict,
    checkDoublePhoneNumber,
    insertAccount,
    getAllClasses
}