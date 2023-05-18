import StudentServices from '../services/StudentServices'
const getStudentInfoByPhone = async (req, res) => {
    try {
        let role = req.data.role
        let data = await StudentServices.getStudentInfo(req.params.studentPhone)
        return res.status(200).json(data[0])
    } catch (e) {
        return res.status(500).json({
            errCode: 4,
            message: `Error from server: ${e}`
        })
    }
}

const insertNewStudent = async (req, res) => {
    try {
        
        let response = await StudentServices.insertStudent(req.params.idWard, req.params.idClass, req.body.student)
        return res.status(200).json(response)
    } catch (e) {
        return res.status(500).json({
            errCode: 4,
            message: `Error from server: ${e}`
        })
    }
}

const updateStudent = async (req, res) => {
    try {
        let response = await StudentServices.updateStudent(req.params.idWard, req.params.idClass, req.data.phoneNumber, req.body)
        return res.status(200).json(response)
    } catch (e) {
        return res.status(500).json({
            errCode: 4,
            message: `Error from server: ${e}`
        })
    }
}

module.exports = {
    getStudentInfoByPhone,
    insertNewStudent,
    updateStudent
}