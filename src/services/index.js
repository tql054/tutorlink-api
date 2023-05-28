import {} from '../services/TeachingDateServices'

const getCurrentDatetime = () => {
    const currentdate = new Date()
    return currentdate.getDate() + "/" + (currentdate.getMonth() + 1) 
    + "/" + currentdate.getFullYear()
}

export default getCurrentDatetime