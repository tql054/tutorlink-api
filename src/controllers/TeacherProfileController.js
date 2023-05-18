import TeacherServices from '../services/TeacherServices'
import {getAllClassesByTeacherPhone, getAllSubjectsByClass} from '../services/SubjectOfTeacherServices'

const getTeacherInfo = async (req, res) => {
    try {
        let role = req.data.role
        let data = await TeacherServices.getTeacherByPhone(req.params.teacherPhone)
        
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

const getAllTeacherClasses = async (req, res) => {
    try {
        let data = await getAllClassesByTeacherPhone(req.params.teacherPhone)
        
        return res.status(200).json(data)
    } catch (e) {
        return res.status(500).json({
            errCode: 4,
            message: `Error from server: ${e}`
        })
    }
}

const getTeacherSubjectsByClass = async (req, res) => {
    try {
        let data = await getAllSubjectsByClass(req.params.teacherPhone, req.params.idClass)
        
        return res.status(200).json(data)
    } catch (e) {
        return res.status(500).json({
            errCode: 4,
            message: `Error from server: ${e}`
        })
    }
}

const insertNewTeacher = async (req, res) => {
    try {
        let response = await TeacherServices.insertTeacher(req.params.idWard, req.body.teacher)
        
        return res.status(200).json(response)
    } catch (e) {
        return res.status(500).json({
            errCode: 4,
            message: `Error from server: ${e}`
        })
    }
}

const updateTeacher = async (req, res) => {
    try {
        let response = await TeacherServices.updateTeacher(req.params.idWard, req.data.phoneNumber, req.body)
        return res.status(200).json(response)
    } catch (e) {
        return res.status(500).json({
            errCode: 4,
            message: `Error from server: ${e}`
        })
    }
}

module.exports = {
    getTeacherInfo,
    getAllTeacherClasses,
    getTeacherSubjectsByClass,
    insertNewTeacher,
    updateTeacher
}