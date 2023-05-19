import UserServices from '../services/UserServices'
import AccountServices from '../services/AccountServices'
var jwt = require('jsonwebtoken')
let checkUser = async (req, res, next) => {
    try {
        let token = req.params.token
        let phone = jwt.verify(token, 'phoneNumber').phoneNumber
        let user = await UserServices.getUserByPhone(phone)
        if(user) {
            req.data = user
            next()
        } else {
            return res.status(400).json({
                errCode: 1,
                message: `Số điện thoại không hợp lệ`,
            })
        }
    } catch (e) {
        return res.status(500).json({
            errCode: 4,
            message: `Error from server: ${e}`,
        })
    }
}

let checkAdmin = async (req, res, next) => {
    try {
        let token = req.cookies.token
        console.log(token)
        if(token) {
            let phone = jwt.verify(token, 'phoneNumber')
            if(phone) {
                next()
            } else {
                res.redirect('/login')
            }
        } else res.redirect('/login')
    } catch (e) {
        return res.status(500).json({
            errCode: 4,
            message: `Error from server: ${e}`,
        })
    }
}

let checkDoublePhoneNumber = async (req, res, next) => {
    try {
        let phoneNumber = req.body.phoneNumber
        let user = await AccountServices.checkDoublePhoneNumber(phoneNumber)
        if(user) {
            return res.status(400).json(`Số điện thoại này đã được đăng ký`)
        } else {
            next()
        }
    } catch (e) {
        return res.status(500).json({
            error: `Error from server: ${e}`
        })
    }
}


module.exports = {
    checkUser,
    checkAdmin,
    checkDoublePhoneNumber
}