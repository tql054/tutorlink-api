import TeachingDateServices from '../services/TeachingDateServices'

const getDayOfWeekSchedule = async (req, res) => {
    try {
        let role = req.data.role
        let data = await TeachingDateServices.getByDayOfWeek(req.data.phoneNumber, req.params.dow)
        if(role) {
            return res.status(200).json({
                role,
                data
            })
        } else {
            return res.status(400).json({
                errCode: 3,
                message: `User is not allowed`
            })
        }
    } catch (e) {
        return res.status(500).json({
            errCode: 4,
            message: `Error from server: ${e}`
        })
    }
}

const getUnactiveDayOfWeekSchedule = async (req, res) => {
    try {
        let role = req.data.role
        let data = await TeachingDateServices.getByDayOfWeekUnactive(req.params.teacherPhone, req.params.dow)
        if(role) {
            return res.status(200).json({
                role,
                data
            })
        } else {
            return res.status(400).json({
                errCode: 3,
                message: `User is not allowed`
            })
        }
    } catch (e) {
        return res.status(500).json({
            errCode: 4,
            message: `Error from server: ${e}`
        })
    }
}

const addTeachingDate = async (req, res) => {
    try {
        let teachingDate = req.body
        let response = await TeachingDateServices.insertTeachingDate(req.data.phoneNumber, teachingDate)
        return res.status(200).json("response")
    } catch(e) {
        return res.status(500).json({
            error: `Error from server: ${e}`
        })
    }
}

const removeTeachingDate = async (req, res) => {
    try {
        let dayOfWeek = req.params.dayOfWeek
        let timeBegin = req.params.timeBegin
        let response =  await TeachingDateServices.deleteTeachingDate(req.data.phoneNumber, dayOfWeek, timeBegin)
        return res.status(200).json("response")
    } catch(e) {
        return res.status(500).json({
            error: `Error from server: ${e}`
        })
    }
}

const validateTeachingTime = async (req, res) => {
    try {
        return res.status(200).json({
            validationPrevious: req.resultOfPrevious,
            validation: req.result,
            validationNext: req.resultOfNext
        })
    } catch(e) {
        return res.status(500).json({
            error: `Error from server: ${e}`
        })
    }
}

const registerTeachingDate = async (req, res) => {
    try {
        let teachingDate = req.body
        let response =  await TeachingDateServices.registerTeachingDate(
                                req.data.phoneNumber,
                                req.params.idClass,
                                req.params.idSubject,
                                teachingDate
                            )
        return res.status(200).json("Register successfully")
    } catch(e) {
        return res.status(500).json({
            error: `Error from server: ${e}`
        })
    }
}

const shutDownTeachingDate = async (req, res) => {
    try {
        let teachingDate = req.body
        let response =  await TeachingDateServices.shutDownTeachingDate(teachingDate)
        return res.status(200).json("Unactivate successfully")
    } catch(e) {
        return res.status(500).json({
            error: `Error from server: ${e}`
        })
    }
}

const unregisterTeachingDate = async (req, res) => {
    try {
        let teachingDate = req.body
        let response =  await TeachingDateServices.unregisterTeachingDate(teachingDate)
        return res.status(200).json("Unactivate successfully")
    } catch(e) {
        return res.status(500).json({
            error: `Error from server: ${e}`
        })
    }
}

const activateTeachingDate = async (req, res) => {
    try {
        let teachingDate = req.body
        let response =  await TeachingDateServices.activateTeachingDate(teachingDate)
        return res.status(200).json("Activate teaching date successfully")
    } catch(e) {
        return res.status(500).json({
            error: `Error from server: ${e}`
        })
    }
}

const getHomeTeachingDate = async (req, res) => {
    try {
        let data = await TeachingDateServices.getHomeTeachingDate(req.data.phoneNumber, req.params.dow)
        return res.status(200).json(
            data
        )
    } catch (e) {
        return res.status(500).json({
            errCode: 4,
            message: `Error from server: ${e}`
        })
    }
}

const getStudentSchedule = async (req, res) => {
    try {
        let data = await TeachingDateServices.getStudentSchedule(req.data.phoneNumber, req.params.dow)
        return res.status(200).json(
            data
        )
    } catch (e) {
        return res.status(500).json({
            errCode: 4,
            message: `Error from server: ${e}`
        })
    }
}

const ratingTeachingDate = async () => {

}

module.exports = {
    getDayOfWeekSchedule,
    getUnactiveDayOfWeekSchedule,
    addTeachingDate,
    removeTeachingDate,
    validateTeachingTime,
    registerTeachingDate,
    shutDownTeachingDate,
    unregisterTeachingDate,
    activateTeachingDate,
    getHomeTeachingDate,
    getStudentSchedule,
    ratingTeachingDate
}