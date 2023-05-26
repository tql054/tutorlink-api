import ProfileServices from '../services/ProfileServices'
import StudentPostServices from '../services/StudentPostServices'
import TeacherServices from '../services/TeacherServices'
import StudentServices from '../services/StudentServices'
import TeachingDateServices from '../services/TeachingDateServices'

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
                data.latestTeachers = await TeacherServices.getAllActiveTeacher()
                data.mostRatingTeachers = await TeacherServices.getAllActiveTeacher()
                return res.status(200).json({
                    role,
                    profile: data.profile,
                    latestTeachers: data.latestTeachers,
                    mostRatingTeachers: data.mostRatingTeachers
                })
            }

            case 'GV': {
                const date = new Date();
                const dayOfWeek = date.getDay();
                
                data.profile = await ProfileServices.getTeacherHomeData(req.data.phoneNumber)
                data.schedule = await TeachingDateServices.getHomeTeachingDate(req.data.phoneNumber, 'Tư')
                return res.status(200).json({
                    role,
                    profile: data.profile,
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

function getDayName(dayOfWeek) {
    const days = ['CN', 'Hai', 'Ba', 'Tư', 'Năm', 'Sáu', 'Bảy'];
    return days[dayOfWeek];
}

let getAdminManageAllTeacher = async (req, res) => {
    try {
        const data = await TeacherServices.getAllActiveTeacher()
        res.render('teacherPage', {data, status:'activated'})
    } catch (e) {
        return res.status(500).json({
            errCode: 4,
            message: `Error from server: ${e}`
        })
    }
}

let getAdminManageNotApproveTeacher = async (req, res) => {
    try {
        const data = await TeacherServices.getAllNotApprovedTeacher()
        res.render('teacherPage', {data, status:'not approve'})
    } catch (e) {
        return res.status(500).json({
            errCode: 4,
            message: `Error from server: ${e}`
        })
    }
}

let getAdminManageWaitingTeacher = async (req, res) => {
    try {
        const data = await TeacherServices.getAllWaitingTeacher()
        res.render('teacherPage', {data, status:'waiting'})
    } catch (e) {
        return res.status(500).json({
            errCode: 4,
            message: `Error from server: ${e}`
        })
    }
}

let deleteTeacherNotUpdated = async (req, res) => {
    try {
        const response = await TeacherServices.deleteTeacherNotUpdated(req.params.phoneNumber)
        res.redirect('/teacher/waiting')
    } catch (e) {
        return res.status(500).json({
            errCode: 4,
            message: `Error from server: ${e}`
        })
    }
}

let approveTeacher = async (req, res) => {
    try {
        const response = await TeacherServices.approveTeacher(req.params.phoneNumber)
        res.redirect('/teacher/not-approved')
    } catch (e) {
        return res.status(500).json({
            errCode: 4,
            message: `Error from server: ${e}`
        })
    }
}

let refuseTeacher = async (req, res) => {
    try {
        const response = await TeacherServices.refuseTeacher(req.params.phoneNumber)
        res.redirect('/teacher/not-approved')
    } catch (e) {
        return res.status(500).json({
            errCode: 4,
            message: `Error from server: ${e}`
        })
    }
}

let getAdminManageStudent= async (req, res) => {
    try {
        const data = await StudentServices.getAllActiveStudent()
        res.render('studentPage', {data, status:'activated'})
    } catch (e) {
        return res.status(500).json({
            errCode: 4,
            message: `Error from server: ${e}`
        })
    }
}

let getAdminManageNotApproveStudent = async (req, res) => {
    try {
        const data = await StudentServices.getAllNotApprovedStudent()
        res.render('studentPage', {data, status:'not approve'})
    } catch (e) {
        return res.status(500).json({
            errCode: 4,
            message: `Error from server: ${e}`
        })
    }
}

let getAdminManageWaitingStudent= async (req, res) => {
    try {
        const data = await StudentServices.getAllWaitingStudent()
        res.render('studentPage', {data, status:'waiting'})
    } catch (e) {
        return res.status(500).json({
            errCode: 4,
            message: `Error from server: ${e}`
        })
    }
}

let deleteStudentNotUpdated = async (req, res) => {
    try {
        const response = await StudentServices.deleteStudentNotUpdated(req.params.phoneNumber)
        res.redirect('/student/waiting')
    } catch (e) {
        return res.status(500).json({
            errCode: 4,
            message: `Error from server: ${e}`
        })
    }
}

let approveStudent= async (req, res) => {
    try {
        const response = await StudentServices.approveStudent(req.params.phoneNumber)
        res.redirect('/student/not-approved')
    } catch (e) {
        return res.status(500).json({
            errCode: 4,
            message: `Error from server: ${e}`
        })
    }
}

let refuseStudent = async (req, res) => {
    try {
        const response = await StudentServices.refuseStudent(req.params.phoneNumber)
        res.redirect('/student/not-approved')
    } catch (e) {
        return res.status(500).json({
            errCode: 4,
            message: `Error from server: ${e}`
        })
    }
}

module.exports = {
    getUserRole,
    getHomeData,
    getAdminManageAllTeacher,
    getAdminManageNotApproveTeacher,
    getAdminManageWaitingTeacher,
    deleteTeacherNotUpdated,
    approveTeacher,
    refuseTeacher,
    getAdminManageStudent,
    getAdminManageNotApproveStudent,
    getAdminManageWaitingStudent,
    deleteStudentNotUpdated,
    approveStudent,
    refuseStudent,
    
}