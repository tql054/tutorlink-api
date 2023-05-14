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

const addTeachingDate = async (req, res) => {
    try {
        let teachingDate = req.body
        console.log("data phone number:", req.data.phoneNumber)
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


module.exports = {
    getDayOfWeekSchedule,
    addTeachingDate,
    removeTeachingDate,
    validateTeachingTime  
}