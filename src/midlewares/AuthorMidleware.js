import UserServices from '../services/UserServices'
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


module.exports = {
    checkUser
}