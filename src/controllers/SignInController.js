import AccountServices from '../services/AccountServices'
import TeacherServices from '../services/TeacherServices'
import StudentServices from '../services/StudentServices'

const handleUserSignin = async (req, res) => {
    try {   
        let data = await AccountServices.insertAccount(req.body.phoneNumber, req.body.password, req.body.role)
        if(data.role === 'GV') {
            let response = await TeacherServices.insertTeacher(1, {phoneNumber: data.phoneNumber})
        } else {
            let response = await StudentServices.insertStudent(1, 1, {phoneNumber: data.phoneNumber})
        }
        return res.status(200).json(data)

    } catch(e) {
        return res.status(500).json({
            error: `Error from server: ${e}`
        })
    }
}

const getAllDistrict = async (req, res) => {
    try {   
        let result = await AccountServices.getAllDistrict()
        return res.status(200).json(result)
    } catch(e) {
        return res.status(500).json({
            error: `Error from server: ${e}`
        })
    }
}

const getWardByDistrict = async (req, res) => {
    try {   
        let result = await AccountServices.getWardsByDistrict(req.params.idDistrict)
        return res.status(200).json(result)
    } catch(e) {
        return res.status(500).json({
            error: `Error from server: ${e}`
        })
    }
}

const getAllClasses = async (req, res) => {
    try {   
        let result = await AccountServices.getAllClasses()
        return res.status(200).json(result)
    } catch(e) {
        return res.status(500).json({
            error: `Error from server: ${e}`
        })
    }
}


module.exports = {
    handleUserSignin,
    getAllDistrict,
    getWardByDistrict,
    getAllClasses
}