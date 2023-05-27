import RatingServices from '../services/RatingServices'
import TeachingDateServices from '../services/TeachingDateServices'

const getAllRatingByTeacherPhone = async (req, res) => {
    try {
        let role = req.data.role
        let teacherPhone = req.params.teacherPhone
        let data = await RatingServices.getAllRatingByTeacherPhone(teacherPhone)
        if(role) {
            return res.status(200).json(data)
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

const getAvarageRatingByTeacherPhone = async (req, res) => {
    try {
        let role = req.data.role
        let teacherPhone = req.params.teacherPhone
        let listRating = await RatingServices.getAllRatingByTeacherPhone(teacherPhone)
        let rating = listRating.reduce(function(accumulator, currentValue) {
            return accumulator + currentValue.rating;
          }, 0)/(listRating.length)
        return res.status(200).json(rating.toFixed(1))
    } catch (e) {
        return res.status(500).json({
            errCode: 4,
            message: `Error from server: ${e}`
        })
    }
}

const getRatingPageData = async (req, res) => {
    try {
        let teacherPhone = req.params.teacherPhone
        let data = await RatingServices.getAllRatingByTeacherPhone(teacherPhone)
        let numberOfCmts = data.length
        let averageRating = data.reduce(function(accumulator, currentValue) {
            return accumulator + currentValue.rating;
        }, 0)/(numberOfCmts>0?numberOfCmts:1)
        return res.status(200).json({
            averageRating: averageRating.toFixed(1),
            numberOfCmts,
            data
        })
    } catch (e) {
        return res.status(500).json({
            error: `Error from server: ${e}`
        })
    }
}

const addRating = async (req, res) => {
    try {
        let rating = req.body
        let unRegisterData = {
            teacherPhone: rating.teacherPhone,
            dayOfWeek: req.params.dow,
            timeBegin: req.params.timeBegin,
            
        }
        let responseAdding = await RatingServices.addRating(rating)
        let responseUpdating = await TeachingDateServices.unregisterTeachingDate(unRegisterData)
        return res.status(200).json("response")
    } catch(e) {
        return res.status(500).json({
            error: `Error from server: ${e}`
        })
    }
}

module.exports = {
    getAllRatingByTeacherPhone,
    getAvarageRatingByTeacherPhone,
    getRatingPageData,
    addRating
}