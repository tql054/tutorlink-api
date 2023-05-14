import db from '../models/index'

let getUserByPhone = (phoneNumber) => {
    const promise = new Promise(async function(resolve, reject) {
        try {
            const user = await db.Account.findOne({
                attributes: {
                    exclude: ['id', 'createdAt', 'updatedAt']
                },
                where: {
                    phoneNumber: phoneNumber
                }
            })
            resolve(user)
        } catch (e) {
            reject(e)
        }
    })

    return promise
}

module.exports = {
    getUserByPhone
}