import db from '../models/index'

let getUserByPhone = (phone) => {
    const promise = new Promise(async function(resolve, reject) {
        try {
            const user = await db.TaiKhoan.findOne({
                attributes: {
                    exclude: ['id']
                },
                where: {
                    soDienThoai: phone
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