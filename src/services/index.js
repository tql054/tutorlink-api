import {} from '../services/TeachingDateServices'

const getCurrentDatetime = () => {
    const currentdate = new Date()
    return currentdate.getDate() + "/" + (currentdate.getMont() + 1) 
    + "/" + currentdate.getFullYear()
}

export default getCurrentDatetime