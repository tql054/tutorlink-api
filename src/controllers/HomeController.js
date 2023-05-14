import ProfileServices from '../services/ProfileServices'
import StudentPostServices from '../services/StudentPostServices'
import TeacherServices from '../services/TeacherServices'

let getUserRole = async (req, res) => {
    try {
        let role = req.data.role
        return res.status(200).json(
            role
        )
    } catch (e) {
        return res.status(500).json({
            errCode: 4,
            message: `Error from server: ${e}`
        })
    }
}

let getHomeData = async (req, res) => {
    try {
        const role = req.data.role
        let data = {}
        switch(role) {
            case 'HS': {
                data.profile = await ProfileServices.getStudentHomeData(req.data.phoneNumber)
                data.latestTeachers = await TeacherServices.getAllTeacher()
                data.mostRatingTeachers = await TeacherServices.getMostRatingTeachers()
                return res.status(200).json({
                    role,
                    profile: data.profile,
                    latestTeachers: data.latestTeachers,
                    mostRatingTeachers: data.mostRatingTeachers
                })
            }

            case 'GV': {
                data.profile = await ProfileServices.getTeacherHomeData(req.data.phoneNumber)
                data.latestPost = await StudentPostServices.getLatestPost()
                data.specialPost = await StudentPostServices.getSpecialPost()
                data.schedule = ""
                return res.status(200).json({
                    role,
                    profile: data.profile,
                    latestPost: data.latestPost,
                    specialPost: data.specialPost,
                    schedule: data.schedule
                })
            }

            default: {
                data.profile = await ProfileServices.getStudentHomeData(req.data.soDienThoai)
                return res.status(200).json({
                    role,
                    profile: data.profile,
                })
            }
        }
    } catch (e) {
        return res.status(500).json({
            errCode: 4,
            message: `Error from server: ${e}`
        })
    }
}

module.exports = {
    getUserRole,
    getHomeData
}