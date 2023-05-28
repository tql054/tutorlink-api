import TeacherServices from '../services/TeacherServices'
import RatingServices from '../services/RatingServices'
import {getAllClassesByTeacherPhone, getAllSubjectsByClass, getAllSubjectTeacher} from '../services/SubjectOfTeacherServices'

const getAventuredTeachers = async (req, res) => {
    try {
        let name = req.params.name
        let currentPage = req.params.currentPage
        let limit = currentPage * 10
        let district = req.params.idDistrict!=0?` and w."idDistrict" = ${req.params.idDistrict}`:""
        let subject = req.params.idSubject!=0?` and sot."idSubject" = ${req.params.idSubject}`:""
        let classObject = req.params.idClass!=0?` and sot."idClass" = ${req.params.idClass}`:""
        let data = await TeacherServices.getAventuredTeachers(district, subject, classObject, limit)
        let isNextPage =  data.length === currentPage*10
        
        let listTeacher = data.slice((limit - 10 - data.length))
        if(name!="null") {
            console.log("name input: ", name)
            let newData = listTeacher.filter(function(value, index, array) {
                    console.log("name output: ", value.name)
                    return value.name.trim().toLowerCase().includes(name.trim().toLowerCase())
                })
                console.log("new data: ", newData)
            listTeacher = newData
        }
        return res.status(200).json({
            isNextPage,
            listTeacher
        })

    } catch (e) {
        return res.status(500).json({
            errCode: 4,
            message: `Error from server: ${e}`
        })
    }
}

const getTeacherProfileData = async (req, res) => {
    try {
        let teacherPhone = req.data.phoneNumber
        let teacherInfoResult = await TeacherServices.getTeacherByPhone(teacherPhone)
        let teacher = teacherInfoResult[0]
        let listSubject = await getAllSubjectTeacher(teacherPhone)
        let listRating = await RatingServices.getAllRatingByTeacherPhone(teacherPhone)
        let listRatingSize = listRating.length<=0?0:listRating.length
        let rating = listRating.reduce(function(accumulator, currentValue) {
            return accumulator + currentValue.rating;
          }, 0)/(listRatingSize)
        return res.status(200).json({
            teacher,
            listSubject,
            rating: rating.toFixed(1),
            listRating
        })
    } catch (e) {
        return res.status(500).json({
            errCode: 4,
            message: `Error from server: ${e}`
        })
    }
}

const getTeacherInfo = async (req, res) => {
    try {
        let role = req.data.role
        let data = await TeacherServices.getTeacherByPhone(req.params.teacherPhone)
        return res.status(200).json(data[0])
    } catch (e) {
        return res.status(500).json({
            errCode: 4,
            message: `Error from server: ${e}`
        })
    }
}

const getTeacherStatus = async (req, res) => {
    try {
        let role = req.data.role
        let data = await TeacherServices.getTeacherStatus(req.data.phoneNumber)
        return res.status(200).json(data)
    } catch (e) {
        return res.status(500).json({
            errCode: 4,
            message: `Error from server: ${e}`
        })
    }
}

const getAllSubjectOfTeacher = async (req, res) => {
    try {
        let data = await getAllSubjectTeacher(req.params.teacherPhone)
        
        return res.status(200).json(data)
    } catch (e) {
        return res.status(500).json({
            errCode: 4,
            message: `Error from server: ${e}`
        })
    }
}

const getSubjectOfTeacher = async (req, res) => {
    try {
        let data = await getAllSubjectTeacher(req.data.teacherPhone)
        
        return res.status(200).json(data)
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
    getAventuredTeachers,
    getTeacherProfileData,
    getTeacherInfo,
    getTeacherStatus,
    getSubjectOfTeacher,
    getAllSubjectOfTeacher,
    getAllTeacherClasses,
    getTeacherSubjectsByClass,
    insertNewTeacher,
    updateTeacher
}