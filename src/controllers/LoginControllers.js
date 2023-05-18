import LoginServices from '../services/LoginServices'
import TeacherServices from '../services/TeacherServices'
import StudentServices from '../services/StudentServices'

const handleUserLogin = async function(req, res) {
    try {   
        let userPhone = req.body.phone
        let userPassword = req.body.password
        if(userPhone && userPassword) {
            let userData = await LoginServices.handleLogin(userPhone, userPassword)
            if(userData.role === 'GV') {
                let teacherInfo = await TeacherServices.getTeacherByPhone(userPhone)
                userData.status = teacherInfo[0].status
            } 
            if(userData.role === 'HS') {
                let studentInfo = await StudentServices.getStudentInfo(userPhone)
                userData.status = studentInfo[0].status
            }
            return res.status(200).json(
                userData
            )
        }
        return res.status(200).json({
            errCode: 5,
            message: "Thiếu dữ liệu đăng nhập",
            token: ''
        })

    } catch(e) {
        return res.status(500).json({
            errCode: 4,
            message: `Error from server: ${e}`,
            token: ''
        })
    }
}

const checkUserPhone = async function(req, res) {
    try {
        const response = await LoginServices.checkUserPhone(req.params.phone)
        if(response) {
            return res.status(200).json({
                errCode: 0,
                message: ''
            })
        } else {
            return res.status(200).json({
                errCode: 1,
                message: 'Số điện thoại chưa được đăng ký'
            })
        }

    }  catch(e) {
        return res.status(500).json({
            errCode: 4,
            message: `Error from server: ${e}`
        })
    }
}

const isValidPhone = phone => /(03|05|07|08|09|01[2|6|8|9])+([0-9]{8})\b/.test(phone);

const checkRegisterUserPhone = async function(req, res) {
    try {
        const phone = req.params.phone;
        
        if (isValidPhone(phone)) {
            const response = await LoginServices.checkUserPhone(phone)
            if(response) {
                return res.status(200).json("Số điện thoại đã được đăng ký")
            } else {
                return res.status(200).json("")
            }
        } else {
            return res.status(200).json('Số điện thoại không hợp lệ')
        }

    }  catch(e) {
        return res.status(500).json({
            errCode: 4,
            message: `Error from server: ${e}`
        })
    }
}

const displayAllUser = async function(req, res) {
    try {
        const data = await LoginServices.getAllUser()
        return res.send(data)
    } catch (e) {
        return res.status(500).json({
            errCode: 4,
            message: `Error from server: ${e}`
        })
    }
}

module.exports = {
    handleUserLogin,
    checkRegisterUserPhone,
    checkUserPhone,
    displayAllUser

}