import {} from '../services/TeachingDateServices'

const getCurrentDatetime = () => {
    const currentdate = new Date()
    let currentDay = currentdate.getDate()
    let currentMonth = currentdate.getMonth() + 1
    if(currentDay< 10) currentDay = `0${currentDay}`
    if(currentMonth< 10) currentMonth = `0${currentMonth}`
    return currentdate.getFullYear() + "-" + currentMonth + "-" + currentDay + " " + `${currentdate.getHours}:${currentdate.getMinutes}:00`
}

export default getCurrentDatetime