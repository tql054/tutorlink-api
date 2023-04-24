import db from '../models/index'
var jwt = require('jsonwebtoken')

let getAllUser = () => {
    const promise = new Promise( async function(resolve, reject) {
        try {
            let quyen = await db.TaiKhoan.findAll({
                attributes: {
                    exclude: ['id']
                },
                raw: true
            })
            resolve(quyen)
        } catch (error) {
            reject(error)
        }
    });

    return promise
}

let handleLogin = (soDienThoai, matKhau) => {
    const promise = new Promise( async function(resolve, reject) {
        try {
            if(await checkUserPhone(soDienThoai)) {
                let user =  await db.TaiKhoan.findOne({
                    attributes: {
                        exclude: ['id']
                    },
                    where: {
                        soDienThoai
                    },
                    raw: true
                })
                // let check = await bcrypt.compareSync(password, user.password)

                if(user.matKhau === matKhau) {
                    var token = jwt.sign({
                        soDienThoai: user.soDienThoai
                    }, 'sdt')
                    resolve({
                        errCode: 0,
                        message: 'OK',
                        token: token
                    })
                } else {
                    resolve({
                        errCode: 2,
                        message: "Mật khẩu chưa chính xác!",
                        token: ''
                    })
                }
            } else {
                resolve({
                    errCode: 1,
                    message: "Số điện thoại chưa đăng ký",
                    token: ''
                })
            }
            resolve()
        } catch (error) {
            reject(error)
        }
    });

    return promise
}

let checkUserPhone = async (soDienThoai='') => {
    const promise = new Promise(async function(resolve, reject) {
        try {
            let user = await db.TaiKhoan.findOne({
                attributes: {
                    exclude: ['id']
                },
                where: {
                    soDienThoai
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