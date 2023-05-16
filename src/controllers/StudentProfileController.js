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

module.exports = {
    getStudentInfoByPhone
}