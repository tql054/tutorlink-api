import {} from '../services/TeachingDateServices'

const getCurrentDatetime = () => {
    const currentdate = new Date()
    return currentdate.getDay() + "/" + currentdate.getMonth() 
    + "/" + currentdate.getFullYear() + " @ " 
    + currentdate.getHours() + ":" 
    + currentdate.getMinutes() + ":" + currentdate.getSeconds();


}

export default getCurrentDatetime