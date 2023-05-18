import db from '../models/index'
var jwt = require('jsonwebtoken')

let getAllUser = () => {
    const promise = new Promise( async function(resolve, reject) {
        try {
            let role = await db.Account.findAll({
                attributes: {
                    exclude: ['id']
                },
                raw: true
            })
            resolve(role)
        } catch (error) {
            reject(error)
        }
    });
    return promise
}

let handleLogin = (phoneNumber, password) => {
    const promise = new Promise( async function(resolve, reject) {
        try {
            if(await checkUserPhone(phoneNumber)) {
                let user =  await db.Account.findOne({
                    attributes: {
                        exclude: ['id']
                    },
                    where: {
                        phoneNumber
                    },
                    raw: true
                })

                if(user.password === password) {
                    var token = jwt.sign({
                        phoneNumber: user.phoneNumber
                    }, 'phoneNumber')
                    resolve({
                        errCode: 0,
                        message: 'OK',
                        token: token,
                        role: user.role,
                        status: ''
                    })
                } else {
                    resolve({
                        errCode: 2,
                        message: "Mật khẩu chưa chính xác!",
                        token: '',
                        role: '',
                        status: ''
                    })
                }
            } else {
                resolve({
                    errCode: 1,
                    message: "Số điện thoại chưa đăng ký",
                    token: '',
                    role: '',
                    status: ''
                })
            }
            resolve()
        } catch (error) {
            reject(error)
        }
    });

    return promise
}

let checkUserPhone = async (phoneNumber='') => {
    const promise = new Promise(async function(resolve, reject) {
        try {
            let user = await db.Account.findOne({
                attributes: {
                    exclude: ['id']
                },
                where: {
                    phoneNumber
                }
            })

            user ? resolve(true) : resolve(false)
        } catch(e) {
            reject(e)
        }
    })

    return promise
}


module.exports = {
    handleLogin,
    checkUserPhone,
    getAllUser
}