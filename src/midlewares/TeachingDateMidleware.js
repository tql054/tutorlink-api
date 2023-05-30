import {getCurrentTeachingTimes, getByStudentPhone} from '../services/TeachingDateServices'

const checkTeachingTime = async (req, res, next) => {
    req.resultOfPrevious = true
    req.result = true
    req.resultOfNext =true

    let timeBegin = req.params.timeBegin
    let duration = req.params.duration


    let timeBeginInMinute = getTimeBeginInMinute(timeBegin)
    let timeEndInMinute = timeBeginInMinute + parseInt(duration)

    let listCurrentTeachingTime = await getCurrentTeachingTimes(req.data.phoneNumber, req.params.dow)

    listCurrentTeachingTime.map((value, index) => {
        let currentTimeBIM = getTimeBeginInMinute(value.timeBegin)
        let currentTimeEIM = currentTimeBIM + parseInt(value.duration)

        if(timeBeginInMinute - 10 < currentTimeBIM) {
            if(timeEndInMinute - 10 > currentTimeBIM) {
                req.resultOfPrevious = false
            }
        } else if(timeBeginInMinute - 10 < currentTimeEIM) req.resultOfPrevious = false
        
        if(timeBeginInMinute < currentTimeBIM) {
            if(timeEndInMinute > currentTimeBIM) {
                req.result = false
            }
        } else if(timeBeginInMinute < currentTimeEIM) req.result = false
        
        if(timeBeginInMinute + 10 < currentTimeBIM) {
            if(timeEndInMinute + 10> currentTimeBIM) {
                req.resultOfNext = false
            }
        } else if(timeBeginInMinute + 10 < currentTimeEIM) req.resultOfNext = false
    })
    next()
}

const checkStudentTeachingTime = async (req, res, next) => {
    req.resultOfPrevious = true
    req.result = true
    req.resultOfNext =true
    let timeBegin = req.params.timeBegin
    let duration = req.params.duration
    let timeBeginInMinute = getTimeBeginInMinute(timeBegin)
    let timeEndInMinute = timeBeginInMinute + parseInt(duration)

    let listCurrentTeachingTime = await getByStudentPhone(req.data.phoneNumber, req.params.dow)
    listCurrentTeachingTime.map((value, index) => {
        let currentTimeBIM = getTimeBeginInMinute(value.timeBegin)
        let currentTimeEIM = currentTimeBIM + parseInt(value.duration)
        if(timeBeginInMinute < currentTimeBIM) {
            if(timeEndInMinute > currentTimeBIM) {
                req.result = false
            }
        } else if(timeBeginInMinute < currentTimeEIM) req.result = false
    })
    next()
}

let getTimeBeginInMinute = (timeBegin) => {
    return parseInt(timeBegin.substring(0,2))*60 +  parseInt(timeBegin.substring(3))
}

module.exports = {
    checkTeachingTime,
    checkStudentTeachingTime
}