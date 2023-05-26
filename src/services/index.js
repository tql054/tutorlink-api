import {} from '../services/TeachingDateServices'

const getCurrentDatetime = () => {
    const currentdate = new Date()
    return currentdate.getDay() + "/" + currentdate.getMonth() 
    + "/" + currentdate.getFullYear()
}

export default getCurrentDatetime