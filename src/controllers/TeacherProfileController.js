import {getTeacherByPhone} from '../services/TeacherServices'

const getTeacherInfo = async (req, res) => {
    try {
        let role = req.data.role
        let data = await getTeacherByPhone(req.params.teacherPhone)
        
        return res.status(200).json(data[0])

        // if(role) {
        // } else {
        //     return res.status(400).json({
        //         errCode: 3,
        //         message: `User is not allowed`
        //     })
        // }
    } catch (e) {
        return res.status(500).json({
            errCode: 4,
            message: `Error from server: ${e}`
        })
    }
}

module.exports = {
    getTeacherInfo
}